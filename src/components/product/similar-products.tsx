import { ProductGrid } from "@/components/product/product-grid";
import type { Product } from "@/lib/types/product";

export function SimilarProducts({ products }: { products: Product[] }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-stone-950">
          Similar / better alternatives
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Similarity prioritizes category, price range, different brands, rating
          strength, and confidence.
        </p>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
