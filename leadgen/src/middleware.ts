import { NextResponse, type NextRequest } from "next/server";

// Gate /admin behind the signed session cookie. Verification happens in the
// route handlers/pages too (this is a convenience redirect, not the only check).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("lg_admin")?.value;
    if (!token) return NextResponse.redirect(new URL(`/admin/login?next=${encodeURIComponent(pathname)}`, req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
