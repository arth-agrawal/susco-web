import Link from "next/link";

import { ScoreBadge } from "@/components/score/score-badge";
import type { Product } from "@/lib/types/product";

export function ProductAdminTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-white/10 bg-white/[0.04] text-left text-stone-400">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium">Evidence</th>
              <th className="px-4 py-3 font-medium">Missing</th>
              <th className="px-4 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-medium text-white hover:text-lime-200"
                  >
                    {product.canonicalName}
                  </Link>
                  <p className="text-xs text-stone-500">{product.brandName}</p>
                </td>
                <td className="px-4 py-3 text-stone-300">{product.productType}</td>
                <td className="px-4 py-3">
                  <ScoreBadge band={product.rating.band} size="sm" />
                </td>
                <td className="px-4 py-3 text-stone-300">
                  {product.rating.evidenceItemIds.length}
                </td>
                <td className="px-4 py-3 text-stone-300">
                  {product.rating.missingData.length}
                </td>
                <td className="px-4 py-3 text-stone-400">{product.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
