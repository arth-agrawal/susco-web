import { compareRatings } from "@/lib/scoring/rating-utils";
import type { Product } from "@/lib/types/product";
import type { UserBadge, UserChoice } from "@/lib/types/tracker";

import { getChoiceProducts } from "./stats";

const BADGE_DEFINITIONS: Array<
  Omit<UserBadge, "unlockedAt"> & {
    isUnlocked: (choices: UserChoice[], products: Product[]) => boolean;
  }
> = [
  {
    id: "evidence-reader",
    label: "Evidence Reader",
    description: "Tracked 3 or more products with sustainability scores.",
    tone: "green",
    isUnlocked: (choices) => new Set(choices.map((c) => c.productId)).size >= 3,
  },
  {
    id: "better-swap",
    label: "Better Swap",
    description: "Logged a bought choice with Strong or Excellent rating.",
    tone: "mint",
    isUnlocked: (choices) =>
      choices.some(
        (choice) =>
          choice.action === "bought" &&
          compareRatings(choice.ratingAtTime.band, "Strong") >= 0
      ),
  },
  {
    id: "missing-data-spotter",
    label: "Data Gap Spotter",
    description: "Saved a product with missing data gaps in its rating.",
    tone: "amber",
    isUnlocked: (choices) =>
      choices.some(
        (choice) =>
          choice.action === "saved" &&
          choice.ratingAtTime.missingData.length > 0
      ),
  },
  {
    id: "category-explorer",
    label: "Category Explorer",
    description: "Tracked products across beauty, fashion, and food.",
    tone: "stone",
    isUnlocked: (choices, products) => {
      const categoriesSeen = new Set(
        getChoiceProducts(choices, products).map((product) => product.categoryId)
      );
      return categoriesSeen.size >= 3;
    },
  },
];

export function deriveBadges(
  choices: UserChoice[],
  products: Product[]
): UserBadge[] {
  const today = new Date().toISOString().split("T")[0] ?? "";

  return BADGE_DEFINITIONS.map((badge) => ({
    id: badge.id,
    label: badge.label,
    description: badge.description,
    tone: badge.tone,
    unlockedAt: badge.isUnlocked(choices, products) ? today : undefined,
  }));
}

export function getUnlockedBadges(badges: UserBadge[]) {
  return badges.filter((badge) => Boolean(badge.unlockedAt));
}

export function getLockedBadges(badges: UserBadge[]) {
  return badges.filter((badge) => !badge.unlockedAt);
}
