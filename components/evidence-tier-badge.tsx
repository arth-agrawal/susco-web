import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { EvidenceTier } from "@/lib/types/product";

const tierDescriptions: Record<EvidenceTier, string> = {
  A: "Verified certification",
  B: "Strong third-party source",
  C: "Brand or listing disclosure",
  D: "Unverified claim",
  E: "Insufficient source",
};

const evidenceTierBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-xs font-bold",
  {
    variants: {
      tier: {
        A: "border-susco-green/30 bg-susco-green/10 text-susco-green",
        B: "border-emerald-200 bg-emerald-50 text-emerald-800",
        C: "border-amber-200 bg-amber-50 text-amber-800",
        D: "border-orange-200 bg-orange-50 text-orange-700",
        E: "border-stone-200 bg-stone-100 text-stone-500",
      },
    },
  }
);

type EvidenceTierBadgeProps = VariantProps<typeof evidenceTierBadgeVariants> & {
  tier: EvidenceTier;
  className?: string;
  showDescription?: boolean;
};

export function EvidenceTierBadge({
  tier,
  className,
  showDescription = false,
}: EvidenceTierBadgeProps) {
  return (
    <span
      className={cn(evidenceTierBadgeVariants({ tier }), className)}
      title={tierDescriptions[tier]}
    >
      Tier {tier}
      {showDescription && (
        <span className="font-sans font-normal text-[10px] opacity-70">
          · {tierDescriptions[tier]}
        </span>
      )}
    </span>
  );
}
