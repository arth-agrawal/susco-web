"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Search,
  Sparkles,
} from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/data/mock-products";
import { CATEGORY_CHIPS } from "@/lib/utils/product";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function HomePage() {
  return (
    <PageShell containerClassName="max-w-6xl">
      {/* Hero */}
      <section className="flex flex-col items-center pb-16 pt-4 text-center sm:pb-24 sm:pt-8">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex max-w-3xl flex-col items-center gap-6"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-susco-mint/40 bg-susco-mint/20 px-4 py-1.5 text-xs font-medium text-susco-green"
          >
            <Sparkles className="size-3.5" />
            Sustainability intelligence for Gen Z shoppers
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl sm:leading-[1.1]"
          >
            The sustainability layer for{" "}
            <span className="text-susco-green">online shopping.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg"
          >
            Search products across beauty, fashion, and food. Compare
            sustainability ratings, evidence, missing data, and better
            alternatives before you buy.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="w-full pt-2">
            <SearchBar size="hero" />
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-2 pt-2"
          >
            {CATEGORY_CHIPS.map((category) => (
              <Link
                key={category}
                href={`/search?category=${encodeURIComponent(category)}`}
                className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 shadow-sm transition-all hover:border-susco-green/30 hover:bg-susco-mint/15 hover:text-susco-green"
              >
                {category}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Featured products */}
      <section className="space-y-6 pb-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">
              Featured products
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Real scores with evidence tiers and confidence levels
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden text-susco-green sm:flex"
          >
            <Link href="/search">
              View all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Two verticals */}
      <section className="grid gap-5 pb-16 sm:grid-cols-2">
        <VerticalCard
          icon={Search}
          title="Product Search"
          description="Search across platforms, see sustainability ratings with evidence and missing data gaps — then click out to buy smarter."
          href="/search"
          accent="bg-susco-green"
          features={[
            "Multi-platform price comparison",
            "Evidence-tier scoring",
            "Missing data transparency",
          ]}
        />
        <VerticalCard
          icon={Bookmark}
          title="Personal Tracker"
          description="Save products, track what you bought or avoided, and build a shareable sustainability profile over time."
          href="/tracker"
          accent="bg-susco-mint text-susco-green"
          features={[
            "Save & compare choices",
            "Bought vs avoided tracking",
            "Shareable impact card",
          ]}
        />
      </section>
    </PageShell>
  );
}

function VerticalCard({
  icon: Icon,
  title,
  description,
  href,
  accent,
  features,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  accent: string;
  features: string[];
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-8"
    >
      <div
        className={cn(
          "mb-5 flex size-12 items-center justify-center rounded-2xl text-white",
          accent
        )}
      >
        <Icon className="size-5" />
      </div>
      <h3 className="text-xl font-semibold text-stone-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        {description}
      </p>
      <ul className="mt-5 space-y-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm text-stone-600"
          >
            <BarChart3 className="size-3.5 shrink-0 text-susco-green" />
            {feature}
          </li>
        ))}
      </ul>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-susco-green group-hover:gap-2 transition-all">
        Explore <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
