"use client";

import { useSyncExternalStore } from "react";

import {
  getChoicesServerSnapshot,
  getChoicesSnapshot,
  TRACKER_CHANGE_EVENT,
} from "@/lib/tracker/tracker-store";
import type { UserChoice } from "@/lib/types/tracker";

function subscribe(callback: () => void) {
  window.addEventListener(TRACKER_CHANGE_EVENT, callback);
  return () => window.removeEventListener(TRACKER_CHANGE_EVENT, callback);
}

export function useTrackerChoices(): UserChoice[] {
  return useSyncExternalStore(
    subscribe,
    getChoicesSnapshot,
    getChoicesServerSnapshot
  );
}
