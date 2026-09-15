import { getDb, schema } from "../src/db/client";
import { verticals } from "../src/config/verticals";
import { markets } from "../src/config/markets";
import { consentText, consentTextVersion, partnerList, partnerListVersion } from "../src/config/consent";

// Idempotent: safe to run on every deploy. Syncs config into the catalog
// tables and registers buyers. Buyers start inactive except the dev log buyer.
const db = await getDb();

for (const v of Object.values(verticals)) {
  await db.insert(schema.verticals).values({ slug: v.slug, name: v.name }).onConflictDoNothing();
}
for (const m of Object.values(markets)) {
  const [row] = await db.insert(schema.markets).values({ slug: m.slug, name: m.name, state: m.state }).onConflictDoNothing().returning();
  const marketId = row?.id ?? (await db.query.markets.findFirst({ where: (t, { eq }) => eq(t.slug, m.slug) }))!.id;
  for (const zip of m.zips) await db.insert(schema.marketZips).values({ marketId, zip }).onConflictDoNothing();
}

await db.insert(schema.partnerLists).values({ version: partnerListVersion, partners: partnerList }).onConflictDoNothing();
await db.insert(schema.consentTexts).values({ version: consentTextVersion, verticalSlug: "roofing", body: consentText(), partnerListVersion }).onConflictDoNothing();

const isProd = process.env.NODE_ENV === "production";
await db.insert(schema.buyers).values([
  { slug: "modernize", name: "Modernize (QuinStreet)", kind: "ping_post", adapter: "modernize", active: process.env.MODERNIZE_ENABLED === "true", verticalSlugs: ["roofing", "windows", "hvac"], config: {} },
  { slug: "dev-log", name: "Dev log buyer (accepts everything)", kind: "ping_post", adapter: "log", active: !isProd, verticalSlugs: ["roofing"], config: { price: 35 } },
]).onConflictDoNothing();

console.log("seeded");
process.exit(0);
