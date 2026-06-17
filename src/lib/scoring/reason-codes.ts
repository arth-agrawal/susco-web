import type { ReasonCode } from "@/lib/types/scoring";

export const reasonCodeLabels: Record<ReasonCode, string> = {
  PRODUCT_DISCLOSURE_FOUND: "Product disclosure found",
  CERTIFICATION_VERIFIED: "Certification verified",
  PACKAGING_EVIDENCE_LIMITED: "Packaging evidence limited",
  MATERIALS_PARTIAL: "Materials disclosure partial",
  SUPPLY_CHAIN_MISSING: "Supply-chain data missing",
  CLAIMS_UNVERIFIED: "Claim not independently verified",
  BRAND_DISCLOSURE_PRESENT: "Brand disclosure present",
  COMPANY_CONTEXT_LIMITED: "Company context limited",
  MISSING_DATA_CAP_APPLIED: "Missing-data cap applied",
  LOW_EVIDENCE_TIER: "Low evidence tier",
};
