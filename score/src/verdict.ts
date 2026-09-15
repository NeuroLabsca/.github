import type { CapApplied, FactorResult } from "./types.ts";

/** Score bands. Edges are inclusive at the bottom. */
export const BANDS: Array<{ min: number; label: string; lead: (when: string) => string }> = [
  { min: 80, label: "Go", lead: (w) => `Go out ${w}.` },
  { min: 60, label: "Good", lead: (w) => `Good odds ${w}.` },
  { min: 40, label: "Maybe", lead: () => "Worth a look if you are already up." },
  { min: 20, label: "Unlikely", lead: (w) => `Unlikely ${w}.` },
  { min: 0, label: "No", lead: (w) => `Not ${w}.` },
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
 * Caps win because a cap is the whole story. Then the gate: if the storm is
 * not reaching you, nothing about the sky matters. Then the sky factor that
 * lost the most points.
 */
export function verdictFor(score: number, breakdown: FactorResult[], caps: CapApplied[], when = "tonight"): string {
  const lead = bandFor(score).lead(when);
  if (caps.length) {
    const worst = caps.reduce((a, b) => (b.cap < a.cap ? b : a));
    return `${lead} ${DRAG[worst.id]}`;
  }
  if (score >= 80) return `${lead} Conditions line up.`;
  const gate = breakdown.find((r) => r.role === "gate");
  if (gate && gate.score < 50) return `${lead} ${DRAG[gate.id]}`;
  const sky = breakdown.filter((r) => r.role === "sky");
  const worst = sky.reduce((a, b) => ((100 - b.score) * b.weight > (100 - a.score) * a.weight ? b : a));
  const skyLoss = (100 - worst.score) * worst.weight;
  if (gate && gate.score < 75 && skyLoss < 10) return `${lead} A modest storm: look for a glow low on the northern horizon.`;
  if (skyLoss < 5) return `${lead} Nothing is seriously in the way.`;
  return `${lead} ${DRAG[worst.id]}`;
}
