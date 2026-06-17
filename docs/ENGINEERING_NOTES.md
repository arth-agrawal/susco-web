# Engineering Notes

The codebase is organized around the requested `src/` architecture:

- `src/app`: Next.js App Router pages
- `src/components`: reusable layout, marketing, search, product, score, compare, tracker, admin, and shadcn UI components
- `src/lib/types`: strong domain types
- `src/lib/data`: seed products, evidence, tracker, users, sources, and categories
- `src/lib/search`: query parsing, filters, search service, and similarity
- `src/lib/scoring`: scoring dimensions, reason codes, confidence, rating utilities, and score assembler
- `src/lib/commerce`: connector interfaces, mock connector, placeholders, normalization, dedupe
- `src/lib/evidence`: evidence connector interfaces, mock connector, placeholders, normalization, tiering, provenance
- `src/config`: site, navigation, categories, scoring presentation config

The app uses mock data only and requires no API keys. Real connectors should be added behind the existing connector interfaces, with server-side scoring kept out of UI components.
