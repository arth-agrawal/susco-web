import { getProductByIdOrSlug } from "@/lib/services/product-service";
import type { Product } from "@/lib/types/product";
import type { UserChoice, UserChoiceAction } from "@/lib/types/tracker";

function getProduct(productId: string): Product {
  const product = getProductByIdOrSlug(productId);
  if (!product) {
    throw new Error(`Missing mock product ${productId}`);
  }
  return product;
}

function choice(
  productId: string,
  action: UserChoiceAction,
  createdAt: string,
  note?: string
): UserChoice {
  const product = getProduct(productId);
  return {
    id: `${productId}-${action}`,
    userId: "user-aanya",
    productId,
    action,
    ratingAtTime: product.rating,
    note,
    createdAt,
  };
}

export const mockUserChoices: UserChoice[] = [
  choice(
    "root-ritual-refill-shampoo",
    "bought",
    "2026-06-09",
    "Chose refill SKU after comparing two shampoo options."
  ),
  choice(
    "threadlane-organic-tee",
    "saved",
    "2026-06-10",
    "High-confidence textile evidence; waiting for size restock."
  ),
  choice(
    "stridefield-everyday-sneaker",
    "avoided",
    "2026-06-11",
    "Recycled material claim lacked audited percentage."
  ),
  choice(
    "better-bites-millet-snack",
    "bought",
    "2026-06-12",
    "Ingredient evidence was stronger than usual snack options."
  ),
  choice(
    "auraa-daily-sun-fluid",
    "compared",
    "2026-06-13",
    "Useful ingredient disclosure, but packaging proof is still missing."
  ),
  choice(
    "civic-denim-recycled-jeans",
    "saved",
    "2026-06-14",
    "Good material disclosure; need to check fit and supplier notes."
  ),
];

export function getChoicesForUser(userId: string): UserChoice[] {
  return mockUserChoices.filter((choice) => choice.userId === userId);
}
