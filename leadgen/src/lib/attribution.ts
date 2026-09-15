export type Channel = "organic" | "paid" | "referral" | "social" | "direct" | "email";

const SEARCH_ENGINES = /google\.|bing\.com|duckduckgo\.com|yahoo\.com|ecosia\.org|brave\.com/i;
const SOCIAL = /facebook\.com|fb\.com|instagram\.com|t\.co|twitter\.com|x\.com|reddit\.com|nextdoor\.com|tiktok\.com|pinterest\.com|youtube\.com/i;

export function classifyChannel(p: {
  utmMedium?: string | null;
  utmSource?: string | null;
  gclid?: string | null;
  referrer?: string | null;
  siteHost: string;
}): Channel {
  const medium = (p.utmMedium ?? "").toLowerCase();
  if (p.gclid || /cpc|ppc|paid|sem|display/.test(medium)) return "paid";
  if (/email|newsletter/.test(medium)) return "email";
  if (/social/.test(medium)) return "social";
  if (/organic/.test(medium)) return "organic";
  const ref = p.referrer ?? "";
  if (!ref) return p.utmSource ? "referral" : "direct";
  try {
    const host = new URL(ref).hostname;
    if (host.endsWith(p.siteHost)) return "direct";
    if (SEARCH_ENGINES.test(host)) return "organic";
    if (SOCIAL.test(host)) return "social";
    return "referral";
  } catch {
    return "direct";
  }
}

export function deviceFromUa(ua: string | null | undefined): "mobile" | "tablet" | "desktop" {
  if (!ua) return "desktop";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}
