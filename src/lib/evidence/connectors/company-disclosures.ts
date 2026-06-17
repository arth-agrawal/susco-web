import { normalizeEvidence } from "@/lib/evidence/normalize-evidence";
import type { EvidenceConnector } from "@/lib/evidence/connectors/base";
import type { RawEvidenceRecord } from "@/lib/types/evidence";

export class CompanyDisclosureConnector implements EvidenceConnector {
  id = "company-disclosures";
  name = "Company disclosures";

  async searchEvidence(): Promise<RawEvidenceRecord[]> {
    // TODO: Connect report ingestion with COMPANY_DISCLOSURE_BUCKET or database refs.
    return [];
  }

  normalize(raw: RawEvidenceRecord) {
    return normalizeEvidence(raw);
  }
}
