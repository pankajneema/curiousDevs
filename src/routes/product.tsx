import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { ExecutionGraph } from "@/components/landing/ExecutionGraph";
import { Capabilities } from "@/components/landing/Capabilities";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/product")({
  validateSearch: (search: Record<string, unknown>) => ({
    p: typeof search.p === "string" ? search.p : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Products — AgentGuard, CurioComply & AeroOS | CuriousDevs" },
      {
        name: "description",
        content:
          "Explore the CuriousDevs product ladder: AgentGuard runtime security for AI agents, CurioComply DPDP automation, and AeroOS for autonomous fleets.",
      },
      { property: "og:title", content: "Products — AgentGuard, CurioComply & AeroOS" },
      {
        property: "og:description",
        content:
          "Three modules, one execution path — runtime enforcement, compliance evidence and fleet governance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://curiousdevs.com/product" },
      { property: "og:site_name", content: "CuriousDevs" },
    ],
    links: [{ rel: "canonical", href: "https://curiousdevs.com/product" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { p } = Route.useSearch();
  return (
    <main id="main-content" className="relative">
      <Nav />
      <ProductShowcase initialSlug={p} />
      <ExecutionGraph />
      <Capabilities />
      <FaqAndCta />
      <Footer />
    </main>
  );
}
