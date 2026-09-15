import { and, desc, eq, gte, sql } from "drizzle-orm";
import { getDb, schema } from "@/db/client";

export type Range = { from: Date; to: Date };

export async function overview(range: Range) {
  const db = await getDb();

  const [visits] = await db.select({ n: sql<number>`count(*)::int` }).from(schema.visits)
    .where(and(gte(schema.visits.createdAt, range.from), sql`${schema.visits.createdAt} <= ${range.to}`));
  const leadRows = await db
    .select({ status: schema.leads.status, n: sql<number>`count(*)::int`, revenue: sql<string>`coalesce(sum(${schema.leads.revenue}),0)` })
    .from(schema.leads)
    .where(and(gte(schema.leads.createdAt, range.from), sql`${schema.leads.createdAt} <= ${range.to}`))
    .groupBy(schema.leads.status);
  const [callAgg] = await db
    .select({ n: sql<number>`count(*)::int`, billable: sql<number>`count(*) filter (where ${schema.calls.billable})::int`, payout: sql<string>`coalesce(sum(${schema.calls.payout}),0)` })
    .from(schema.calls)
    .where(and(gte(schema.calls.startedAt, range.from), sql`${schema.calls.startedAt} <= ${range.to}`));

  const byStatus = Object.fromEntries(leadRows.map((r) => [r.status, r.n])) as Record<string, number>;
  const totalLeads = leadRows.reduce((a, r) => a + r.n, 0);
  const leadRevenue = leadRows.reduce((a, r) => a + Number(r.revenue), 0);
  const callRevenue = Number(callAgg?.payout ?? 0);
  const revenue = leadRevenue + callRevenue;
  const sold = byStatus.sold ?? 0;
  const v = visits?.n ?? 0;

  return {
    visits: v,
    leads: totalLeads,
    sold,
    unsold: byStatus.unsold ?? 0,
    rejected: byStatus.rejected ?? 0,
    duplicate: byStatus.duplicate ?? 0,
    calls: callAgg?.n ?? 0,
    billableCalls: callAgg?.billable ?? 0,
    revenue,
    leadRevenue,
    callRevenue,
    conversionRate: v ? totalLeads / v : 0,
    sellThrough: totalLeads ? sold / totalLeads : 0,
    revenuePerVisitor: v ? revenue / v : 0,
    revenuePerLead: totalLeads ? revenue / totalLeads : 0,
    revenuePerSoldLead: sold ? leadRevenue / sold : 0,
  };
}

export async function byDimension(range: Range, dim: "channel" | "verticalSlug" | "marketSlug" | "soldToBuyerSlug" | "utmSource") {
  const db = await getDb();
  const col = schema.leads[dim];
  const rows = await db
    .select({ key: col, leads: sql<number>`count(*)::int`, sold: sql<number>`count(*) filter (where ${schema.leads.status} = 'sold')::int`, revenue: sql<string>`coalesce(sum(${schema.leads.revenue}),0)` })
    .from(schema.leads)
    .where(and(gte(schema.leads.createdAt, range.from), sql`${schema.leads.createdAt} <= ${range.to}`))
    .groupBy(col)
    .orderBy(desc(sql`sum(${schema.leads.revenue})`));
  return rows.map((r) => ({ key: r.key ?? "(none)", leads: r.leads, sold: r.sold, revenue: Number(r.revenue) }));
}

export async function visitsByChannel(range: Range) {
  const db = await getDb();
  const rows = await db
    .select({ channel: schema.visits.channel, n: sql<number>`count(*)::int` })
    .from(schema.visits)
    .where(and(gte(schema.visits.createdAt, range.from), sql`${schema.visits.createdAt} <= ${range.to}`))
    .groupBy(schema.visits.channel);
  return Object.fromEntries(rows.map((r) => [r.channel, r.n])) as Record<string, number>;
}

export async function recentLeads(limit = 50, status?: string) {
  const db = await getDb();
  const where = status ? eq(schema.leads.status, status as schema.LeadStatus) : undefined;
  return db.select().from(schema.leads).where(where).orderBy(desc(schema.leads.createdAt)).limit(limit);
}

export async function leadDetail(id: string) {
  const db = await getDb();
  const [lead] = await db.select().from(schema.leads).where(eq(schema.leads.id, id)).limit(1);
  if (!lead) return null;
  const attempts = await db.select().from(schema.buyerAttempts).where(eq(schema.buyerAttempts.leadId, id)).orderBy(schema.buyerAttempts.createdAt);
  const saleRows = await db.select().from(schema.sales).where(eq(schema.sales.leadId, id));
  const visit = lead.visitId ? (await db.select().from(schema.visits).where(eq(schema.visits.id, lead.visitId)).limit(1))[0] : null;
  return { lead, attempts, sales: saleRows, visit };
}

export async function listBuyers() {
  const db = await getDb();
  return db.select().from(schema.buyers).orderBy(schema.buyers.name);
}
