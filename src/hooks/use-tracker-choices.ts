"use client";

import { useSyncExternalStore } from "react";

import { getChoices, TRACKER_CHANGE_EVENT } from "@/lib/tracker/tracker-store";
import type { UserChoice } from "@/lib/types/tracker";

function subscribe(callback: () => void) {
  window.addEventListener(TRACKER_CHANGE_EVENT, callback);
  return () => window.removeEventListener(TRACKER_CHANGE_EVENT, callback);
}

function getServerSnapshot(): UserChoice[] {
  return [];
}

export function useTrackerChoices(): UserChoice[] {
  return useSyncExternalStore(subscribe, getChoices, getServerSnapshot);
}
