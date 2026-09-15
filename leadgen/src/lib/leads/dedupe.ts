import { createHash } from "node:crypto";

export const DEDUPE_WINDOW_DAYS = 30;

/** Stable hash of phone + email + vertical. Same person, same trade, same window = duplicate. */
export function dedupeHash(parts: { phone: string; email: string; verticalSlug: string }) {
  return createHash("sha256")
    .update(`${parts.verticalSlug}|${parts.phone}|${parts.email.trim().toLowerCase()}`)
    .digest("hex");
}

/** Secondary key: phone alone, so a changed email does not evade the window. */
export function phoneHash(phone: string) {
  return createHash("sha256").update(`phone|${phone}`).digest("hex");
}

export function hashIp(ip: string) {
  return createHash("sha256").update(`ip|${ip}`).digest("hex").slice(0, 32);
}
