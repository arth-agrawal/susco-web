import { CategoryChips } from "@/components/search/category-chips";
import { EmptySearchState } from "@/components/search/empty-search-state";
import { SearchBar } from "@/components/search/search-bar";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchResultsHeader } from "@/components/search/search-results-header";
import { ProductCard } from "@/components/product/product-card";
import { PageShell } from "@/components/layout/page-shell";
import type { SearchSortMode } from "@/lib/search/filters";
import { searchProductsService } from "@/lib/services/product-service";
import type { CommercePlatform } from "@/lib/types/commerce";
import type { ConfidenceLevel, SustainabilityBand } from "@/lib/types/scoring";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") urlParams.set(key, value);
  }

  const query = getString(params.q);
  const category = getString(params.category);
  const platform = getString(params.platform) as CommercePlatform | undefined;
  const rating = getString(params.rating) as SustainabilityBand | undefined;
  const confidence = getString(params.confidence) as ConfidenceLevel | undefined;
  const sort = getString(params.sort);

  const result = searchProductsService({
    query,
    category,
    platform,
    rating,
    confidence,
    sort: isSearchSortMode(sort) ? sort : undefined,
  });

  return (
    <PageShell>
      <div className="space-y-7">
        <div className="space-y-4">
          <SearchResultsHeader total={result.total} query={query} />
          <SearchBar defaultValue={query} autoFocus />
          <CategoryChips active={category || "All"} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <SearchFilters params={urlParams} />
          <div className="space-y-4">
            {result.products.length > 0 ? (
              result.products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="list"
                  priority={index === 0}
                />
              ))
            ) : (
              <EmptySearchState />
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function getString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isSearchSortMode(value: string | undefined): value is SearchSortMode {
  return (
    value === "relevance" ||
    value === "sustainability" ||
    value === "confidence" ||
    value === "price_low" ||
    value === "price_high"
  );
}
