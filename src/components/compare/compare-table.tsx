import Link from "next/link";
import type { ReactNode } from "react";

import { ConfidencePill } from "@/components/score/confidence-pill";
import { ScoreBadge } from "@/components/score/score-badge";
import type { Product } from "@/lib/types/product";
import { formatPriceRange, getPlatformLabel } from "@/lib/utils/product";

export function CompareTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-stone-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="w-48 px-4 py-3 text-left font-medium text-stone-500">
                Metric
              </th>
              {products.map((product) => (
                <th
                  key={product.id}
                  className="px-4 py-3 text-left align-top font-medium text-stone-950"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="hover:text-emerald-900"
                  >
                    {product.canonicalName}
                  </Link>
                  <p className="mt-0.5 text-xs font-normal text-stone-500">
                    {product.brandName}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            <CompareRow
              label="Price range"
              values={products.map((product) => formatPriceRange(product))}
            />
            <CompareRow
              label="Platforms"
              values={products.map((product) => getPlatformLabel(product))}
            />
            <CompareRow
              label="Rating"
              values={products.map((product) => (
                <ScoreBadge
                  key={product.id}
                  band={product.rating.band}
                  numericScore={product.rating.numericScore}
                  size="sm"
                />
              ))}
            />
            <CompareRow
              label="Confidence"
              values={products.map((product) => (
                <ConfidencePill
                  key={product.id}
                  level={product.rating.confidence}
                  size="sm"
                  showLabel={false}
                />
              ))}
            />
            <CompareRow
              label="Evidence count"
              values={products.map((product) =>
                String(product.rating.evidenceItemIds.length)
              )}
            />
            <CompareRow
              label="Missing data count"
              values={products.map((product) =>
                String(product.rating.missingData.length)
              )}
            />
            <CompareRow
              label="Short reason"
              values={products.map((product) => (
                <span
                  key={product.id}
                  className="line-clamp-4 text-xs leading-relaxed text-stone-600"
                >
                  {product.rating.shortReason}
                </span>
              ))}
            />
            <CompareRow
              label="Product factors"
              values={products.map((product) => (
                <FactorList key={product.id} items={product.productFactors} />
              ))}
            />
            <CompareRow
              label="Brand factors"
              values={products.map((product) => (
                <FactorList key={product.id} items={product.brandFactors} />
              ))}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompareRow({
  label,
  values,
}: {
  label: string;
  values: ReactNode[];
}) {
  return (
    <tr>
      <td className="px-4 py-4 align-top font-medium text-stone-500">{label}</td>
      {values.map((value, index) => (
        <td key={index} className="px-4 py-4 align-top text-stone-800">
          {value}
        </td>
      ))}
    </tr>
  );
}

function FactorList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 text-xs leading-relaxed text-stone-600">
      {items.slice(0, 3).map((item) => (
        <li key={item}>- {item}</li>
      ))}
    </ul>
  );
}
