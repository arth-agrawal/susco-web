import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-[8px] bg-stone-100 text-stone-600">
        <SearchX className="size-6" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold text-stone-950">
        Product not found
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        This score page does not exist in the current mock product index.
        Search the available seed catalog instead.
      </p>
      <Button asChild className="mt-5 rounded-[8px] bg-emerald-900 text-white">
        <Link href="/search">Back to search</Link>
      </Button>
    </div>
  );
}
