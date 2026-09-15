import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { recordVisit } from "@/lib/tracking";
import { clientIp, userAgent } from "@/lib/request";

export const runtime = "nodejs";

const schema = z.object({
  landingUrl: z.string().url(),
  referrer: z.string().nullable().optional(),
  utm: z.object({ source: z.string().nullable().optional(), medium: z.string().nullable().optional(), campaign: z.string().nullable().optional(), term: z.string().nullable().optional(), content: z.string().nullable().optional() }).default({}),
  gclid: z.string().nullable().optional(),
  vertical: z.string().nullable().optional(),
  market: z.string().nullable().optional(),
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const p = parsed.data;
  const visitId = await recordVisit({ landingUrl: p.landingUrl, referrer: p.referrer, utm: p.utm, gclid: p.gclid, ip: clientIp(req), userAgent: userAgent(req), verticalSlug: p.vertical, marketSlug: p.market });
  return NextResponse.json({ ok: true, visitId });
}
