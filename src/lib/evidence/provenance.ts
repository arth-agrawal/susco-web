import type { EvidenceItem } from "@/lib/types/evidence";

export function hasSourceLink(item: EvidenceItem) {
  return item.sourceUrl.startsWith("https://");
}

export function getEvidenceProvenanceLabel(item: EvidenceItem) {
  return `${item.sourceName} · ${item.sourceDate}`;
}
