import type { ProductCategory } from "@/lib/types/category";

export const categories: ProductCategory[] = [
  {
    id: "beauty",
    label: "Beauty / Personal Care",
    shortLabel: "Beauty",
    description:
      "Sunscreen, face wash, shampoo, moisturizer, and daily personal care with ingredient, packaging, cruelty-free, vegan, and certification evidence.",
    productTypes: ["Sunscreen", "Face wash", "Shampoo", "Moisturizer"],
  },
  {
    id: "fashion",
    label: "Fashion",
    shortLabel: "Fashion",
    description:
      "Denim, T-shirts, sneakers, and activewear scored against materials, durability, repairability, circularity, and supply-chain transparency.",
    productTypes: ["Denim jeans", "Cotton T-shirt", "Sneakers", "Activewear"],
  },
  {
    id: "food",
    label: "Food / Beverages",
    shortLabel: "Food",
    description:
      "Coffee, protein bars, packaged drinks, and snacks with sourcing, certification, packaging, and company context evidence.",
    productTypes: ["Coffee", "Protein bar", "Packaged drink", "Snack"],
  },
];

export const futureCategories = [
  "Home care",
  "Electronics",
  "Baby care",
  "Pet care",
  "ONDC local sellers",
];
