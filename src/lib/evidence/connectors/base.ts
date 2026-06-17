import type {
  EvidenceItem,
  EvidenceSearchEntity,
  RawEvidenceRecord,
} from "@/lib/types/evidence";

export type EvidenceConnector = {
  id: string;
  name: string;
  searchEvidence(entity: EvidenceSearchEntity): Promise<RawEvidenceRecord[]>;
  normalize(raw: RawEvidenceRecord): EvidenceItem;
};
