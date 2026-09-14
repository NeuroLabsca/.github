import type { FactorId } from "./types.ts";

/**
 * Weights. Must sum to 1. Change them here and nowhere else.
 *
 * reach     Is the forecast storm strong enough to reach this latitude at all?
 *           Nothing else matters if the answer is no, so it carries the most weight.
 * cloud     Cloud is the usual reason a good forecast turns into nothing.
 * darkness  How many hours of real dark you get. Short summer nights hurt.
 * moon      A bright moon washes out faint aurora. Real but minor.
 */
export const WEIGHTS: Record<FactorId, number> = {
  reach: 0.4,
  cloud: 0.3,
  darkness: 0.15,
  moon: 0.15,
};

/**
 * Hard ceilings. A weighted sum lets a Kp 8 storm under solid cloud score 60,
 * which is a lie. Caps stop that and are reported in the breakdown.
 */
export const CAPS = {
  /** Cloud cover at or above this percent caps the score. */
  cloudPct: 85,
  cloudCap: 20,
  /** Fewer dark hours than this caps the score. */
  darknessHours: 1,
  darknessCap: 10,
  /** Reach score at or below this (storm can't get here) caps the score. */
  reachScore: 0,
  reachCap: 10,
} as const;

/**
 * NOAA view line: approximate geomagnetic latitude of the equatorward edge of
 * the auroral oval at each Kp. Aurora is overhead at this latitude and visible
 * low on the northern horizon a few degrees further south.
 */
export const OVERHEAD_MAGLAT_BY_KP = [66.5, 64.5, 62.4, 60.4, 58.3, 56.3, 54.2, 52.2, 50.1, 48.1];

/** Degrees of magnetic latitude south of the oval edge where a horizon view is still likely. */
export const HORIZON_MARGIN_DEG = 4.5;

const weightSum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
if (Math.abs(weightSum - 1) > 1e-9) {
  throw new Error(`Factor weights must sum to 1, got ${weightSum}`);
}
