import type { SustainabilityRating } from "@/lib/types/scoring";

export type UserChoiceAction = "saved" | "bought" | "avoided" | "compared";

export type UserChoice = {
  id: string;
  userId: string;
  productId: string;
  action: UserChoiceAction;
  ratingAtTime: SustainabilityRating;
  note?: string;
  createdAt: string;
};

export type TrackerStats = {
  productsChecked: number;
  choicesSaved: number;
  betterChoices: number;
  averageRating: string;
  publicStreak: number;
  categoryProgress: Array<{
    categoryId: string;
    label: string;
    checked: number;
    betterChoices: number;
    progress: number;
  }>;
};

export type UserBadge = {
  id: string;
  label: string;
  description: string;
  unlockedAt?: string;
  tone: "green" | "mint" | "amber" | "stone";
};

export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  isPublic: boolean;
  memberSince: string;
  stats: TrackerStats;
  badges: UserBadge[];
};
