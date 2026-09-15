import { and, eq, gte, sql } from "drizzle-orm";
import { getDb, schema } from "@/db/client";
import { leadInputSchema, normalizePhone, validateAnswers, type LeadInput } from "./validate";
import { qualify } from "./qualify";
import { dedupeHash, DEDUPE_WINDOW_DAYS, hashIp } from "./dedupe";
import { fraudCheck } from "./fraud";
import { findMarketByZip } from "@/config/markets";
import { consentText, consentTextVersion, partnerListVersion } from "@/config/consent";
import { buildAdapter } from "@/lib/buyers/registry";
import { routeLead } from "@/lib/buyers/router";
import type { CanonicalLead } from "@/lib/buyers/types";

export type IntakeResult =
  | { ok: true; leadId: string; status: string; sold: boolean; price?: number }
  | { ok: false; error: string; field?: string };

export type RequestMeta = { ip: string; userAgent: string };

/**
 * The whole lead lifecycle in one place: validate, normalize, screen, store,
 * route, record the outcome. Always stores the lead (even rejected ones) so
 * the admin sees every unit of demand and why it was or was not sold.
 */
export async function intakeLead(raw: unknown, meta: RequestMeta): Promise<IntakeResult> {
  const parsed = leadInputSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue?.message ?? "Invalid input", field: issue?.path?.join(".") };
  }
  const input: LeadInput = parsed.data;

  const phone = normalizePhone(input.phone);
  if (!phone) return { ok: false, error: "Enter a valid US phone number", field: "phone" };

  const answersOk = validateAnswers(input.verticalSlug, input.answers);
  if (!answersOk.ok) return { ok: false, error: answersOk.error, field: "answers" };

  if (input.consentTextVersion !== consentTextVersion || input.partnerListVersion !== partnerListVersion) {
    // Stale form: consent text changed since page load. Refuse rather than mislabel consent.
    return { ok: false, error: "This form has been updated. Please reload and try again.", field: "consent" };
  }

  const db = await getDb();
  const ipHash = hashIp(meta.ip);
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const [{ n: ipRecent }] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.leads)
    .where(and(eq(schema.leads.ip, ipHash), gte(schema.leads.createdAt, hourAgo)));

  const fraud = fraudCheck({
    email: input.email,
    phone,
    firstName: input.firstName,
    lastName: input.lastName,
    sessionSeconds: input.sessionSeconds,
    honeypot: input.website ?? "",
    userAgent: meta.userAgent,
    ipRecentLeads: Number(ipRecent ?? 0),
    rateLimit: Number(process.env.LEAD_RATE_LIMIT_PER_IP_PER_HOUR ?? 5),
  });

  const hash = dedupeHash({ phone, email: input.email, verticalSlug: input.verticalSlug });
  const windowStart = new Date(Date.now() - DEDUPE_WINDOW_DAYS * 86400_000);
  const dup = await db
    .select({ id: schema.leads.id })
    .from(schema.leads)
    .where(and(eq(schema.leads.dedupeHash, hash), gte(schema.leads.createdAt, windowStart)))
    .limit(1);
  const [dupByPhone] = dup.length
    ? dup
    : await db
        .select({ id: schema.leads.id })
        .from(schema.leads)
        .where(and(eq(schema.leads.phone, phone), eq(schema.leads.verticalSlug, input.verticalSlug), gte(schema.leads.createdAt, windowStart)))
        .limit(1);

  const q = qualify(input.verticalSlug, { homeowner: input.homeowner, timeline: input.timeline, answers: input.answers });
  const market = findMarketByZip(input.zip);

  let status: schema.LeadStatus = "new";
  let statusReason: string | null = null;
  if (fraud.hard) { status = "rejected"; statusReason = `fraud:${fraud.flags.join(",")}`; }
  else if (dupByPhone) { status = "duplicate"; statusReason = `duplicate_of:${dupByPhone.id}`; }
  else if (!q.qualified) { status = "rejected"; statusReason = q.reason ?? "unqualified"; }

  // Attribution snapshot from the visit, if we have one.
  let channel = "direct", utmSource: string | null = null, utmMedium: string | null = null, utmCampaign: string | null = null;
  if (input.visitId) {
    const [v] = await db.select().from(schema.visits).where(eq(schema.visits.id, input.visitId)).limit(1);
    if (v) { channel = v.channel; utmSource = v.utmSource; utmMedium = v.utmMedium; utmCampaign = v.utmCampaign; }
  }

  const [row] = await db
    .insert(schema.leads)
    .values({
      visitId: input.visitId ?? null,
      verticalSlug: input.verticalSlug,
      marketSlug: market?.slug ?? null,
      status,
      statusReason,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone,
      address: input.address || null,
      state: market?.state ?? null,
      zip: input.zip,
      homeowner: input.homeowner,
      timeline: input.timeline,
      answers: input.answers,
      qualityScore: q.score,
      dedupeHash: hash,
      fraudFlags: fraud.flags,
      consentTextVersion: input.consentTextVersion,
      partnerListVersion: input.partnerListVersion,
      consentedAt: new Date(),
      trustedFormCertUrl: input.trustedFormCertUrl || null,
      jornayaLeadId: input.jornayaLeadId || null,
      ip: ipHash,
      userAgent: meta.userAgent.slice(0, 500),
      pageUrl: input.pageUrl,
      formVersion: input.formVersion,
      sessionSeconds: input.sessionSeconds ?? null,
      channel,
      utmSource,
      utmMedium,
      utmCampaign,
    })
    .returning({ id: schema.leads.id });

  if (status !== "new") return { ok: true, leadId: row.id, status, sold: false };

  // Route synchronously: ping/post exchanges expect the post within minutes,
  // and the consumer is waiting on a "you're matched" screen anyway.
  const outcome = await routeStoredLead(row.id, { ...input, phone, rawIp: meta.ip, userAgent: meta.userAgent, market: market ?? null, score: q.score });
  return { ok: true, leadId: row.id, status: outcome.sold ? "sold" : "unsold", sold: outcome.sold, price: outcome.price };
}

async function routeStoredLead(
  leadId: string,
  d: LeadInput & { phone: string; rawIp: string; userAgent: string; market: { slug: string; state: string } | null; score: number },
) {
  const db = await getDb();
  await db.update(schema.leads).set({ status: "routing", updatedAt: new Date() }).where(eq(schema.leads.id, leadId));

  const rows = await db.select().from(schema.buyers).where(eq(schema.buyers.active, true));
  const adapters = rows
    .filter((b) => b.kind === "ping_post" && b.verticalSlugs.includes(d.verticalSlug))
    .map((b) => buildAdapter(b))
    .filter((a): a is NonNullable<typeof a> => a !== null);

  const canonical: CanonicalLead = {
    id: leadId,
    verticalSlug: d.verticalSlug,
    marketSlug: d.market?.slug ?? null,
    zip: d.zip,
    state: d.market?.state ?? null,
    city: null,
    address: d.address || null,
    firstName: d.firstName,
    lastName: d.lastName,
    email: d.email,
    phone: d.phone,
    homeowner: d.homeowner,
    timeline: d.timeline,
    answers: d.answers,
    qualityScore: d.score,
    ip: d.rawIp,
    userAgent: d.userAgent,
    pageUrl: d.pageUrl,
    consentText: consentText(),
    consentedAt: new Date(),
    trustedFormCertUrl: d.trustedFormCertUrl || null,
    jornayaLeadId: d.jornayaLeadId || null,
  };

  const result = adapters.length ? await routeLead(canonical, adapters) : { sold: false, attempts: [] as never[] };

  if (result.attempts.length) {
    await db.insert(schema.buyerAttempts).values(
      result.attempts.map((a) => ({
        leadId,
        buyerSlug: a.buyerSlug,
        stage: a.stage,
        outcome: a.outcome,
        price: a.price !== undefined ? a.price.toFixed(2) : null,
        externalId: a.externalId ?? null,
        reason: a.reason ?? null,
        request: a.request ?? null,
        response: a.response ?? null,
        latencyMs: a.latencyMs,
      })),
    );
  }

  if (result.sold) {
    await db.insert(schema.sales).values({ leadId, buyerSlug: result.buyerSlug!, price: (result.price ?? 0).toFixed(2), status: "pending", externalId: result.externalId ?? null });
    await db.update(schema.leads).set({ status: "sold", soldToBuyerSlug: result.buyerSlug, salePrice: (result.price ?? 0).toFixed(2), revenue: (result.price ?? 0).toFixed(2), updatedAt: new Date() }).where(eq(schema.leads.id, leadId));
  } else {
    await db.update(schema.leads).set({ status: "unsold", statusReason: adapters.length ? "no_buyer_accepted" : "no_active_buyers", updatedAt: new Date() }).where(eq(schema.leads.id, leadId));
  }
  return result;
}
