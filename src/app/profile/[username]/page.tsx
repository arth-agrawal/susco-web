import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { PublicProfileContent } from "@/components/tracker/public-profile-content";
import { getChoicesForUser } from "@/lib/data/mock-tracker";
import { getProfileByUsername, mockProfiles } from "@/lib/data/mock-users";

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

  const choices = getChoicesForUser(profile.id);

  return (
    <PageShell>
      <PublicProfileContent profile={profile} choices={choices} />
    </PageShell>
  );
}
