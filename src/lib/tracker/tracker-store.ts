import type { SustainabilityRating } from "@/lib/types/scoring";
import type { UserChoice, UserChoiceAction } from "@/lib/types/tracker";

export const LOCAL_USER_ID = "local-user";
const STORAGE_KEY = "susco-tracker-choices";
export const TRACKER_CHANGE_EVENT = "susco-tracker-change";

function isBrowser() {
  return typeof window !== "undefined";
}

function notifyChange() {
  if (isBrowser()) {
    window.dispatchEvent(new Event(TRACKER_CHANGE_EVENT));
  }
}

function readRaw(): UserChoice[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as UserChoice[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRaw(choices: UserChoice[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choices));
  notifyChange();
}

export function getChoices(): UserChoice[] {
  return readRaw();
}

export function getChoicesByAction(action: UserChoiceAction): UserChoice[] {
  return readRaw().filter((choice) => choice.action === action);
}

export function hasChoice(productId: string, action: UserChoiceAction): boolean {
  return readRaw().some(
    (choice) => choice.productId === productId && choice.action === action
  );
}

export function addChoice(
  productId: string,
  action: UserChoiceAction,
  ratingAtTime: SustainabilityRating,
  note?: string
): UserChoice {
  const existing = readRaw();
  const choice: UserChoice = {
    id: `${productId}-${action}-${Date.now()}`,
    userId: LOCAL_USER_ID,
    productId,
    action,
    ratingAtTime,
    note,
    createdAt: new Date().toISOString().split("T")[0] ?? "",
  };

  const withoutDuplicate = existing.filter(
    (item) => !(item.productId === productId && item.action === action)
  );
  writeRaw([choice, ...withoutDuplicate]);
  return choice;
}

export function removeChoice(
  productId: string,
  action: UserChoiceAction
): void {
  writeRaw(
    readRaw().filter(
      (item) => !(item.productId === productId && item.action === action)
    )
  );
}

export function toggleChoice(
  productId: string,
  action: UserChoiceAction,
  ratingAtTime: SustainabilityRating,
  note?: string
): boolean {
  if (hasChoice(productId, action)) {
    removeChoice(productId, action);
    return false;
  }
  addChoice(productId, action, ratingAtTime, note);
  return true;
}

export function clearChoices(): void {
  writeRaw([]);
}
