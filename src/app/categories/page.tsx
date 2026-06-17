import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { categories, futureCategories } from "@/config/categories";

export default function CategoriesPage() {
  return (
    <PageShell>
      <div className="space-y-8">
        <div>
          <p className="text-sm font-medium text-emerald-900">
            Category-specific methodology
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-950">
            Explore categories
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
            SusCo starts with beauty, fashion, and food because the evidence
            dimensions differ by product type.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/search?category=${category.shortLabel}`}
              className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-medium text-emerald-900">
                {category.shortLabel}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-stone-950">
                {category.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {category.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-900">
                Browse products
                <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>

        <section className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-stone-950">Future categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {futureCategories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-600"
              >
                {category}
              </span>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
