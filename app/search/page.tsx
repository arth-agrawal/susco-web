import { Suspense } from "react";

import { SearchPageContent } from "@/components/search-page-content";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-susco-cream">
          <p className="text-stone-500">Loading search…</p>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
