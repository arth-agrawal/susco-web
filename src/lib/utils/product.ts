import { categories } from "@/config/categories";
import { confidenceLevels } from "@/config/scoring";
import { compareRatings } from "@/lib/scoring/rating-utils";
import type { CommercePlatform } from "@/lib/types/commerce";
import type { Product } from "@/lib/types/product";
import type { ConfidenceLevel, SustainabilityBand } from "@/lib/types/scoring";

export const CATEGORY_CHIPS = [
  "All",
  ...categories.map((category) => category.shortLabel),
] as const;

export function formatPrice(price: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceRange(product: Product): string {
  const prices = product.listings.map((listing) => listing.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatPrice(min);
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

export function getLowestPrice(product: Product): number {
  return Math.min(...product.listings.map((listing) => listing.price));
}

export function getHighestPrice(product: Product): number {
  return Math.max(...product.listings.map((listing) => listing.price));
}

export function getPlatforms(product: Product): CommercePlatform[] {
  return product.listings.map((listing) => listing.platform);
}

export function getPlatformLabel(product: Product): string {
  return getPlatforms(product).join(", ");
}

export function getPrimaryImage(product: Product): string {
  return product.imageUrls[0] ?? "/window.svg";
}

export function getBestEvidenceProduct(products: Product[]): Product {
  return [...products].sort(
    (a, b) => b.rating.evidenceItemIds.length - a.rating.evidenceItemIds.length
  )[0]!;
}

export function getLowestMissingDataProduct(products: Product[]): Product {
  return [...products].sort(
    (a, b) => a.rating.missingData.length - b.rating.missingData.length
  )[0]!;
}

export function getBestConfidenceProduct(products: Product[]): Product {
  return [...products].sort(
    (a, b) =>
      confidenceLevels[b.rating.confidence].order -
      confidenceLevels[a.rating.confidence].order
  )[0]!;
}

export function getBestRatingProduct(products: Product[]): Product {
  return [...products].sort((a, b) =>
    compareRatings(b.rating.band, a.rating.band)
  )[0]!;
}

export function matchesCategory(product: Product, category?: string) {
  if (!category || category === "All") return true;
  const normalized = category.toLowerCase();
  return (
    product.categoryId === normalized ||
    product.category.toLowerCase().includes(normalized) ||
    product.subcategory.toLowerCase().includes(normalized) ||
    product.productType.toLowerCase().includes(normalized)
  );
}

export function isRatingAtLeast(product: Product, band?: SustainabilityBand) {
  if (!band) return true;
  return compareRatings(product.rating.band, band) >= 0;
}

export function isConfidenceAtLeast(product: Product, level?: ConfidenceLevel) {
  if (!level) return true;
  return (
    confidenceLevels[product.rating.confidence].order >=
    confidenceLevels[level].order
  );
}
