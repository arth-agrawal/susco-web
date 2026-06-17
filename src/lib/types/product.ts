import type { PlatformListing } from "@/lib/types/commerce";
import type { ProductCategoryId } from "@/lib/types/category";
import type { SustainabilityRating } from "@/lib/types/scoring";

export type Brand = {
  id: string;
  name: string;
  slug: string;
  website?: string;
  parentCompanyId?: string;
  country?: string;
  sustainabilityUrl?: string;
  notes?: string;
};

export type ParentCompany = {
  id: string;
  name: string;
  slug: string;
  website?: string;
  listingStatus?: "private" | "public" | "subsidiary" | "unknown";
  ticker?: string;
  country?: string;
  disclosureRegime?: string;
  reportRefs?: string[];
};

export type Product = {
  id: string;
  canonicalName: string;
  slug: string;
  brandId: string;
  brandName: string;
  parentCompanyId?: string;
  categoryId: ProductCategoryId;
  category: string;
  subcategory: string;
  productType: string;
  imageUrls: string[];
  description: string;
  ingredientsOrMaterials?: string;
  claimTags: string[];
  listings: PlatformListing[];
  rating: SustainabilityRating;
  productFactors: string[];
  brandFactors: string[];
  createdAt: string;
  updatedAt: string;
};
