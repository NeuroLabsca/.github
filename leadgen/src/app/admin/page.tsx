import Link from "next/link";
import { overview, byDimension, visitsByChannel } from "@/lib/admin/metrics";

export const dynamic = "force-dynamic";

const RANGES: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90 };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const { range = "30d" } = await searchParams;
  const days = RANGES[range] ?? 30;
  const r = { from: new Date(Date.now() - days * 86400_000), to: new Date() };
  const [o, byChannel, byBuyer, byMarket, bySource, visitChannels] = await Promise.all([
    overview(r), byDimension(r, "channel"), byDimension(r, "soldToBuyerSlug"), byDimension(r, "marketSlug"), byDimension(r, "utmSource"), visitsByChannel(r),
  ]);
  const money = (n: number) => `$${n.toFixed(2)}`;
  const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-1 rounded-xl border border-line bg-white p-1 text-sm">
          {Object.keys(RANGES).map((k) => <Link key={k} href={`/admin?range=${k}`} className={`rounded-lg px-3 py-1 ${k === range ? "bg-brand text-white" : "text-ink-muted hover:text-ink"}`}>{k}</Link>)}
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Revenue" value={money(o.revenue)} sub={`${money(o.leadRevenue)} leads · ${money(o.callRevenue)} calls`} />
        <Tile label="Visits" value={String(o.visits)} sub={Object.entries(visitChannels).map(([k, v]) => `${k} ${v}`).join(" · ") || "no visits yet"} />
        <Tile label="Leads" value={String(o.leads)} sub={`${o.sold} sold · ${o.unsold} unsold · ${o.rejected} rejected · ${o.duplicate} dup`} />
        <Tile label="Calls" value={String(o.calls)} sub={`${o.billableCalls} billable`} />
        <Tile label="Visit → lead" value={pct(o.conversionRate)} />
        <Tile label="Lead sell-through" value={pct(o.sellThrough)} />
        <Tile label="Revenue / visitor" value={money(o.revenuePerVisitor)} />
        <Tile label="Revenue / lead" value={money(o.revenuePerLead)} sub={`${money(o.revenuePerSoldLead)} per sold lead`} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Breakdown title="By traffic channel" rows={byChannel} />
        <Breakdown title="By buyer" rows={byBuyer} />
        <Breakdown title="By market" rows={byMarket} />
        <Breakdown title="By UTM source" rows={bySource} />
      </section>
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {sub && <div className="mt-1 truncate text-xs text-ink-muted" title={sub}>{sub}</div>}
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows: { key: string; leads: number; sold: number; revenue: number }[] }) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-line px-5 py-3 font-semibold">{title}</div>
      <table className="w-full text-sm">
        <thead className="bg-ground text-left text-xs uppercase text-ink-muted"><tr><th className="px-5 py-2">Key</th><th className="px-3 py-2 text-right">Leads</th><th className="px-3 py-2 text-right">Sold</th><th className="px-5 py-2 text-right">Revenue</th></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td className="px-5 py-4 text-ink-muted" colSpan={4}>No data in range.</td></tr>}
          {rows.map((r) => <tr key={r.key} className="border-t border-line"><td className="px-5 py-2">{r.key}</td><td className="px-3 py-2 text-right">{r.leads}</td><td className="px-3 py-2 text-right">{r.sold}</td><td className="px-5 py-2 text-right">${r.revenue.toFixed(2)}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
