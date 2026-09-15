import type { BuyerAdapter, CanonicalLead, PingResult } from "./types";

export type AttemptRecord = {
  buyerSlug: string;
  stage: "ping" | "post";
  outcome: "accepted" | "rejected" | "error";
  price?: number;
  externalId?: string;
  reason?: string;
  request?: Record<string, unknown>;
  response?: Record<string, unknown>;
  latencyMs: number;
};

export type RouteResult = {
  sold: boolean;
  buyerSlug?: string;
  price?: number;
  externalId?: string;
  attempts: AttemptRecord[];
};

/**
 * Ping every eligible buyer in parallel, then post to the highest bidder.
 * If that post is rejected, fall through to the next bid. Pure function of
 * (lead, adapters); persistence is the caller's job.
 */
export async function routeLead(lead: CanonicalLead, adapters: BuyerAdapter[], opts: { minPrice?: number } = {}): Promise<RouteResult> {
  const attempts: AttemptRecord[] = [];
  const minPrice = opts.minPrice ?? 0;

  const pings = await Promise.all(
    adapters.map(async (a) => {
      const t0 = Date.now();
      const r = await a.ping(lead);
      attempts.push(toAttempt(a.slug, "ping", r, Date.now() - t0));
      return { adapter: a, r };
    }),
  );

  const bids = pings
    .filter((p): p is { adapter: BuyerAdapter; r: Extract<PingResult, { outcome: "accepted" }> } => p.r.outcome === "accepted" && p.r.price >= minPrice)
    .sort((a, b) => b.r.price - a.r.price);

  for (const bid of bids) {
    const t0 = Date.now();
    const r = await bid.adapter.post(lead, bid.r.token);
    attempts.push(toAttempt(bid.adapter.slug, "post", r, Date.now() - t0));
    if (r.outcome === "accepted") {
      return { sold: true, buyerSlug: bid.adapter.slug, price: r.price || bid.r.price, externalId: r.externalId, attempts };
    }
  }
  return { sold: false, attempts };
}

function toAttempt(buyerSlug: string, stage: "ping" | "post", r: PingResult | { outcome: string; price?: number; externalId?: string; reason?: string; request?: Record<string, unknown>; response?: Record<string, unknown> }, latencyMs: number): AttemptRecord {
  return {
    buyerSlug,
    stage,
    outcome: r.outcome as AttemptRecord["outcome"],
    price: "price" in r ? r.price : undefined,
    externalId: "externalId" in r ? r.externalId : undefined,
    reason: "reason" in r ? r.reason : undefined,
    request: r.request,
    response: r.response,
    latencyMs,
  };
}
