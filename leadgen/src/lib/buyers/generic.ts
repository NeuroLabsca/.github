import type { BuyerAdapter, CanonicalLead, HttpJson, PingResult, PostResult } from "./types";
import { defaultHttp } from "./types";
import { redact } from "./modernize";

/**
 * Configurable ping/post adapter for exchanges that expose a simple JSON
 * ping + post pair (Prime Lead Exchange, Networx API, most LeadsPedia and
 * boberdoo-hosted buyers). Field mapping is data so onboarding a buyer is a
 * config change. Templates use {{path}} placeholders resolved from the lead.
 */
export type GenericConfig = {
  slug: string;
  pingUrl?: string; // omit for post-only buyers
  postUrl: string;
  headers?: Record<string, string>;
  pingFields: Record<string, string>;
  postFields: Record<string, string>;
  accept: { statusPath: string; successValue: string; pricePath?: string; tokenPath?: string; idPath?: string; reasonPath?: string };
};

export class GenericPingPostAdapter implements BuyerAdapter {
  readonly slug: string;
  constructor(private cfg: GenericConfig, private http: HttpJson = defaultHttp) { this.slug = cfg.slug; }

  private render(fields: Record<string, string>, lead: CanonicalLead, extra: Record<string, string> = {}) {
    const ctx: Record<string, unknown> = { ...lead, ...lead.answers, ...extra, phoneNational: lead.phone.replace(/^\+1/, "") };
    const out: Record<string, unknown> = {};
    for (const [k, tpl] of Object.entries(fields)) {
      out[k] = tpl.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        const v = ctx[key];
        return v === undefined || v === null ? "" : String(v);
      });
    }
    return out;
  }

  async ping(lead: CanonicalLead): Promise<PingResult> {
    if (!this.cfg.pingUrl) return { outcome: "accepted", price: 0, token: "post-only", request: {}, response: {} };
    const request = this.render(this.cfg.pingFields, lead);
    try {
      const { status, json } = await this.http(this.cfg.pingUrl, request, this.cfg.headers);
      if (status < 300 && get(json, this.cfg.accept.statusPath) === this.cfg.accept.successValue) {
        return { outcome: "accepted", price: Number(get(json, this.cfg.accept.pricePath ?? "price") ?? 0), token: String(get(json, this.cfg.accept.tokenPath ?? "token") ?? ""), request, response: json };
      }
      return { outcome: "rejected", reason: String(get(json, this.cfg.accept.reasonPath ?? "message") ?? `http_${status}`), request, response: json };
    } catch (e) {
      return { outcome: "error", reason: (e as Error).message, request };
    }
  }

  async post(lead: CanonicalLead, token: string): Promise<PostResult> {
    const request = this.render(this.cfg.postFields, lead, { token });
    try {
      const { status, json } = await this.http(this.cfg.postUrl, request, this.cfg.headers);
      if (status < 300 && get(json, this.cfg.accept.statusPath) === this.cfg.accept.successValue) {
        return { outcome: "accepted", price: Number(get(json, this.cfg.accept.pricePath ?? "price") ?? 0), externalId: String(get(json, this.cfg.accept.idPath ?? "id") ?? ""), request: redact(request), response: json };
      }
      return { outcome: "rejected", reason: String(get(json, this.cfg.accept.reasonPath ?? "message") ?? `http_${status}`), request: redact(request), response: json };
    } catch (e) {
      return { outcome: "error", reason: (e as Error).message, request: redact(request) };
    }
  }
}

function get(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, k) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[k] : undefined), obj);
}
