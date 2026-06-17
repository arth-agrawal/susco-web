import { Share2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/lib/types/tracker";

export function ProfileHeader({
  profile,
  publicView = false,
}: {
  profile: UserProfile;
  publicView?: boolean;
}) {
  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <Avatar className="size-16 rounded-[8px]">
          <AvatarFallback className="rounded-[8px] bg-emerald-900 text-lg font-semibold text-white">
            {profile.displayName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-stone-500">
            {publicView ? "Public profile" : "Your conscious shopping profile"}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-950">
            {profile.displayName}
          </h1>
          <p className="text-sm text-stone-500">@{profile.username}</p>
          {profile.bio && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-600">
              {profile.bio}
            </p>
          )}
          <p className="mt-2 text-xs text-stone-500">
            Member since {profile.memberSince}
          </p>
        </div>
      </div>
      <Button variant="outline" className="w-fit rounded-[8px]">
        <Share2 className="size-4" />
        Share profile
      </Button>
    </section>
  );
}
