"use client";

import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  defaultValue?: string;
  placeholder?: string;
  size?: "default" | "hero";
  autoFocus?: boolean;
  className?: string;
};

export function SearchBar({
  defaultValue = "",
  placeholder = "Search 'sunscreen under ₹700', 'jeans under ₹8k', 'better coffee brands'...",
  size = "default",
  autoFocus = false,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();
  const isHero = size === "hero";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-[8px] border border-stone-200 bg-white shadow-sm transition-all focus-within:border-emerald-800/40 focus-within:ring-4 focus-within:ring-emerald-900/10",
          isHero ? "p-2 sm:p-3" : "p-2"
        )}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-emerald-50 text-emerald-900">
          {isHero ? <Sparkles className="size-4" /> : <Search className="size-4" />}
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-stone-950 outline-none placeholder:text-stone-400",
            isHero ? "text-base sm:text-lg" : "text-sm"
          )}
        />
        <Button
          type="submit"
          className="rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
