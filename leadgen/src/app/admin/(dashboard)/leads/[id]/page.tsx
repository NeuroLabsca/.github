import Link from "next/link";
import { notFound } from "next/navigation";
import { leadDetail } from "@/lib/admin/metrics";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await leadDetail(id).catch(() => null);
  if (!d) notFound();
  const { lead, attempts, sales, visit } = d;
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/leads" className="text-sm text-ink-muted hover:text-ink">← Leads</Link>
        <h1 className="mt-1 flex items-center gap-3 text-2xl font-bold">{lead.firstName} {lead.lastName} <StatusBadge status={lead.status} /></h1>
        {lead.statusReason && <p className="text-sm text-ink-muted">Reason: {lead.statusReason}</p>}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Contact">
          <KV k="Phone" v={lead.phone} /><KV k="Email" v={lead.email} /><KV k="Address" v={[lead.address, lead.city, lead.state, lead.zip].filter(Boolean).join(", ")} />
          <KV k="Market" v={lead.marketSlug ?? "out of market"} /><KV k="Homeowner" v={lead.homeowner ? "yes" : "no"} /><KV k="Timeline" v={lead.timeline} />
        </Panel>
        <Panel title="Project">
          {Object.entries(lead.answers).map(([k, v]) => <KV key={k} k={k} v={String(v)} />)}
          <KV k="Quality score" v={String(lead.qualityScore)} />
          <KV k="Fraud flags" v={lead.fraudFlags.join(", ") || "none"} />
        </Panel>
        <Panel title="Attribution">
          <KV k="Channel" v={lead.channel} /><KV k="UTM" v={[lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ") || "–"} />
          <KV k="Landing" v={visit?.landingUrl ?? "–"} /><KV k="Referrer" v={visit?.referrer ?? "–"} /><KV k="Device" v={visit?.device ?? "–"} />
        </Panel>
        <Panel title="Consent evidence">
          <KV k="Consented at" v={lead.consentedAt.toISOString()} /><KV k="Consent text version" v={lead.consentTextVersion} /><KV k="Partner list version" v={lead.partnerListVersion} />
          <KV k="Form version" v={lead.formVersion} /><KV k="Page" v={lead.pageUrl} /><KV k="IP (hashed)" v={lead.ip} /><KV k="User agent" v={lead.userAgent} />
          <KV k="TrustedForm" v={lead.trustedFormCertUrl ?? "none"} /><KV k="Jornaya" v={lead.jornayaLeadId ?? "none"} /><KV k="Session seconds" v={String(lead.sessionSeconds ?? "–")} />
        </Panel>
        <Panel title="Sale">
          {sales.length === 0 && <p className="text-sm text-ink-muted">Not sold.</p>}
          {sales.map((s) => (<div key={s.id}><KV k="Buyer" v={s.buyerSlug} /><KV k="Price" v={`$${s.price}`} /><KV k="Status" v={s.status} /><KV k="External id" v={s.externalId ?? "–"} /></div>))}
        </Panel>
        <Panel title="Buyer attempts" wide>
          {attempts.length === 0 && <p className="text-sm text-ink-muted">No buyer contacted.</p>}
          {attempts.map((a) => (
            <details key={a.id} className="border-t border-line py-2 text-sm first:border-t-0">
              <summary className="cursor-pointer"><span className="font-medium">{a.buyerSlug}</span> · {a.stage} · <span className={a.outcome === "accepted" ? "text-ok" : a.outcome === "error" ? "text-bad" : "text-warn"}>{a.outcome}</span> {a.price ? `· $${a.price}` : ""} {a.reason ? `· ${a.reason}` : ""} · {a.latencyMs}ms</summary>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-ground p-3 text-xs">{JSON.stringify({ request: a.request, response: a.response }, null, 2)}</pre>
            </details>
          ))}
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, children, wide }: { title: string; children: React.ReactNode; wide?: boolean }) {
  return (<section className={`card p-5 ${wide ? "lg:col-span-3" : ""}`}><h2 className="mb-3 font-semibold">{title}</h2>{children}</section>);
}
function KV({ k, v }: { k: string; v: string }) {
  return (<div className="grid grid-cols-[130px_1fr] gap-2 py-1 text-sm"><span className="text-ink-muted">{k}</span><span className="break-all">{v}</span></div>);
}
