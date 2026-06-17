import { normalizeListing } from "@/lib/commerce/normalize-listing";
import type {
  CommerceConnector,
  RawCommerceProduct,
} from "@/lib/types/commerce";

export class FlipkartConnector implements CommerceConnector {
  id = "flipkart";
  name = "Flipkart affiliate / partner feed";

  async searchProducts(): Promise<RawCommerceProduct[]> {
    // TODO: Wire Flipkart feed with FLIPKART_AFFILIATE_ID and FLIPKART_AFFILIATE_TOKEN.
    return [];
  }

  async getProductDetails() {
    return null;
  }

  normalize(raw: RawCommerceProduct) {
    return normalizeListing(raw);
  }
}
