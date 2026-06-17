import Image from "next/image";
import Link from "next/link";

import { ProductActions } from "@/components/product/product-actions";
import { ConfidencePill } from "@/components/score/confidence-pill";
import { ScoreBadge } from "@/components/score/score-badge";
import type { Product } from "@/lib/types/product";
import {
  formatPriceRange,
  getPlatformLabel,
  getPrimaryImage,
} from "@/lib/utils/product";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  variant?: "grid" | "list";
  priority?: boolean;
  className?: string;
};

export function ProductCard({
  product,
  variant = "grid",
  priority = false,
  className,
}: ProductCardProps) {
  if (variant === "list") {
    return (
      <article
        className={cn(
          "grid gap-4 rounded-[8px] border border-stone-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[168px_1fr]",
          className
        )}
      >
        <Link
          href={`/product/${product.slug}`}
          className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-stone-100 sm:aspect-square"
        >
          <Image
            src={getPrimaryImage(product)}
            alt={product.canonicalName}
            fill
            className="object-cover"
            sizes="168px"
            priority={priority}
          />
        </Link>
        <div className="flex min-w-0 flex-col gap-3 py-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                {product.brandName} · {product.productType}
              </p>
              <Link
                href={`/product/${product.slug}`}
                className="mt-1 block text-lg font-semibold text-stone-950 hover:text-emerald-900"
              >
                {product.canonicalName}
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              <ScoreBadge
                band={product.rating.band}
                numericScore={product.rating.numericScore}
                size="sm"
              />
              <ConfidencePill level={product.rating.confidence} size="sm" />
            </div>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-stone-600">
            {product.rating.shortReason}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span className="font-medium text-stone-950">
              {formatPriceRange(product)}
            </span>
            <span className="text-stone-500">{getPlatformLabel(product)}</span>
          </div>
          <ProductActions product={product} compact />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[8px] border border-stone-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-stone-100"
      >
        <Image
          src={getPrimaryImage(product)}
          alt={product.canonicalName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
        />
        <div className="absolute left-3 top-3">
          <ScoreBadge band={product.rating.band} size="sm" />
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            {product.brandName}
          </p>
          <Link
            href={`/product/${product.slug}`}
            className="mt-1 line-clamp-1 block font-semibold text-stone-950 hover:text-emerald-900"
          >
            {product.canonicalName}
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-stone-900">
            {formatPriceRange(product)}
          </span>
          <ConfidencePill
            level={product.rating.confidence}
            size="sm"
            showLabel={false}
          />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-stone-600">
          {product.rating.shortReason}
        </p>
        <ProductActions product={product} compact />
      </div>
    </article>
  );
}
