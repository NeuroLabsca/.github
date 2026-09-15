import Link from "next/link";
import { site } from "@/config/site";

export function Header({ ctaHref = "/quote/roofing" }: { ctaHref?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>
          </span>
          <span>{site.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-muted md:flex">
          <Link href="/roofing/denver/roof-replacement-cost" className="hover:text-ink">Costs</Link>
          <Link href="/roofing/denver/hail-damage-insurance-claims" className="hover:text-ink">Hail &amp; insurance</Link>
          <Link href="/roofing/denver/how-to-choose-a-roofer" className="hover:text-ink">Choosing a roofer</Link>
          <Link href="/how-it-works" className="hover:text-ink">How it works</Link>
        </nav>
        <Link href={ctaHref} className="btn-primary !px-4 !py-2 text-sm">Get quotes</Link>
      </div>
    </header>
  );
}
