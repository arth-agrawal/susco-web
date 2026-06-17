"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  CheckCircle2,
  GitCompare,
  ShoppingBag,
  XCircle,
} from "lucide-react";

import { useCompareTray } from "@/hooks/use-compare-tray";
import { useTrackerChoices } from "@/hooks/use-tracker-choices";
import {
  addToCompare,
  getCompareUrl,
  isInCompare,
  toggleCompare,
} from "@/lib/compare/compare-store";
import {
  addChoice,
  removeChoice,
  toggleChoice,
} from "@/lib/tracker/tracker-store";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types/product";
import type { UserChoiceAction } from "@/lib/types/tracker";
import { cn } from "@/lib/utils";

function useChoiceState(productId: string, action: UserChoiceAction) {
  const choices = useTrackerChoices();
  return choices.some(
    (choice) => choice.productId === productId && choice.action === action
  );
}

export function ProductActions({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const router = useRouter();
  const compareIds = useCompareTray();
  const saved = useChoiceState(product.id, "saved");
  const inCompare =
    compareIds.includes(product.id) || isInCompare(product.id);
  const buyUrl = product.listings[0]?.url ?? "/search";

  const handleSave = () => {
    toggleChoice(product.id, "saved", product.rating);
  };

  const handleCompare = () => {
    toggleCompare(product.id);
    toggleChoice(product.id, "compared", product.rating);
    router.push(getCompareUrl());
  };

  return (
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
        {inCompare ? "In compare" : "Compare"}
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
  );
}

export function ProductLogActions({ product }: { product: Product }) {
  const router = useRouter();
  const compareIds = useCompareTray();
  const saved = useChoiceState(product.id, "saved");
  const bought = useChoiceState(product.id, "bought");
  const avoided = useChoiceState(product.id, "avoided");
  const inCompare =
    compareIds.includes(product.id) || isInCompare(product.id);

  const handleCompare = () => {
    if (!inCompare) {
      addToCompare(product.id);
    }
    toggleChoice(product.id, "compared", product.rating);
    router.push(getCompareUrl());
  };

  const setAction = (action: UserChoiceAction, active: boolean) => {
    if (active) {
      removeChoice(product.id, action);
      return;
    }
    addChoice(product.id, action, product.rating);
  };

  return (
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
        {inCompare ? "In compare" : "Compare"}
      </Button>
    </div>
  );
}
