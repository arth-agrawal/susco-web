import type { ConfidenceLevel, RatingDimensionKey } from "@/lib/types/scoring";

export type EvidenceTier = "A" | "B" | "C" | "D" | "E";

export type EvidenceEntityType = "product" | "brand" | "company";

export type VerificationStatus =
  | "verified"
  | "partially_supported"
  | "unverified"
  | "contradicted"
  | "missing";

export type EvidenceItem = {
  id: string;
  entityType: EvidenceEntityType;
  entityId: string;
  dimension: RatingDimensionKey;
  claim: string;
  rawText: string;
  summary: string;
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  sourceDate: string;
  retrievedAt: string;
  evidenceTier: EvidenceTier;
  verificationStatus: VerificationStatus;
  confidence: ConfidenceLevel;
  createdAt: string;
};

export type EvidenceSearchEntity = {
  entityType: EvidenceEntityType;
  entityId: string;
  name: string;
  dimensions?: RatingDimensionKey[];
};

export type RawEvidenceRecord = {
  externalId: string;
  entityType: EvidenceEntityType;
  entityId: string;
  dimension: RatingDimensionKey;
  claim: string;
  rawText: string;
  sourceName: string;
  sourceUrl: string;
  sourceDate: string;
};
