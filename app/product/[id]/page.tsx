import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  ArrowUpRight,
  Building2,
  FileSearch,
  Package,
  ShoppingBag,
} from "lucide-react";

import { ConfidencePill } from "@/components/confidence-pill";
import { EvidenceTierBadge } from "@/components/evidence-tier-badge";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { ScoreBadge } from "@/components/score-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  formatPrice,
  getProductById,
  getSimilarProducts,
} from "@/lib/utils/product";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const similar = getSimilarProducts(product);

  return (
    <PageShell>
      <div className="space-y-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-stone-500">
          <Link href="/search" className="hover:text-susco-green">
            Search
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-800">{product.name}</span>
        </nav>

        {/* Hero */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100 shadow-sm">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-stone-500">
                {product.brand} · {product.category}
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 text-stone-600">{product.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <ScoreBadge rating={product.rating} size="lg" />
              <ConfidencePill level={product.confidence} />
            </div>

            <Card className="rounded-2xl border-stone-200/80 bg-white">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-stone-500">
                  Why this rating
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {product.shortReason}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <p className="text-sm font-medium text-stone-700">
                Buy on platforms
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {product.listings.map((listing) => (
                  <a
                    key={listing.platform}
                    href={listing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 transition-colors hover:border-susco-green/30 hover:bg-susco-mint/10"
                  >
                    <div>
                      <p className="font-medium text-stone-900">
                        {listing.platform}
                      </p>
                      <p className="text-xs text-stone-500">
                        {listing.availability}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-900">
                        {formatPrice(listing.price)}
                      </span>
                      <ArrowUpRight className="size-4 text-stone-400" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                className="rounded-xl bg-susco-green text-white hover:bg-susco-green/90"
              >
                <a
                  href={product.listings[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingBag className="size-4" />
                  Buy now
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-stone-200"
              >
                <Link href={`/compare?ids=${product.id}`}>Compare</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-stone-200"
              >
                <Link href="/tracker">Save to tracker</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-stone-200" />

        {/* Detail sections */}
        <div className="grid gap-6 lg:grid-cols-2">
          <DetailSection
            icon={Package}
            title="Product-level factors"
            items={product.productFactors}
          />
          <DetailSection
            icon={Building2}
            title="Brand / company factors"
            items={product.brandFactors}
          />
        </div>

        <Card className="rounded-2xl border-stone-200/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileSearch className="size-5 text-susco-green" />
              Evidence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {product.evidence.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2 rounded-xl border border-stone-100 bg-stone-50/50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-stone-900">{item.label}</p>
                  <p className="text-sm text-stone-500">{item.source}</p>
                </div>
                <EvidenceTierBadge tier={item.tier} showDescription />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-orange-200/60 bg-orange-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-orange-900">
              <AlertCircle className="size-5" />
              Missing data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 sm:grid-cols-2">
              {product.missingData.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-lg bg-white/60 px-3 py-2 text-sm text-stone-700"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-orange-400" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Similar products */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-stone-900">
            Similar products
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function DetailSection({
  icon: Icon,
  title,
  items,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  items: string[];
}) {
  return (
    <Card className="rounded-2xl border-stone-200/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="size-5 text-susco-green" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-stone-700"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-susco-green" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
