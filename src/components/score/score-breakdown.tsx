import { CheckCircle2, CircleAlert, CircleDashed, MinusCircle } from "lucide-react";

import { ConfidencePill } from "@/components/score/confidence-pill";
import type { RatingDimension } from "@/lib/types/scoring";
import { cn } from "@/lib/utils";

const statusConfig = {
  positive: {
    icon: CheckCircle2,
    className: "text-emerald-700 bg-emerald-50 border-emerald-700/15",
  },
  mixed: {
    icon: CircleDashed,
    className: "text-amber-800 bg-amber-50 border-amber-700/15",
  },
  negative: {
    icon: MinusCircle,
    className: "text-red-800 bg-red-50 border-red-700/15",
  },
  missing: {
    icon: CircleAlert,
    className: "text-stone-700 bg-stone-100 border-stone-500/15",
  },
} satisfies Record<RatingDimension["status"], { icon: typeof CheckCircle2; className: string }>;

export function ScoreBreakdown({
  dimensions,
}: {
  dimensions: RatingDimension[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {dimensions.map((dimension) => {
        const config = statusConfig[dimension.status];
        const Icon = config.icon;

        return (
          <article
            key={dimension.key}
            className="rounded-[8px] border border-stone-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-[8px] border",
                    config.className
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <div>
                  <h3 className="font-medium text-stone-950">{dimension.label}</h3>
                  <p className="text-xs capitalize text-stone-500">
                    {dimension.status.replace("_", " ")}
                  </p>
                </div>
              </div>
              {dimension.score !== undefined && (
                <span className="font-mono text-sm text-stone-500">
                  {dimension.score}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {dimension.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <ConfidencePill level={dimension.confidence} size="sm" />
              <span className="text-xs text-stone-500">
                {dimension.evidenceItemIds.length} evidence refs
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
