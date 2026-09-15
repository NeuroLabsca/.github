import { describe, it, expect } from "vitest";
import { normalizePhone, leadInputSchema } from "./validate";
import { qualify } from "./qualify";
import { dedupeHash } from "./dedupe";
import { fraudCheck } from "./fraud";
import { classifyChannel } from "../attribution";

describe("normalizePhone", () => {
  it("normalizes US numbers to E.164", () => {
    expect(normalizePhone("(303) 217-4455")).toBe("+13032174455");
    expect(normalizePhone("303-217-4455")).toBe("+13032174455");
    expect(normalizePhone("+1 720 300 1234")).toBe("+17203001234");
  });
  it("rejects garbage and non-US", () => {
    expect(normalizePhone("12345")).toBe(null);
    expect(normalizePhone("+44 20 7946 0958")).toBe(null);
  });
});

describe("qualify (roofing)", () => {
  const base = { homeowner: true, timeline: "asap", answers: { projectType: "replace", roofType: "asphalt", propertyType: "single_family", roofAge: "gt20", insuranceClaim: "maybe" } };
  it("scores a strong replacement lead high", () => {
    const q = qualify("roofing", base);
    expect(q.qualified).toBe(true);
    expect(q.score).toBe(30 + 30 + 10 + 5 + 10);
  });
  it("rejects renters", () => {
    expect(qualify("roofing", { ...base, homeowner: false })).toMatchObject({ qualified: false, reason: "not_homeowner" });
  });
  it("rejects commercial property", () => {
    expect(qualify("roofing", { ...base, answers: { ...base.answers, propertyType: "commercial" } }).reason).toBe("disqualified_propertyType_commercial");
  });
  it("rejects unknown timeline", () => {
    expect(qualify("roofing", { ...base, timeline: "never" }).qualified).toBe(false);
  });
});

describe("dedupeHash", () => {
  it("is case/whitespace insensitive on email and stable", () => {
    const a = dedupeHash({ phone: "+13032174455", email: "A@B.com ", verticalSlug: "roofing" });
    const b = dedupeHash({ phone: "+13032174455", email: "a@b.com", verticalSlug: "roofing" });
    expect(a).toBe(b);
    expect(dedupeHash({ phone: "+13032174455", email: "a@b.com", verticalSlug: "windows" })).not.toBe(a);
  });
});

describe("fraudCheck", () => {
  const ok = { email: "jane@gmail.com", phone: "+13032174455", firstName: "Jane", lastName: "Ortiz", sessionSeconds: 45, honeypot: "", userAgent: "Mozilla/5.0 (iPhone)", ipRecentLeads: 0, rateLimit: 5 };
  it("passes a normal lead", () => {
    expect(fraudCheck(ok)).toEqual({ flags: [], hard: false });
  });
  it("hard-rejects honeypot, disposable email, rate limit, fake phone", () => {
    expect(fraudCheck({ ...ok, honeypot: "http://spam" }).hard).toBe(true);
    expect(fraudCheck({ ...ok, email: "x@mailinator.com" }).hard).toBe(true);
    expect(fraudCheck({ ...ok, ipRecentLeads: 5 }).hard).toBe(true);
    expect(fraudCheck({ ...ok, phone: "+13035550142" }).hard).toBe(true);
  });
  it("soft-flags fast sessions and test names", () => {
    const r = fraudCheck({ ...ok, sessionSeconds: 2, firstName: "test", lastName: "test" });
    expect(r.hard).toBe(false);
    expect(r.flags).toEqual(expect.arrayContaining(["too_fast", "test_name", "same_first_last"]));
  });
});

describe("leadInputSchema", () => {
  it("requires explicit consent true", () => {
    const r = leadInputSchema.safeParse({ consent: false });
    expect(r.success).toBe(false);
  });
});

describe("classifyChannel", () => {
  const siteHost = "example.com";
  it("classifies gclid and cpc as paid", () => {
    expect(classifyChannel({ gclid: "abc", siteHost })).toBe("paid");
    expect(classifyChannel({ utmMedium: "cpc", siteHost })).toBe("paid");
  });
  it("classifies google referrer as organic, own host as direct", () => {
    expect(classifyChannel({ referrer: "https://www.google.com/", siteHost })).toBe("organic");
    expect(classifyChannel({ referrer: "https://example.com/roofing", siteHost })).toBe("direct");
    expect(classifyChannel({ referrer: "https://nextdoor.com/x", siteHost })).toBe("social");
    expect(classifyChannel({ referrer: "https://someblog.net/x", siteHost })).toBe("referral");
    expect(classifyChannel({ siteHost })).toBe("direct");
  });
});
