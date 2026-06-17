import { normalizeListing } from "@/lib/commerce/normalize-listing";
import type {
  CommerceConnector,
  RawCommerceProduct,
} from "@/lib/types/commerce";

export class AmazonConnector implements CommerceConnector {
  id = "amazon";
  name = "Amazon PA-API";

  async searchProducts(): Promise<RawCommerceProduct[]> {
    // TODO: Wire Amazon PA-API with AMAZON_PA_API_KEY, AMAZON_PA_API_SECRET, AMAZON_ASSOCIATE_TAG.
    return [];
  }

  async getProductDetails() {
    // TODO: Fetch item details from Amazon PA-API once credentials are configured.
    return null;
  }

  normalize(raw: RawCommerceProduct) {
    return normalizeListing(raw);
  }
}
