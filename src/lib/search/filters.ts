import type { CommercePlatform } from "@/lib/types/commerce";
import type { ConfidenceLevel, SustainabilityBand } from "@/lib/types/scoring";

export type SearchSortMode =
  | "relevance"
  | "sustainability"
  | "confidence"
  | "price_low"
  | "price_high";

export type ProductSearchFilters = {
  query?: string;
  category?: string;
  platform?: CommercePlatform | "All";
  rating?: SustainabilityBand | "All";
  confidence?: ConfidenceLevel | "All";
  minPrice?: number;
  maxPrice?: number;
  sort?: SearchSortMode;
};

export const sortModes: Array<{ value: SearchSortMode; label: string }> = [
  { value: "relevance", label: "Relevance" },
  { value: "sustainability", label: "Sustainability" },
  { value: "confidence", label: "Confidence" },
  { value: "price_low", label: "Price: low to high" },
  { value: "price_high", label: "Price: high to low" },
];
