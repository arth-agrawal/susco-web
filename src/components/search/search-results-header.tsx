import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SearchResultsHeader({
  total,
  query,
}: {
  total: number;
  query?: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-stone-500">
          {total} {total === 1 ? "result" : "results"}
          {query ? ` for "${query}"` : ""}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
          Sustainability-scored product search
        </h1>
      </div>
      <Button asChild variant="outline" className="rounded-[8px]">
        <Link href="/compare">Compare current set</Link>
      </Button>
    </div>
  );
}
