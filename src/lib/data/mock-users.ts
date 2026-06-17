import type { UserProfile } from "@/lib/types/tracker";

export const mockUserProfile: UserProfile = {
  id: "user-aanya",
  username: "aanya",
  displayName: "Aanya Rao",
  bio: "Beauty, denim, and coffee picks with evidence first. I save what I am considering and log better-rated swaps.",
  isPublic: true,
  memberSince: "March 2026",
  stats: {
    productsChecked: 128,
    choicesSaved: 34,
    betterChoices: 19,
    averageRating: "Strong",
    publicStreak: 7,
    categoryProgress: [
      {
        categoryId: "beauty",
        label: "Beauty",
        checked: 46,
        betterChoices: 9,
        progress: 72,
      },
      {
        categoryId: "fashion",
        label: "Fashion",
        checked: 39,
        betterChoices: 5,
        progress: 54,
      },
      {
        categoryId: "food",
        label: "Food",
        checked: 43,
        betterChoices: 5,
        progress: 61,
      },
    ],
  },
  badges: [
    {
      id: "evidence-reader",
      label: "Evidence Reader",
      description: "Opened 25 evidence-backed score pages.",
      unlockedAt: "2026-05-18",
      tone: "green",
    },
    {
      id: "better-swap",
      label: "Better Swap",
      description: "Logged five stronger-rated alternatives.",
      unlockedAt: "2026-05-29",
      tone: "mint",
    },
    {
      id: "missing-data-spotter",
      label: "Data Gap Spotter",
      description: "Saved products where missing data changed confidence.",
      unlockedAt: "2026-06-02",
      tone: "amber",
    },
    {
      id: "category-explorer",
      label: "Category Explorer",
      description: "Checked products across all three launch categories.",
      unlockedAt: "2026-06-05",
      tone: "stone",
    },
  ],
};

export const mockProfiles = [mockUserProfile];

export function getProfileByUsername(username: string) {
  return mockProfiles.find((profile) => profile.username === username);
}
