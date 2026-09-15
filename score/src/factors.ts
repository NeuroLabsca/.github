import type { FactorId } from "./types.ts";

/**
 * The score is two questions multiplied:
 *
 *   score = reach × sky
 *
 * reach  Will a storm this strong be visible from this latitude at all? 0-1.
 *        This is a gate. A perfect sky with no aurora in it is still nothing.
 * sky    If there is aurora, how good is the sky for seeing it? 0-100, a
 *        weighted mix of the three things that get in the way.
 */
export const SKY_WEIGHTS: Record<Exclude<FactorId, "reach">, number> = {
  cloud: 0.6,
  darkness: 0.2,
  moon: 0.2,
};

/**
 * Hard ceilings on top of the multiplication, reported in the breakdown.
 * Overcast at 90% still leaves a sky score near 20 through the darkness and
 * moon terms; the cap keeps it honest.
 */
export const CAPS = {
  /** Cloud cover at or above this percent caps the score. */
  cloudPct: 85,
  cloudCap: 15,
  /** Fewer dark hours than this caps the score. */
  darknessHours: 1,
  darknessCap: 10,
} as const;

/**
 * NOAA view line: approximate geomagnetic latitude of the equatorward edge of
 * the auroral oval at each Kp. Aurora is overhead at this latitude and visible
 * low on the northern horizon a few degrees further south.
 */
export const OVERHEAD_MAGLAT_BY_KP = [66.5, 64.5, 62.4, 60.4, 58.3, 56.3, 54.2, 52.2, 50.1, 48.1];

/** Degrees of magnetic latitude south of the oval edge where a horizon view is still likely. */
export const HORIZON_MARGIN_DEG = 3.5;

/** Reach is 0 this far below the horizon Kp, and 0.5 at the horizon Kp. */
export const REACH_RAMP_KP = 0.5;

const weightSum = Object.values(SKY_WEIGHTS).reduce((a, b) => a + b, 0);
if (Math.abs(weightSum - 1) > 1e-9) {
  throw new Error(`Sky weights must sum to 1, got ${weightSum}`);
}
