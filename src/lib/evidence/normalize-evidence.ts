import type { EvidenceItem, RawEvidenceRecord } from "@/lib/types/evidence";

export function normalizeEvidence(raw: RawEvidenceRecord): EvidenceItem {
  return {
    id: raw.externalId,
    entityType: raw.entityType,
    entityId: raw.entityId,
    dimension: raw.dimension,
    claim: raw.claim,
    rawText: raw.rawText,
    summary: raw.rawText,
    sourceId: raw.sourceUrl,
    sourceName: raw.sourceName,
    sourceUrl: raw.sourceUrl,
    sourceDate: raw.sourceDate,
    retrievedAt: new Date().toISOString(),
    evidenceTier: "C",
    verificationStatus: "partially_supported",
    confidence: "Medium",
    createdAt: new Date().toISOString(),
  };
}
