# Data Sources Pipeline

SusCo uses two separate data planes.

## Commerce Plane

Purpose: identify products, platform availability, prices, images, seller context, and click-out URLs.

Current code:
- `src/lib/commerce/connectors/base.ts`
- `src/lib/commerce/connectors/mock.ts`
- Placeholder adapters for Amazon, Flipkart, Nykaa, Myntra, brand sites, and ONDC
- `src/lib/commerce/normalize-listing.ts`
- `src/lib/commerce/dedupe-products.ts`

Future connectors should return raw source records first, normalize into `PlatformListing`, then dedupe into canonical products.

## Evidence Plane

Purpose: source-linked product, brand, and company sustainability evidence.

Current code:
- `src/lib/evidence/connectors/base.ts`
- `src/lib/evidence/connectors/mock.ts`
- Placeholder adapters for Open Beauty Facts, Open Food Facts, certification registries, company disclosures, and regulatory evidence
- `src/lib/evidence/normalize-evidence.ts`
- `src/lib/evidence/tiering.ts`
- `src/lib/evidence/provenance.ts`

Every sustainability fact should map to an `EvidenceItem` with source URL, source date, retrieval date, evidence tier, verification status, and confidence.
