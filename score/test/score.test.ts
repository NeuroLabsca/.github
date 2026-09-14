import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreNight, scoreNights, WEIGHTS, CAPS } from "../src/index.ts";
import { kpForOverhead } from "../src/score.ts";
import { darkHours, magneticLatitude, moonIllumination } from "../src/astro.ts";

const PEI = { lat: 46.24, lon: -63.13 };
const TROMSO = { lat: 69.65, lon: 18.96 };
const MIAMI = { lat: 25.76, lon: -80.19 };

test("weights sum to 1", () => {
  const sum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 1) < 1e-9);
});

test("breakdown points sum to the weighted sum", () => {
  const n = scoreNight(PEI, { date: "2026-09-14", kp: 5, cloudCoverPct: 40 });
  const sum = n.breakdown.reduce((s, r) => s + r.points, 0);
  assert.ok(Math.abs(sum - n.weightedSum) < 0.2, `${sum} vs ${n.weightedSum}`);
  assert.equal(n.breakdown.length, 4);
  for (const r of n.breakdown) {
    assert.ok(r.score >= 0 && r.score <= 100);
    assert.ok(r.note.length > 0 && r.input.length > 0);
  }
});

test("score is an integer in 0-100", () => {
  for (const kp of [0, 3, 6, 9]) for (const cloud of [0, 50, 100]) {
    const n = scoreNight(PEI, { date: "2026-01-10", kp, cloudCoverPct: cloud });
    assert.ok(Number.isInteger(n.score) && n.score >= 0 && n.score <= 100);
  }
});

test("strong storm, clear, dark, no moon scores high in PEI", () => {
  const n = scoreNight(PEI, { date: "2026-09-11", kp: 7, cloudCoverPct: 5 });
  assert.ok(n.score >= 85, `${n.score}`);
  assert.equal(n.caps.length, 0);
  assert.match(n.verdict, /^Go out tonight\./);
});

test("overcast caps the score and says so", () => {
  const n = scoreNight(PEI, { date: "2026-09-11", kp: 8, cloudCoverPct: 95 });
  assert.equal(n.score, CAPS.cloudCap);
  assert.ok(n.weightedSum > n.score, "cap must have overridden the sum");
  assert.ok(n.caps.some((c) => c.id === "cloud"));
  assert.match(n.verdict, /Cloud is the problem/);
});

test("weak storm cannot reach PEI, capped", () => {
  const n = scoreNight(PEI, { date: "2026-09-11", kp: 1, cloudCoverPct: 0 });
  assert.equal(n.score, CAPS.reachCap);
  assert.match(n.verdict, /too weak/);
});

test("weak storm still fine in Tromso", () => {
  const n = scoreNight(TROMSO, { date: "2026-12-01", kp: 1, cloudCoverPct: 0 });
  const reach = n.breakdown.find((r) => r.id === "reach")!;
  assert.equal(reach.score, 100);
  assert.ok(n.score >= 80, `${n.score}`);
});

test("Miami needs an extreme storm", () => {
  const low = scoreNight(MIAMI, { date: "2026-12-01", kp: 5, cloudCoverPct: 0 });
  assert.equal(low.breakdown.find((r) => r.id === "reach")!.score, 0);
  const high = scoreNight(MIAMI, { date: "2026-12-01", kp: 9, cloudCoverPct: 0 });
  assert.ok(high.breakdown.find((r) => r.id === "reach")!.score > 0);
});

test("midsummer at 69N has no darkness and is capped", () => {
  const n = scoreNight(TROMSO, { date: "2026-06-21", kp: 6, cloudCoverPct: 0 });
  assert.equal(n.score, CAPS.darknessCap);
  assert.match(n.verdict, /dark enough/);
});

test("more cloud never raises the score", () => {
  let prev = 101;
  for (let c = 0; c <= 100; c += 5) {
    const s = scoreNight(PEI, { date: "2026-10-01", kp: 5, cloudCoverPct: c }).score;
    assert.ok(s <= prev, `cloud ${c}: ${s} > ${prev}`);
    prev = s;
  }
});

test("higher Kp never lowers the score", () => {
  let prev = -1;
  for (let kp = 0; kp <= 9; kp += 0.5) {
    const s = scoreNight(PEI, { date: "2026-10-01", kp, cloudCoverPct: 20 }).score;
    assert.ok(s >= prev, `kp ${kp}: ${s} < ${prev}`);
    prev = s;
  }
});

test("scoreNights returns one result per night in order", () => {
  const out = scoreNights(PEI, [
    { date: "2026-09-14", kp: 5, cloudCoverPct: 10 },
    { date: "2026-09-15", kp: 3, cloudCoverPct: 10 },
    { date: "2026-09-16", kp: 1, cloudCoverPct: 10 },
  ]);
  assert.deepEqual(out.map((n) => n.date), ["2026-09-14", "2026-09-15", "2026-09-16"]);
  assert.ok(out[0].score > out[1].score && out[1].score > out[2].score);
});

test("verdict names the night it is about", () => {
  const n = scoreNight(PEI, { date: "2026-09-11", kp: 7, cloudCoverPct: 5, when: "tomorrow night" });
  assert.match(n.verdict, /^Go out tomorrow night\./);
});

test("rejects bad input", () => {
  assert.throws(() => scoreNight(PEI, { date: "2026-09-14", kp: 10, cloudCoverPct: 0 }));
  assert.throws(() => scoreNight(PEI, { date: "2026-09-14", kp: 3, cloudCoverPct: 120 }));
  assert.throws(() => scoreNight({ lat: 95, lon: 0 }, { date: "2026-09-14", kp: 3, cloudCoverPct: 0 }));
  assert.throws(() => scoreNight(PEI, { date: "not-a-date", kp: 3, cloudCoverPct: 0 }));
});

test("astro helpers are in the right ballpark", () => {
  const m = magneticLatitude(PEI.lat, PEI.lon);
  assert.ok(m > 53 && m < 58, `PEI magnetic lat ${m}`);
  assert.ok(kpForOverhead(66.5) === 0 && kpForOverhead(48.1) === 9);
  assert.ok(kpForOverhead(55.4) > 5 && kpForOverhead(55.4) < 6);
  const winter = darkHours(PEI.lat, "2026-12-21");
  const summer = darkHours(PEI.lat, "2026-06-21");
  assert.ok(winter > 12 && winter < 14, `winter ${winter}`);
  assert.ok(summer > 4 && summer < 6, `summer ${summer}`);
  assert.equal(darkHours(TROMSO.lat, "2026-06-21"), 0);
  // Full moon 2026-01-03, new moon 2026-01-18 (USNO).
  assert.ok(moonIllumination("2026-01-03") > 0.95);
  assert.ok(moonIllumination("2026-01-18") < 0.05);
});
