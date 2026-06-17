import type { EvidenceItem, EvidenceTier } from "@/lib/types/evidence";

export function getStrongestEvidenceTier(items: EvidenceItem[]): EvidenceTier {
  const order: EvidenceTier[] = ["A", "B", "C", "D", "E"];
  return (
    [...items].sort(
      (a, b) => order.indexOf(a.evidenceTier) - order.indexOf(b.evidenceTier)
    )[0]?.evidenceTier ?? "E"
  );
}
