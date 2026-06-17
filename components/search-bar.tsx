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
  className?: string;
  autoFocus?: boolean;
};

export function SearchBar({
  defaultValue = "",
  placeholder = "Search sunscreen, denim, coffee, skincare brands…",
  size = "default",
  className,
  autoFocus = false,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
  }

  const isHero = size === "hero";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "group relative w-full",
        isHero && "max-w-2xl",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center gap-2 rounded-2xl border bg-white shadow-sm transition-all",
          "border-stone-200 focus-within:border-susco-green/40 focus-within:shadow-md focus-within:ring-4 focus-within:ring-susco-mint/20",
          isHero ? "px-4 py-3" : "px-3 py-2"
        )}
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-susco-mint/30 text-susco-green">
          {isHero ? (
            <Sparkles className="size-4" />
          ) : (
            <Search className="size-4" />
          )}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-stone-800 placeholder:text-stone-400 outline-none",
            isHero ? "text-base" : "text-sm"
          )}
        />
        <Button
          type="submit"
          size={isHero ? "default" : "sm"}
          className="shrink-0 rounded-xl bg-susco-green text-white hover:bg-susco-green/90"
        >
          Search
        </Button>
      </div>
      {isHero && (
        <p className="mt-3 text-center text-xs text-stone-500">
          AI-assisted product discovery across Amazon, Nykaa, Myntra & more
        </p>
      )}
    </form>
  );
}
