import { confidenceLevels, ratingBands } from "@/config/scoring";
import type { Product } from "@/lib/types/product";
import type { UserChoice } from "@/lib/types/tracker";

export function getChoiceProducts(choices: UserChoice[], products: Product[]) {
  const productMap = new Map(products.map((product) => [product.id, product]));
  return choices
    .map((choice) => productMap.get(choice.productId))
    .filter((product): product is Product => Boolean(product));
}

export function getAverageRatingLabel(products: Product[]) {
  if (products.length === 0) return "Insufficient Evidence";
  const average =
    products.reduce((sum, product) => sum + ratingBands[product.rating.band].order, 0) /
    products.length;
  const entry = Object.entries(ratingBands)
    .map(([band, config]) => ({ band, order: config.order }))
    .sort((a, b) => Math.abs(b.order - average) - Math.abs(a.order - average))
    .at(-1);
  return entry?.band ?? "Insufficient Evidence";
}

export function getHighConfidenceCount(products: Product[]) {
  return products.filter(
    (product) => confidenceLevels[product.rating.confidence].order >= 2
  ).length;
}
