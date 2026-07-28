import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Pricing } from "@/components/landing/Pricing";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — AgentGuard, CurioComply & AeroOS | CuriousDevs" },
      {
        name: "description",
        content:
          "Open-core pricing for AgentGuard, India-first tiers for CurioComply, and per-robot pricing for AeroOS.",
      },
      { property: "og:title", content: "Pricing — AgentGuard, CurioComply & AeroOS" },
      {
        property: "og:description",
        content: "Free to self-host. Priced when you need the managed cloud.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/pricing" },
      { property: "og:site_name", content: "CuriousDevs" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <main className="relative min-h-dvh">
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
