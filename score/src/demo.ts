import { scoreNights } from "./index.ts";

const loc = { lat: 46.24, lon: -63.13, name: "Charlottetown, PE" };
const nights = scoreNights(loc, [
  { date: "2026-09-14", kp: 6, cloudCoverPct: 30 },
  { date: "2026-09-15", kp: 4, cloudCoverPct: 10 },
  { date: "2026-09-16", kp: 2, cloudCoverPct: 90 },
]);

for (const n of nights) {
  console.log(`\n${n.date}  ${n.score}/100  ${n.verdict}`);
  for (const r of n.breakdown) {
    console.log(`  ${r.label.padEnd(12)} ${String(r.score).padStart(3)} x ${r.weight.toFixed(2)} = ${String(r.points).padStart(5)}   ${r.input}. ${r.note}`);
  }
  console.log(`  weighted sum ${n.weightedSum}${n.caps.length ? `, capped at ${Math.min(...n.caps.map((c) => c.cap))}: ${n.caps.map((c) => c.reason).join(" ")}` : ""}`);
}
