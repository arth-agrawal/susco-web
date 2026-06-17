import { confidenceLevels } from "@/config/scoring";
import { mockProducts } from "@/lib/data/mock-products";
import { parsePriceIntent, tokenizeQuery } from "@/lib/search/query-parser";
import type { ProductSearchFilters } from "@/lib/search/filters";
import { compareRatings } from "@/lib/scoring/rating-utils";
import type { Product } from "@/lib/types/product";
import {
  getHighestPrice,
  getLowestPrice,
  matchesCategory,
} from "@/lib/utils/product";

export type ProductSearchResult = {
  products: Product[];
  total: number;
  applied: Required<Pick<ProductSearchFilters, "sort">> &
    Omit<ProductSearchFilters, "sort">;
};

function getSearchText(product: Product) {
  return [
    product.canonicalName,
    product.brandName,
    product.category,
    product.subcategory,
    product.productType,
    product.description,
    product.rating.shortReason,
    product.claimTags.join(" "),
    product.listings.map((listing) => listing.platform).join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

function relevanceScore(product: Product, tokens: string[]) {
  if (tokens.length === 0) return 0;
  const searchText = getSearchText(product);
  return tokens.reduce((score, token) => {
    const productTypeBoost = product.productType.toLowerCase().includes(token)
      ? 4
      : 0;
    const brandBoost = product.brandName.toLowerCase().includes(token) ? 3 : 0;
    const textBoost = searchText.includes(token) ? 1 : 0;
    return score + productTypeBoost + brandBoost + textBoost;
  }, 0);
}

export function searchProducts(
  filters: ProductSearchFilters = {}
): ProductSearchResult {
  const priceIntent = parsePriceIntent(filters.query);
  const applied = {
    ...priceIntent,
    ...filters,
    sort: filters.sort ?? "relevance",
  };
  const tokens = tokenizeQuery(applied.query);

  let products = mockProducts.filter((product) => {
    const tokenMatch =
      tokens.length === 0 ||
      tokens.some((token) => getSearchText(product).includes(token));

    const categoryMatch = matchesCategory(product, applied.category);
    const platformMatch =
      !applied.platform ||
      applied.platform === "All" ||
      product.listings.some((listing) => listing.platform === applied.platform);
    const ratingMatch =
      !applied.rating ||
      applied.rating === "All" ||
      product.rating.band === applied.rating;
    const confidenceMatch =
      !applied.confidence ||
      applied.confidence === "All" ||
      product.rating.confidence === applied.confidence;
    const minMatch =
      applied.minPrice === undefined ||
      getHighestPrice(product) >= applied.minPrice;
    const maxMatch =
      applied.maxPrice === undefined ||
      getLowestPrice(product) <= applied.maxPrice;

    return (
      tokenMatch &&
      categoryMatch &&
      platformMatch &&
      ratingMatch &&
      confidenceMatch &&
      minMatch &&
      maxMatch
    );
  });

  products = products.sort((a, b) => {
    if (applied.sort === "sustainability") {
      return compareRatings(b.rating.band, a.rating.band);
    }
    if (applied.sort === "confidence") {
      return (
        confidenceLevels[b.rating.confidence].order -
        confidenceLevels[a.rating.confidence].order
      );
    }
    if (applied.sort === "price_low") {
      return getLowestPrice(a) - getLowestPrice(b);
    }
    if (applied.sort === "price_high") {
      return getLowestPrice(b) - getLowestPrice(a);
    }
    return relevanceScore(b, tokens) - relevanceScore(a, tokens);
  });

  return {
    products,
    total: products.length,
    applied,
  };
}
