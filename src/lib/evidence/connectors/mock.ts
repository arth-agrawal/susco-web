import { mockEvidenceItems } from "@/lib/data/mock-evidence";
import { normalizeEvidence } from "@/lib/evidence/normalize-evidence";
import type { EvidenceConnector } from "@/lib/evidence/connectors/base";
import type { EvidenceSearchEntity, RawEvidenceRecord } from "@/lib/types/evidence";

export class MockEvidenceConnector implements EvidenceConnector {
  id = "mock-evidence";
  name = "Mock evidence corpus";

  async searchEvidence(entity: EvidenceSearchEntity): Promise<RawEvidenceRecord[]> {
    return mockEvidenceItems
      .filter(
        (item) =>
          item.entityType === entity.entityType && item.entityId === entity.entityId
      )
      .map((item) => ({
        externalId: item.id,
        entityType: item.entityType,
        entityId: item.entityId,
        dimension: item.dimension,
        claim: item.claim,
        rawText: item.rawText,
        sourceName: item.sourceName,
        sourceUrl: item.sourceUrl,
        sourceDate: item.sourceDate,
      }));
  }

  normalize(raw: RawEvidenceRecord) {
    return normalizeEvidence(raw);
  }
}
