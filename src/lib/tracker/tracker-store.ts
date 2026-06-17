import type { SustainabilityRating } from "@/lib/types/scoring";
import type { UserChoice, UserChoiceAction } from "@/lib/types/tracker";

export const LOCAL_USER_ID = "local-user";
const STORAGE_KEY = "susco-tracker-choices";
export const TRACKER_CHANGE_EVENT = "susco-tracker-change";

const EMPTY_CHOICES: UserChoice[] = [];
let choicesCache: UserChoice[] = EMPTY_CHOICES;
let choicesCacheInitialized = false;

function isBrowser() {
  return typeof window !== "undefined";
}

function readChoicesFromStorage(): UserChoice[] {
  if (!isBrowser()) return EMPTY_CHOICES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_CHOICES;
    const parsed = JSON.parse(raw) as UserChoice[];
    if (!Array.isArray(parsed) || parsed.length === 0) return EMPTY_CHOICES;
    return parsed;
  } catch {
    return EMPTY_CHOICES;
  }
}

function choicesEqual(a: UserChoice[], b: UserChoice[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.every(
    (choice, index) =>
      choice.id === b[index]?.id &&
      choice.productId === b[index]?.productId &&
      choice.action === b[index]?.action
  );
}

function updateChoicesCache(): void {
  const next = readChoicesFromStorage();
  if (choicesEqual(next, choicesCache)) return;
  choicesCache = next;
}

function notifyChange() {
  if (!isBrowser()) return;
  updateChoicesCache();
  window.dispatchEvent(new Event(TRACKER_CHANGE_EVENT));
}

function writeRaw(choices: UserChoice[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choices));
  choicesCache = choices.length === 0 ? EMPTY_CHOICES : choices;
  notifyChange();
}

/** Stable snapshot for useSyncExternalStore (client). */
export function getChoicesSnapshot(): UserChoice[] {
  if (isBrowser() && !choicesCacheInitialized) {
    choicesCacheInitialized = true;
    updateChoicesCache();
  }
  return choicesCache;
}

/** Stable snapshot for useSyncExternalStore (server). */
export function getChoicesServerSnapshot(): UserChoice[] {
  return EMPTY_CHOICES;
}

export function getChoices(): UserChoice[] {
  return getChoicesSnapshot();
}

export function getChoicesByAction(action: UserChoiceAction): UserChoice[] {
  return getChoicesSnapshot().filter((choice) => choice.action === action);
}

export function hasChoice(productId: string, action: UserChoiceAction): boolean {
  return getChoicesSnapshot().some(
    (choice) => choice.productId === productId && choice.action === action
  );
}

export function addChoice(
  productId: string,
  action: UserChoiceAction,
  ratingAtTime: SustainabilityRating,
  note?: string
): UserChoice {
  const existing = getChoicesSnapshot();
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
    getChoicesSnapshot().filter(
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
