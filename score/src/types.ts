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
  /** Factor score, 0-100. */
  score: number;
  /** Weight, 0-1. All weights sum to 1. */
  weight: number;
  /** score * weight, rounded to one decimal. These sum to the pre-cap total. */
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
  /** Weighted sum before caps, one decimal. Equals `score` when no cap applied. */
  weightedSum: number;
  caps: CapApplied[];
}
