/**
 * Alert decision. Fires on the upward crossing of the user's threshold, not on
 * every refresh. A storm night with hourly forecast updates must not send hourly
 * emails.
 */
export interface AlertState {
  /** Score from the last evaluation, or null if never evaluated. */
  lastScore: number | null;
  /** Date (YYYY-MM-DD) of the night the last alert was sent for, or null. */
  lastAlertedDate: string | null;
}

export interface AlertDecision {
  send: boolean;
  reason: string;
  next: AlertState;
}

export function decideAlert(state: AlertState, date: string, score: number, threshold: number): AlertDecision {
  if (!(threshold >= 1 && threshold <= 100)) throw new Error(`threshold out of range: ${threshold}`);
  const next: AlertState = { ...state, lastScore: score };
  if (score < threshold) return { send: false, reason: `Score ${score} is below threshold ${threshold}.`, next };
  if (state.lastAlertedDate === date) return { send: false, reason: `Already alerted for ${date}.`, next };
  if (state.lastScore !== null && state.lastScore >= threshold && state.lastAlertedDate !== null) {
    return { send: false, reason: "Still above threshold, no new crossing.", next };
  }
  return { send: true, reason: `Score ${score} crossed threshold ${threshold}.`, next: { ...next, lastAlertedDate: date } };
}
