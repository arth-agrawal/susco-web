"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bookmark,
  CheckCircle2,
  GitCompare,
  ShoppingBag,
  XCircle,
} from "lucide-react";

import { useCompareTray } from "@/hooks/use-compare-tray";
import { useTrackerChoices } from "@/hooks/use-tracker-choices";
import { addToCompare, getCompareUrl } from "@/lib/compare/compare-store";
import {
  addChoice,
  removeChoice,
  toggleChoice,
} from "@/lib/tracker/tracker-store";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types/product";
import type { UserChoiceAction } from "@/lib/types/tracker";
import { cn } from "@/lib/utils";

const COMPARE_LIMIT_MESSAGE = "Compare supports up to 4 products.";

function useChoiceState(productId: string, action: UserChoiceAction) {
  const choices = useTrackerChoices();
  return choices.some(
    (choice) => choice.productId === productId && choice.action === action
  );
}

function useCompareAction(product: Product) {
  const router = useRouter();
  const compareIds = useCompareTray();
  const inCompare = compareIds.includes(product.id);
  const [compareMessage, setCompareMessage] = useState<string | null>(null);

  function handleCompare() {
    setCompareMessage(null);

    if (inCompare) {
      router.push(getCompareUrl());
      return;
    }

    const result = addToCompare(product.id);
    if (result === "limit_reached") {
      setCompareMessage(COMPARE_LIMIT_MESSAGE);
      return;
    }

    if (result === "added") {
      toggleChoice(product.id, "compared", product.rating);
    }

    router.push(getCompareUrl());
  }

  return {
    inCompare,
    handleCompare,
    compareMessage,
    compareLabel: inCompare ? "View compare" : "Add to compare",
  };
}

export function ProductActions({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const saved = useChoiceState(product.id, "saved");
  const { inCompare, handleCompare, compareMessage, compareLabel } =
    useCompareAction(product);
  const buyUrl = product.listings[0]?.url ?? "/search";

  const handleSave = () => {
    toggleChoice(product.id, "saved", product.rating);
  };

  return (
    <div className={cn("flex flex-col gap-2", compact && "gap-1.5")}>
      <div className={cn("flex flex-wrap gap-2", compact && "gap-1.5")}>
        <Button asChild size="sm" variant="outline" className="rounded-[8px]">
          <Link href={`/product/${product.slug}`}>View Score</Link>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "rounded-[8px]",
            inCompare && "border-emerald-800/20 bg-emerald-50 text-emerald-900"
          )}
          onClick={handleCompare}
        >
          <GitCompare className="size-3.5" />
          {compareLabel}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "rounded-[8px]",
            saved && "border-emerald-800/20 bg-emerald-50 text-emerald-900"
          )}
          onClick={handleSave}
        >
          <Bookmark className={cn("size-3.5", saved && "fill-current")} />
          {saved ? "Saved" : "Save"}
        </Button>
        <Button
          asChild
          size="sm"
          className="rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950"
        >
          <a href={buyUrl} target="_blank" rel="noopener noreferrer">
            <ShoppingBag className="size-3.5" />
            Buy
          </a>
        </Button>
      </div>
      {compareMessage && (
        <p className="text-xs text-amber-800">{compareMessage}</p>
      )}
    </div>
  );
}

export function ProductLogActions({ product }: { product: Product }) {
  const saved = useChoiceState(product.id, "saved");
  const bought = useChoiceState(product.id, "bought");
  const avoided = useChoiceState(product.id, "avoided");
  const { inCompare, handleCompare, compareMessage, compareLabel } =
    useCompareAction(product);

  const setAction = (action: UserChoiceAction, active: boolean) => {
    if (active) {
      removeChoice(product.id, action);
      return;
    }
    addChoice(product.id, action, product.rating);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button
          className={cn(
            "rounded-[8px]",
            saved
              ? "border-emerald-800/20 bg-emerald-50 text-emerald-900"
              : "bg-emerald-900 text-white hover:bg-emerald-950"
          )}
          variant={saved ? "outline" : "default"}
          onClick={() => setAction("saved", saved)}
        >
          <Bookmark className={cn("size-4", saved && "fill-current")} />
          {saved ? "Saved" : "Save"}
        </Button>
        <Button
          variant="outline"
          className={cn(
            "rounded-[8px]",
            bought && "border-emerald-800/20 bg-emerald-50 text-emerald-900"
          )}
          onClick={() => setAction("bought", bought)}
        >
          <CheckCircle2 className="size-4" />
          {bought ? "Bought" : "Mark bought"}
        </Button>
        <Button
          variant="outline"
          className={cn(
            "rounded-[8px]",
            avoided && "border-orange-200 bg-orange-50 text-orange-800"
          )}
          onClick={() => setAction("avoided", avoided)}
        >
          <XCircle className="size-4" />
          {avoided ? "Avoided" : "Mark avoided"}
        </Button>
        <Button
          variant="outline"
          className={cn(
            "rounded-[8px]",
            inCompare && "border-emerald-800/20 bg-emerald-50 text-emerald-900"
          )}
          onClick={handleCompare}
        >
          <GitCompare className="size-4" />
          {compareLabel}
        </Button>
      </div>
      {compareMessage && (
        <p className="text-xs text-amber-800">{compareMessage}</p>
      )}
    </div>
  );
}
