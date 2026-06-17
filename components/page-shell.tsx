import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function PageShell({
  children,
  className,
  containerClassName,
}: PageShellProps) {
  return (
    <div className={cn("min-h-screen bg-susco-cream", className)}>
      <SiteHeader />
      <main
        className={cn(
          "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12",
          containerClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}
