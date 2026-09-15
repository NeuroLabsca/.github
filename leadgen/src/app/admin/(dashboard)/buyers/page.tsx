import { listBuyers } from "@/lib/admin/metrics";

export const dynamic = "force-dynamic";

export default async function Buyers() {
  const rows = await listBuyers();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Buyers</h1>
      <p className="text-sm text-ink-muted">Buyers are registered by <code>npm run db:seed</code> and toggled via the database or env (MODERNIZE_ENABLED). The dev log buyer is disabled automatically in production.</p>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ground text-left text-xs uppercase text-ink-muted"><tr><th className="px-4 py-2">Name</th><th className="px-4 py-2">Kind</th><th className="px-4 py-2">Adapter</th><th className="px-4 py-2">Verticals</th><th className="px-4 py-2">Active</th></tr></thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-t border-line"><td className="px-4 py-2 font-medium">{b.name}<div className="text-xs text-ink-muted">{b.slug}</div></td><td className="px-4 py-2">{b.kind}</td><td className="px-4 py-2">{b.adapter}</td><td className="px-4 py-2">{b.verticalSlugs.join(", ")}</td><td className="px-4 py-2">{b.active ? <span className="text-ok">yes</span> : <span className="text-ink-muted">no</span>}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
