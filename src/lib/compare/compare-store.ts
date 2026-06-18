import { getProductsByIds } from "@/lib/services/product-service";
import type { Product } from "@/lib/types/product";

export const MAX_COMPARE = 4;
const STORAGE_KEY = "susco-compare-ids";
export const COMPARE_CHANGE_EVENT = "susco-compare-change";

const EMPTY_COMPARE_IDS: string[] = [];
let compareIdsCache: string[] = EMPTY_COMPARE_IDS;
let compareCacheInitialized = false;

function isBrowser() {
  return typeof window !== "undefined";
}

function readCompareIdsFromStorage(): string[] {
  if (!isBrowser()) return EMPTY_COMPARE_IDS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_COMPARE_IDS;
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed) || parsed.length === 0) return EMPTY_COMPARE_IDS;
    return parsed.slice(0, MAX_COMPARE);
  } catch {
    return EMPTY_COMPARE_IDS;
  }
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

function updateCompareCache(): void {
  const next = readCompareIdsFromStorage();
  if (arraysEqual(next, compareIdsCache)) return;
  compareIdsCache = next;
}

function notifyChange() {
  if (!isBrowser()) return;
  updateCompareCache();
  window.dispatchEvent(new Event(COMPARE_CHANGE_EVENT));
}

function writeRaw(ids: string[]) {
  if (!isBrowser()) return;
  const normalized = ids.slice(0, MAX_COMPARE);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  compareIdsCache =
    normalized.length === 0 ? EMPTY_COMPARE_IDS : normalized;
  notifyChange();
}

/** Stable snapshot for useSyncExternalStore (client). */
export function getCompareSnapshot(): string[] {
  if (isBrowser() && !compareCacheInitialized) {
    compareCacheInitialized = true;
    updateCompareCache();
  }
  return compareIdsCache;
}

/** Stable snapshot for useSyncExternalStore (server). */
export function getCompareServerSnapshot(): string[] {
  return EMPTY_COMPARE_IDS;
}

export function getCompareIds(): string[] {
  return getCompareSnapshot();
}

export function isInCompare(productId: string): boolean {
  return getCompareSnapshot().includes(productId);
}

export type CompareAddResult = "added" | "already_exists" | "limit_reached";

export function addToCompare(productId: string): CompareAddResult {
  const current = getCompareSnapshot();
  if (current.includes(productId)) return "already_exists";
  if (current.length >= MAX_COMPARE) return "limit_reached";
  const next = [...current, productId];
  writeRaw(next);
  return "added";
}

export function removeFromCompare(productId: string): string[] {
  const next = getCompareSnapshot().filter((id) => id !== productId);
  writeRaw(next);
  return getCompareSnapshot();
}

export function clearCompare(): void {
  writeRaw([]);
}

export function getCompareUrl(ids?: string[]): string {
  const resolved = ids ?? getCompareSnapshot();
  if (resolved.length === 0) return "/compare";
  return `/compare?ids=${resolved.join(",")}`;
}

export function getCompareProducts(ids: string[]): Product[] {
  return getProductsByIds(ids);
}

export function mergeCompareIds(urlIds: string[], storedIds?: string[]): string[] {
  const stored = storedIds ?? getCompareSnapshot();
  const merged = [...urlIds];
  for (const id of stored) {
    if (!merged.includes(id) && merged.length < MAX_COMPARE) {
      merged.push(id);
    }
  }
  return merged.slice(0, MAX_COMPARE);
}
