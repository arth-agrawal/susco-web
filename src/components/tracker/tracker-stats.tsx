import type { TrackerStats as TrackerStatsType } from "@/lib/types/tracker";

export function TrackerStats({ stats }: { stats: TrackerStatsType }) {
  const items = [
    { label: "Products checked", value: stats.productsChecked },
    { label: "Saved", value: stats.choicesSaved },
    { label: "Bought", value: stats.boughtCount },
    { label: "Avoided", value: stats.avoidedCount },
    { label: "Compared", value: stats.comparedCount },
    { label: "Better choices", value: stats.betterChoices },
    { label: "Average rating", value: stats.averageRating },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-[8px] border border-stone-200 bg-white p-4 shadow-sm"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            {item.label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
            {item.value}
          </p>
        </article>
      ))}
    </div>
  );
}
