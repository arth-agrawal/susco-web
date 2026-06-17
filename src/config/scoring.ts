import type { ConfidenceLevel, SustainabilityBand } from "@/lib/types/scoring";
import type { EvidenceTier } from "@/lib/types/evidence";

export const ratingBands: Record<
  SustainabilityBand,
  { order: number; label: string; description: string; className: string }
> = {
  Excellent: {
    order: 5,
    label: "Excellent",
    description: "Strong evidence, high-performing category fit.",
    className:
      "border-emerald-600/20 bg-emerald-50 text-emerald-800 ring-emerald-600/10",
  },
  Strong: {
    order: 4,
    label: "Strong",
    description: "Good evidence with manageable gaps.",
    className:
      "border-lime-700/20 bg-lime-50 text-lime-800 ring-lime-700/10",
  },
  Moderate: {
    order: 3,
    label: "Moderate",
    description: "Some useful evidence, but relevant gaps remain.",
    className:
      "border-amber-600/20 bg-amber-50 text-amber-800 ring-amber-600/10",
  },
  Weak: {
    order: 2,
    label: "Weak",
    description: "Limited product-level evidence or weak disclosure.",
    className:
      "border-red-700/20 bg-red-50 text-red-800 ring-red-700/10",
  },
  "Insufficient Evidence": {
    order: 1,
    label: "Insufficient Evidence",
    description: "Not enough sourced evidence to rate confidently.",
    className:
      "border-stone-500/20 bg-stone-100 text-stone-700 ring-stone-500/10",
  },
};

export const confidenceLevels: Record<
  ConfidenceLevel,
  { order: number; label: string; className: string }
> = {
  High: {
    order: 3,
    label: "High confidence",
    className: "border-emerald-600/20 bg-emerald-50 text-emerald-800",
  },
  Medium: {
    order: 2,
    label: "Medium confidence",
    className: "border-amber-600/20 bg-amber-50 text-amber-800",
  },
  Low: {
    order: 1,
    label: "Low confidence",
    className: "border-red-700/20 bg-red-50 text-red-800",
  },
};

export const evidenceTiers: Record<
  EvidenceTier,
  { label: string; description: string; className: string }
> = {
  A: {
    label: "Tier A",
    description: "Audited certification, regulator, or primary report.",
    className: "border-emerald-600/20 bg-emerald-50 text-emerald-800",
  },
  B: {
    label: "Tier B",
    description: "Trusted registry or structured third-party source.",
    className: "border-lime-700/20 bg-lime-50 text-lime-800",
  },
  C: {
    label: "Tier C",
    description: "Brand or marketplace source with useful detail.",
    className: "border-sky-700/20 bg-sky-50 text-sky-800",
  },
  D: {
    label: "Tier D",
    description: "Unverified claim, partial listing, or manual note.",
    className: "border-amber-600/20 bg-amber-50 text-amber-800",
  },
  E: {
    label: "Tier E",
    description: "Missing, contradicted, stale, or unusable evidence.",
    className: "border-stone-500/20 bg-stone-100 text-stone-700",
  },
};
