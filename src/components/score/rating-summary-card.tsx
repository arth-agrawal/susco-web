import { ScoreBadge } from "@/components/score/score-badge";
import { ConfidencePill } from "@/components/score/confidence-pill";
import type { SustainabilityRating } from "@/lib/types/scoring";

export function RatingSummaryCard({ rating }: { rating: SustainabilityRating }) {
  return (
    <section className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <ScoreBadge
          band={rating.band}
          numericScore={rating.numericScore}
          size="lg"
        />
        <ConfidencePill level={rating.confidence} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-stone-700">
        {rating.explanation}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-[8px] bg-stone-50 p-3">
          <p className="font-mono text-lg text-stone-950">
            {rating.perDimension.length}
          </p>
          <p className="text-xs text-stone-500">dimensions</p>
        </div>
        <div className="rounded-[8px] bg-stone-50 p-3">
          <p className="font-mono text-lg text-stone-950">
            {rating.evidenceItemIds.length}
          </p>
          <p className="text-xs text-stone-500">evidence</p>
        </div>
        <div className="rounded-[8px] bg-stone-50 p-3">
          <p className="font-mono text-lg text-stone-950">
            {rating.missingData.length}
          </p>
          <p className="text-xs text-stone-500">gaps</p>
        </div>
      </div>
    </section>
  );
}
