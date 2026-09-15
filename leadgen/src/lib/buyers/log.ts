import type { BuyerAdapter, CanonicalLead, PingResult, PostResult } from "./types";

/**
 * Dev/test buyer: accepts everything at a configurable price so the whole
 * pipeline (routing, sales, revenue reporting) can be exercised before any
 * network approves us. Never enable in production.
 */
export class LogBuyerAdapter implements BuyerAdapter {
  readonly slug: string;
  constructor(slug = "log", private price = 35, private acceptZips?: string[]) { this.slug = slug; }
  async ping(lead: CanonicalLead): Promise<PingResult> {
    if (this.acceptZips && !this.acceptZips.includes(lead.zip)) {
      return { outcome: "rejected", reason: "zip_not_covered", request: { zip: lead.zip }, response: {} };
    }
    const price = this.price + Math.round(lead.qualityScore / 4);
    return { outcome: "accepted", price, token: `log-${lead.id}`, request: { zip: lead.zip, score: lead.qualityScore }, response: { price } };
  }
  async post(lead: CanonicalLead, token: string): Promise<PostResult> {
    const price = this.price + Math.round(lead.qualityScore / 4);
    return { outcome: "accepted", price, externalId: `log-sale-${lead.id}`, request: { token }, response: { price } };
  }
}
