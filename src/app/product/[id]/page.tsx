import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductDetailHeader } from "@/components/product/product-detail-header";
import { ProductFactorList } from "@/components/product/product-factor-list";
import { SimilarProducts } from "@/components/product/similar-products";
import { EvidenceList } from "@/components/score/evidence-list";
import { MissingDataCard } from "@/components/score/missing-data-card";
import { RatingDisclaimer } from "@/components/score/rating-disclaimer";
import { RatingSummaryCard } from "@/components/score/rating-summary-card";
import { ScoreBreakdown } from "@/components/score/score-breakdown";
import { PageShell } from "@/components/layout/page-shell";
import {
  getAllProducts,
  getProductByIdOrSlug,
  getProductEvidence,
  getSimilarProductsService,
} from "@/lib/services/product-service";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ id: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductByIdOrSlug(id);

  if (!product) notFound();

  const evidence = getProductEvidence(product.id);
  const similar = getSimilarProductsService(product.id);

  return (
    <PageShell>
      <div className="space-y-8">
        <nav className="text-sm text-stone-500">
          <Link href="/search" className="hover:text-emerald-900">
            Search
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-800">{product.canonicalName}</span>
        </nav>
        <ProductDetailHeader product={product} />
        <RatingDisclaimer />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <RatingSummaryCard rating={product.rating} />
          <ScoreBreakdown dimensions={product.rating.perDimension} />
        </div>
        <ProductFactorList
          productFactors={product.productFactors}
          brandFactors={product.brandFactors}
        />
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-950">
              Evidence and provenance
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Every sustainability fact should be source-linked. These are mock
              evidence records with production-shaped provenance.
            </p>
          </div>
          <EvidenceList items={evidence} />
        </section>
        <MissingDataCard items={product.rating.missingData} />
        <SimilarProducts products={similar} />
      </div>
    </PageShell>
  );
}
