import { normalizeListing } from "@/lib/commerce/normalize-listing";
import type {
  CommerceConnector,
  RawCommerceProduct,
} from "@/lib/types/commerce";

export class OndcConnector implements CommerceConnector {
  id = "ondc";
  name = "ONDC connector";

  async searchProducts(): Promise<RawCommerceProduct[]> {
    // TODO: Integrate ONDC search when registry access and domain rules are ready.
    return [];
  }

  async getProductDetails() {
    return null;
  }

  normalize(raw: RawCommerceProduct) {
    return normalizeListing(raw);
  }
}
