import { describe, it, expect } from "vitest";
import { routeLead } from "./router";
import { LogBuyerAdapter } from "./log";
import { ModernizeAdapter } from "./modernize";
import { GenericPingPostAdapter } from "./generic";
import type { CanonicalLead, HttpJson } from "./types";
import { trustedFormToken } from "./types";

const lead: CanonicalLead = {
  id: "11111111-1111-1111-1111-111111111111",
  verticalSlug: "roofing", marketSlug: "denver", zip: "80202", state: "CO", city: null, address: "1 Main St",
  firstName: "Jane", lastName: "Ortiz", email: "jane@gmail.com", phone: "+13032174455",
  homeowner: true, timeline: "asap", answers: { projectType: "replace", roofType: "asphalt", propertyType: "single_family", roofAge: "gt20", insuranceClaim: "no" },
  qualityScore: 80, ip: "1.2.3.4", userAgent: "UA", pageUrl: "https://example.com/quote", consentText: "I agree", consentedAt: new Date(),
  trustedFormCertUrl: "https://cert.trustedform.com/abc123def", jornayaLeadId: null,
};

describe("routeLead", () => {
  it("posts to the highest bidder and records all attempts", async () => {
    const low = new LogBuyerAdapter("low", 20);
    const high = new LogBuyerAdapter("high", 50);
    const r = await routeLead(lead, [low, high]);
    expect(r.sold).toBe(true);
    expect(r.buyerSlug).toBe("high");
    expect(r.price).toBe(50 + 20);
    expect(r.attempts.filter((a) => a.stage === "ping")).toHaveLength(2);
    expect(r.attempts.filter((a) => a.stage === "post")).toHaveLength(1);
  });
  it("falls through when the top bidder rejects the post", async () => {
    const flaky = new LogBuyerAdapter("flaky", 90);
    flaky.post = async () => ({ outcome: "rejected", reason: "dup", request: {}, response: {} });
    const solid = new LogBuyerAdapter("solid", 30);
    const r = await routeLead(lead, [flaky, solid]);
    expect(r.sold).toBe(true);
    expect(r.buyerSlug).toBe("solid");
    expect(r.attempts.filter((a) => a.stage === "post")).toHaveLength(2);
  });
  it("returns unsold with no accepted pings", async () => {
    const none = new LogBuyerAdapter("none", 10, ["99999"]);
    const r = await routeLead(lead, [none]);
    expect(r.sold).toBe(false);
    expect(r.attempts[0]).toMatchObject({ outcome: "rejected", reason: "zip_not_covered" });
  });
  it("honours minPrice", async () => {
    const r = await routeLead(lead, [new LogBuyerAdapter("cheap", 5)], { minPrice: 100 });
    expect(r.sold).toBe(false);
  });
});

describe("ModernizeAdapter", () => {
  it("builds ping/post per v3 doc shape and parses responses", async () => {
    const calls: { url: string; body: Record<string, unknown> }[] = [];
    const http: HttpJson = async (url, body) => {
      calls.push({ url, body });
      if (url.endsWith("/ping")) return { status: 200, json: { status: "success", pingToken: "tok", price: "42.50" } };
      return { status: 200, json: { status: "success", leadId: "L-9", price: "42.50" } };
    };
    const a = new ModernizeAdapter({ tagId: "1", partnerSourceId: "src", pingUrl: "https://x/ping", postUrl: "https://x/post", serviceCodes: { roofing: "ROOFING" }, timeframeMap: { asap: "Immediately" } }, http);
    const ping = await a.ping(lead);
    expect(ping).toMatchObject({ outcome: "accepted", price: 42.5, token: "tok" });
    expect(calls[0].body).toMatchObject({ tagId: "1", service: "ROOFING", postalCode: "80202", buyTimeframe: "Immediately", ownHome: "Yes", RoofingPlan: "Replace" });
    const post = await a.post(lead, "tok");
    expect(post).toMatchObject({ outcome: "accepted", externalId: "L-9" });
    expect(calls[1].body).toMatchObject({ pingToken: "tok", trustedFormToken: "abc123def", homePhoneConsentLanguage: "I agree", phone: "3032174455", publisherSubId: lead.id });
    // stored request is redacted
    expect(post.request.phone).toBe("[redacted]");
  });
  it("maps rejection and transport errors", async () => {
    const a = new ModernizeAdapter({ tagId: "1", partnerSourceId: "", pingUrl: "https://x/ping", postUrl: "https://x/post", serviceCodes: { roofing: "ROOFING" }, timeframeMap: {} },
      async () => ({ status: 200, json: { status: "rejected", message: "No buyer" } }));
    expect(await a.ping(lead)).toMatchObject({ outcome: "rejected", reason: "No buyer" });
    const b = new ModernizeAdapter({ tagId: "1", partnerSourceId: "", pingUrl: "https://x/ping", postUrl: "https://x/post", serviceCodes: { roofing: "ROOFING" }, timeframeMap: {} },
      async () => { throw new Error("timeout"); });
    expect(await b.ping(lead)).toMatchObject({ outcome: "error", reason: "timeout" });
  });
});

describe("GenericPingPostAdapter", () => {
  it("renders templates from lead fields and answers", async () => {
    let seen: Record<string, unknown> = {};
    const http: HttpJson = async (_u, body) => { seen = body; return { status: 200, json: { result: { ok: "yes", bid: 27, id: "T1" } } }; };
    const a = new GenericPingPostAdapter({
      slug: "ple", pingUrl: "https://p/ping", postUrl: "https://p/post",
      pingFields: { zip: "{{zip}}", project: "{{projectType}}", owner: "{{homeowner}}" },
      postFields: { token: "{{token}}", phone: "{{phoneNational}}", cert: "{{trustedFormCertUrl}}" },
      accept: { statusPath: "result.ok", successValue: "yes", pricePath: "result.bid", tokenPath: "result.id", idPath: "result.id" },
    }, http);
    const p = await a.ping(lead);
    expect(p).toMatchObject({ outcome: "accepted", price: 27, token: "T1" });
    expect(seen).toEqual({ zip: "80202", project: "replace", owner: "true" });
    const post = await a.post(lead, "T1");
    expect(post.outcome).toBe("accepted");
    expect(seen).toMatchObject({ token: "T1", phone: "3032174455", cert: lead.trustedFormCertUrl });
  });
});

describe("trustedFormToken", () => {
  it("extracts the cert id from a cert URL", () => {
    expect(trustedFormToken("https://cert.trustedform.com/9f8e7d6c")).toBe("9f8e7d6c");
    expect(trustedFormToken(null)).toBe(null);
  });
});
