import Link from "next/link";
import type { ReactNode } from "react";

import { ConfidencePill } from "@/components/confidence-pill";
import { PageShell } from "@/components/page-shell";
import { ScoreBadge } from "@/components/score-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockProducts } from "@/lib/data/mock-products";
import {
  formatPriceRange,
  getBestConfidenceProduct,
  getBestEvidenceProduct,
  getLowestMissingDataProduct,
} from "@/lib/utils/product";

type ComparePageProps = {
  searchParams: Promise<{ ids?: string }>;
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { ids } = await searchParams;
  const idList = ids?.split(",").filter(Boolean) ?? [];

  const products =
    idList.length > 0
      ? mockProducts.filter((p) => idList.includes(p.id))
      : mockProducts;

  const bestEvidence = getBestEvidenceProduct(products);
  const lowestMissing = getLowestMissingDataProduct(products);
  const bestConfidence = getBestConfidenceProduct(products);

  return (
    <PageShell>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              Compare products
            </h1>
            <p className="mt-1 text-stone-600">
              Side-by-side sustainability, evidence, and data gaps.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-stone-200"
          >
            <Link href="/search">Add more products</Link>
          </Button>
        </div>

        {/* Summary highlights */}
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Best sustainability evidence"
            productName={bestEvidence.name}
            detail={`${bestEvidence.evidence.length} evidence points`}
          />
          <SummaryCard
            label="Lowest missing data"
            productName={lowestMissing.name}
            detail={`${lowestMissing.missingData.length} gaps`}
          />
          <SummaryCard
            label="Best confidence"
            productName={bestConfidence.name}
            detail={`${bestConfidence.confidence} confidence`}
          />
        </div>

        {/* Comparison table */}
        <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/80">
                  <th className="px-4 py-3 text-left font-medium text-stone-500">
                    Metric
                  </th>
                  {products.map((product) => (
                    <th
                      key={product.id}
                      className="px-4 py-3 text-left font-medium text-stone-900"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        className="hover:text-susco-green"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-xs font-normal text-stone-500">
                        {product.brand}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <CompareRow
                  label="Price"
                  values={products.map((p) => formatPriceRange(p))}
                />
                <CompareRow
                  label="Rating"
                  values={products.map((p) => (
                    <ScoreBadge key={p.id} rating={p.rating} size="sm" />
                  ))}
                />
                <CompareRow
                  label="Confidence"
                  values={products.map((p) => (
                    <ConfidencePill
                      key={p.id}
                      level={p.confidence}
                      size="sm"
                      showLabel={false}
                    />
                  ))}
                />
                <CompareRow
                  label="Evidence count"
                  values={products.map((p) => String(p.evidence.length))}
                />
                <CompareRow
                  label="Missing data"
                  values={products.map((p) => String(p.missingData.length))}
                />
                <CompareRow
                  label="Short reason"
                  values={products.map((p) => (
                    <span
                      key={p.id}
                      className="line-clamp-3 text-xs leading-relaxed text-stone-600"
                    >
                      {p.shortReason}
                    </span>
                  ))}
                />
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {products.map((product) => (
            <Button
              key={product.id}
              asChild
              variant="outline"
              className="rounded-xl border-stone-200"
            >
              <Link href={`/product/${product.id}`}>
                View {product.brand} score
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function SummaryCard({
  label,
  productName,
  detail,
}: {
  label: string;
  productName: string;
  detail: string;
}) {
  return (
    <Card className="rounded-2xl border-susco-green/20 bg-susco-mint/10">
      <CardContent className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-susco-green">
          {label}
        </p>
        <p className="mt-2 font-semibold text-stone-900">{productName}</p>
        <p className="mt-0.5 text-sm text-stone-600">{detail}</p>
      </CardContent>
    </Card>
  );
}

function CompareRow({
  label,
  values,
}: {
  label: string;
  values: (string | ReactNode)[];
}) {
  return (
    <tr>
      <td className="px-4 py-4 font-medium text-stone-500">{label}</td>
      {values.map((value, i) => (
        <td key={i} className="px-4 py-4 align-top text-stone-800">
          {value}
        </td>
      ))}
    </tr>
  );
}
