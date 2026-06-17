import { BadgeGrid } from "@/components/tracker/badge-grid";
import { ProfileHeader } from "@/components/tracker/profile-header";
import { ShareCardPreview } from "@/components/tracker/share-card-preview";
import { TrackerProductList } from "@/components/tracker/tracker-product-list";
import { TrackerStats } from "@/components/tracker/tracker-stats";
import { TrackerSummary } from "@/components/tracker/tracker-summary";
import { PageShell } from "@/components/layout/page-shell";
import { mockTrackedProducts } from "@/lib/data/mock-tracker";
import { mockUserProfile } from "@/lib/data/mock-users";
import { groupTrackedProducts } from "@/lib/tracker/tracker-utils";

export default function TrackerPage() {
  const groups = groupTrackedProducts(mockTrackedProducts);

  return (
    <PageShell>
      <div className="space-y-8">
        <ProfileHeader profile={mockUserProfile} />
        <div>
          <p className="text-sm text-stone-600">
            Track what you check, save, buy, and avoid. Your choices become your
            sustainability profile.
          </p>
        </div>
        <TrackerStats stats={mockUserProfile.stats} />
        <TrackerSummary stats={mockUserProfile.stats} />
        <ShareCardPreview profile={mockUserProfile} />
        <TrackerProductList action="bought" items={groups.bought} />
        <TrackerProductList action="saved" items={groups.saved} />
        <TrackerProductList action="avoided" items={groups.avoided} />
        <TrackerProductList action="compared" items={groups.compared} />
        <BadgeGrid badges={mockUserProfile.badges} />
      </div>
    </PageShell>
  );
}
