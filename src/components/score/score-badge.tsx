import { ratingBands } from "@/config/scoring";
import type { SustainabilityBand } from "@/lib/types/scoring";
import { cn } from "@/lib/utils";

type ScoreBadgeProps = {
  band: SustainabilityBand;
  numericScore?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function ScoreBadge({
  band,
  numericScore,
  size = "md",
  className,
}: ScoreBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1 font-medium ring-1",
        ratingBands[band].className,
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        size === "lg" && "px-3 py-1.5 text-base",
        className
      )}
    >
      <span>{band}</span>
      {numericScore !== undefined && (
        <span className="font-mono text-[0.85em] opacity-70">{numericScore}</span>
      )}
    </span>
  );
}
