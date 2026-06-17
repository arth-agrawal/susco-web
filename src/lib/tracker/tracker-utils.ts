import { getProductByIdOrSlug } from "@/lib/services/product-service";
import type { TrackedProduct, UserChoice, UserChoiceAction } from "@/lib/types/tracker";

export function toTrackedProducts(choices: UserChoice[]): TrackedProduct[] {
  return choices
    .map((choice) => {
      const product = getProductByIdOrSlug(choice.productId);
      if (!product) return null;
      return { ...choice, product };
    })
    .filter((item): item is TrackedProduct => Boolean(item));
}

export function groupTrackedProducts(items: TrackedProduct[]) {
  return items.reduce<Record<UserChoiceAction, TrackedProduct[]>>(
    (groups, item) => {
      groups[item.action].push(item);
      return groups;
    },
    { saved: [], bought: [], avoided: [], compared: [] }
  );
}
