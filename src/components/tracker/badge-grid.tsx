import { Award, Lock } from "lucide-react";

import type { UserBadge } from "@/lib/types/tracker";
import { cn } from "@/lib/utils";

const toneClass: Record<UserBadge["tone"], string> = {
  green: "border-emerald-800/15 bg-emerald-50 text-emerald-900",
  mint: "border-lime-700/15 bg-lime-50 text-lime-900",
  amber: "border-amber-700/15 bg-amber-50 text-amber-900",
  stone: "border-stone-300 bg-stone-100 text-stone-800",
};

export function BadgeGrid({ badges }: { badges: UserBadge[] }) {
  const unlocked = badges.filter((badge) => badge.unlockedAt);

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-xl font-semibold text-stone-950">Badges</h2>
        <p className="text-sm text-stone-500">
          {unlocked.length} of {badges.length} unlocked
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((badge) => {
          const isUnlocked = Boolean(badge.unlockedAt);
          return (
            <article
              key={badge.id}
              className={cn(
                "rounded-[8px] border p-4 transition-opacity",
                isUnlocked ? toneClass[badge.tone] : "border-stone-200 bg-stone-50 opacity-70"
              )}
            >
              {isUnlocked ? (
                <Award className="size-5" />
              ) : (
                <Lock className="size-5 text-stone-400" />
              )}
              <h3 className="mt-3 font-semibold">{badge.label}</h3>
              <p className="mt-1 text-sm opacity-80">{badge.description}</p>
              {isUnlocked ? (
                <p className="mt-2 text-xs opacity-60">
                  Unlocked {badge.unlockedAt}
                </p>
              ) : (
                <p className="mt-2 text-xs text-stone-500">Locked</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
