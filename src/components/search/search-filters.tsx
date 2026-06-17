import Link from "next/link";

import { sortModes } from "@/lib/search/filters";
import type { CommercePlatform } from "@/lib/types/commerce";
import type { ConfidenceLevel, SustainabilityBand } from "@/lib/types/scoring";
import { cn } from "@/lib/utils";

const ratings: Array<SustainabilityBand | "All"> = [
  "All",
  "Excellent",
  "Strong",
  "Moderate",
  "Weak",
  "Insufficient Evidence",
];

const confidence: Array<ConfidenceLevel | "All"> = [
  "All",
  "High",
  "Medium",
  "Low",
];

const platforms: Array<CommercePlatform | "All"> = [
  "All",
  "Amazon",
  "Flipkart",
  "Nykaa",
  "Myntra",
  "Brand Site",
  "ONDC",
];

type SearchFiltersProps = {
  params: URLSearchParams;
};

export function SearchFilters({ params }: SearchFiltersProps) {
  return (
    <aside className="space-y-5 rounded-[8px] border border-stone-200 bg-white p-4 shadow-sm">
      <FilterGroup
        label="Rating"
        param="rating"
        options={ratings}
        params={params}
      />
      <FilterGroup
        label="Confidence"
        param="confidence"
        options={confidence}
        params={params}
      />
      <FilterGroup
        label="Platform"
        param="platform"
        options={platforms}
        params={params}
      />
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
          Sort
        </p>
        <div className="mt-2 grid gap-1">
          {sortModes.map((mode) => (
            <FilterLink
              key={mode.value}
              label={mode.label}
              href={buildUrl(params, "sort", mode.value)}
              active={(params.get("sort") ?? "relevance") === mode.value}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function FilterGroup({
  label,
  param,
  options,
  params,
}: {
  label: string;
  param: string;
  options: string[];
  params: URLSearchParams;
}) {
  const active = params.get(param) ?? "All";
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterLink
            key={option}
            label={option}
            href={buildUrl(params, param, option === "All" ? null : option)}
            active={active === option}
            compact
          />
        ))}
      </div>
    </div>
  );
}

function FilterLink({
  label,
  href,
  active,
  compact = false,
}: {
  label: string;
  href: string;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-[8px] border text-sm font-medium transition-colors",
        compact ? "px-2.5 py-1" : "px-3 py-2",
        active
          ? "border-emerald-800/20 bg-emerald-50 text-emerald-900"
          : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-950"
      )}
    >
      {label}
    </Link>
  );
}

function buildUrl(params: URLSearchParams, key: string, value: string | null) {
  const next = new URLSearchParams(params.toString());
  if (value) next.set(key, value);
  else next.delete(key);
  const query = next.toString();
  return `/search${query ? `?${query}` : ""}`;
}
