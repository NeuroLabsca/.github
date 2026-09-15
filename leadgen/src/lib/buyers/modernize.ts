import type { BuyerAdapter, CanonicalLead, HttpJson, PingResult, PostResult } from "./types";
import { defaultHttp, trustedFormToken } from "./types";

/**
 * Modernize (QuinStreet) Publisher Ping Post v3.
 * Field names follow apidoc.modernize.com/publishers/ping-post.html as read
 * on 2026-09-15. Service codes and the roofing-specific parameter values
 * must be confirmed against the live doc during onboarding; they live in
 * `config` so they can be corrected without a deploy.
 */
export type ModernizeConfig = {
  tagId: string;
  partnerSourceId: string;
  pingUrl: string;
  postUrl: string;
  serviceCodes: Record<string, string>; // verticalSlug -> Modernize service code
  timeframeMap: Record<string, string>; // our timeline -> buyTimeframe value
  extraFields?: Record<string, Record<string, unknown>>; // verticalSlug -> static fields
};

export const modernizeDefaults: ModernizeConfig = {
  tagId: process.env.MODERNIZE_TAG_ID ?? "204670250",
  partnerSourceId: process.env.MODERNIZE_PARTNER_SOURCE_ID ?? "",
  pingUrl: process.env.MODERNIZE_PING_URL ?? "https://api-staging.modernize.com/publishers/v3/ping",
  postUrl: process.env.MODERNIZE_POST_URL ?? "https://api-staging.modernize.com/publishers/v3/post",
  serviceCodes: { roofing: "ROOFING", windows: "WINDOWS", hvac: "HVAC" },
  timeframeMap: { asap: "Immediately", "1to3mo": "1-3 months", "3to6mo": "3-6 months", planning: "Planning & Budgeting" },
};

export class ModernizeAdapter implements BuyerAdapter {
  readonly slug = "modernize";
  constructor(private cfg: ModernizeConfig = modernizeDefaults, private http: HttpJson = defaultHttp) {}

  private pingBody(lead: CanonicalLead) {
    const service = this.cfg.serviceCodes[lead.verticalSlug];
    const roofing = lead.verticalSlug === "roofing"
      ? { RoofingPlan: lead.answers.projectType === "repair" ? "Repair" : "Replace", RoofingType: String(lead.answers.roofType ?? "") }
      : {};
    return {
      tagId: this.cfg.tagId,
      service,
      postalCode: lead.zip,
      buyTimeframe: this.cfg.timeframeMap[lead.timeline] ?? "Immediately",
      ownHome: lead.homeowner ? "Yes" : "No",
      partnerSourceId: this.cfg.partnerSourceId,
      ...roofing,
      ...(this.cfg.extraFields?.[lead.verticalSlug] ?? {}),
    };
  }

  async ping(lead: CanonicalLead): Promise<PingResult> {
    const request = this.pingBody(lead);
    if (!request.service) return { outcome: "rejected", reason: "no_service_code", request, response: {} };
    try {
      const { status, json } = await this.http(this.cfg.pingUrl, request);
      if (status === 200 && json.status === "success" && json.pingToken) {
        return { outcome: "accepted", price: Number(json.price ?? 0), token: String(json.pingToken), request, response: json };
      }
      return { outcome: "rejected", reason: String(json.message ?? json.status ?? `http_${status}`), request, response: json };
    } catch (e) {
      return { outcome: "error", reason: (e as Error).message, request };
    }
  }

  async post(lead: CanonicalLead, token: string): Promise<PostResult> {
    const request = {
      ...this.pingBody(lead),
      pingToken: token,
      trustedFormToken: trustedFormToken(lead.trustedFormCertUrl) ?? "",
      leadIDToken: lead.jornayaLeadId ?? "",
      homePhoneConsentLanguage: lead.consentText,
      firstName: lead.firstName,
      lastName: lead.lastName,
      phone: lead.phone.replace(/^\+1/, ""),
      email: lead.email,
      address: lead.address ?? "",
      city: lead.city ?? "",
      state: lead.state ?? "",
      publisherSubId: lead.id,
      ipAddress: lead.ip,
      userAgent: lead.userAgent,
      sourceUrl: lead.pageUrl,
    };
    try {
      const { status, json } = await this.http(this.cfg.postUrl, request);
      if (status === 200 && json.status === "success" && json.leadId) {
        return { outcome: "accepted", price: Number(json.price ?? 0), externalId: String(json.leadId), request: redact(request), response: json };
      }
      return { outcome: "rejected", reason: String(json.message ?? json.status ?? `http_${status}`), request: redact(request), response: json };
    } catch (e) {
      return { outcome: "error", reason: (e as Error).message, request: redact(request) };
    }
  }
}

/** Stored requests never include raw PII beyond what the lead row already holds. */
export function redact<T extends Record<string, unknown>>(req: T): Record<string, unknown> {
  const out: Record<string, unknown> = { ...req };
  for (const k of ["phone", "email", "firstName", "lastName", "address", "homePhoneConsentLanguage"]) if (k in out) out[k] = "[redacted]";
  return out;
}
