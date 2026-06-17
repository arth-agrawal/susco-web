import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryShowcase } from "@/components/marketing/category-showcase";
import { HeroSection } from "@/components/marketing/hero-section";
import { TrustSection } from "@/components/marketing/trust-section";
import { VerticalsSection } from "@/components/marketing/verticals-section";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/services/product-service";

export default function HomePage() {
  const featured = getAllProducts().slice(0, 6);

  return (
    <>
      <HeroSection products={featured} />
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
        <CategoryShowcase />
        <section className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
                Featured scored products
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                Mock data today; connector-ready commerce and evidence planes
                tomorrow.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-[8px]">
              <Link href="/search">
                View all
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={featured} />
        </section>
        <VerticalsSection />
        <TrustSection />
        <section className="rounded-[8px] border border-emerald-900/15 bg-emerald-900 p-6 text-white shadow-sm">
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold">
                Start with a product you already planned to buy.
              </h2>
              <p className="mt-2 text-sm text-emerald-50/80">
                Compare sustainability rating, confidence, evidence, missing
                data, and better alternatives before click-out.
              </p>
            </div>
            <Button asChild className="rounded-[8px] bg-white text-emerald-950 hover:bg-lime-50">
              <Link href="/search">
                Search products
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
