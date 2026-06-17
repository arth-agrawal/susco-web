import type { Product } from "@/lib/types/product";

export function RatingReviewCard({ product }: { product: Product }) {
  return (
    <article className="rounded-[8px] border border-amber-400/20 bg-amber-400/10 p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-amber-200">
        Rating review queue
      </p>
      <h3 className="mt-2 font-semibold text-white">{product.canonicalName}</h3>
      <p className="mt-1 text-sm leading-relaxed text-stone-300">
        {product.rating.missingData.length} missing-data fields and{" "}
        {product.rating.confidence} confidence. Review evidence provenance
        before methodology updates.
      </p>
    </article>
  );
}
