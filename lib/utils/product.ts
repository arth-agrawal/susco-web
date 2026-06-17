import type {
  ConfidenceLevel,
  Product,
  SustainabilityBand,
} from "@/lib/types/product";
import { mockProducts } from "@/lib/data/mock-products";

const RATING_ORDER: Record<SustainabilityBand, number> = {
  Excellent: 5,
  Strong: 4,
  Moderate: 3,
  Weak: 2,
  "Insufficient Evidence": 1,
};

const CONFIDENCE_ORDER: Record<ConfidenceLevel, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getSimilarProducts(
  product: Product,
  limit = 3
): Product[] {
  return mockProducts
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const sameCategory =
        Number(b.category === product.category) -
        Number(a.category === product.category);
      if (sameCategory !== 0) return sameCategory;
      return RATING_ORDER[b.rating] - RATING_ORDER[a.rating];
    })
    .slice(0, limit);
}

export function formatPrice(price: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceRange(product: Product): string {
  const prices = product.listings.map((l) => l.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatPrice(min);
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

export function getPlatforms(product: Product): string {
  return product.listings.map((l) => l.platform).join(", ");
}

export function getLowestPrice(product: Product): number {
  return Math.min(...product.listings.map((l) => l.price));
}

export function getRatingScore(rating: SustainabilityBand): number {
  return RATING_ORDER[rating];
}

export function getConfidenceScore(confidence: ConfidenceLevel): number {
  return CONFIDENCE_ORDER[confidence];
}

export function getBestEvidenceProduct(products: Product[]): Product {
  return [...products].sort(
    (a, b) => b.evidence.length - a.evidence.length
  )[0]!;
}

export function getLowestMissingDataProduct(products: Product[]): Product {
  return [...products].sort(
    (a, b) => a.missingData.length - b.missingData.length
  )[0]!;
}

export function getBestConfidenceProduct(products: Product[]): Product {
  return [...products].sort(
    (a, b) =>
      getConfidenceScore(b.confidence) - getConfidenceScore(a.confidence)
  )[0]!;
}

export function getBestRatingProduct(products: Product[]): Product {
  return [...products].sort(
    (a, b) => getRatingScore(b.rating) - getRatingScore(a.rating)
  )[0]!;
}

export const CATEGORY_CHIPS = [
  "Beauty",
  "Fashion",
  "Food",
  "Personal Care",
  "Coffee",
  "Denim",
] as const;

export type CategoryChip = (typeof CATEGORY_CHIPS)[number];

export function filterProducts(
  products: Product[],
  query: string,
  category?: string
): Product[] {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.brand.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.shortReason.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      !category ||
      category === "All" ||
      product.category.toLowerCase() === category.toLowerCase() ||
      (category === "Personal Care" && product.category === "Beauty") ||
      (category === "Coffee" && product.name.toLowerCase().includes("coffee")) ||
      (category === "Denim" && product.name.toLowerCase().includes("denim"));

    return matchesQuery && matchesCategory;
  });
}
