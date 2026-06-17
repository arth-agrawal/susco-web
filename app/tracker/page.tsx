import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  Award,
  Bookmark,
  CheckCircle2,
  Share2,
  ShoppingBag,
  XCircle,
} from "lucide-react";

import { ConfidencePill } from "@/components/confidence-pill";
import { PageShell } from "@/components/page-shell";
import { ScoreBadge } from "@/components/score-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  mockProfile,
  mockTrackedProducts,
  mockTrackerStats,
} from "@/lib/data/mock-tracker";
import type { TrackerStatus } from "@/lib/data/mock-tracker";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  TrackerStatus,
  { label: string; icon: ComponentType<{ className?: string }>; color: string }
> = {
  saved: {
    label: "Saved",
    icon: Bookmark,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  bought: {
    label: "Bought",
    icon: CheckCircle2,
    color: "text-susco-green bg-susco-mint/20 border-susco-green/20",
  },
  avoided: {
    label: "Avoided",
    icon: XCircle,
    color: "text-orange-700 bg-orange-50 border-orange-200",
  },
};

export default function TrackerPage() {
  const saved = mockTrackedProducts.filter((t) => t.status === "saved");
  const bought = mockTrackedProducts.filter((t) => t.status === "bought");
  const avoided = mockTrackedProducts.filter((t) => t.status === "avoided");

  return (
    <PageShell>
      <div className="space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Profile */}
          <div className="flex items-start gap-4">
            <Avatar className="size-16 rounded-2xl">
              <AvatarFallback className="rounded-2xl bg-susco-green text-lg font-semibold text-white">
                {mockProfile.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-stone-900 sm:text-3xl">
                {mockProfile.name}
              </h1>
              <p className="text-sm text-stone-500">{mockProfile.handle}</p>
              <p className="mt-2 max-w-md text-sm text-stone-600">
                {mockProfile.bio}
              </p>
              <p className="mt-1 text-xs text-stone-400">
                Member since {mockProfile.memberSince}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="rounded-xl border-stone-200 self-start"
          >
            <Share2 className="size-4" />
            Share profile
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Products checked"
            value={mockTrackerStats.productsChecked}
          />
          <StatCard
            label="Choices saved"
            value={mockTrackerStats.choicesSaved}
          />
          <StatCard
            label="Average rating"
            value={mockTrackerStats.averageRating}
            isText
          />
          <StatCard
            label="Better choices"
            value={mockTrackerStats.betterChoices}
            highlight
          />
        </div>

        {/* Shareable card preview */}
        <Card className="overflow-hidden rounded-3xl border-susco-green/20 bg-gradient-to-br from-susco-green to-emerald-800 text-white shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                  SusCo Impact Card
                </p>
                <p className="mt-2 text-2xl font-semibold">
                  {mockTrackerStats.betterChoices} better choices made
                </p>
                <p className="mt-1 text-sm text-white/80">
                  {mockTrackerStats.productsChecked} products checked · avg{" "}
                  {mockTrackerStats.averageRating} rating
                </p>
              </div>
              <div className="flex size-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Award className="size-10 text-susco-mint" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracked sections */}
        <TrackedSection title="Recently bought" items={bought} />
        <TrackedSection title="Saved for later" items={saved} />
        <TrackedSection title="Avoided" items={avoided} />
      </div>
    </PageShell>
  );
}

function StatCard({
  label,
  value,
  isText = false,
  highlight = false,
}: {
  label: string;
  value: number | string;
  isText?: boolean;
  highlight?: boolean;
}) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-stone-200/80",
        highlight && "border-susco-green/20 bg-susco-mint/10"
      )}
    >
      <CardContent className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
          {label}
        </p>
        <p
          className={cn(
            "mt-2 font-semibold text-stone-900",
            isText ? "text-xl" : "text-3xl"
          )}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function TrackedSection({
  title,
  items,
}: {
  title: string;
  items: (typeof mockTrackedProducts)[number][];
}) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ product, status, trackedAt, note }) => {
          const config = statusConfig[status];
          const Icon = config.icon;

          return (
            <Card
              key={`${product.id}-${status}`}
              className="overflow-hidden rounded-2xl border-stone-200/80"
            >
              <div className="relative aspect-[16/9] bg-stone-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <span
                  className={cn(
                    "absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
                    config.color
                  )}
                >
                  <Icon className="size-3" />
                  {config.label}
                </span>
              </div>
              <CardContent className="space-y-3 p-4">
                <div>
                  <p className="text-xs text-stone-500">{product.brand}</p>
                  <Link
                    href={`/product/${product.id}`}
                    className="font-semibold text-stone-900 hover:text-susco-green"
                  >
                    {product.name}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ScoreBadge rating={product.rating} size="sm" />
                  <ConfidencePill
                    level={product.confidence}
                    size="sm"
                    showLabel={false}
                  />
                </div>
                {note && (
                  <p className="text-xs leading-relaxed text-stone-500">
                    {note}
                  </p>
                )}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-stone-400">
                    Tracked {trackedAt}
                  </span>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-7 text-susco-green"
                  >
                    <Link href={`/product/${product.id}`}>
                      <ShoppingBag className="size-3" />
                      View
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
