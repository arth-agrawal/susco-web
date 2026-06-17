import { normalizeListing } from "@/lib/commerce/normalize-listing";
import type {
  CommerceConnector,
  RawCommerceProduct,
} from "@/lib/types/commerce";

export class NykaaConnector implements CommerceConnector {
  id = "nykaa";
  name = "Nykaa partner feed";

  async searchProducts(): Promise<RawCommerceProduct[]> {
    // TODO: Wire Nykaa partner route with NYKAA_PARTNER_TOKEN when available.
    return [];
  }

  async getProductDetails() {
    return null;
  }

  normalize(raw: RawCommerceProduct) {
    return normalizeListing(raw);
  }
}
