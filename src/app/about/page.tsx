import type { Metadata } from "next";

import { AboutContent } from "@/components/marketing/about-content";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "About",
  description:
    "What SusCo is, how product search and personal tracking work, and why evidence-backed sustainability ratings matter.",
};

export default function AboutPage() {
  return (
    <PageShell className="py-12 sm:py-16">
      <AboutContent />
    </PageShell>
  );
}
