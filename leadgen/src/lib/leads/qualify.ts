import { getVertical } from "@/config/verticals";

export type Qualification = { qualified: boolean; reason?: string; score: number };

/**
 * Deterministic qualification. A lead that fails here is stored as
 * `rejected` with the reason so the admin can see what demand we are
 * turning away, but it is never sent to a buyer.
 */
export function qualify(verticalSlug: string, input: {
  homeowner: boolean;
  timeline: string;
  answers: Record<string, string | number | boolean>;
}): Qualification {
  const v = getVertical(verticalSlug);
  if (!v) return { qualified: false, reason: "unknown_vertical", score: 0 };
  if (!input.homeowner) return { qualified: false, reason: "not_homeowner", score: 0 };
  if (!v.timelines.some((t) => t.value === input.timeline)) {
    return { qualified: false, reason: "invalid_timeline", score: 0 };
  }
  for (const q of v.questions) {
    const a = input.answers[q.key];
    if (q.disqualify && typeof a === "string" && q.disqualify.includes(a)) {
      return { qualified: false, reason: `disqualified_${q.key}_${a}`, score: 0 };
    }
  }
  let score = 0;
  for (const [key, table] of Object.entries(v.scoring)) {
    const a = key === "timeline" ? input.timeline : input.answers[key];
    if (typeof a === "string" && table[a]) score += table[a];
  }
  return { qualified: true, score: Math.min(100, score) };
}
