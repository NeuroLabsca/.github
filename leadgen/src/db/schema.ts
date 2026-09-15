import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  numeric,
  uuid,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Catalog: verticals and markets are data so new trades/metros are config,
// not code. Question schemas live in src/config and are referenced by slug.
// ---------------------------------------------------------------------------

export const verticals = pgTable("verticals", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(), // "roofing"
  name: text("name").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const markets = pgTable("markets", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(), // "denver"
  name: text("name").notNull(), // "Denver Metro"
  state: text("state").notNull(), // "CO"
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const marketZips = pgTable(
  "market_zips",
  {
    marketId: uuid("market_id").notNull().references(() => markets.id),
    zip: text("zip").notNull(),
    city: text("city"),
  },
  (t) => [uniqueIndex("market_zips_zip_idx").on(t.zip)],
);

// ---------------------------------------------------------------------------
// Consent + disclosure infrastructure. Every lead points at the exact text
// and partner list version the consumer saw. Versions are immutable.
// ---------------------------------------------------------------------------

export const consentTexts = pgTable("consent_texts", {
  id: uuid("id").primaryKey().defaultRandom(),
  version: text("version").notNull().unique(), // "2026-09-15.1"
  verticalSlug: text("vertical_slug").notNull(),
  body: text("body").notNull(),
  partnerListVersion: text("partner_list_version").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const partnerLists = pgTable("partner_lists", {
  id: uuid("id").primaryKey().defaultRandom(),
  version: text("version").notNull().unique(),
  partners: jsonb("partners").$type<{ name: string; url?: string }[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Traffic: visits carry attribution; events are the funnel.
// ---------------------------------------------------------------------------

export const visits = pgTable(
  "visits",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    landingUrl: text("landing_url").notNull(),
    referrer: text("referrer"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    utmTerm: text("utm_term"),
    utmContent: text("utm_content"),
    gclid: text("gclid"),
    channel: text("channel").notNull().default("direct"), // organic | paid | referral | direct | social
    device: text("device"), // mobile | desktop | tablet
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    verticalSlug: text("vertical_slug"),
    marketSlug: text("market_slug"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("visits_created_idx").on(t.createdAt), index("visits_channel_idx").on(t.channel)],
);

export const events = pgTable(
  "events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    visitId: uuid("visit_id").references(() => visits.id),
    name: text("name").notNull(), // page_view | funnel_step | funnel_submit | call_click
    props: jsonb("props").$type<Record<string, unknown>>(),
    path: text("path"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("events_visit_idx").on(t.visitId), index("events_name_idx").on(t.name)],
);

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------

export type LeadStatus =
  | "new" // stored, not yet routed
  | "rejected" // failed internal validation/fraud/qualification
  | "duplicate"
  | "routing" // ping/post in progress
  | "sold"
  | "unsold" // no buyer accepted
  | "returned"; // buyer charged back

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    visitId: uuid("visit_id").references(() => visits.id),
    verticalSlug: text("vertical_slug").notNull(),
    marketSlug: text("market_slug"),
    status: text("status").$type<LeadStatus>().notNull().default("new"),
    statusReason: text("status_reason"),

    // Contact
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(), // E.164
    address: text("address"),
    city: text("city"),
    state: text("state"),
    zip: text("zip").notNull(),

    // Qualification (vertical-specific answers)
    homeowner: boolean("homeowner").notNull(),
    timeline: text("timeline").notNull(),
    answers: jsonb("answers").$type<Record<string, string | number | boolean>>().notNull(),
    qualityScore: integer("quality_score").notNull().default(0),

    // Dedupe + fraud
    dedupeHash: text("dedupe_hash").notNull(),
    fraudFlags: jsonb("fraud_flags").$type<string[]>().notNull().default([]),

    // Consent evidence
    consentTextVersion: text("consent_text_version").notNull(),
    partnerListVersion: text("partner_list_version").notNull(),
    consentedAt: timestamp("consented_at", { withTimezone: true }).notNull(),
    trustedFormCertUrl: text("trustedform_cert_url"),
    jornayaLeadId: text("jornaya_lead_id"),
    ip: text("ip").notNull(),
    userAgent: text("user_agent").notNull(),
    pageUrl: text("page_url").notNull(),
    formVersion: text("form_version").notNull(),
    sessionSeconds: integer("session_seconds"),

    // Attribution snapshot (denormalized from visit for reporting)
    channel: text("channel").notNull().default("direct"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),

    // Outcome
    soldToBuyerSlug: text("sold_to_buyer_slug"),
    salePrice: numeric("sale_price", { precision: 10, scale: 2 }),
    revenue: numeric("revenue", { precision: 10, scale: 2 }).notNull().default("0"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("leads_created_idx").on(t.createdAt),
    index("leads_status_idx").on(t.status),
    index("leads_dedupe_idx").on(t.dedupeHash),
    index("leads_vertical_market_idx").on(t.verticalSlug, t.marketSlug),
  ],
);

// ---------------------------------------------------------------------------
// Buyers and every interaction with them
// ---------------------------------------------------------------------------

export const buyers = pgTable("buyers", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(), // "modernize"
  name: text("name").notNull(),
  kind: text("kind").$type<"ping_post" | "call" | "affiliate">().notNull(),
  adapter: text("adapter").notNull(), // "modernize" | "generic" | "log"
  active: boolean("active").notNull().default(false),
  verticalSlugs: jsonb("vertical_slugs").$type<string[]>().notNull().default([]),
  config: jsonb("config").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const buyerAttempts = pgTable(
  "buyer_attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    leadId: uuid("lead_id").notNull().references(() => leads.id),
    buyerSlug: text("buyer_slug").notNull(),
    stage: text("stage").$type<"ping" | "post">().notNull(),
    outcome: text("outcome").$type<"accepted" | "rejected" | "error">().notNull(),
    price: numeric("price", { precision: 10, scale: 2 }),
    externalId: text("external_id"),
    reason: text("reason"),
    request: jsonb("request").$type<Record<string, unknown>>(),
    response: jsonb("response").$type<Record<string, unknown>>(),
    latencyMs: integer("latency_ms"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("buyer_attempts_lead_idx").on(t.leadId)],
);

export const sales = pgTable(
  "sales",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    leadId: uuid("lead_id").references(() => leads.id),
    callId: uuid("call_id"),
    buyerSlug: text("buyer_slug").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    status: text("status").$type<"pending" | "confirmed" | "returned" | "paid">().notNull().default("pending"),
    externalId: text("external_id"),
    returnReason: text("return_reason"),
    returnedAt: timestamp("returned_at", { withTimezone: true }),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("sales_lead_idx").on(t.leadId), index("sales_created_idx").on(t.createdAt)],
);

// Pay-per-call: tracking numbers map to a buyer + market; calls are ingested
// via webhook from the call platform or network.
export const trackingNumbers = pgTable("tracking_numbers", {
  id: uuid("id").primaryKey().defaultRandom(),
  e164: text("e164").notNull().unique(),
  display: text("display").notNull(),
  buyerSlug: text("buyer_slug").notNull(),
  verticalSlug: text("vertical_slug").notNull(),
  marketSlug: text("market_slug"),
  channel: text("channel"), // which traffic this number is shown to
  active: boolean("active").notNull().default(true),
});

export const calls = pgTable(
  "calls",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    trackingNumber: text("tracking_number").notNull(),
    buyerSlug: text("buyer_slug").notNull(),
    verticalSlug: text("vertical_slug").notNull(),
    marketSlug: text("market_slug"),
    callerHash: text("caller_hash"),
    durationSeconds: integer("duration_seconds"),
    billable: boolean("billable"),
    payout: numeric("payout", { precision: 10, scale: 2 }),
    externalId: text("external_id"),
    visitId: uuid("visit_id").references(() => visits.id),
    raw: jsonb("raw").$type<Record<string, unknown>>(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("calls_started_idx").on(t.startedAt)],
);

export const webhookLog = pgTable("webhook_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  source: text("source").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
  processed: boolean("processed").notNull().default(false),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
