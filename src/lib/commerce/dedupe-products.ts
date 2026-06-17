import type { Product } from "@/lib/types/product";

export function dedupeProducts(products: Product[]) {
  const seen = new Set<string>();
  return products.filter((product) => {
    const key = `${product.brandName}-${product.canonicalName}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
