import { mockProducts } from "@/lib/data/mock-products";
import { normalizeListing } from "@/lib/commerce/normalize-listing";
import type {
  CommerceConnector,
  ProductSearchQuery,
  RawCommerceProduct,
} from "@/lib/types/commerce";

export class MockCommerceConnector implements CommerceConnector {
  id = "mock";
  name = "Mock commerce index";

  async searchProducts(query: ProductSearchQuery): Promise<RawCommerceProduct[]> {
    const text = query.text?.toLowerCase() ?? "";
    return mockProducts
      .filter(
        (product) =>
          !text ||
          product.canonicalName.toLowerCase().includes(text) ||
          product.brandName.toLowerCase().includes(text) ||
          product.productType.toLowerCase().includes(text)
      )
      .flatMap((product) =>
        product.listings.map((listing) => ({
          externalId: listing.platformProductId ?? listing.id,
          productId: product.id,
          platform: listing.platform,
          title: listing.title,
          price: listing.price,
          currency: listing.currency,
          url: listing.url,
          availability: listing.availability,
          seller: listing.seller,
          imageUrl: listing.imageUrl,
        }))
      );
  }

  async getProductDetails(externalId: string) {
    const listings = await this.searchProducts({});
    return listings.find((listing) => listing.externalId === externalId) ?? null;
  }

  normalize(raw: RawCommerceProduct) {
    return normalizeListing(raw);
  }
}
