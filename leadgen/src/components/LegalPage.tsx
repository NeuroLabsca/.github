import { Header } from "./Header";
import { Footer } from "./Footer";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container-x flex-1 py-10">
        <article className="prose-content mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-ink-muted">Last updated {updated}</p>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
