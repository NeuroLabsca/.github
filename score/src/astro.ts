/**
 * Small, dependency-free astronomy helpers. Accuracy is "good enough for a
 * forecast score", not for navigation. Each function says what it approximates.
 */

const DEG = Math.PI / 180;
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** Days since J2000.0 (2000-01-01 12:00 UTC) for a calendar date at 00:00 UTC. */
export function daysSinceJ2000(isoDate: string): number {
  const ms = Date.parse(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(ms)) throw new Error(`Bad date: ${isoDate}`);
  return (ms - Date.UTC(2000, 0, 1, 12)) / 86_400_000;
}

/**
 * Geomagnetic (dipole) latitude in degrees.
 * Centred dipole with the north geomagnetic pole at 80.7N 72.7W (IGRF-13, ~2020).
 * Error vs. corrected geomagnetic latitude is a few degrees, which is within the
 * spread of the Kp view-line tables anyway.
 */
export function magneticLatitude(lat: number, lon: number): number {
  const poleLat = 80.7 * DEG;
  const poleLon = -72.7 * DEG;
  const s =
    Math.sin(lat * DEG) * Math.sin(poleLat) +
    Math.cos(lat * DEG) * Math.cos(poleLat) * Math.cos(lon * DEG - poleLon);
  return Math.asin(clamp(s, -1, 1)) / DEG;
}

/** Solar declination in degrees for a date. Low-precision formula, error < 0.5 deg. */
export function solarDeclination(isoDate: string): number {
  const d = daysSinceJ2000(isoDate);
  const g = (357.529 + 0.98560028 * d) * DEG; // mean anomaly
  const q = 280.459 + 0.98564736 * d; // mean longitude
  const L = (q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * DEG; // ecliptic lon
  const e = (23.439 - 0.00000036 * d) * DEG; // obliquity
  return Math.asin(Math.sin(e) * Math.sin(L)) / DEG;
}

/**
 * Hours in the night during which the sun is below `altitudeDeg` (negative).
 * Default -12 is nautical dusk, dark enough for a visible aurora.
 * Returns 0 in polar-day conditions and 24 in polar night.
 */
export function darkHours(lat: number, isoDate: string, altitudeDeg = -12): number {
  const dec = solarDeclination(isoDate) * DEG;
  const phi = lat * DEG;
  const cosH =
    (Math.sin(altitudeDeg * DEG) - Math.sin(phi) * Math.sin(dec)) /
    (Math.cos(phi) * Math.cos(dec));
  if (cosH <= -1) return 0; // sun never gets that low
  if (cosH >= 1) return 24; // sun never gets that high
  const H = Math.acos(cosH) / DEG; // half-day arc above altitude, degrees
  return 24 - (2 * H) / 15;
}

/**
 * Fraction of the moon's disc illuminated, 0-1, at 00:00 UTC on the date.
 * Mean synodic month from a known new moon (2000-01-06 18:14 UTC). Error under
 * ~a day of phase, fine for a weighting factor.
 */
export function moonIllumination(isoDate: string): number {
  const synodic = 29.530588853;
  const newMoonJ2000 = 5.7597; // days after J2000.0
  const age = (((daysSinceJ2000(isoDate) - newMoonJ2000) % synodic) + synodic) % synodic;
  return (1 - Math.cos((2 * Math.PI * age) / synodic)) / 2;
}
