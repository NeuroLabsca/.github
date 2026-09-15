import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookieName, verifySession } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const ok = (() => { try { return verifySession(jar.get(sessionCookieName())?.value); } catch { return false; } })();
  if (!ok) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-ground">
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-14 items-center justify-between">
          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link href="/admin" className="font-bold">Leadgen admin</Link>
            <Link href="/admin" className="text-ink-muted hover:text-ink">Dashboard</Link>
            <Link href="/admin/leads" className="text-ink-muted hover:text-ink">Leads</Link>
            <Link href="/admin/buyers" className="text-ink-muted hover:text-ink">Buyers</Link>
            <Link href="/" className="text-ink-muted hover:text-ink" target="_blank">View site ↗</Link>
          </nav>
          <form method="POST" action="/api/admin/logout"><button className="btn-ghost !px-3 !py-1 text-sm">Sign out</button></form>
        </div>
      </header>
      <main className="container-x py-8">{children}</main>
    </div>
  );
}
