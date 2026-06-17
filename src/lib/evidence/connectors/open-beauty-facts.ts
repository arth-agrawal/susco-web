import { normalizeEvidence } from "@/lib/evidence/normalize-evidence";
import type { EvidenceConnector } from "@/lib/evidence/connectors/base";
import type { RawEvidenceRecord } from "@/lib/types/evidence";

export class OpenBeautyFactsConnector implements EvidenceConnector {
  id = "open-beauty-facts";
  name = "Open Beauty Facts";

  async searchEvidence(): Promise<RawEvidenceRecord[]> {
    // TODO: Add OPEN_BEAUTY_FACTS_USER_AGENT and category-specific matching.
    return [];
  }

  normalize(raw: RawEvidenceRecord) {
    return normalizeEvidence(raw);
  }
}
