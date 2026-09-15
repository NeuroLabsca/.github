import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin login", robots: { index: false } };

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const { error, next } = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form method="POST" action="/api/admin/login" className="card w-full max-w-sm space-y-4 p-8">
        <h1 className="text-xl font-bold">Admin</h1>
        {error && <p className="rounded-xl bg-bad/10 p-3 text-sm text-bad">Wrong password, or ADMIN_PASSWORD is not set.</p>}
        <input type="hidden" name="next" value={next ?? "/admin"} />
        <input className="input" type="password" name="password" placeholder="Password" autoFocus required />
        <button className="btn-primary w-full">Sign in</button>
      </form>
    </main>
  );
}
