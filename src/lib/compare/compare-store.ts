import { getProductsByIds } from "@/lib/services/product-service";
import type { Product } from "@/lib/types/product";

export const MAX_COMPARE = 4;
const STORAGE_KEY = "susco-compare-ids";
export const COMPARE_CHANGE_EVENT = "susco-compare-change";

function isBrowser() {
  return typeof window !== "undefined";
}

function notifyChange() {
  if (isBrowser()) {
    window.dispatchEvent(new Event(COMPARE_CHANGE_EVENT));
  }
}

function readRaw(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
}

function writeRaw(ids: string[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(ids.slice(0, MAX_COMPARE))
  );
  notifyChange();
}

export function getCompareIds(): string[] {
  return readRaw();
}

export function isInCompare(productId: string): boolean {
  return readRaw().includes(productId);
}

export function addToCompare(productId: string): string[] {
  const current = readRaw();
  if (current.includes(productId)) return current;
  if (current.length >= MAX_COMPARE) return current;
  const next = [...current, productId];
  writeRaw(next);
  return next;
}

export function removeFromCompare(productId: string): string[] {
  const next = readRaw().filter((id) => id !== productId);
  writeRaw(next);
  return next;
}

export function toggleCompare(productId: string): string[] {
  if (isInCompare(productId)) {
    return removeFromCompare(productId);
  }
  return addToCompare(productId);
}

export function clearCompare(): void {
  writeRaw([]);
}

export function getCompareUrl(ids?: string[]): string {
  const resolved = ids ?? readRaw();
  if (resolved.length === 0) return "/compare";
  return `/compare?ids=${resolved.join(",")}`;
}

export function getCompareProducts(ids: string[]): Product[] {
  return getProductsByIds(ids);
}

export function mergeCompareIds(urlIds: string[], storedIds?: string[]): string[] {
  const stored = storedIds ?? readRaw();
  const merged = [...urlIds];
  for (const id of stored) {
    if (!merged.includes(id) && merged.length < MAX_COMPARE) {
      merged.push(id);
    }
  }
  return merged.slice(0, MAX_COMPARE);
}
