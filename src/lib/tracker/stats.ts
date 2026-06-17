import { categories } from "@/config/categories";
import { ratingBands } from "@/config/scoring";
import { compareRatings } from "@/lib/scoring/rating-utils";
import type { Product } from "@/lib/types/product";
import type { TrackerStats, UserChoice } from "@/lib/types/tracker";

export function getChoiceProducts(choices: UserChoice[], products: Product[]) {
  const productMap = new Map(products.map((product) => [product.id, product]));
  const seen = new Set<string>();
  const result: Product[] = [];

  for (const choice of choices) {
    if (seen.has(choice.productId)) continue;
    const product = productMap.get(choice.productId);
    if (product) {
      seen.add(choice.productId);
      result.push(product);
    }
  }

  return result;
}

export function getAverageRatingLabel(products: Product[]) {
  if (products.length === 0) return "Insufficient Evidence";
  const average =
    products.reduce(
      (sum, product) => sum + ratingBands[product.rating.band].order,
      0
    ) / products.length;
  const entry = Object.entries(ratingBands)
    .map(([band, config]) => ({ band, order: config.order }))
    .sort((a, b) => Math.abs(a.order - average) - Math.abs(b.order - average))
    .at(0);
  return entry?.band ?? "Insufficient Evidence";
}

export function getHighConfidenceCount(products: Product[]) {
  return products.filter((product) => product.rating.confidence === "High")
    .length;
}

export function deriveTrackerStats(
  choices: UserChoice[],
  products: Product[]
): TrackerStats {
  const uniqueProductIds = new Set(choices.map((choice) => choice.productId));
  const choiceProducts = getChoiceProducts(choices, products);

  const choicesSaved = choices.filter((choice) => choice.action === "saved")
    .length;
  const boughtChoices = choices.filter((choice) => choice.action === "bought");
  const betterChoices = boughtChoices.filter((choice) => {
    const rating = choice.ratingAtTime.band;
    return compareRatings(rating, "Strong") >= 0;
  }).length;

  const categoryProgress = categories.map((category) => {
    const categoryChoices = choices.filter((choice) => {
      const product = products.find((item) => item.id === choice.productId);
      return product?.categoryId === category.id;
    });
    const uniqueInCategory = new Set(
      categoryChoices.map((choice) => choice.productId)
    ).size;
    const betterInCategory = categoryChoices.filter(
      (choice) =>
        choice.action === "bought" &&
        compareRatings(choice.ratingAtTime.band, "Strong") >= 0
    ).length;
    const progress =
      uniqueInCategory === 0
        ? 0
        : Math.min(100, Math.round((betterInCategory / uniqueInCategory) * 100));

    return {
      categoryId: category.id,
      label: category.shortLabel,
      checked: uniqueInCategory,
      betterChoices: betterInCategory,
      progress,
    };
  });

  return {
    productsChecked: uniqueProductIds.size,
    choicesSaved,
    boughtCount: boughtChoices.length,
    avoidedCount: choices.filter((choice) => choice.action === "avoided").length,
    comparedCount: choices.filter((choice) => choice.action === "compared").length,
    betterChoices,
    averageRating: getAverageRatingLabel(choiceProducts),
    publicStreak: Math.min(7, uniqueProductIds.size),
    categoryProgress,
  };
}
