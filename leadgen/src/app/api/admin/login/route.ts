import { NextResponse, type NextRequest } from "next/server";
import { checkPassword, issueSession, sessionCookieName } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const pw = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/admin");
  if (!checkPassword(pw)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
  }
  const res = NextResponse.redirect(new URL(next.startsWith("/admin") ? next : "/admin", req.url), 303);
  res.cookies.set(sessionCookieName(), issueSession(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 12 * 3600 });
  return res;
}
