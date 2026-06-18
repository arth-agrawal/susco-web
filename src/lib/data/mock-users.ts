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

/** Seeded public profile for /profile/aanya preview only. Stats/badges are derived from mock choices. */
export const mockUserProfile: UserProfile = {
  id: "user-aanya",
  username: "aanya",
  displayName: "Aanya Rao",
  bio: "Beauty, denim, and coffee picks with evidence first. I save what I am considering and log better-rated swaps.",
  isPublic: true,
  memberSince: "March 2026",
  stats: emptyStats,
  badges: [],
};

export const mockProfiles = [mockUserProfile];

export function getProfileByUsername(username: string) {
  return mockProfiles.find((profile) => profile.username === username);
}
