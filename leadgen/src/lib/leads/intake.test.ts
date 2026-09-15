import { describe, it, expect, beforeAll } from "vitest";
import { getDb, schema } from "@/db/client";
import { intakeLead } from "./intake";
import { consentTextVersion, partnerListVersion } from "@/config/consent";
import { eq } from "drizzle-orm";

const meta = { ip: "203.0.113.7", userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)" };

function input(over: Record<string, unknown> = {}) {
  return {
    verticalSlug: "roofing", zip: "80202",
    answers: { projectType: "replace", roofType: "asphalt", propertyType: "single_family", roofAge: "gt20", insuranceClaim: "maybe" },
    timeline: "asap", homeowner: true,
    firstName: "Jane", lastName: "Ortiz", email: "jane.ortiz@example.com", phone: "303-217-4455",
    consent: true, consentTextVersion, partnerListVersion, formVersion: "roofing-v1",
    pageUrl: "https://example.com/quote/roofing", sessionSeconds: 40, website: "",
    ...over,
  };
}

beforeAll(async () => {
  const db = await getDb(); // NODE_ENV=test => in-memory PGlite with migrations applied
  await db.insert(schema.buyers).values({ slug: "dev-log", name: "log", kind: "ping_post", adapter: "log", active: true, verticalSlugs: ["roofing"], config: { price: 40 } }).onConflictDoNothing();
});

describe("intakeLead (integration)", () => {
  it("stores, qualifies, routes and sells a good lead", async () => {
    const r = await intakeLead(input(), meta);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.status).toBe("sold");
    expect(r.price).toBe(40 + Math.round(85 / 4));
    const db = await getDb();
    const [lead] = await db.select().from(schema.leads).where(eq(schema.leads.id, r.leadId));
    expect(lead.marketSlug).toBe("denver");
    expect(lead.state).toBe("CO");
    expect(lead.phone).toBe("+13032174455");
    expect(lead.ip).not.toBe(meta.ip); // hashed
    expect(lead.soldToBuyerSlug).toBe("dev-log");
    expect(Number(lead.revenue)).toBeGreaterThan(0);
    const attempts = await db.select().from(schema.buyerAttempts).where(eq(schema.buyerAttempts.leadId, r.leadId));
    expect(attempts.map((a) => a.stage)).toEqual(["ping", "post"]);
    const salesRows = await db.select().from(schema.sales).where(eq(schema.sales.leadId, r.leadId));
    expect(salesRows).toHaveLength(1);
  });

  it("marks the same person as duplicate within the window, even with a new email", async () => {
    const r = await intakeLead(input({ email: "other@example.com" }), meta);
    expect(r.ok && r.status).toBe("duplicate");
  });

  it("rejects renters without contacting a buyer", async () => {
    const r = await intakeLead(input({ homeowner: false, phone: "720-300-1234", email: "renter@example.com" }), meta);
    expect(r.ok && r.status).toBe("rejected");
    const db = await getDb();
    const [lead] = await db.select().from(schema.leads).where(eq(schema.leads.id, (r as { leadId: string }).leadId));
    expect(lead.statusReason).toBe("not_homeowner");
    expect(await db.select().from(schema.buyerAttempts).where(eq(schema.buyerAttempts.leadId, lead.id))).toHaveLength(0);
  });

  it("hard-rejects honeypot and disposable email", async () => {
    const a = await intakeLead(input({ website: "http://spam", phone: "720-300-1235", email: "h@example.com" }), meta);
    expect(a.ok && a.status).toBe("rejected");
    const b = await intakeLead(input({ phone: "720-300-1236", email: "x@mailinator.com" }), meta);
    expect(b.ok && b.status).toBe("rejected");
  });

  it("refuses stale consent versions and bad phones with field errors", async () => {
    const a = await intakeLead(input({ consentTextVersion: "old" }), meta);
    expect(a).toMatchObject({ ok: false, field: "consent" });
    const b = await intakeLead(input({ phone: "12345" }), meta);
    expect(b).toMatchObject({ ok: false, field: "phone" });
    const c = await intakeLead(input({ consent: false }), meta);
    expect(c.ok).toBe(false);
  });

  it("stores out-of-footprint ZIPs with no market", async () => {
    const r = await intakeLead(input({ zip: "10001", phone: "212-555-0100", email: "ny@example.com" }), meta);
    expect(r.ok).toBe(true);
    const db = await getDb();
    const [lead] = await db.select().from(schema.leads).where(eq(schema.leads.id, (r as { leadId: string }).leadId));
    expect(lead.marketSlug).toBeNull();
  });

  it("rate-limits an IP", async () => {
    let last: Awaited<ReturnType<typeof intakeLead>> | undefined;
    for (let i = 0; i < 7; i++) {
      last = await intakeLead(input({ phone: `303-40${i}-11${i}${i}`, email: `rl${i}@example.com` }), { ...meta, ip: "198.51.100.9" });
    }
    expect(last && last.ok && last.status).toBe("rejected");
  });
});
