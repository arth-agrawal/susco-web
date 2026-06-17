import { Progress } from "@/components/ui/progress";
import type { TrackerStats } from "@/lib/types/tracker";

export function TrackerSummary({ stats }: { stats: TrackerStats }) {
  return (
    <section className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-stone-950">
            Category progress
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Your choices become your sustainability profile.
          </p>
        </div>
        <p className="text-sm font-medium text-emerald-900">
          {stats.publicStreak} day checking streak
        </p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {stats.categoryProgress.map((category) => (
          <div key={category.categoryId} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-stone-800">{category.label}</span>
              <span className="text-stone-500">{category.progress}%</span>
            </div>
            <Progress value={category.progress} />
            <p className="text-xs text-stone-500">
              {category.checked} checked · {category.betterChoices} better choices
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
