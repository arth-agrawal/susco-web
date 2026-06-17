import Image from "next/image";
import Link from "next/link";

import { ConfidencePill } from "@/components/score/confidence-pill";
import { ScoreBadge } from "@/components/score/score-badge";
import { Button } from "@/components/ui/button";
import type { TrackedProduct } from "@/lib/data/mock-tracker";
import type { UserChoiceAction } from "@/lib/types/tracker";
import { getPrimaryImage } from "@/lib/utils/product";

const sectionLabels: Record<UserChoiceAction, string> = {
  saved: "Saved for later",
  bought: "Bought",
  avoided: "Avoided",
  compared: "Compared",
};

export function TrackerProductList({
  action,
  items,
}: {
  action: UserChoiceAction;
  items: TrackedProduct[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-stone-950">
        {sectionLabels[action]}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-[8px] border border-stone-200 bg-white shadow-sm"
          >
            <div className="relative aspect-[16/10] bg-stone-100">
              <Image
                src={getPrimaryImage(item.product)}
                alt={item.product.canonicalName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index === 0}
              />
            </div>
            <div className="space-y-3 p-4">
              <div>
                <p className="text-xs text-stone-500">
                  {item.product.brandName}
                </p>
                <Link
                  href={`/product/${item.product.slug}`}
                  className="font-semibold text-stone-950 hover:text-emerald-900"
                >
                  {item.product.canonicalName}
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                <ScoreBadge band={item.product.rating.band} size="sm" />
                <ConfidencePill
                  level={item.product.rating.confidence}
                  size="sm"
                  showLabel={false}
                />
              </div>
              {item.note && (
                <p className="text-sm leading-relaxed text-stone-600">
                  {item.note}
                </p>
              )}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-stone-500">{item.createdAt}</span>
                <Button asChild size="sm" variant="ghost" className="rounded-[8px]">
                  <Link href={`/product/${item.product.slug}`}>Open</Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
