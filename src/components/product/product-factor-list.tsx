import { Building2, Package } from "lucide-react";
import type { ReactNode } from "react";

export function ProductFactorList({
  productFactors,
  brandFactors,
}: {
  productFactors: string[];
  brandFactors: string[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <FactorGroup
        icon={<Package className="size-4" />}
        title="Product-level factors"
        items={productFactors}
      />
      <FactorGroup
        icon={<Building2 className="size-4" />}
        title="Brand / company factors"
        items={brandFactors}
      />
    </div>
  );
}

function FactorGroup({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="flex items-center gap-2 font-semibold text-stone-950">
        <span className="flex size-8 items-center justify-center rounded-[8px] bg-emerald-50 text-emerald-900">
          {icon}
        </span>
        {title}
      </h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-stone-700">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-800" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
