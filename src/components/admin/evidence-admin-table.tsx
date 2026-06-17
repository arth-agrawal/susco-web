import { EvidenceTierBadge } from "@/components/score/evidence-tier-badge";
import type { EvidenceItem } from "@/lib/types/evidence";

export function EvidenceAdminTable({ evidence }: { evidence: EvidenceItem[] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-white/10 bg-white/[0.04] text-left text-stone-400">
            <tr>
              <th className="px-4 py-3 font-medium">Claim</th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {evidence.slice(0, 10).map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-white">{item.claim}</td>
                <td className="px-4 py-3">
                  <EvidenceTierBadge tier={item.evidenceTier} />
                </td>
                <td className="px-4 py-3 text-stone-300">
                  {item.verificationStatus.replace("_", " ")}
                </td>
                <td className="px-4 py-3 text-stone-300">{item.sourceName}</td>
                <td className="px-4 py-3 text-stone-400">{item.sourceDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
