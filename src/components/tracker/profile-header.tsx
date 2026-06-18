"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/lib/types/tracker";

type ProfileHeaderProps = {
  profile: UserProfile;
  publicView?: boolean;
  localDevice?: boolean;
  demoProfileUrl?: string;
};

export function ProfileHeader({
  profile,
  publicView = false,
  localDevice = false,
  demoProfileUrl = "/profile/aanya",
}: ProfileHeaderProps) {
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  async function handleShare() {
    setShareMessage(null);

    const url = publicView
      ? window.location.href
      : `${window.location.origin}${demoProfileUrl}`;

    const successMessage = publicView
      ? "Profile link copied."
      : "Demo public profile link copied.";

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareMessage(successMessage);
      } else {
        setShareMessage("Copy not supported in this browser.");
      }
    } catch {
      setShareMessage("Could not copy link.");
    }
  }

  const eyebrow = publicView
    ? "Public profile preview"
    : localDevice
      ? "Device-local tracker"
      : "Your conscious shopping profile";

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
          <p className="text-sm font-medium text-stone-500">{eyebrow}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-950">
            {profile.displayName}
          </h1>
          {!publicView && localDevice && (
            <p className="text-sm text-stone-500">@{profile.username}</p>
          )}
          {publicView && (
            <p className="text-sm text-stone-500">@{profile.username}</p>
          )}
          {profile.bio && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-600">
              {profile.bio}
            </p>
          )}
          {localDevice && (
            <p className="mt-3 max-w-xl rounded-[8px] border border-stone-200 bg-stone-50 px-3 py-2 text-xs leading-relaxed text-stone-600">
              This tracker is saved locally on this device until accounts are
              added.
            </p>
          )}
          {!localDevice && (
            <p className="mt-2 text-xs text-stone-500">
              Member since {profile.memberSince}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Button
          variant="outline"
          className="w-fit rounded-[8px]"
          onClick={() => void handleShare()}
        >
          <Share2 className="size-4" />
          Share profile
        </Button>
        {shareMessage && (
          <p className="max-w-xs text-xs text-stone-600">{shareMessage}</p>
        )}
        {localDevice && !shareMessage && (
          <p className="max-w-xs text-xs text-stone-500">
            Copies a demo public profile link. Full sharing unlocks with
            accounts.
          </p>
        )}
      </div>
    </section>
  );
}
