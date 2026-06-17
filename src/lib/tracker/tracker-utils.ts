import type { TrackedProduct } from "@/lib/data/mock-tracker";
import type { UserChoiceAction } from "@/lib/types/tracker";

export function groupTrackedProducts(items: TrackedProduct[]) {
  return items.reduce<Record<UserChoiceAction, TrackedProduct[]>>(
    (groups, item) => {
      groups[item.action].push(item);
      return groups;
    },
    { saved: [], bought: [], avoided: [], compared: [] }
  );
}
