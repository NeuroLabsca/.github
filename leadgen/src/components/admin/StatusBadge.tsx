const COLORS: Record<string, string> = {
  sold: "bg-ok/10 text-ok", unsold: "bg-warn/10 text-warn", rejected: "bg-bad/10 text-bad", duplicate: "bg-line text-ink-muted",
  new: "bg-brand-soft text-brand", routing: "bg-brand-soft text-brand", returned: "bg-bad/10 text-bad",
};
export function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${COLORS[status] ?? "bg-line"}`}>{status}</span>;
}
