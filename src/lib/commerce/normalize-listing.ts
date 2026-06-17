import type { PlatformListing, RawCommerceProduct } from "@/lib/types/commerce";

export function normalizeListing(raw: RawCommerceProduct): PlatformListing {
  return {
    id: `${raw.platform.toLowerCase().replace(/\s+/g, "-")}-${raw.externalId}`,
    productId: raw.productId,
    platform: raw.platform,
    platformProductId: raw.externalId,
    title: raw.title,
    price: raw.price,
    currency: raw.currency,
    url: raw.url,
    availability: raw.availability,
    seller: raw.seller,
    imageUrl: raw.imageUrl,
    lastSeenAt: new Date().toISOString(),
  };
}
