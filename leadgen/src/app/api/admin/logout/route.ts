import { NextResponse, type NextRequest } from "next/server";
import { sessionCookieName } from "@/lib/admin/auth";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url), 303);
  res.cookies.set(sessionCookieName(), "", { path: "/", maxAge: 0 });
  return res;
}
