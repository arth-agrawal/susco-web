import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types/product";
import { getPrimaryImage } from "@/lib/utils/product";

export function HeroSection({ products }: { products: Product[] }) {
  return (
    <section
      id="explore"
      className="scroll-mt-20 border-b border-stone-200/80 bg-[#fbfaf5]"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-stone-500">Product discovery</p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
            Search scored products
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
            Start with a product you already planned to buy. Compare ratings,
            evidence, and better alternatives before click-out.
          </p>
          <div className="mt-7 max-w-2xl">
            <SearchBar size="hero" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950"
            >
              <Link href="/search?q=sunscreen%20under%20%E2%82%B9700">
                Try sunscreen under ₹700
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-[8px]">
              <Link href="/tracker">View tracker</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 self-center">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-[8px] border border-stone-200 bg-stone-100 shadow-sm"
            >
              <Image
                src={getPrimaryImage(product)}
                alt={product.canonicalName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 300px"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 to-transparent p-3 text-white">
                <p className="text-xs text-white/70">{product.brandName}</p>
                <p className="line-clamp-1 text-sm font-medium">
                  {product.canonicalName}
                </p>
                <p className="text-xs text-lime-200">{product.rating.band}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
