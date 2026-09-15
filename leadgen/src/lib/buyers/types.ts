// A buyer adapter turns our canonical lead into a network's ping/post calls.
// Adapters never touch the database; the router records everything.

export type CanonicalLead = {
  id: string;
  verticalSlug: string;
  marketSlug: string | null;
  zip: string;
  state: string | null;
  city: string | null;
  address: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // E.164
  homeowner: boolean;
  timeline: string;
  answers: Record<string, string | number | boolean>;
  qualityScore: number;
  ip: string;
  userAgent: string;
  pageUrl: string;
  consentText: string;
  consentedAt: Date;
  trustedFormCertUrl: string | null;
  jornayaLeadId: string | null;
};

export type PingResult =
  | { outcome: "accepted"; price: number; token: string; request: Record<string, unknown>; response: Record<string, unknown> }
  | { outcome: "rejected"; reason: string; request: Record<string, unknown>; response: Record<string, unknown> }
  | { outcome: "error"; reason: string; request: Record<string, unknown>; response?: Record<string, unknown> };

export type PostResult =
  | { outcome: "accepted"; price: number; externalId: string; request: Record<string, unknown>; response: Record<string, unknown> }
  | { outcome: "rejected"; reason: string; request: Record<string, unknown>; response: Record<string, unknown> }
  | { outcome: "error"; reason: string; request: Record<string, unknown>; response?: Record<string, unknown> };

export interface BuyerAdapter {
  readonly slug: string;
  ping(lead: CanonicalLead): Promise<PingResult>;
  post(lead: CanonicalLead, token: string): Promise<PostResult>;
}

export type HttpJson = (url: string, body: Record<string, unknown>, headers?: Record<string, string>) => Promise<{ status: number; json: Record<string, unknown> }>;

export const defaultHttp: HttpJson = async (url, body, headers = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const text = await res.text();
    let json: Record<string, unknown> = {};
    try { json = text ? (JSON.parse(text) as Record<string, unknown>) : {}; } catch { json = { raw: text.slice(0, 2000) }; }
    return { status: res.status, json };
  } finally {
    clearTimeout(timer);
  }
};

export function trustedFormToken(certUrl: string | null): string | null {
  if (!certUrl) return null;
  // Cert URLs look like https://cert.trustedform.com/<40-hex-id>; the id is the last path segment.
  try {
    const seg = new URL(certUrl).pathname.split("/").filter(Boolean).pop();
    return seg ?? certUrl;
  } catch {
    return certUrl;
  }
}
