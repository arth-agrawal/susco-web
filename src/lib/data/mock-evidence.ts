import type { EvidenceItem } from "@/lib/types/evidence";
import type { ConfidenceLevel, RatingDimensionKey } from "@/lib/types/scoring";

const retrievedAt = "2026-06-01";
const createdAt = "2026-06-02";

type EvidenceSeed = {
  id: string;
  productId: string;
  dimension: RatingDimensionKey;
  claim: string;
  summary: string;
  sourceId?: string;
  sourceName?: string;
  sourceUrl?: string;
  sourceDate?: string;
  evidenceTier?: EvidenceItem["evidenceTier"];
  verificationStatus?: EvidenceItem["verificationStatus"];
  confidence?: ConfidenceLevel;
};

function makeEvidence(seed: EvidenceSeed): EvidenceItem {
  return {
    id: seed.id,
    entityType: "product",
    entityId: seed.productId,
    dimension: seed.dimension,
    claim: seed.claim,
    rawText: seed.summary,
    summary: seed.summary,
    sourceId: seed.sourceId ?? "src-brand-page",
    sourceName: seed.sourceName ?? "Brand product page",
    sourceUrl: seed.sourceUrl ?? "https://example.com/mock-brand-product-page",
    sourceDate: seed.sourceDate ?? "2026-05-20",
    retrievedAt,
    evidenceTier: seed.evidenceTier ?? "C",
    verificationStatus: seed.verificationStatus ?? "partially_supported",
    confidence: seed.confidence ?? "Medium",
    createdAt,
  };
}

export const mockEvidenceItems: EvidenceItem[] = [
  makeEvidence({
    id: "ev-auraa-sunscreen-ingredients",
    productId: "auraa-daily-sun-fluid",
    dimension: "ingredient_transparency",
    claim: "Full ingredient list is visible before purchase.",
    summary:
      "Sample product page includes a full INCI-style ingredient list and usage notes.",
  }),
  makeEvidence({
    id: "ev-auraa-sunscreen-packaging",
    productId: "auraa-daily-sun-fluid",
    dimension: "packaging",
    claim: "Packaging material is stated but recyclability proof is missing.",
    summary:
      "Listing states a mono-carton and tube, but does not link to recycling or PCR documentation.",
    evidenceTier: "D",
    verificationStatus: "unverified",
    confidence: "Low",
  }),
  makeEvidence({
    id: "ev-meadow-facewash-vegan",
    productId: "meadow-skin-gel-cleanser",
    dimension: "vegan",
    claim: "Vegan claim appears in brand copy.",
    summary:
      "Brand copy states the cleanser is vegan; no independent registry match is included in the mock corpus.",
    evidenceTier: "D",
    verificationStatus: "unverified",
    confidence: "Low",
  }),
  makeEvidence({
    id: "ev-meadow-facewash-ingredients",
    productId: "meadow-skin-gel-cleanser",
    dimension: "ingredient_transparency",
    claim: "Ingredients and surfactant base are disclosed.",
    summary:
      "Product page lists ingredients and highlights a low-fragrance surfactant blend.",
  }),
  makeEvidence({
    id: "ev-root-shampoo-refill",
    productId: "root-ritual-refill-shampoo",
    dimension: "refillability",
    claim: "Refill pouch is available for repeat purchase.",
    summary:
      "Mock brand page lists a refill pouch SKU for the same shampoo format.",
    sourceId: "src-brand-page",
    evidenceTier: "C",
  }),
  makeEvidence({
    id: "ev-root-shampoo-cert",
    productId: "root-ritual-refill-shampoo",
    dimension: "certifications",
    claim: "Certification registry match is present in sample data.",
    summary:
      "Mock certification registry contains a matched cruelty-free program entry.",
    sourceId: "src-cert-registry",
    sourceName: "Certification registry sample",
    sourceUrl: "https://example.com/mock-certification-registry",
    evidenceTier: "A",
    verificationStatus: "verified",
    confidence: "High",
  }),
  makeEvidence({
    id: "ev-loop-moisturizer-packaging",
    productId: "loopkind-barrier-moisturizer",
    dimension: "packaging",
    claim: "Jar material is identified.",
    summary:
      "Marketplace listing identifies jar format but does not include weight, recyclability, or PCR share.",
    sourceId: "src-marketplace-page",
    sourceName: "Marketplace listing",
    sourceUrl: "https://example.com/mock-marketplace-listing",
    evidenceTier: "D",
  }),
  makeEvidence({
    id: "ev-loop-moisturizer-claims",
    productId: "loopkind-barrier-moisturizer",
    dimension: "claim_credibility",
    claim: "Several sustainability-adjacent claims lack source links.",
    summary:
      "Claim tags are visible, but supporting documentation is not linked in the seed corpus.",
    sourceId: "src-manual-review",
    evidenceTier: "D",
    verificationStatus: "unverified",
    confidence: "Low",
  }),
  makeEvidence({
    id: "ev-civic-denim-materials",
    productId: "civic-denim-recycled-jeans",
    dimension: "materials",
    claim: "Material composition includes recycled cotton share.",
    summary:
      "Sample product page lists cotton and recycled cotton percentages.",
    evidenceTier: "C",
  }),
  makeEvidence({
    id: "ev-civic-denim-disclosure",
    productId: "civic-denim-recycled-jeans",
    dimension: "brand_context",
    claim: "Brand disclosure includes repair guidance.",
    summary:
      "Brand guide includes care and repair notes, but supplier-level data remains absent.",
    sourceId: "src-company-disclosure",
    evidenceTier: "B",
    confidence: "Medium",
  }),
  makeEvidence({
    id: "ev-threadlane-shirt-cert",
    productId: "threadlane-organic-tee",
    dimension: "certifications",
    claim: "Organic textile certification is present in sample registry.",
    summary:
      "Mock registry record links a certification ID to the textile material claim.",
    sourceId: "src-cert-registry",
    sourceName: "Certification registry sample",
    sourceUrl: "https://example.com/mock-certification-registry",
    evidenceTier: "A",
    verificationStatus: "verified",
    confidence: "High",
  }),
  makeEvidence({
    id: "ev-threadlane-shirt-materials",
    productId: "threadlane-organic-tee",
    dimension: "materials",
    claim: "Material composition is clearly stated.",
    summary:
      "Product page lists organic cotton composition and washing guidance.",
    confidence: "High",
  }),
  makeEvidence({
    id: "ev-stride-sneaker-materials",
    productId: "stridefield-everyday-sneaker",
    dimension: "materials",
    claim: "Upper material is described at a high level.",
    summary:
      "Marketplace listing mentions recycled upper, but does not identify audited percentage.",
    sourceId: "src-marketplace-page",
    evidenceTier: "D",
    confidence: "Low",
  }),
  makeEvidence({
    id: "ev-stride-sneaker-repair",
    productId: "stridefield-everyday-sneaker",
    dimension: "repairability",
    claim: "Repairability or take-back evidence not found.",
    summary:
      "No repair, take-back, or resale pathway was visible in the sample review.",
    sourceId: "src-manual-review",
    evidenceTier: "E",
    verificationStatus: "missing",
    confidence: "Low",
  }),
  makeEvidence({
    id: "ev-reknit-activewear-circular",
    productId: "reknit-compressive-leggings",
    dimension: "circularity",
    claim: "Take-back program is described.",
    summary:
      "Brand page describes a sample take-back program for worn activewear.",
    evidenceTier: "C",
  }),
  makeEvidence({
    id: "ev-reknit-activewear-company",
    productId: "reknit-compressive-leggings",
    dimension: "brand_context",
    claim: "Company-level disclosure is present but not audited in seed data.",
    summary:
      "Mock disclosure has scope and supplier policy notes without an audit attachment.",
    sourceId: "src-company-disclosure",
    evidenceTier: "B",
  }),
  makeEvidence({
    id: "ev-origin-coffee-sourcing",
    productId: "origin-cup-shade-grown-coffee",
    dimension: "sourcing",
    claim: "Farm origin and roast batch are disclosed.",
    summary:
      "Product page lists origin, process, and farm-level sourcing notes.",
    evidenceTier: "C",
  }),
  makeEvidence({
    id: "ev-origin-coffee-packaging",
    productId: "origin-cup-shade-grown-coffee",
    dimension: "packaging",
    claim: "Packaging material details are incomplete.",
    summary:
      "Bag format is visible, but barrier material and recycling pathway are missing.",
    evidenceTier: "D",
    confidence: "Low",
  }),
  makeEvidence({
    id: "ev-harvest-bar-ingredients",
    productId: "harvest-bar-nut-protein",
    dimension: "sourcing",
    claim: "Ingredient origin notes are partial.",
    summary:
      "Listing identifies primary ingredients but not supplier or certification details.",
    sourceId: "src-marketplace-page",
    evidenceTier: "D",
  }),
  makeEvidence({
    id: "ev-harvest-bar-packaging",
    productId: "harvest-bar-nut-protein",
    dimension: "packaging",
    claim: "Single-serve wrapper has no disposal documentation.",
    summary:
      "Wrapper format is shown; no material or recycling evidence is linked.",
    evidenceTier: "E",
    verificationStatus: "missing",
    confidence: "Low",
  }),
  makeEvidence({
    id: "ev-nimbo-drink-packaging",
    productId: "nimbo-sparkling-lemon-drink",
    dimension: "packaging",
    claim: "Can packaging format is visible and recyclable where facilities exist.",
    summary:
      "Listing identifies aluminium can format, but regional recycling proof is not included.",
    sourceId: "src-marketplace-page",
    evidenceTier: "D",
  }),
  makeEvidence({
    id: "ev-nimbo-drink-sourcing",
    productId: "nimbo-sparkling-lemon-drink",
    dimension: "sourcing",
    claim: "Fruit sourcing details are missing.",
    summary:
      "No origin, supplier, or certification details are visible for fruit ingredients.",
    evidenceTier: "E",
    verificationStatus: "missing",
    confidence: "Low",
  }),
  makeEvidence({
    id: "ev-better-bites-cert",
    productId: "better-bites-millet-snack",
    dimension: "certifications",
    claim: "Ingredient certification appears in sample registry.",
    summary:
      "Mock registry includes a certification link for the millet ingredient program.",
    sourceId: "src-cert-registry",
    sourceName: "Certification registry sample",
    sourceUrl: "https://example.com/mock-certification-registry",
    evidenceTier: "A",
    verificationStatus: "verified",
    confidence: "High",
  }),
  makeEvidence({
    id: "ev-better-bites-company",
    productId: "better-bites-millet-snack",
    dimension: "brand_context",
    claim: "Company disclosure includes sourcing principles.",
    summary:
      "Sample disclosure outlines sourcing principles, with supplier names redacted in seed data.",
    sourceId: "src-company-disclosure",
    evidenceTier: "B",
  }),
];

export function getEvidenceForProduct(productId: string) {
  return mockEvidenceItems.filter((item) => item.entityId === productId);
}
