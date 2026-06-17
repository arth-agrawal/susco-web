import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { ConfidenceLevel } from "@/lib/types/product";

const confidencePillVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
  {
    variants: {
      level: {
        High: "border-susco-mint/40 bg-susco-mint/20 text-susco-green",
        Medium: "border-amber-200 bg-amber-50 text-amber-800",
        Low: "border-orange-200 bg-orange-50 text-orange-700",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-[11px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type ConfidencePillProps = VariantProps<typeof confidencePillVariants> & {
  level: ConfidenceLevel;
  className?: string;
  showLabel?: boolean;
};

export function ConfidencePill({
  level,
  size,
  className,
  showLabel = true,
}: ConfidencePillProps) {
  return (
    <span className={cn(confidencePillVariants({ level, size }), className)}>
      {showLabel && <span className="opacity-60">Confidence</span>}
      <span>{level}</span>
    </span>
  );
}
