import { normalizeEvidence } from "@/lib/evidence/normalize-evidence";
import type { EvidenceConnector } from "@/lib/evidence/connectors/base";
import type { RawEvidenceRecord } from "@/lib/types/evidence";

export class RegulatoryConnector implements EvidenceConnector {
  id = "regulatory";
  name = "Regulatory / controversy evidence";

  async searchEvidence(): Promise<RawEvidenceRecord[]> {
    // TODO: Add vetted regulatory and controversy feeds; never generate claims without source records.
    return [];
  }

  normalize(raw: RawEvidenceRecord) {
    return normalizeEvidence(raw);
  }
}
