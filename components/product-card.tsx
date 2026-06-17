"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  GitCompare,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

import { ConfidencePill } from "@/components/confidence-pill";
import { ScoreBadge } from "@/components/score-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/types/product";
import {
  formatPrice,
  formatPriceRange,
  getLowestPrice,
  getPlatforms,
} from "@/lib/utils/product";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  variant?: "grid" | "list";
  className?: string;
};

export function ProductCard({
  product,
  variant = "grid",
  className,
}: ProductCardProps) {
  const [saved, setSaved] = useState(false);
  const lowestListing = product.listings.reduce((min, l) =>
    l.price < min.price ? l : min
  );

  if (variant === "list") {
    return (
      <Card
        className={cn(
          "overflow-hidden rounded-2xl border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-md",
          className
        )}
      >
        <div className="flex flex-col gap-4 p-4 sm:flex-row">
          <Link
            href={`/product/${product.id}`}
            className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:size-36"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="144px"
            />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  {product.brand} · {product.category}
                </p>
                <Link
                  href={`/product/${product.id}`}
                  className="mt-0.5 text-lg font-semibold text-stone-900 hover:text-susco-green"
                >
                  {product.name}
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                <ScoreBadge rating={product.rating} size="sm" />
                <ConfidencePill level={product.confidence} size="sm" />
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-stone-600">
              {product.shortReason}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500">
              <span className="font-medium text-stone-800">
                {formatPriceRange(product)}
              </span>
              <span>{getPlatforms(product)}</span>
            </div>
            <ProductCardActions
              product={product}
              saved={saved}
              onSave={() => setSaved(!saved)}
              buyUrl={lowestListing.url}
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-2xl border-stone-200/80 bg-white p-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-stone-100"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <ScoreBadge rating={product.rating} size="sm" />
        </div>
      </Link>
      <CardContent className="flex flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            {product.brand}
          </p>
          <Link
            href={`/product/${product.id}`}
            className="mt-0.5 line-clamp-1 text-base font-semibold text-stone-900 hover:text-susco-green"
          >
            {product.name}
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-stone-800">
            {formatPrice(getLowestPrice(product))}
          </span>
          <ConfidencePill level={product.confidence} size="sm" />
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-stone-500">
          {product.shortReason}
        </p>
        <ProductCardActions
          product={product}
          saved={saved}
          onSave={() => setSaved(!saved)}
          buyUrl={lowestListing.url}
          compact
        />
      </CardContent>
    </Card>
  );
}

function ProductCardActions({
  product,
  saved,
  onSave,
  buyUrl,
  compact = false,
}: {
  product: Product;
  saved: boolean;
  onSave: () => void;
  buyUrl: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        compact ? "pt-1" : "pt-2"
      )}
    >
      <Button
        asChild
        size="sm"
        variant="outline"
        className="rounded-lg border-stone-200"
      >
        <Link href={`/product/${product.id}`}>View Score</Link>
      </Button>
      <Button
        asChild
        size="sm"
        variant="outline"
        className="rounded-lg border-stone-200"
      >
        <Link href={`/compare?ids=${product.id}`}>
          <GitCompare className="size-3.5" />
          Compare
        </Link>
      </Button>
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "rounded-lg border-stone-200",
          saved && "border-susco-green/30 bg-susco-mint/20 text-susco-green"
        )}
        onClick={onSave}
      >
        <Bookmark className={cn("size-3.5", saved && "fill-current")} />
        {saved ? "Saved" : "Save"}
      </Button>
      <Button
        asChild
        size="sm"
        className="rounded-lg bg-susco-green text-white hover:bg-susco-green/90"
      >
        <a href={buyUrl} target="_blank" rel="noopener noreferrer">
          <ShoppingBag className="size-3.5" />
          Buy
          <ArrowUpRight className="size-3" />
        </a>
      </Button>
    </div>
  );
}
