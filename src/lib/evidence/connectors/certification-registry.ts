import { normalizeEvidence } from "@/lib/evidence/normalize-evidence";
import type { EvidenceConnector } from "@/lib/evidence/connectors/base";
import type { RawEvidenceRecord } from "@/lib/types/evidence";

export class CertificationRegistryConnector implements EvidenceConnector {
  id = "certification-registry";
  name = "Certification registry";

  async searchEvidence(): Promise<RawEvidenceRecord[]> {
    // TODO: Add registry adapters for certification IDs and expiry dates.
    return [];
  }

  normalize(raw: RawEvidenceRecord) {
    return normalizeEvidence(raw);
  }
}
