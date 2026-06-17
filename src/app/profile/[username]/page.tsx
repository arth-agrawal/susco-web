import { notFound } from "next/navigation";

import { BadgeGrid } from "@/components/tracker/badge-grid";
import { ProfileHeader } from "@/components/tracker/profile-header";
import { ShareCardPreview } from "@/components/tracker/share-card-preview";
import { TrackerProductList } from "@/components/tracker/tracker-product-list";
import { TrackerStats } from "@/components/tracker/tracker-stats";
import { PageShell } from "@/components/layout/page-shell";
import { mockTrackedProducts } from "@/lib/data/mock-tracker";
import { getProfileByUsername, mockProfiles } from "@/lib/data/mock-users";
import { groupTrackedProducts } from "@/lib/tracker/tracker-utils";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export function generateStaticParams() {
  return mockProfiles.map((profile) => ({ username: profile.username }));
}

export default async function PublicProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = getProfileByUsername(username);

  if (!profile) notFound();

  const groups = groupTrackedProducts(mockTrackedProducts);

  return (
    <PageShell>
      <div className="space-y-8">
        <ProfileHeader profile={profile} publicView />
        <div className="rounded-[8px] border border-stone-200 bg-white p-4 text-sm text-stone-600 shadow-sm">
          Privacy placeholder: profile visibility is public/private-ready, but
          real auth and privacy controls are not wired in this mock build.
        </div>
        <TrackerStats stats={profile.stats} />
        <ShareCardPreview profile={profile} />
        <BadgeGrid badges={profile.badges} />
        <TrackerProductList action="bought" items={groups.bought} />
        <TrackerProductList action="saved" items={groups.saved} />
      </div>
    </PageShell>
  );
}
