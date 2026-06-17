import { AlertTriangle } from "lucide-react";

export function MissingDataCard({ items }: { items: string[] }) {
  return (
    <section className="rounded-[8px] border border-amber-700/15 bg-amber-50 p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-amber-100 text-amber-800">
          <AlertTriangle className="size-4" />
        </span>
        <div>
          <h2 className="font-semibold text-amber-950">Missing data</h2>
          <p className="mt-1 text-sm leading-relaxed text-amber-900/80">
            Missing data is shown because it reduces confidence. SusCo does not
            fill sustainability gaps with invented facts.
          </p>
        </div>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-[8px] border border-amber-700/10 bg-white/70 px-3 py-2 text-sm text-stone-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
