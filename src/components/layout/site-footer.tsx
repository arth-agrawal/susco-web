import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200/80 bg-stone-950 text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">SusCo</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-400">
            Search. Score. Compare. Choose. Track. AI summarizes evidence,
            not invents it.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Product</p>
          <div className="mt-3 grid gap-2 text-sm text-stone-400">
            <Link href="/search" className="hover:text-white">Search</Link>
            <Link href="/compare" className="hover:text-white">Compare</Link>
            <Link href="/tracker" className="hover:text-white">Tracker</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Principles</p>
          <div className="mt-3 grid gap-2 text-sm text-stone-400">
            <span>Evidence-backed</span>
            <span>Confidence shown</span>
            <span>Brands cannot buy better ratings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
