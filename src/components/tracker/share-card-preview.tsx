import { Award, Sparkles } from "lucide-react";

import type { UserProfile } from "@/lib/types/tracker";

export function ShareCardPreview({ profile }: { profile: UserProfile }) {
  return (
    <section className="overflow-hidden rounded-[8px] border border-emerald-900/20 bg-stone-950 text-white shadow-lg">
      <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-lime-200">
            <Sparkles className="size-3.5" />
            SusCo monthly card
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            {profile.stats.betterChoices} better choices logged
          </h2>
          <p className="mt-2 text-sm text-stone-300">
            {profile.stats.productsChecked} products checked · average{" "}
            {profile.stats.averageRating} rating · confidence shown on every
            score.
          </p>
        </div>
        <div className="flex size-20 items-center justify-center rounded-[8px] border border-white/10 bg-white/10 text-lime-200">
          <Award className="size-10" />
        </div>
      </div>
    </section>
  );
}
