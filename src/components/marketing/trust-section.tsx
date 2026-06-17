import { DatabaseZap, Eye, LockKeyhole, ShieldCheck } from "lucide-react";

export function TrustSection() {
  const items = [
    {
      icon: DatabaseZap,
      title: "Evidence-backed",
      copy: "Every sustainability fact is designed to carry source provenance and an evidence tier.",
    },
    {
      icon: ShieldCheck,
      title: "Confidence shown",
      copy: "Ratings separate what is known from what is uncertain instead of pretending precision.",
    },
    {
      icon: Eye,
      title: "Missing data shown",
      copy: "Missing data is visible and reduces confidence; it is not hidden behind green copy.",
    },
    {
      icon: LockKeyhole,
      title: "Brands cannot buy ratings",
      copy: "Commercial relationships should never improve a sustainability rating.",
    },
  ];

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
          Trust model
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          AI summarizes evidence, not invents it.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="rounded-[8px] border border-stone-200 bg-white p-4 shadow-sm"
            >
              <Icon className="size-5 text-emerald-900" />
              <h3 className="mt-4 font-semibold text-stone-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {item.copy}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
