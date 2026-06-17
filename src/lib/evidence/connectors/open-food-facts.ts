import { normalizeEvidence } from "@/lib/evidence/normalize-evidence";
import type { EvidenceConnector } from "@/lib/evidence/connectors/base";
import type { RawEvidenceRecord } from "@/lib/types/evidence";

export class OpenFoodFactsConnector implements EvidenceConnector {
  id = "open-food-facts";
  name = "Open Food Facts";

  async searchEvidence(): Promise<RawEvidenceRecord[]> {
    // TODO: Add OPEN_FOOD_FACTS_USER_AGENT and barcode/name matching.
    return [];
  }

  normalize(raw: RawEvidenceRecord) {
    return normalizeEvidence(raw);
  }
}
