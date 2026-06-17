import Link from "next/link";

import { categories } from "@/config/categories";
import { cn } from "@/lib/utils";

export function CategoryChips({ active }: { active?: string }) {
  const items = [{ href: "/search", label: "All", key: "All" }].concat(
    categories.map((category) => ({
      href: `/search?category=${category.shortLabel}`,
      label: category.shortLabel,
      key: category.shortLabel,
    }))
  );

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            (active ?? "All") === item.key
              ? "border-emerald-800/20 bg-emerald-50 text-emerald-900"
              : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-950"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
