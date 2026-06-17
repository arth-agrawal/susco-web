"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Plus, X } from "lucide-react";

import { CompareSummary } from "@/components/compare/compare-summary";
import { CompareTable } from "@/components/compare/compare-table";
import { RatingDisclaimer } from "@/components/score/rating-disclaimer";
import { Button } from "@/components/ui/button";
import { useCompareTray } from "@/hooks/use-compare-tray";
import {
  clearCompare,
  getCompareProducts,
  mergeCompareIds,
  removeFromCompare,
} from "@/lib/compare/compare-store";
import { getAllProducts } from "@/lib/services/product-service";
import type { Product } from "@/lib/types/product";
import {
  getBestConfidenceProduct,
  getBestEvidenceProduct,
  getLowestMissingDataProduct,
} from "@/lib/utils/product";

type ComparePageContentProps = {
  initialUrlIds: string[];
};

export function ComparePageContent({ initialUrlIds }: ComparePageContentProps) {
  const router = useRouter();
  const storedIds = useCompareTray();
  const compareIds = useMemo(
    () => mergeCompareIds(initialUrlIds, storedIds),
    [initialUrlIds, storedIds]
  );
  const allProducts = useMemo(() => getAllProducts(), []);

  useEffect(() => {
    const urlKey = initialUrlIds.join(",");
    const mergedKey = compareIds.join(",");
    if (mergedKey.length > 0 && mergedKey !== urlKey) {
      router.replace(`/compare?ids=${mergedKey}`, { scroll: false });
    }
  }, [compareIds, initialUrlIds, router]);

  const products = getCompareProducts(compareIds);

  function handleRemove(productId: string) {
    const next = removeFromCompare(productId);
    if (next.length === 0) {
      router.replace("/compare");
    } else {
      router.replace(`/compare?ids=${next.join(",")}`, { scroll: false });
    }
  }

  function handleClear() {
    clearCompare();
    router.replace("/compare");
  }

  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <RatingDisclaimer />
        <CompareEmptyState products={allProducts.slice(0, 6)} />
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <RatingDisclaimer />
      <CompareSummary
        bestEvidence={getBestEvidenceProduct(products)}
        bestConfidence={getBestConfidenceProduct(products)}
        lowestMissing={getLowestMissingDataProduct(products)}
      />
      <CompareProductPicker
        products={products}
        onRemove={handleRemove}
        onClear={handleClear}
      />
      <CompareTable products={products} />
    </div>
  );
}

function CompareProductPicker({
  products,
  onRemove,
  onClear,
}: {
  products: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-[8px] border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-stone-950">
            Comparing {products.length} product{products.length === 1 ? "" : "s"}
          </h2>
          <p className="text-sm text-stone-600">
            Add up to 4 products from search. Remove items to adjust your tray.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-[8px]">
            <Link href="/search">
              <Plus className="size-4" />
              Add products
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="rounded-[8px] text-stone-600"
            onClick={onClear}
          >
            Clear all
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {products.map((product) => (
          <span
            key={product.id}
            className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 py-1 pl-3 pr-1 text-sm text-stone-800"
          >
            {product.canonicalName}
            <button
              type="button"
              onClick={() => onRemove(product.id)}
              className="rounded-full p-1 text-stone-500 hover:bg-stone-200 hover:text-stone-900"
              aria-label={`Remove ${product.canonicalName} from compare`}
            >
              <X className="size-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function CompareEmptyState({ products }: { products: Product[] }) {
  return (
    <div className="rounded-[8px] border border-dashed border-stone-300 bg-white p-8 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-stone-950">
        No products selected yet
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
        Search for products and tap Compare on any card, or pick a starter
        product below.
      </p>
      <Button asChild className="mt-5 rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950">
        <Link href="/search">
          <Plus className="size-4" />
          Search products
        </Link>
      </Button>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {products.map((product) => (
          <Button
            key={product.id}
            asChild
            variant="outline"
            size="sm"
            className="rounded-[8px]"
          >
            <Link href={`/compare?ids=${product.id}`}>{product.canonicalName}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
