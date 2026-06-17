"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark, CheckCircle2, GitCompare, ShoppingBag, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types/product";
import { cn } from "@/lib/utils";

export function ProductActions({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const buyUrl = product.listings[0]?.url ?? "/search";

  return (
    <div className={cn("flex flex-wrap gap-2", compact && "gap-1.5")}>
      <Button asChild size="sm" variant="outline" className="rounded-[8px]">
        <Link href={`/product/${product.slug}`}>View Score</Link>
      </Button>
      <Button asChild size="sm" variant="outline" className="rounded-[8px]">
        <Link href={`/compare?ids=${product.id}`}>
          <GitCompare className="size-3.5" />
          Compare
        </Link>
      </Button>
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "rounded-[8px]",
          saved && "border-emerald-800/20 bg-emerald-50 text-emerald-900"
        )}
        onClick={() => setSaved((value) => !value)}
      >
        <Bookmark className={cn("size-3.5", saved && "fill-current")} />
        {saved ? "Saved" : "Save"}
      </Button>
      <Button asChild size="sm" className="rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950">
        <a href={buyUrl} target="_blank" rel="noreferrer">
          <ShoppingBag className="size-3.5" />
          Buy
        </a>
      </Button>
    </div>
  );
}

export function ProductLogActions({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button className="rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950">
        <Bookmark className="size-4" />
        Save
      </Button>
      <Button variant="outline" className="rounded-[8px]">
        <CheckCircle2 className="size-4" />
        Bought
      </Button>
      <Button variant="outline" className="rounded-[8px]">
        <XCircle className="size-4" />
        Avoided
      </Button>
      <Button asChild variant="outline" className="rounded-[8px]">
        <Link href={`/compare?ids=${product.id}`}>
          <GitCompare className="size-4" />
          Compare
        </Link>
      </Button>
    </div>
  );
}
