import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-6xl font-semibold text-susco-green">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-stone-900">
          Product not found
        </h1>
        <p className="mt-2 max-w-md text-stone-600">
          This product isn&apos;t in our catalog yet. Try searching for
          something else.
        </p>
        <Button
          asChild
          className="mt-6 rounded-xl bg-susco-green text-white hover:bg-susco-green/90"
        >
          <Link href="/search">Back to search</Link>
        </Button>
      </div>
    </PageShell>
  );
}
