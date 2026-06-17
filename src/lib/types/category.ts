export type ProductCategoryId = "beauty" | "fashion" | "food";

export type ProductCategory = {
  id: ProductCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  productTypes: string[];
  future?: boolean;
};
