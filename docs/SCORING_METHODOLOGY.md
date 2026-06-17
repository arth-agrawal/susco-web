# Scoring Methodology

The current implementation uses a versioned scoring abstraction and seed ratings. It does not hide a hardcoded scoring algorithm inside UI components.

Key files:
- `src/lib/types/scoring.ts`
- `src/lib/scoring/dimensions.ts`
- `src/lib/scoring/reason-codes.ts`
- `src/lib/scoring/confidence.ts`
- `src/lib/scoring/rating-utils.ts`
- `src/lib/scoring/score-assembler.ts`
- `src/config/scoring.ts`

Rating output supports:
- Band: Excellent, Strong, Moderate, Weak, Insufficient Evidence
- Confidence: High, Medium, Low
- Optional numeric score
- Dimension breakdown
- Reason codes
- Explanation and short reason
- Evidence references
- Missing data
- Rating version and update date

The methodology is category-specific. Beauty, fashion, and food each have their own dimension set in `src/lib/scoring/dimensions.ts`. Missing data is visible and reduces confidence.
