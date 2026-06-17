"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { BadgeGrid } from "@/components/tracker/badge-grid";
import { ProfileHeader } from "@/components/tracker/profile-header";
import { ShareCardPreview } from "@/components/tracker/share-card-preview";
import { TrackerProductList } from "@/components/tracker/tracker-product-list";
import { TrackerStats } from "@/components/tracker/tracker-stats";
import { TrackerSummary } from "@/components/tracker/tracker-summary";
import { Button } from "@/components/ui/button";
import { useTrackerChoices } from "@/hooks/use-tracker-choices";
import { mockUserProfile } from "@/lib/data/mock-users";
import { getAllProducts } from "@/lib/services/product-service";
import { deriveBadges } from "@/lib/tracker/badges";
import { deriveTrackerStats } from "@/lib/tracker/stats";
import {
  groupTrackedProducts,
  toTrackedProducts,
} from "@/lib/tracker/tracker-utils";
import type { UserProfile } from "@/lib/types/tracker";

export function TrackerPageContent() {
  const choices = useTrackerChoices();
  const products = getAllProducts();
  const tracked = toTrackedProducts(choices);
  const groups = groupTrackedProducts(tracked);
  const stats = deriveTrackerStats(choices, products);
  const badges = deriveBadges(choices, products);

  const profile: UserProfile = {
    ...mockUserProfile,
    stats,
    badges,
  };

  if (choices.length === 0) {
    return (
      <div className="space-y-8">
        <ProfileHeader profile={profile} />
        <TrackerEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProfileHeader profile={profile} />
      <p className="text-sm text-stone-600">
        Track what you check, save, buy, and avoid. Your choices become your
        sustainability profile.
      </p>
      <TrackerStats stats={stats} />
      <TrackerSummary stats={stats} />
      <ShareCardPreview profile={profile} />
      <TrackerProductList action="bought" items={groups.bought} />
      <TrackerProductList action="saved" items={groups.saved} />
      <TrackerProductList action="avoided" items={groups.avoided} />
      <TrackerProductList action="compared" items={groups.compared} />
      <BadgeGrid badges={badges} />
    </div>
  );
}

function TrackerEmptyState() {
  return (
    <div className="rounded-[8px] border border-dashed border-stone-300 bg-white px-6 py-16 text-center shadow-sm">
      <p className="text-lg font-semibold text-stone-950">
        Start by saving a product from search
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
        Save, mark bought, or avoid products to build your sustainability
        tracker. Your stats and badges update as you log choices.
      </p>
      <Button
        asChild
        className="mt-6 rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950"
      >
        <Link href="/search">
          <Search className="size-4" />
          Search products
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
