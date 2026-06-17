"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/search", label: "Search" },
  { href: "/search?category=Beauty", label: "Categories" },
  { href: "/compare", label: "Compare" },
  { href: "/tracker", label: "Tracker" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/search") return pathname === "/search";
    return pathname.startsWith(href.split("?")[0] ?? href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-susco-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-xl bg-susco-green text-sm font-bold text-white shadow-sm">
            S
          </span>
          <span className="text-lg font-semibold tracking-tight text-stone-900">
            Sus<span className="text-susco-green">Co</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-susco-mint/30 text-susco-green"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="rounded-xl bg-susco-green text-white hover:bg-susco-green/90"
          >
            <Link href="/search">Start searching</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-stone-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive(link.href)
                    ? "bg-susco-mint/30 text-susco-green"
                    : "text-stone-600"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 rounded-xl bg-susco-green text-white"
            >
              <Link href="/search" onClick={() => setMobileOpen(false)}>
                Start searching
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
