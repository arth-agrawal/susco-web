import Link from "next/link";
import { Leaf, Search } from "lucide-react";

import { mainNavItems } from "@/config/navigation";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fbfaf5]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="SusCo home">
          <span className="flex size-8 items-center justify-center rounded-[8px] bg-emerald-900 text-white">
            <Leaf className="size-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-stone-950">
            SusCo
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[8px] px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" className="rounded-[8px]">
            <Link href="/admin">Internal</Link>
          </Button>
          <Button
            asChild
            className="rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950"
          >
            <Link href="/search">
              <Search className="size-4" />
              Search
            </Link>
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
