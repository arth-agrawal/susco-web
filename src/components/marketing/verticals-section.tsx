import Link from "next/link";
import { BarChart3, BookmarkCheck, SearchCheck, Share2 } from "lucide-react";

export function VerticalsSection() {
  const items = [
    {
      href: "/search",
      icon: SearchCheck,
      title: "Product Search + Sustainability Rating",
      copy: "Search across platforms, inspect score explanations, compare evidence, and click out to buy from the original site or app.",
      points: ["Search -> Score", "Compare -> Click-out", "Better alternatives"],
    },
    {
      href: "/tracker",
      icon: BookmarkCheck,
      title: "Personal Tracker + Show-off Profile",
      copy: "Save, buy, avoid, and compare products manually. Your choices become a shareable sustainability profile.",
      points: ["Save -> Track", "Profile -> Share", "Monthly cards"],
    },
  ];

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex size-10 items-center justify-center rounded-[8px] bg-emerald-900 text-white">
              <Icon className="size-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-stone-950">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {item.copy}
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {item.points.map((point) => (
                <span
                  key={point}
                  className="rounded-[8px] border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700"
                >
                  {point}
                </span>
              ))}
            </div>
          </Link>
        );
      })}
      <div className="rounded-[8px] border border-stone-200 bg-stone-950 p-6 text-white lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-xl font-semibold">Search. Score. Compare. Choose. Track.</h2>
            <p className="mt-2 text-sm text-stone-300">
              SusCo is a consumer-facing AI shopping intelligence layer, not a
              seller marketplace and not a paid ranking board.
            </p>
          </div>
          <div className="flex gap-2 text-lime-200">
            <BarChart3 className="size-6" />
            <Share2 className="size-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
