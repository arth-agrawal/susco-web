"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

const shoppingShows = ["Price", "Delivery", "Reviews", "Discounts"] as const;

const suscoReveals = [
  "Sustainability score",
  "Evidence",
  "Missing data",
  "Better alternatives",
] as const;

const trustBadges = [
  "We do not sell products.",
  "Brands cannot buy better ratings.",
  "Every score shows confidence and missing data.",
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ComparisonPanel({
  title,
  items,
  variant,
}: {
  title: string;
  items: readonly string[];
  variant: "muted" | "reveal";
}) {
  const isReveal = variant === "reveal";

  return (
    <div
      className={
        isReveal
          ? "relative overflow-hidden rounded-[8px] border border-stone-900 bg-stone-950 p-4 shadow-xl sm:p-5"
          : "rounded-[8px] border border-stone-200/80 bg-white/50 p-4 backdrop-blur-sm sm:p-5"
      }
    >
      {isReveal && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-amber-400/10"
        />
      )}
      <p
        className={
          isReveal
            ? "relative text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400"
            : "text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400"
        }
      >
        {title}
      </p>
      <ul className="relative mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className={
              isReveal
                ? "flex items-center gap-2 text-sm font-medium text-stone-100"
                : "flex items-center gap-2 text-sm text-stone-500"
            }
          >
            <span
              aria-hidden
              className={
                isReveal
                  ? "size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  : "size-1.5 shrink-0 rounded-full bg-stone-300"
              }
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductTruthCard() {
  return (
    <div className="relative mt-6 lg:mt-0">
      <div
        aria-hidden
        className="intro-reveal-glow pointer-events-none absolute -inset-4 rounded-[16px] opacity-70 sm:-inset-6"
      />
      <div className="relative overflow-hidden rounded-[8px] border border-stone-900/80 bg-white shadow-2xl">
        <div className="border-b border-stone-100 bg-stone-50/80 px-4 py-3 sm:px-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
            Intelligence overlay
          </p>
          <p className="mt-1 text-lg font-semibold tracking-tight text-stone-950">
            Daily Sun Fluid
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-stone-600">
            <span>₹599</span>
            <span className="text-stone-300">·</span>
            <span>Nykaa / Amazon</span>
          </div>
        </div>

        <div className="relative bg-stone-950 px-4 py-4 sm:px-5 sm:py-5">
          <div
            aria-hidden
            className="intro-scan-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent"
          />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/90">
            Hidden layer · revealed
          </p>
          <dl className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-xs text-stone-500">Sustainability</dt>
              <dd className="text-sm font-semibold text-emerald-300">Strong</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-xs text-stone-500">Confidence</dt>
              <dd className="text-sm font-medium text-stone-200">Medium</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-xs text-stone-500">Missing data</dt>
              <dd className="text-right text-sm text-amber-200/90">
                Packaging proof not found
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-stone-800 pt-3">
              <dt className="text-xs text-stone-500">Better alternatives</dt>
              <dd className="text-sm font-semibold text-white">4 found</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export function IntroHero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden border-b border-stone-900/10 bg-[#f4f2eb]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#78716c0c_1px,transparent_1px),linear-gradient(to_bottom,#78716c0c_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-stone-300/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 pb-20 sm:px-6 sm:py-16 sm:pb-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-xl lg:max-w-none">
            <span className="inline-flex items-center rounded-[4px] border border-stone-900 bg-stone-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-100 sm:text-[11px]">
              The missing layer in shopping
            </span>

            <h1 className="mt-6 text-[2.35rem] font-bold leading-[0.95] tracking-[-0.03em] text-stone-950 sm:text-6xl lg:text-[4.25rem]">
              Every product has a hidden story.
            </h1>

            <p className="mt-6 text-lg font-semibold leading-snug tracking-tight sm:text-2xl">
              <span className="text-stone-400">Stores show price, delivery, and reviews.</span>
              <br />
              <span className="text-stone-950">SusCo shows sustainability.</span>
            </p>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-stone-600 sm:text-base">
              Search products across stores, compare sustainability scores, see
              evidence and missing data, then click out to buy where you already
              shop.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:max-w-lg">
              <ComparisonPanel
                title="What shopping shows"
                items={shoppingShows}
                variant="muted"
              />
              <ComparisonPanel
                title="What SusCo reveals"
                items={suscoReveals}
                variant="reveal"
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                type="button"
                className="rounded-[4px] bg-stone-950 px-6 text-white hover:bg-stone-800"
                onClick={() => scrollToSection("explore")}
              >
                Reveal the layer
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-[4px] border-stone-900/25 bg-white/60 text-stone-950 hover:bg-white"
              >
                <Link href="/search">Search products</Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-[4px] border border-stone-300/80 bg-white/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-stone-600 backdrop-blur-sm sm:text-[11px]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-4">
            <ProductTruthCard />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("explore")}
        className="group absolute inset-x-0 bottom-5 mx-auto flex w-fit flex-col items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-800"
        aria-label="Scroll to explore products"
      >
        <span>Scroll</span>
        <ChevronDown className="size-4 animate-bounce transition-transform group-hover:translate-y-0.5" />
      </button>
    </section>
  );
}
