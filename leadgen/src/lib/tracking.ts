import { getDb, schema } from "@/db/client";
import { classifyChannel, deviceFromUa } from "./attribution";
import { hashIp } from "./leads/dedupe";
import { site } from "@/config/site";

export async function recordVisit(p: {
  landingUrl: string;
  referrer?: string | null;
  utm: { source?: string | null; medium?: string | null; campaign?: string | null; term?: string | null; content?: string | null };
  gclid?: string | null;
  ip: string;
  userAgent: string;
  verticalSlug?: string | null;
  marketSlug?: string | null;
}) {
  const db = await getDb();
  const siteHost = (() => { try { return new URL(site.url).hostname; } catch { return "localhost"; } })();
  const channel = classifyChannel({ utmMedium: p.utm.medium, utmSource: p.utm.source, gclid: p.gclid, referrer: p.referrer, siteHost });
  const [v] = await db
    .insert(schema.visits)
    .values({
      landingUrl: p.landingUrl.slice(0, 2000),
      referrer: p.referrer?.slice(0, 2000) ?? null,
      utmSource: p.utm.source ?? null,
      utmMedium: p.utm.medium ?? null,
      utmCampaign: p.utm.campaign ?? null,
      utmTerm: p.utm.term ?? null,
      utmContent: p.utm.content ?? null,
      gclid: p.gclid ?? null,
      channel,
      device: deviceFromUa(p.userAgent),
      ipHash: hashIp(p.ip),
      userAgent: p.userAgent.slice(0, 500),
      verticalSlug: p.verticalSlug ?? null,
      marketSlug: p.marketSlug ?? null,
    })
    .returning({ id: schema.visits.id });
  return v.id;
}

export async function recordEvent(p: { visitId?: string | null; name: string; path?: string | null; props?: Record<string, unknown> }) {
  const db = await getDb();
  await db.insert(schema.events).values({ visitId: p.visitId ?? null, name: p.name.slice(0, 60), path: p.path?.slice(0, 500) ?? null, props: p.props ?? null });
}
