import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptySearchState() {
  return (
    <div className="rounded-[8px] border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-[8px] bg-stone-100 text-stone-600">
        <SearchX className="size-5" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-stone-950">
        No products found
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-stone-600">
        Try a broader product type, remove a filter, or search a category like
        sunscreen, jeans, coffee, activewear, shampoo, or snacks.
      </p>
      <Button asChild className="mt-5 rounded-[8px] bg-emerald-900 text-white">
        <Link href="/search">Clear filters</Link>
      </Button>
    </div>
  );
}
