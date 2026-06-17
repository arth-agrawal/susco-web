"use client";

import { useSyncExternalStore } from "react";

import {
  COMPARE_CHANGE_EVENT,
  getCompareServerSnapshot,
  getCompareSnapshot,
} from "@/lib/compare/compare-store";

function subscribe(callback: () => void) {
  window.addEventListener(COMPARE_CHANGE_EVENT, callback);
  return () => window.removeEventListener(COMPARE_CHANGE_EVENT, callback);
}

export function useCompareTray(): string[] {
  return useSyncExternalStore(
    subscribe,
    getCompareSnapshot,
    getCompareServerSnapshot
  );
}
