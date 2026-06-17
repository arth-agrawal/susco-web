import { AdminShell } from "@/components/admin/admin-shell";
import { EvidenceAdminTable } from "@/components/admin/evidence-admin-table";
import { ProductAdminTable } from "@/components/admin/product-admin-table";
import { RatingReviewCard } from "@/components/admin/rating-review-card";
import { mockEvidenceItems } from "@/lib/data/mock-evidence";
import { sourceRegistry } from "@/lib/data/source-registry";
import { getAllProducts } from "@/lib/services/product-service";

export default function AdminPage() {
  const products = getAllProducts();
  const lowConfidence = products.filter(
    (product) => product.rating.confidence === "Low"
  );
  const missingData = products
    .filter((product) => product.rating.missingData.length > 2)
    .slice(0, 3);

  return (
    <AdminShell>
      <div className="space-y-8">
        <div className="rounded-[8px] border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Internal research workspace — not linked from public navigation.
        </div>
        <div>
          <p className="text-sm font-medium text-amber-200">Internal only</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
            Evidence and rating operations
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-400">
            Placeholder for product indexing, evidence review, rating queues,
            source provenance, low-confidence items, and missing data work.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <AdminStat label="Products" value={products.length} />
          <AdminStat label="Evidence records" value={mockEvidenceItems.length} />
          <AdminStat label="Source records" value={sourceRegistry.length} />
          <AdminStat label="Low confidence" value={lowConfidence.length} />
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">Product index</h2>
          <ProductAdminTable products={products} />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">Evidence table</h2>
          <EvidenceAdminTable evidence={mockEvidenceItems} />
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {missingData.map((product) => (
            <RatingReviewCard key={product.id} product={product} />
          ))}
        </section>

        <section className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
          <h2 className="font-semibold text-white">Source/provenance overview</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {sourceRegistry.map((source) => (
              <div
                key={source.sourceId}
                className="rounded-[8px] border border-white/10 bg-black/20 p-3 text-sm text-stone-300"
              >
                <p className="font-medium text-white">{source.sourceName}</p>
                <p className="mt-1 text-stone-400">
                  {source.accessMethod} · tier {source.evidenceTier} ·{" "}
                  {source.licenseStatus}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

function AdminStat({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </article>
  );
}
