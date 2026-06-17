import type { Product } from "@/lib/types/product";
import { mockProducts } from "@/lib/data/mock-products";

export type TrackerStatus = "saved" | "bought" | "avoided";

export type TrackedProduct = {
  product: Product;
  status: TrackerStatus;
  trackedAt: string;
  note?: string;
};

export const mockProfile = {
  name: "Arthi",
  handle: "@arthi_shops",
  memberSince: "March 2026",
  bio: "Building a cleaner cart, one product check at a time.",
};

export const mockTrackerStats = {
  productsChecked: 47,
  choicesSaved: 12,
  averageRating: "Moderate" as const,
  betterChoices: 8,
};

export const mockTrackedProducts: TrackedProduct[] = [
  {
    product: mockProducts[1]!,
    status: "bought",
    trackedAt: "2026-06-10",
    note: "Strong sourcing story — bought from brand site.",
  },
  {
    product: mockProducts[0]!,
    status: "saved",
    trackedAt: "2026-06-14",
    note: "Waiting to compare with other sunscreens.",
  },
  {
    product: mockProducts[2]!,
    status: "avoided",
    trackedAt: "2026-06-12",
    note: "Too many missing data points on supply chain.",
  },
];
