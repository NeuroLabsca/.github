import { test } from "node:test";
import assert from "node:assert/strict";
import { decideAlert, type AlertState } from "../src/index.ts";

const fresh: AlertState = { lastScore: null, lastAlertedDate: null };

test("fires on first crossing", () => {
  const d = decideAlert(fresh, "2026-09-14", 72, 60);
  assert.equal(d.send, true);
  assert.equal(d.next.lastAlertedDate, "2026-09-14");
});

test("does not fire below threshold", () => {
  assert.equal(decideAlert(fresh, "2026-09-14", 59, 60).send, false);
});

test("does not re-fire for the same night on refresh", () => {
  let s = fresh;
  const a = decideAlert(s, "2026-09-14", 72, 60);
  s = a.next;
  const b = decideAlert(s, "2026-09-14", 80, 60);
  assert.equal(b.send, false);
  const c = decideAlert(b.next, "2026-09-14", 95, 60);
  assert.equal(c.send, false);
});

test("re-fires after dropping below and crossing again on a new night", () => {
  let s = decideAlert(fresh, "2026-09-14", 72, 60).next;
  s = decideAlert(s, "2026-09-15", 40, 60).next;
  const d = decideAlert(s, "2026-09-15", 65, 60);
  assert.equal(d.send, true);
});

test("fires for a new night even if it never dropped", () => {
  const s = decideAlert(fresh, "2026-09-14", 72, 60).next;
  // Next day's evaluation, still above. New night, new alert.
  const d = decideAlert({ ...s, lastScore: null }, "2026-09-15", 70, 60);
  assert.equal(d.send, true);
});

test("rejects bad threshold", () => {
  assert.throws(() => decideAlert(fresh, "2026-09-14", 50, 0));
  assert.throws(() => decideAlert(fresh, "2026-09-14", 50, 101));
});
