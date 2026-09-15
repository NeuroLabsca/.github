import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { recordEvent } from "@/lib/tracking";

export const runtime = "nodejs";

const schema = z.object({
  visitId: z.string().uuid().optional(),
  name: z.string().min(1).max(60),
  path: z.string().max(500).optional(),
  props: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  await recordEvent(parsed.data);
  return NextResponse.json({ ok: true });
}
