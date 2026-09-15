import { darkHours, magneticLatitude, moonIllumination } from "./astro.ts";
import { CAPS, HORIZON_MARGIN_DEG, OVERHEAD_MAGLAT_BY_KP, REACH_RAMP_KP, SKY_WEIGHTS } from "./factors.ts";
import type { CapApplied, FactorResult, Location, NightForecast, NightScore } from "./types.ts";
import { verdictFor } from "./verdict.ts";

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const round1 = (x: number) => Math.round(x * 10) / 10;
const round2 = (x: number) => Math.round(x * 100) / 100;

/** Kp at which the oval edge sits over a given magnetic latitude. Linear between table rows. */
export function kpForOverhead(magLat: number): number {
  const t = OVERHEAD_MAGLAT_BY_KP;
  if (magLat >= t[0]) return 0;
  if (magLat <= t[t.length - 1]) return 9;
  for (let kp = 0; kp < t.length - 1; kp++) {
    if (magLat <= t[kp] && magLat > t[kp + 1]) {
      return kp + (t[kp] - magLat) / (t[kp] - t[kp + 1]);
    }
  }
  return 9;
}

/**
 * Storm reach: the gate. 0 when the forecast Kp is REACH_RAMP_KP or more below
 * what a horizon view here needs, 50 at the horizon Kp, 100 at the overhead Kp.
 */
export function reachFactor(loc: Location, kp: number): FactorResult {
  const magLat = magneticLatitude(loc.lat, loc.lon);
  const absMag = Math.abs(magLat);
  const overheadKp = kpForOverhead(absMag);
  const horizonKp = kpForOverhead(absMag + HORIZON_MARGIN_DEG);
  let score: number;
  if (kp <= horizonKp - REACH_RAMP_KP) score = 0;
  else if (kp < horizonKp) score = (50 * (kp - (horizonKp - REACH_RAMP_KP))) / REACH_RAMP_KP;
  else if (kp < overheadKp) score = 50 + (50 * (kp - horizonKp)) / Math.max(overheadKp - horizonKp, 0.01);
  else score = 100;
  score = clamp(Math.round(score), 0, 100);

  const fmt = (x: number) => x.toFixed(1);
  const note =
    score === 0
      ? `Kp ${kp} is too weak to reach magnetic latitude ${fmt(absMag)}. A horizon glow here needs about Kp ${fmt(horizonKp)}.`
      : score < 50
        ? `Kp ${kp} is just under the Kp ${fmt(horizonKp)} a horizon view needs here. Marginal at best.`
        : score < 100
          ? `Kp ${kp} clears the Kp ${fmt(horizonKp)} horizon threshold. Overhead needs about Kp ${fmt(overheadKp)}.`
          : `Kp ${kp} puts the oval overhead at magnetic latitude ${fmt(absMag)}.`;
  return {
    id: "reach",
    label: "Storm reach",
    input: `Kp ${kp}, magnetic latitude ${fmt(absMag)}`,
    role: "gate",
    score,
    weight: 0,
    points: 0,
    note,
  };
}

export function cloudFactor(cloudCoverPct: number): FactorResult {
  const pct = clamp(Math.round(cloudCoverPct), 0, 100);
  const score = 100 - pct;
  const note =
    pct <= 20
      ? "Mostly clear."
      : pct <= 50
        ? "Partly cloudy. Gaps are likely."
        : pct < CAPS.cloudPct
          ? "Mostly cloudy. You would need a lucky break."
          : "Overcast. Nothing gets through.";
  return {
    id: "cloud",
    label: "Cloud cover",
    input: `${pct}% cover during dark hours`,
    role: "sky",
    score,
    weight: SKY_WEIGHTS.cloud,
    points: round1(score * SKY_WEIGHTS.cloud),
    note,
  };
}

export function darknessFactor(loc: Location, date: string): FactorResult {
  const hours = darkHours(loc.lat, date);
  // 0 hours -> 0, 6 or more hours -> 100.
  const score = clamp(Math.round((hours / 6) * 100), 0, 100);
  const h = hours.toFixed(1);
  const note =
    hours < CAPS.darknessHours
      ? `Only ${h} h of real dark. Twilight all night.`
      : hours < 4
        ? `${h} h of dark. A short window.`
        : `${h} h of dark. Plenty of window.`;
  return {
    id: "darkness",
    label: "Dark hours",
    input: `${h} h with sun below -12°`,
    role: "sky",
    score,
    weight: SKY_WEIGHTS.darkness,
    points: round1(score * SKY_WEIGHTS.darkness),
    note,
  };
}

export function moonFactor(date: string): FactorResult {
  const illum = moonIllumination(date);
  const pct = Math.round(illum * 100);
  const score = 100 - pct;
  const note =
    pct <= 25
      ? "Dark sky. Moon is not a problem."
      : pct <= 60
        ? "Half moon. Faint aurora will be muted."
        : "Bright moon. Only a strong display will show.";
  return {
    id: "moon",
    label: "Moon",
    input: `${pct}% illuminated`,
    role: "sky",
    score,
    weight: SKY_WEIGHTS.moon,
    points: round1(score * SKY_WEIGHTS.moon),
    note,
  };
}

/** Score one night. Pure: same inputs, same output. */
export function scoreNight(loc: Location, f: NightForecast): NightScore {
  if (!(f.kp >= 0 && f.kp <= 9)) throw new Error(`kp out of range: ${f.kp}`);
  if (!(f.cloudCoverPct >= 0 && f.cloudCoverPct <= 100)) throw new Error(`cloudCoverPct out of range: ${f.cloudCoverPct}`);
  if (!(loc.lat >= -90 && loc.lat <= 90) || !(loc.lon >= -180 && loc.lon <= 180)) throw new Error("lat/lon out of range");

  const breakdown: FactorResult[] = [
    reachFactor(loc, f.kp),
    cloudFactor(f.cloudCoverPct),
    darknessFactor(loc, f.date),
    moonFactor(f.date),
  ];
  const skyFactors = breakdown.filter((r) => r.role === "sky");
  const sky = round1(skyFactors.reduce((s, r) => s + r.score * r.weight, 0));
  const reachResult = breakdown.find((r) => r.id === "reach")!;
  const reach = round2(reachResult.score / 100);
  const raw = round1(sky * reach);

  const caps: CapApplied[] = [];
  const cloud = breakdown.find((r) => r.id === "cloud")!;
  if (100 - cloud.score >= CAPS.cloudPct) caps.push({ id: "cloud", cap: CAPS.cloudCap, reason: `Cloud cover ${100 - cloud.score}% is at or above ${CAPS.cloudPct}%.` });
  if (darkHours(loc.lat, f.date) < CAPS.darknessHours) caps.push({ id: "darkness", cap: CAPS.darknessCap, reason: `Under ${CAPS.darknessHours} h of real darkness.` });

  const capValue = caps.length ? Math.min(...caps.map((c) => c.cap)) : Infinity;
  const score = clamp(Math.round(Math.min(raw, capValue)), 0, 100);

  return { date: f.date, score, verdict: verdictFor(score, breakdown, caps, f.when), breakdown, sky, reach, raw, caps };
}

/** Tonight plus the next nights, in the order given. v1 passes exactly three. */
export function scoreNights(loc: Location, forecasts: NightForecast[]): NightScore[] {
  return forecasts.map((f) => scoreNight(loc, f));
}
