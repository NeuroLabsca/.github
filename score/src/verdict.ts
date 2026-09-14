import type { CapApplied, FactorResult } from "./types.ts";

/** Score bands. Edges are inclusive at the bottom. */
export const BANDS: Array<{ min: number; label: string; lead: string }> = [
  { min: 80, label: "Go", lead: "Go out tonight." },
  { min: 60, label: "Good", lead: "Good odds tonight." },
  { min: 40, label: "Maybe", lead: "Worth a look if you are already up." },
  { min: 20, label: "Unlikely", lead: "Unlikely tonight." },
  { min: 0, label: "No", lead: "Not tonight." },
];

export function bandFor(score: number): (typeof BANDS)[number] {
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];
}

const DRAG: Record<FactorResult["id"], string> = {
  reach: "The storm is too weak for this latitude.",
  cloud: "Cloud is the problem.",
  darkness: "The sky does not get dark enough.",
  moon: "The moon will wash out anything faint.",
};

/**
 * One line: band lead, then the single biggest thing holding the score back.
 * Caps win over drags because a cap is the whole story.
 */
export function verdictFor(score: number, breakdown: FactorResult[], caps: CapApplied[]): string {
  const lead = bandFor(score).lead;
  if (caps.length) {
    const worst = caps.reduce((a, b) => (b.cap < a.cap ? b : a));
    return `${lead} ${DRAG[worst.id]}`;
  }
  if (score >= 80) return `${lead} Conditions line up.`;
  // Biggest lost points = (100 - score) * weight.
  const worst = breakdown.reduce((a, b) => ((100 - b.score) * b.weight > (100 - a.score) * a.weight ? b : a));
  if ((100 - worst.score) * worst.weight < 5) return `${lead} Nothing is seriously in the way.`;
  return `${lead} ${DRAG[worst.id]}`;
}
