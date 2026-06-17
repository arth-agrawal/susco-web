import { evidenceTiers } from "@/config/scoring";
import type { EvidenceTier } from "@/lib/types/evidence";
import { cn } from "@/lib/utils";

type EvidenceTierBadgeProps = {
  tier: EvidenceTier;
  showDescription?: boolean;
  className?: string;
};

export function EvidenceTierBadge({
  tier,
  showDescription = false,
  className,
}: EvidenceTierBadgeProps) {
  const config = evidenceTiers[tier];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {tier}
      {showDescription && (
        <span className="hidden max-w-56 truncate opacity-80 sm:inline">
          {config.description}
        </span>
      )}
    </span>
  );
}
