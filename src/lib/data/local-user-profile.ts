import { LOCAL_USER_ID } from "@/lib/tracker/tracker-store";
import type { UserProfile } from "@/lib/types/tracker";

const emptyStats: UserProfile["stats"] = {
  productsChecked: 0,
  choicesSaved: 0,
  boughtCount: 0,
  avoidedCount: 0,
  comparedCount: 0,
  betterChoices: 0,
  averageRating: "Insufficient Evidence",
  publicStreak: 0,
  categoryProgress: [],
};

/** Device-local tracker identity — not a seeded public profile. */
export const localUserProfile: UserProfile = {
  id: LOCAL_USER_ID,
  username: "you",
  displayName: "Your SusCo Profile",
  bio: "Track what you check, save, buy, and avoid.",
  isPublic: false,
  memberSince: "This device",
  stats: emptyStats,
  badges: [],
};
