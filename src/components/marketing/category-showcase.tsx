import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { categories } from "@/config/categories";

export function CategoryShowcase() {
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
            Explore by category
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Category-specific scoring today; deeper methodology versions later.
          </p>
        </div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm font-medium text-emerald-900"
        >
          All categories
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/search?category=${category.shortLabel}`}
            className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm font-medium text-emerald-900">
              {category.shortLabel}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-stone-950">
              {category.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {category.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.productTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600"
                >
                  {type}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
