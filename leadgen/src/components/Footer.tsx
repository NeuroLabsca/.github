import Link from "next/link";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="container-x grid gap-8 py-12 text-sm text-ink-muted md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-bold text-ink">{site.name}</div>
          <p className="mt-2 max-w-md leading-6">
            We are a free service that connects Denver-area homeowners with licensed roofing contractors. We are not a
            contractor and do not perform roofing work. We may be compensated by the contractors and partners we match you with.
          </p>
        </div>
        <div>
          <div className="font-semibold text-ink">Guides</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/roofing/denver/roof-replacement-cost" className="hover:text-ink">Replacement cost</Link></li>
            <li><Link href="/roofing/denver/roof-repair-cost" className="hover:text-ink">Repair cost</Link></li>
            <li><Link href="/roofing/denver/class-4-impact-resistant-shingles" className="hover:text-ink">Class 4 shingles</Link></li>
            <li><Link href="/roofing/denver/roof-financing" className="hover:text-ink">Financing</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-ink">Legal</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/privacy" className="hover:text-ink">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-ink">Terms of use</Link></li>
            <li><Link href="/partners" className="hover:text-ink">Our partners</Link></li>
            <li><Link href="/do-not-sell" className="hover:text-ink">Do Not Sell or Share My Personal Information</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} {site.legalEntity}. All rights reserved.
      </div>
    </footer>
  );
}
