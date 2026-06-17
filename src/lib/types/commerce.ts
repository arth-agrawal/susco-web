export type CommercePlatform =
  | "Amazon"
  | "Flipkart"
  | "Nykaa"
  | "Myntra"
  | "Brand Site"
  | "ONDC";

export type ListingAvailability = "In Stock" | "Out of Stock" | "Unknown";

export type PlatformListing = {
  id: string;
  productId: string;
  platform: CommercePlatform;
  platformProductId?: string;
  title: string;
  price: number;
  currency: "INR";
  url: string;
  availability: ListingAvailability;
  seller?: string;
  imageUrl?: string;
  lastSeenAt: string;
};

export type ProductSearchQuery = {
  text?: string;
  categoryId?: string;
  platform?: CommercePlatform;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
};

export type RawCommerceProduct = {
  externalId: string;
  productId: string;
  platform: CommercePlatform;
  title: string;
  price: number;
  currency: "INR";
  url: string;
  availability: ListingAvailability;
  seller?: string;
  imageUrl?: string;
  rawPayload?: unknown;
};

export type CommerceConnector = {
  id: string;
  name: string;
  searchProducts(query: ProductSearchQuery): Promise<RawCommerceProduct[]>;
  getProductDetails(externalId: string): Promise<RawCommerceProduct | null>;
  normalize(raw: RawCommerceProduct): PlatformListing;
};
