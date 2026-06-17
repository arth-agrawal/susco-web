import { getEvidenceForProduct } from "@/lib/data/mock-evidence";
import {
  getProductByIdOrSlug as lookupProduct,
  mockProducts,
} from "@/lib/data/mock-products";
import type { ProductSearchFilters } from "@/lib/search/filters";
import { searchProducts } from "@/lib/search/search-products";
import { getSimilarProducts } from "@/lib/search/similarity";
import type { EvidenceItem } from "@/lib/types/evidence";
import type { Product } from "@/lib/types/product";
import type { SustainabilityRating } from "@/lib/types/scoring";

export function getAllProducts(): Product[] {
  return mockProducts;
}

export function getProductByIdOrSlug(idOrSlug: string): Product | undefined {
  return lookupProduct(idOrSlug);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => lookupProduct(id))
    .filter((product): product is Product => Boolean(product));
}

export function searchProductsService(filters: ProductSearchFilters = {}) {
  return searchProducts(filters);
}

export function getSimilarProductsService(productId: string, limit = 4) {
  const product = lookupProduct(productId);
  if (!product) return [];
  return getSimilarProducts(product, limit);
}

export function getProductEvidence(productId: string): EvidenceItem[] {
  return getEvidenceForProduct(productId);
}

export function getProductRating(
  productId: string
): SustainabilityRating | undefined {
  return lookupProduct(productId)?.rating;
}
