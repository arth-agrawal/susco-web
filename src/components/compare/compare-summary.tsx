import { BarChart3, ShieldCheck, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

import type { Product } from "@/lib/types/product";

export function CompareSummary({
  bestEvidence,
  bestConfidence,
  lowestMissing,
}: {
  bestEvidence: Product;
  bestConfidence: Product;
  lowestMissing: Product;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <SummaryCard
        icon={<BarChart3 className="size-4" />}
        label="Best sustainability evidence"
        value={bestEvidence.canonicalName}
        detail={`${bestEvidence.rating.evidenceItemIds.length} evidence refs`}
      />
      <SummaryCard
        icon={<ShieldCheck className="size-4" />}
        label="Highest confidence"
        value={bestConfidence.canonicalName}
        detail={`${bestConfidence.rating.confidence} confidence`}
      />
      <SummaryCard
        icon={<TriangleAlert className="size-4" />}
        label="Lowest missing data"
        value={lowestMissing.canonicalName}
        detail={`${lowestMissing.rating.missingData.length} missing fields`}
      />
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-[8px] border border-emerald-900/10 bg-emerald-50 p-4">
      <div className="flex items-center gap-2 text-emerald-900">
        {icon}
        <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
      </div>
      <p className="mt-2 font-semibold text-stone-950">{value}</p>
      <p className="text-sm text-stone-600">{detail}</p>
    </article>
  );
}
