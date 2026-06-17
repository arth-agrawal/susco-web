import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PlatformListing } from "@/lib/types/commerce";
import { formatPrice } from "@/lib/utils/product";

export function ProductListings({ listings }: { listings: PlatformListing[] }) {
  return (
    <div className="grid gap-2">
      {listings.map((listing) => (
        <a
          key={listing.id}
          href={listing.url}
          target="_blank"
          rel="noopener noreferrer"
          className="grid gap-3 rounded-[8px] border border-stone-200 bg-white p-3 transition-colors hover:border-emerald-800/25 sm:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="font-medium text-stone-950">{listing.platform}</p>
            <p className="text-sm text-stone-500">
              {listing.availability} · last seen {listing.lastSeenAt}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-950">
              {formatPrice(listing.price)}
            </span>
            <Button
              asChild
              size="sm"
              className="rounded-[8px] bg-emerald-900 text-white hover:bg-emerald-950"
            >
              <span>
                Buy
                <ExternalLink className="size-3.5" />
              </span>
            </Button>
          </div>
        </a>
      ))}
    </div>
  );
}
