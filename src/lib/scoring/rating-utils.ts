import { ratingBands } from "@/config/scoring";
import type { Product } from "@/lib/types/product";
import type { SustainabilityBand } from "@/lib/types/scoring";

export function getRatingOrder(band: SustainabilityBand) {
  return ratingBands[band].order;
}

export function compareRatings(a: SustainabilityBand, b: SustainabilityBand) {
  return getRatingOrder(a) - getRatingOrder(b);
}

export function getRatingPercent(band: SustainabilityBand) {
  return (getRatingOrder(band) / 5) * 100;
}

export function getEvidenceCount(product: Product) {
  return product.rating.evidenceItemIds.length;
}

export function getMissingDataCount(product: Product) {
  return product.rating.missingData.length;
}
