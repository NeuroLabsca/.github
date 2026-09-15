// Cheap, deterministic spam/fraud signals. Each flag is advisory except
// `hard` ones, which reject the lead before it costs us a buyer's trust.

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com","guerrillamail.com","10minutemail.com","tempmail.com","temp-mail.org","yopmail.com","trashmail.com",
  "getnada.com","dispostable.com","fakeinbox.com","sharklasers.com","throwawaymail.com","maildrop.cc","mintemail.com",
]);

const TEST_NAMES = new Set(["test","testing","asdf","qwerty","john doe","jane doe","aaa","abc","xxx"]);

export type FraudResult = { flags: string[]; hard: boolean };

export function fraudCheck(input: {
  email: string;
  phone: string; // E.164
  firstName: string;
  lastName: string;
  sessionSeconds?: number;
  honeypot?: string;
  userAgent: string;
  ipRecentLeads: number; // leads from this IP in the last hour
  rateLimit: number;
}): FraudResult {
  const flags: string[] = [];
  let hard = false;

  if (input.honeypot && input.honeypot.length > 0) { flags.push("honeypot"); hard = true; }

  const domain = input.email.split("@")[1] ?? "";
  if (DISPOSABLE_DOMAINS.has(domain)) { flags.push("disposable_email"); hard = true; }

  const name = `${input.firstName} ${input.lastName}`.trim().toLowerCase();
  if (TEST_NAMES.has(name) || TEST_NAMES.has(input.firstName.toLowerCase())) flags.push("test_name");
  if (input.firstName.toLowerCase() === input.lastName.toLowerCase()) flags.push("same_first_last");
  if (/(\d)\1{5,}/.test(input.phone)) { flags.push("repeated_digits_phone"); hard = true; }
  // 555-01XX is reserved for fiction; treat any NXX=555 as fake for lead purposes.
  if (/^\+1\d{3}555\d{4}$/.test(input.phone)) { flags.push("fake_phone_555"); hard = true; }

  if (input.sessionSeconds !== undefined && input.sessionSeconds < 8) flags.push("too_fast");
  if (!input.userAgent || /curl|python-requests|bot|spider|headless/i.test(input.userAgent)) flags.push("suspicious_ua");
  if (input.ipRecentLeads >= input.rateLimit) { flags.push("ip_rate_limit"); hard = true; }

  return { flags, hard };
}
