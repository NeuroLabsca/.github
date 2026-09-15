import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getVertical } from "@/config/verticals";

export const zipSchema = z.string().regex(/^\d{5}$/, "Enter a 5-digit ZIP code");

export const leadInputSchema = z.object({
  verticalSlug: z.string().min(1),
  zip: zipSchema,
  answers: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
  timeline: z.string().min(1),
  homeowner: z.boolean(),
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().trim().toLowerCase().email().max(120),
  phone: z.string().trim().min(7).max(20),
  address: z.string().trim().max(120).optional().or(z.literal("")),
  consent: z.literal(true),
  consentTextVersion: z.string().min(1),
  partnerListVersion: z.string().min(1),
  formVersion: z.string().min(1),
  pageUrl: z.string().url().max(2000),
  trustedFormCertUrl: z.string().url().optional().or(z.literal("")),
  jornayaLeadId: z.string().max(64).optional().or(z.literal("")),
  visitId: z.string().uuid().optional(),
  sessionSeconds: z.number().int().min(0).max(60 * 60 * 6).optional(),
  // Honeypot: must be empty. Bots fill every field.
  website: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export function normalizePhone(raw: string): string | null {
  const p = parsePhoneNumberFromString(raw, "US");
  if (!p || !p.isValid() || p.country !== "US") return null;
  return p.number; // E.164
}

/** Vertical-level validation: every question answered with a known option. */
export function validateAnswers(verticalSlug: string, answers: Record<string, unknown>) {
  const v = getVertical(verticalSlug);
  if (!v) return { ok: false as const, error: "Unknown vertical" };
  for (const q of v.questions) {
    const a = answers[q.key];
    if (typeof a !== "string" || !q.options.some((o) => o.value === a)) {
      return { ok: false as const, error: `Missing or invalid answer for ${q.key}` };
    }
  }
  if (!v.timelines.some((t) => t.value === answers.timeline) && !answers.timeline) {
    // timeline validated separately from top-level field
  }
  return { ok: true as const };
}
