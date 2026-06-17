"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { SearchBar } from "@/components/search-bar";
import { mockProducts } from "@/lib/data/mock-products";
import { CATEGORY_CHIPS, filterProducts } from "@/lib/utils/product";
import { cn } from "@/lib/utils";

const RATING_FILTERS = [
  "All",
  "Excellent",
  "Strong",
  "Moderate",
  "Weak",
  "Insufficient Evidence",
] as const;

export function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const ratingFilter = searchParams.get("rating") ?? "All";

  const filtered = useMemo(() => {
    let results = filterProducts(mockProducts, query, category || undefined);
    if (ratingFilter !== "All") {
      results = results.filter((p) => p.rating === ratingFilter);
    }
    return results;
  }, [query, category, ratingFilter]);

  function buildFilterUrl(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    return `/search${qs ? `?${qs}` : ""}`;
  }

  return (
    <PageShell>
      <div className="space-y-8">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              Search products
            </h1>
            <p className="mt-1 text-stone-600">
              Find sustainability scores across beauty, fashion, and food.
            </p>
          </div>
          <SearchBar defaultValue={query} autoFocus />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            Categories
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              href={buildFilterUrl({ category: null })}
              active={!category}
              label="All"
            />
            {CATEGORY_CHIPS.map((chip) => (
              <FilterChip
                key={chip}
                href={buildFilterUrl({ category: chip })}
                active={category === chip}
                label={chip}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            Rating
          </p>
          <div className="flex flex-wrap gap-2">
            {RATING_FILTERS.map((rating) => (
              <FilterChip
                key={rating}
                href={buildFilterUrl({
                  rating: rating === "All" ? null : rating,
                })}
                active={ratingFilter === rating || (rating === "All" && !searchParams.get("rating"))}
                label={rating}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-stone-200 pt-6">
          <p className="text-sm text-stone-600">
            <span className="font-semibold text-stone-900">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "product" : "products"}
            {query && (
              <>
                {" "}
                for &ldquo;<span className="font-medium">{query}</span>&rdquo;
              </>
            )}
          </p>
          <Link
            href="/compare"
            className="text-sm font-medium text-susco-green hover:underline"
          >
            Compare all →
          </Link>
        </div>

        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="list"
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
              <p className="text-lg font-medium text-stone-800">
                No products found
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Try a different search term or clear your filters.
              </p>
              <Link
                href="/search"
                className="mt-4 inline-block text-sm font-medium text-susco-green hover:underline"
              >
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-susco-green/30 bg-susco-mint/25 text-susco-green"
          : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900"
      )}
    >
      {label}
    </Link>
  );
}
