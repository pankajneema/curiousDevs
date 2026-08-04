import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Pricing } from "@/components/landing/Pricing";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () => buildSeoHead({
    path: "/pricing",
    title: "Pricing — AgentGuard, CurioComply & AeroOS | CuriousDevs",
    description:
      "Open-core pricing for AgentGuard, India-first tiers for CurioComply, and per-robot pricing for AeroOS.",
    keywords: ["AI security pricing", "AgentGuard pricing", "DPDP compliance pricing", "AeroOS pricing"],
    ogType: "website",
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/pricing",
              "Pricing — AgentGuard, CurioComply & AeroOS",
              "Open-core pricing for AgentGuard, India-first tiers for CurioComply, and per-robot pricing for AeroOS.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="Pricing"
        title="Free to run yourself,"
        accent="priced when you need the cloud."
        body="Start on AgentGuard's open-source core with zero limits on your own infrastructure. CurioComply and AeroOS price the way their markets expect — India-first and per-robot."
        action={false}
      />
      <Pricing />
      <FaqAndCta />
      <Footer />
    </main>
  );
}
