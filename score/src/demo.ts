import { scoreNights } from "./index.ts";

const loc = { lat: 46.24, lon: -63.13, name: "Charlottetown, PE" };
const nights = scoreNights(loc, [
  { date: "2026-09-14", kp: 2.67, cloudCoverPct: 14 },
  { date: "2026-09-15", kp: 4, cloudCoverPct: 10 },
  { date: "2026-09-16", kp: 2, cloudCoverPct: 90 },
]);

for (const n of nights) {
  console.log(`\n${n.date}  ${n.score}/100  ${n.verdict}`);
  for (const r of n.breakdown) {
    const math = r.role === "gate" ? `x${(r.score / 100).toFixed(2)} gate ` : `${String(r.score).padStart(3)} x ${r.weight.toFixed(2)} = ${String(r.points).padStart(5)}`;
    console.log(`  ${r.label.padEnd(12)} ${math.padEnd(20)} ${r.input}. ${r.note}`);
  }
  console.log(`  sky ${n.sky} x reach ${n.reach} = ${n.raw}${n.caps.length ? `, capped at ${Math.min(...n.caps.map((c) => c.cap))}: ${n.caps.map((c) => c.reason).join(" ")}` : ""}`);
}
