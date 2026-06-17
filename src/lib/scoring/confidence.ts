import { confidenceLevels } from "@/config/scoring";
import type { ConfidenceLevel } from "@/lib/types/scoring";

export function compareConfidence(a: ConfidenceLevel, b: ConfidenceLevel) {
  return confidenceLevels[a].order - confidenceLevels[b].order;
}

export function confidenceToPercent(level: ConfidenceLevel) {
  return (confidenceLevels[level].order / 3) * 100;
}
