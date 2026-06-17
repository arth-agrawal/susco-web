import type { ProductCategoryId } from "@/lib/types/category";
import type { RatingDimensionKey } from "@/lib/types/scoring";

export const dimensionLabels: Record<RatingDimensionKey, string> = {
  packaging: "Packaging",
  refillability: "Refillability",
  cruelty_free: "Cruelty-free evidence",
  vegan: "Vegan evidence",
  ingredient_transparency: "Ingredient transparency",
  certifications: "Certifications",
  claim_credibility: "Claim credibility",
  brand_context: "Brand/company context",
  materials: "Materials",
  durability: "Durability",
  repairability: "Repairability",
  circularity: "Circularity",
  labor_transparency: "Labor transparency",
  sourcing: "Sourcing transparency",
  animal_welfare: "Animal welfare",
  palm_oil_deforestation: "Palm oil / deforestation",
  missing_data: "Missing data",
};

export const categoryDimensions: Record<ProductCategoryId, RatingDimensionKey[]> = {
  beauty: [
    "packaging",
    "refillability",
    "cruelty_free",
    "vegan",
    "ingredient_transparency",
    "certifications",
    "claim_credibility",
    "brand_context",
    "missing_data",
  ],
  fashion: [
    "materials",
    "durability",
    "repairability",
    "circularity",
    "labor_transparency",
    "packaging",
    "brand_context",
    "missing_data",
  ],
  food: [
    "sourcing",
    "packaging",
    "certifications",
    "palm_oil_deforestation",
    "animal_welfare",
    "brand_context",
    "missing_data",
  ],
};
