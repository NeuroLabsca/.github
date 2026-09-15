import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db/client";
import { createHash } from "node:crypto";

export const runtime = "nodejs";

/**
 * Inbound call dispositions from the call platform or a network (Service
 * Direct "Direct Sync", Ringba postbacks, etc). Networks differ, so the
 * payload is normalized by a small field map per `source` and the raw body
 * is always logged. Auth: shared secret in `?key=` or `x-webhook-secret`.
 */
const normalized = z.object({
  source: z.string().min(1),
  trackingNumber: z.string().min(7),
  caller: z.string().optional(),
  durationSeconds: z.coerce.number().int().min(0).optional(),
  billable: z.coerce.boolean().optional(),
  payout: z.coerce.number().min(0).optional(),
  externalId: z.string().optional(),
  startedAt: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const secret = process.env.WEBHOOK_SECRET;
  const provided = req.nextUrl.searchParams.get("key") ?? req.headers.get("x-webhook-secret");
  if (!secret || provided !== secret) return NextResponse.json({ ok: false }, { status: 401 });

  const raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const db = await getDb();
  const [log] = await db.insert(schema.webhookLog).values({ source: String(raw.source ?? req.nextUrl.searchParams.get("source") ?? "unknown"), payload: raw }).returning({ id: schema.webhookLog.id });

  const parsed = normalized.safeParse({ ...raw, source: raw.source ?? req.nextUrl.searchParams.get("source") });
  if (!parsed.success) {
    await db.update(schema.webhookLog).set({ error: parsed.error.message }).where(eq(schema.webhookLog.id, log.id));
    return NextResponse.json({ ok: false, error: "unrecognized payload" }, { status: 202 });
  }
  const p = parsed.data;
  const e164 = p.trackingNumber.startsWith("+") ? p.trackingNumber : `+1${p.trackingNumber.replace(/\D/g, "").slice(-10)}`;
  const [tn] = await db.select().from(schema.trackingNumbers).where(eq(schema.trackingNumbers.e164, e164)).limit(1);

  await db.insert(schema.calls).values({
    trackingNumber: e164,
    buyerSlug: tn?.buyerSlug ?? p.source,
    verticalSlug: tn?.verticalSlug ?? "unknown",
    marketSlug: tn?.marketSlug ?? null,
    callerHash: p.caller ? createHash("sha256").update(p.caller).digest("hex").slice(0, 32) : null,
    durationSeconds: p.durationSeconds ?? null,
    billable: p.billable ?? null,
    payout: p.payout !== undefined ? p.payout.toFixed(2) : null,
    externalId: p.externalId ?? null,
    raw,
    startedAt: p.startedAt ? new Date(p.startedAt) : new Date(),
  });
  await db.update(schema.webhookLog).set({ processed: true }).where(eq(schema.webhookLog.id, log.id));
  return NextResponse.json({ ok: true });
}
