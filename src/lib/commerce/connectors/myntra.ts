import { normalizeListing } from "@/lib/commerce/normalize-listing";
import type {
  CommerceConnector,
  RawCommerceProduct,
} from "@/lib/types/commerce";

export class MyntraConnector implements CommerceConnector {
  id = "myntra";
  name = "Myntra partner feed";

  async searchProducts(): Promise<RawCommerceProduct[]> {
    // TODO: Wire Myntra partner/catalog feed with MYNTRA_PARTNER_TOKEN.
    return [];
  }

  async getProductDetails() {
    return null;
  }

  normalize(raw: RawCommerceProduct) {
    return normalizeListing(raw);
  }
}
