import { ShieldCheck } from "lucide-react";

import { confidenceLevels } from "@/config/scoring";
import type { ConfidenceLevel } from "@/lib/types/scoring";
import { cn } from "@/lib/utils";

type ConfidencePillProps = {
  level: ConfidenceLevel;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
};

export function ConfidencePill({
  level,
  size = "md",
  showLabel = true,
  className,
}: ConfidencePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        confidenceLevels[level].className,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        className
      )}
    >
      <ShieldCheck className={cn(size === "sm" ? "size-3" : "size-3.5")} />
      {showLabel ? confidenceLevels[level].label : level}
    </span>
  );
}
