import Link from "next/link";
import { recentLeads } from "@/lib/admin/metrics";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";
const STATUSES = ["all", "sold", "unsold", "rejected", "duplicate", "new", "routing", "returned"];

export default async function Leads({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status = "all" } = await searchParams;
  const rows = await recentLeads(100, status === "all" ? undefined : status);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="flex flex-wrap gap-1 rounded-xl border border-line bg-white p-1 text-sm">
          {STATUSES.map((s) => <Link key={s} href={`/admin/leads?status=${s}`} className={`rounded-lg px-3 py-1 ${s === status ? "bg-brand text-white" : "text-ink-muted hover:text-ink"}`}>{s}</Link>)}
        </div>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ground text-left text-xs uppercase text-ink-muted">
            <tr><th className="px-4 py-2">When</th><th className="px-4 py-2">Name</th><th className="px-4 py-2">ZIP / market</th><th className="px-4 py-2">Project</th><th className="px-4 py-2">Score</th><th className="px-4 py-2">Channel</th><th className="px-4 py-2">Status</th><th className="px-4 py-2">Buyer</th><th className="px-4 py-2 text-right">Revenue</th></tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={9} className="px-4 py-6 text-ink-muted">No leads yet.</td></tr>}
            {rows.map((l) => (
              <tr key={l.id} className="border-t border-line hover:bg-ground">
                <td className="whitespace-nowrap px-4 py-2 text-ink-muted">{l.createdAt.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</td>
                <td className="px-4 py-2"><Link href={`/admin/leads/${l.id}`} className="font-medium text-brand hover:underline">{l.firstName} {l.lastName}</Link></td>
                <td className="px-4 py-2">{l.zip} <span className="text-ink-muted">{l.marketSlug ?? "out of market"}</span></td>
                <td className="px-4 py-2">{String(l.answers.projectType ?? "")} · {l.timeline}</td>
                <td className="px-4 py-2">{l.qualityScore}</td>
                <td className="px-4 py-2">{l.channel}{l.utmSource ? ` / ${l.utmSource}` : ""}</td>
                <td className="px-4 py-2"><StatusBadge status={l.status} /> {l.fraudFlags.length > 0 && <span className="ml-1 text-xs text-warn" title={l.fraudFlags.join(", ")}>⚠ {l.fraudFlags.length}</span>}</td>
                <td className="px-4 py-2">{l.soldToBuyerSlug ?? "–"}</td>
                <td className="px-4 py-2 text-right">${Number(l.revenue).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
