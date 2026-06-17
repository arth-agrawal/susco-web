import { ExternalLink } from "lucide-react";

import { EvidenceTierBadge } from "@/components/score/evidence-tier-badge";
import type { EvidenceItem } from "@/lib/types/evidence";

export function EvidenceList({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="divide-y divide-stone-100 rounded-[8px] border border-stone-200 bg-white">
      {items.map((item) => (
        <article key={item.id} className="grid gap-3 p-4 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium text-stone-950">{item.claim}</h3>
              <EvidenceTierBadge tier={item.evidenceTier} />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">
              {item.summary}
            </p>
            <p className="mt-2 text-xs text-stone-500">
              {item.sourceName} · {item.sourceDate} · {item.verificationStatus.replace("_", " ")}
            </p>
          </div>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-stone-200 px-3 text-sm font-medium text-stone-700 transition-colors hover:border-emerald-800/20 hover:text-emerald-800"
          >
            Source
            <ExternalLink className="size-3.5" />
          </a>
        </article>
      ))}
    </div>
  );
}
