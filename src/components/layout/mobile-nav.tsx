"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { mainNavItems } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-[#fbfaf5]">
        <SheetHeader>
          <SheetTitle>SusCo</SheetTitle>
        </SheetHeader>
        <div className="mt-6 grid gap-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[8px] px-3 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Button
          asChild
          className="mt-6 w-full rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950"
        >
          <Link href="/search">
            <Search className="size-4" />
            Start searching
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
