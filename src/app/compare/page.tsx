import Link from "next/link";

import { ComparePageContent } from "@/components/compare/compare-page-content";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

type ComparePageProps = {
  searchParams: Promise<{ ids?: string }>;
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { ids } = await searchParams;
  const initialUrlIds = ids?.split(",").filter(Boolean) ?? [];

  return (
    <PageShell>
      <div className="space-y-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-900">
              Current available evidence
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-950">
              Compare products
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
              Comparison is based on the current evidence corpus, confidence
              level, and missing data. It is not a sponsored ranking.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-[8px]">
            <Link href="/search">Back to search</Link>
          </Button>
        </div>
        <ComparePageContent initialUrlIds={initialUrlIds} />
      </div>
    </PageShell>
  );
}
