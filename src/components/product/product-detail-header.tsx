import Image from "next/image";

import { ProductLogActions } from "@/components/product/product-actions";
import { ProductListings } from "@/components/product/product-listings";
import { ConfidencePill } from "@/components/score/confidence-pill";
import { ScoreBadge } from "@/components/score/score-badge";
import type { Product } from "@/lib/types/product";
import { getPrimaryImage } from "@/lib/utils/product";

export function ProductDetailHeader({ product }: { product: Product }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="relative aspect-square overflow-hidden rounded-[8px] bg-stone-100 shadow-sm">
        <Image
          src={getPrimaryImage(product)}
          alt={product.canonicalName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
        />
      </div>
      <div className="space-y-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-stone-500">
            {product.brandName} · {product.category} · {product.productType}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
            {product.canonicalName}
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">{product.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ScoreBadge
            band={product.rating.band}
            numericScore={product.rating.numericScore}
            size="lg"
          />
          <ConfidencePill level={product.rating.confidence} />
        </div>
        <div className="rounded-[8px] border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            Why this rating
          </p>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">
            {product.rating.shortReason}
          </p>
        </div>
        <ProductLogActions product={product} />
        <div>
          <h2 className="mb-3 font-semibold text-stone-950">
            Platform availability
          </h2>
          <ProductListings listings={product.listings} />
        </div>
      </div>
    </section>
  );
}
