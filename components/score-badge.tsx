import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { SustainabilityBand } from "@/lib/types/product";

const scoreBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      rating: {
        Excellent: "bg-susco-green text-white",
        Strong: "bg-susco-green/15 text-susco-green",
        Moderate: "bg-amber-100 text-amber-800",
        Weak: "bg-orange-100 text-orange-800",
        "Insufficient Evidence": "bg-stone-200 text-stone-600",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type ScoreBadgeProps = VariantProps<typeof scoreBadgeVariants> & {
  rating: SustainabilityBand;
  className?: string;
  showDot?: boolean;
};

export function ScoreBadge({
  rating,
  size,
  className,
  showDot = true,
}: ScoreBadgeProps) {
  return (
    <span className={cn(scoreBadgeVariants({ rating, size }), className)}>
      {showDot && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            rating === "Excellent" && "bg-white/80",
            rating === "Strong" && "bg-susco-green",
            rating === "Moderate" && "bg-amber-500",
            rating === "Weak" && "bg-orange-500",
            rating === "Insufficient Evidence" && "bg-stone-400"
          )}
        />
      )}
      {rating}
    </span>
  );
}
