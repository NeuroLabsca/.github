export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Front Range Roof Quotes",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  legalEntity: process.env.NEXT_PUBLIC_LEGAL_ENTITY ?? "Front Range Roof Quotes",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "hello@example.com",
  // Default vertical + market for the MVP. Both are data elsewhere; this only
  // decides what the home page points at.
  defaultVertical: "roofing",
  defaultMarket: "denver",
  formVersion: "roofing-v1",
};
