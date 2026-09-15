"use client";
import { useEffect } from "react";

const KEY = "lg_visit";

/** Creates one visit per browser session and records page views. Reads only first-party data. */
export function Tracker({ vertical, market }: { vertical?: string; market?: string }) {
  useEffect(() => {
    const path = window.location.pathname;
    const existing = (() => { try { return sessionStorage.getItem(KEY); } catch { return null; } })();
    const send = (visitId: string) =>
      fetch("/api/track/event", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitId, name: "page_view", path }), keepalive: true }).catch(() => {});
    if (existing) { send(existing); return; }
    const u = new URL(window.location.href);
    fetch("/api/track/visit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        landingUrl: u.href,
        referrer: document.referrer || null,
        utm: { source: u.searchParams.get("utm_source"), medium: u.searchParams.get("utm_medium"), campaign: u.searchParams.get("utm_campaign"), term: u.searchParams.get("utm_term"), content: u.searchParams.get("utm_content") },
        gclid: u.searchParams.get("gclid"),
        vertical: vertical ?? null,
        market: market ?? null,
      }),
    })
      .then((r) => r.json())
      .then((j: { visitId?: string }) => { if (j.visitId) { try { sessionStorage.setItem(KEY, j.visitId); } catch {} send(j.visitId); } })
      .catch(() => {});
  }, [vertical, market]);
  return null;
}

export function getVisitId(): string | undefined {
  try { return sessionStorage.getItem(KEY) ?? undefined; } catch { return undefined; }
}

export function track(name: string, props?: Record<string, unknown>) {
  const visitId = getVisitId();
  fetch("/api/track/event", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitId, name, path: window.location.pathname, props }), keepalive: true }).catch(() => {});
}
