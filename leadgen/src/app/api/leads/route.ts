import { NextResponse, type NextRequest } from "next/server";
import { intakeLead } from "@/lib/leads/intake";
import { clientIp, userAgent } from "@/lib/request";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 }); }
  try {
    const result = await intakeLead(body, { ip: clientIp(req), userAgent: userAgent(req) });
    if (!result.ok) return NextResponse.json(result, { status: 422 });
    // Never leak price or buyer to the browser; the consumer only needs "matched" vs not.
    return NextResponse.json({ ok: true, leadId: result.leadId, matched: result.sold || result.status === "unsold" });
  } catch (e) {
    console.error("lead intake failed", e);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
