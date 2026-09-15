"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Question, Option } from "@/config/verticals";
import { getVisitId, track } from "./Tracker";

type Props = {
  vertical: { slug: string; name: string; ctaLabel: string; questions: Question[]; timelines: Option[] };
  initialZip: string;
  consent: { text: string; version: string; partnerListVersion: string };
  formVersion: string;
};

type Step = { kind: "zip" } | { kind: "q"; q: Question } | { kind: "timeline" } | { kind: "owner" } | { kind: "contact" };

export function Funnel({ vertical, initialZip, consent, formVersion }: Props) {
  const steps = useMemo<Step[]>(() => [
    { kind: "zip" },
    ...vertical.questions.map((q) => ({ kind: "q" as const, q })),
    { kind: "timeline" },
    { kind: "owner" },
    { kind: "contact" },
  ], [vertical.questions]);

  const [i, setI] = useState(initialZip ? 1 : 0);
  const [zip, setZip] = useState(initialZip);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeline, setTimeline] = useState("");
  const [homeowner, setHomeowner] = useState<boolean | null>(null);
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "" });
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<null | { matched: boolean }>(null);
  const [blocked, setBlocked] = useState<string | null>(null);
  const startedAt = useRef(Date.now());

  const step = steps[i];
  const progress = Math.round(((i + 1) / steps.length) * 100);

  useEffect(() => { track("funnel_step", { step: i, kind: step.kind }); }, [i, step.kind]);

  function next() { setError(null); setI((n) => Math.min(n + 1, steps.length - 1)); }
  function back() { setError(null); setBlocked(null); setI((n) => Math.max(n - 1, 0)); }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agree) { setError("Please check the consent box to continue."); return; }
    setBusy(true); setError(null);
    const form = e.currentTarget;
    const tf = (form.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement | null)?.value || "";
    const honeypot = (form.querySelector('input[name="website"]') as HTMLInputElement | null)?.value || "";
    const payload = {
      verticalSlug: vertical.slug, zip, answers, timeline, homeowner: homeowner === true,
      ...contact, consent: true as const,
      consentTextVersion: consent.version, partnerListVersion: consent.partnerListVersion, formVersion,
      pageUrl: window.location.href, trustedFormCertUrl: tf, visitId: getVisitId(),
      sessionSeconds: Math.round((Date.now() - startedAt.current) / 1000), website: honeypot,
    };
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const j = (await res.json()) as { ok: boolean; error?: string; matched?: boolean };
      if (!j.ok) { setError(j.error ?? "Please check your details and try again."); setBusy(false); return; }
      track("funnel_submit", { matched: j.matched });
      setDone({ matched: !!j.matched });
    } catch {
      setError("Network error. Please try again."); setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="card mx-auto max-w-xl p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ok/10 text-ok"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
        <h1 className="mt-4 text-2xl font-bold">You&apos;re all set, {contact.firstName}.</h1>
        <p className="mt-2 text-ink-muted leading-7">
          {done.matched
            ? "We are matching your project with roofing contractors serving your ZIP code. Expect a call or text shortly to schedule a free inspection. Compare at least two quotes before you sign."
            : "Thanks. We are still building contractor coverage in your area and will reach out as soon as a match is available."}
        </p>
        <Link href="/roofing/denver/how-to-choose-a-roofer" className="btn-secondary mt-6">Read: how to vet a Denver roofer</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium text-ink-muted"><span>Step {i + 1} of {steps.length}</span><span>{progress}%</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-line"><div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} /></div>
      </div>

      <div className="card p-6 sm:p-8">
        {step.kind === "zip" && (
          <StepShell title="Where is the property?" subtitle="We use your ZIP code to find contractors who actually serve your area.">
            <form onSubmit={(e) => { e.preventDefault(); if (!/^\d{5}$/.test(zip)) { setError("Enter a 5-digit ZIP code"); return; } next(); }} className="space-y-4">
              <input className="input text-lg" inputMode="numeric" maxLength={5} autoFocus placeholder="ZIP code" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))} />
              <Err error={error} />
              <button className="btn-primary w-full">Continue</button>
            </form>
          </StepShell>
        )}

        {step.kind === "q" && (
          <StepShell title={step.q.title} subtitle={step.q.subtitle}>
            <div className="grid gap-3">
              {step.q.options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition hover:border-brand ${answers[step.q.key] === o.value ? "border-brand bg-brand-soft" : "border-line"}`}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, [step.q.key]: o.value }));
                    if (step.q.disqualify?.includes(o.value)) { setBlocked(step.q.disqualifyMessage ?? "We can't help with this project type."); return; }
                    setBlocked(null); setTimeout(next, 120);
                  }}
                >
                  <span className={`mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${answers[step.q.key] === o.value ? "border-brand bg-brand" : "border-line"}`} />
                  <span><span className="font-semibold">{o.label}</span>{o.hint && <span className="block text-sm text-ink-muted">{o.hint}</span>}</span>
                </button>
              ))}
            </div>
            {blocked && <p className="mt-4 rounded-xl bg-warn/10 p-3 text-sm text-warn">{blocked}</p>}
          </StepShell>
        )}

        {step.kind === "timeline" && (
          <StepShell title="When do you want the work done?">
            <div className="grid gap-3">
              {vertical.timelines.map((o) => (
                <button key={o.value} type="button" className={`rounded-xl border p-4 text-left font-semibold transition hover:border-brand ${timeline === o.value ? "border-brand bg-brand-soft" : "border-line"}`} onClick={() => { setTimeline(o.value); setTimeout(next, 120); }}>{o.label}</button>
              ))}
            </div>
          </StepShell>
        )}

        {step.kind === "owner" && (
          <StepShell title="Do you own this home?" subtitle="Contractors can only quote work for the owner or an authorized decision-maker.">
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" className={`rounded-xl border p-4 font-semibold hover:border-brand ${homeowner === true ? "border-brand bg-brand-soft" : "border-line"}`} onClick={() => { setHomeowner(true); setBlocked(null); setTimeout(next, 120); }}>Yes, I own it</button>
              <button type="button" className={`rounded-xl border p-4 font-semibold hover:border-brand ${homeowner === false ? "border-brand bg-brand-soft" : "border-line"}`} onClick={() => { setHomeowner(false); setBlocked("Contractors in our network only quote for homeowners. If you rent, ask your landlord to request quotes."); }}>No, I rent</button>
            </div>
            {blocked && <p className="mt-4 rounded-xl bg-warn/10 p-3 text-sm text-warn">{blocked}</p>}
          </StepShell>
        )}

        {step.kind === "contact" && (
          <StepShell title="Where should contractors send your quotes?" subtitle="Up to 4 licensed contractors will contact you. No obligation.">
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="input" placeholder="First name" autoComplete="given-name" required value={contact.firstName} onChange={(e) => setContact({ ...contact, firstName: e.target.value })} />
                <input className="input" placeholder="Last name" autoComplete="family-name" required value={contact.lastName} onChange={(e) => setContact({ ...contact, lastName: e.target.value })} />
              </div>
              <input className="input" placeholder="Street address (optional)" autoComplete="street-address" value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
              <input className="input" type="email" placeholder="Email" autoComplete="email" required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
              <input className="input" type="tel" placeholder="Mobile phone" autoComplete="tel" inputMode="tel" required value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
              {/* Honeypot: hidden from humans, filled by bots */}
              <div className="absolute -left-[9999px] top-0" aria-hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <label className="flex items-start gap-3 rounded-xl border border-line bg-ground p-3 text-xs leading-5 text-ink-muted">
                <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span>
                  {consent.text.replace('"Get My Quote"', `"${vertical.ctaLabel}"`)} See our <Link className="underline" href="/partners" target="_blank">partner list</Link>, <Link className="underline" href="/terms" target="_blank">Terms of Use</Link> and <Link className="underline" href="/privacy" target="_blank">Privacy Policy</Link>.
                </span>
              </label>
              <Err error={error} />
              <button className="btn-primary w-full text-lg" disabled={busy}>{busy ? "Matching you with contractors…" : vertical.ctaLabel}</button>
              <p className="text-center text-xs text-ink-muted">Free service. Compare quotes, then decide.</p>
            </form>
          </StepShell>
        )}
      </div>

      {i > 0 && !done && <button type="button" onClick={back} className="btn-ghost mt-4 text-sm">← Back</button>}
    </div>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 text-ink-muted">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Err({ error }: { error: string | null }) {
  return error ? <p role="alert" className="rounded-xl bg-bad/10 p-3 text-sm text-bad">{error}</p> : null;
}
