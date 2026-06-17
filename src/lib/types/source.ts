import type { EvidenceTier } from "@/lib/types/evidence";

export type SourceRecord = {
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  retrievedAt: string;
  sourceDate: string;
  accessMethod:
    | "connector"
    | "manual_review"
    | "brand_site"
    | "ecommerce_page"
    | "registry";
  licenseStatus: "open" | "restricted" | "unknown" | "not_applicable";
  evidenceTier: EvidenceTier;
  rawPayloadRef?: string;
};
