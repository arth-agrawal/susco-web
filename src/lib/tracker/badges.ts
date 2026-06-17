import type { UserBadge } from "@/lib/types/tracker";

export function getUnlockedBadges(badges: UserBadge[]) {
  return badges.filter((badge) => Boolean(badge.unlockedAt));
}
