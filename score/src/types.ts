/** A place on Earth. Comes from geolocation or manual entry; the scorer does not care which. */
export interface Location {
  lat: number;
  lon: number;
  /** Display label, e.g. "Charlottetown, PE". Optional. */
  name?: string;
}

/** Forecast inputs for one night. Everything the scorer needs, nothing it fetches itself. */
export interface NightForecast {
  /** Local calendar date the night starts on, ISO "YYYY-MM-DD". */
  date: string;
  /** Peak planetary Kp forecast for the night, 0-9. */
  kp: number;
  /** Mean cloud cover during the dark hours, 0-100 percent. */
  cloudCoverPct: number;
  /** How the verdict names this night: "tonight" (default), "tomorrow night", "Wednesday night". */
  when?: string;
}

export type FactorId = "reach" | "cloud" | "darkness" | "moon";

/** One row of the breakdown. Enough to recompute the total by hand. */
export interface FactorResult {
  id: FactorId;
  label: string;
  /** The raw input as a human would read it, e.g. "Kp 5 (need Kp 4 on the horizon here)". */
  input: string;
  /** "gate" multiplies the sky score; "sky" factors are weighted and summed. */
  role: "gate" | "sky";
  /** Factor score, 0-100. For the gate, this is the multiplier × 100. */
  score: number;
  /** Weight within the sky score, 0-1. Sky weights sum to 1. The gate has weight 0. */
  weight: number;
  /** score * weight for sky factors, rounded to one decimal. These sum to `sky`. The gate has 0. */
  points: number;
  /** Plain-English note on why this factor scored what it did. */
  note: string;
}

/** A hard ceiling that overrode the weighted sum. Listed so the user can see it. */
export interface CapApplied {
  id: FactorId;
  cap: number;
  reason: string;
}

export interface NightScore {
  date: string;
  /** Final score, integer 0-100. */
  score: number;
  /** One line, plain English. */
  verdict: string;
  breakdown: FactorResult[];
  /** Weighted sky score, 0-100, one decimal. */
  sky: number;
  /** Storm reach multiplier, 0-1, two decimals. */
  reach: number;
  /** sky × reach before caps, one decimal. Equals `score` when no cap applied. */
  raw: number;
  caps: CapApplied[];
}
