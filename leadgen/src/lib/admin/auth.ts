import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "lg_admin";

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("ADMIN_SESSION_SECRET must be set (16+ chars)");
  return s;
}

export function sessionCookieName() { return COOKIE; }

/** Stateless signed session: `exp.sig`. Enough for a single-operator MVP. */
export function issueSession(ttlHours = 12) {
  const exp = Date.now() + ttlHours * 3600_000;
  const sig = createHmac("sha256", secret()).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}

export function verifySession(token: string | undefined | null) {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  if (Number(expStr) < Date.now()) return false;
  const expected = createHmac("sha256", secret()).update(expStr).digest("hex");
  const a = Buffer.from(sig, "hex"), b = Buffer.from(expected, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkPassword(candidate: string) {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  if (!pw || pw === "change-me") return false;
  const a = Buffer.from(candidate), b = Buffer.from(pw);
  return a.length === b.length && timingSafeEqual(a, b);
}
