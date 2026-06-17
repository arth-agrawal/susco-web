import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CompareProductPicker() {
  return (
    <div className="rounded-[8px] border border-dashed border-stone-300 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-stone-950">Product picker</h2>
          <p className="text-sm text-stone-600">
            Placeholder for a searchable picker. Current comparison uses mock
            products and URL ids.
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-[8px]">
          <Link href="/search">
            <Plus className="size-4" />
            Add products
          </Link>
        </Button>
      </div>
    </div>
  );
}
