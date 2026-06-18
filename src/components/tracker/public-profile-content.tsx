"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BadgeGrid } from "@/components/tracker/badge-grid";
import { ProfileHeader } from "@/components/tracker/profile-header";
import { ShareCardPreview } from "@/components/tracker/share-card-preview";
import { TrackerProductList } from "@/components/tracker/tracker-product-list";
import { TrackerStats } from "@/components/tracker/tracker-stats";
import { getAllProducts } from "@/lib/services/product-service";
import { deriveBadges } from "@/lib/tracker/badges";
import { deriveTrackerStats } from "@/lib/tracker/stats";
import {
  groupTrackedProducts,
  toTrackedProducts,
} from "@/lib/tracker/tracker-utils";
import type { UserChoice, UserProfile } from "@/lib/types/tracker";

type PublicProfileContentProps = {
  profile: UserProfile;
  choices: UserChoice[];
};

export function PublicProfileContent({
  profile,
  choices,
}: PublicProfileContentProps) {
  const products = getAllProducts();
  const stats = deriveTrackerStats(choices, products);
  const badges = deriveBadges(choices, products);
  const tracked = toTrackedProducts(choices);
  const groups = groupTrackedProducts(tracked);

  const enrichedProfile: UserProfile = {
    ...profile,
    stats,
    badges,
  };

  return (
    <div className="space-y-8">
      <ProfileHeader profile={enrichedProfile} publicView />
      <div className="rounded-[8px] border border-stone-200 bg-white p-4 text-sm text-stone-600 shadow-sm">
        <p className="font-medium text-stone-900">Public profile preview</p>
        <p className="mt-1 leading-relaxed">
          This page shows @{profile.username}&apos;s seeded demo choices only.
          It is separate from your device-local tracker at{" "}
          <Link href="/tracker" className="font-medium text-emerald-900 hover:underline">
            /tracker
          </Link>
          .
        </p>
      </div>
      <TrackerStats stats={stats} />
      <ShareCardPreview profile={enrichedProfile} />
      <BadgeGrid badges={badges} />
      {choices.length === 0 ? (
        <div className="rounded-[8px] border border-dashed border-stone-300 bg-white px-6 py-12 text-center text-sm text-stone-600">
          No public choices logged yet.
        </div>
      ) : (
        <>
          <TrackerProductList action="bought" items={groups.bought} />
          <TrackerProductList action="saved" items={groups.saved} />
          <TrackerProductList action="avoided" items={groups.avoided} />
        </>
      )}
      <Link
        href="/tracker"
        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-900 hover:underline"
      >
        Open your local tracker
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
