import { normalizeListing } from "@/lib/commerce/normalize-listing";
import type {
  CommerceConnector,
  RawCommerceProduct,
} from "@/lib/types/commerce";

export class BrandSiteConnector implements CommerceConnector {
  id = "brand-site";
  name = "Brand website connector";

  async searchProducts(): Promise<RawCommerceProduct[]> {
    // TODO: Add crawl/submission queue with BRAND_SITE_CONNECTOR_QUEUE_URL.
    return [];
  }

  async getProductDetails() {
    return null;
  }

  normalize(raw: RawCommerceProduct) {
    return normalizeListing(raw);
  }
}
