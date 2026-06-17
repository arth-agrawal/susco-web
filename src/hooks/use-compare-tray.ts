"use client";

import { useSyncExternalStore } from "react";

import {
  COMPARE_CHANGE_EVENT,
  getCompareIds,
} from "@/lib/compare/compare-store";

function subscribe(callback: () => void) {
  window.addEventListener(COMPARE_CHANGE_EVENT, callback);
  return () => window.removeEventListener(COMPARE_CHANGE_EVENT, callback);
}

function getServerSnapshot(): string[] {
  return [];
}

export function useCompareTray(): string[] {
  return useSyncExternalStore(subscribe, getCompareIds, getServerSnapshot);
}
