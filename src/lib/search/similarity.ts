import { confidenceLevels } from "@/config/scoring";
import { mockProducts } from "@/lib/data/mock-products";
import { compareRatings } from "@/lib/scoring/rating-utils";
import type { Product } from "@/lib/types/product";
import { getLowestPrice } from "@/lib/utils/product";

function similarityScore(source: Product, candidate: Product) {
  const sameCategory = source.categoryId === candidate.categoryId ? 40 : 0;
  const sameType = source.productType === candidate.productType ? 25 : 0;
  const differentBrand = source.brandName !== candidate.brandName ? 8 : 0;
  const sourcePrice = getLowestPrice(source);
  const candidatePrice = getLowestPrice(candidate);
  const priceDistance = Math.abs(sourcePrice - candidatePrice);
  const priceScore = Math.max(0, 18 - priceDistance / 250);
  const ratingScore = compareRatings(candidate.rating.band, source.rating.band) * 5;
  const confidenceScore = confidenceLevels[candidate.rating.confidence].order * 2;

  return (
    sameCategory +
    sameType +
    differentBrand +
    priceScore +
    ratingScore +
    confidenceScore
  );
}

export function getSimilarProducts(product: Product, limit = 4) {
  return mockProducts
    .filter((candidate) => candidate.id !== product.id)
    .sort((a, b) => similarityScore(product, b) - similarityScore(product, a))
    .slice(0, limit);
}
