import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TrustSection } from "@/components/marketing/trust-section";
import { VerticalsSection } from "@/components/marketing/verticals-section";
import { Button } from "@/components/ui/button";

export function AboutContent() {
  return (
    <div className="space-y-14">
      <header className="max-w-3xl space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">
          About SusCo
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
          The sustainability layer before checkout.
        </h1>
        <p className="text-base leading-relaxed text-stone-600 sm:text-lg">
          SusCo is a consumer-facing shopping intelligence platform. We help you
          search products across stores, compare sustainability ratings, inspect
          evidence and missing data, and click out to buy where you already
          shop — without becoming a marketplace.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
          Two verticals
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-stone-600">
          SusCo is built around two connected experiences: scored product search
          for decision-making, and a personal tracker for building a shareable
          conscious-shopping profile over time.
        </p>
        <VerticalsSection />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400">
            Vertical 1
          </p>
          <h2 className="mt-2 text-xl font-semibold text-stone-950">
            Product search + sustainability rating
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Search across beauty, fashion, and food. Open a product to see its
            sustainability band, confidence level, evidence trail, and gaps in
            the data. Compare up to four products side by side, then click out
            to the original store or app to purchase.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-stone-500">
            Search → Score → Compare → Click-out
          </p>
          <Button asChild variant="outline" className="mt-5 rounded-[8px]">
            <Link href="/search">
              Try search
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </article>

        <article className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400">
            Vertical 2
          </p>
          <h2 className="mt-2 text-xl font-semibold text-stone-950">
            Personal tracker + show-off profile
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Save products you are considering, log what you bought or avoided,
            and build stats and badges from your choices. Your tracker lives on
            this device today; public profile sharing unlocks with accounts
            later.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-stone-500">
            Save → Track → Profile → Share
          </p>
          <Button asChild variant="outline" className="mt-5 rounded-[8px]">
            <Link href="/tracker">
              Open tracker
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </article>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
          Why evidence, confidence, and missing data matter
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-stone-600">
          Sustainability is rarely binary. A product might have strong ingredient
          evidence but weak packaging proof. SusCo separates the rating from
          what we know, how sure we are, and what is still missing — instead of
          hiding uncertainty behind green marketing copy.
        </p>
        <TrustSection />
      </section>

      <section className="rounded-[8px] border border-stone-900 bg-stone-950 p-6 text-white shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold">What we do not do</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-stone-300">
          <li className="flex gap-3">
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-stone-500" />
            We do not sell products or take a cut of checkout.
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-stone-500" />
            We do not offer sponsored ranking or brand-paid score boosts.
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-stone-500" />
            We do not pretend missing data is a full picture.
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-stone-500" />
            AI summarizes evidence — it does not invent sustainability claims.
          </li>
        </ul>
        <Button
          asChild
          className="mt-6 rounded-[8px] bg-white text-stone-950 hover:bg-stone-100"
        >
          <Link href="/search">
            Start searching
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
