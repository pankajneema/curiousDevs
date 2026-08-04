import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { ExecutionGraph } from "@/components/landing/ExecutionGraph";
import { Capabilities } from "@/components/landing/Capabilities";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Footer } from "@/components/landing/Footer";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/product")({
  validateSearch: (search: Record<string, unknown>) => ({
    p: typeof search.p === "string" ? search.p : undefined,
  }),
  head: () => buildSeoHead({
    path: "/product",
    title: "Products — AgentGuard, CurioComply & AeroOS | CuriousDevs",
    description:
      "Explore the CuriousDevs product ladder: AgentGuard runtime security for AI agents, CurioComply DPDP automation, and AeroOS for autonomous fleets.",
    keywords: ["AgentGuard", "CurioComply", "AeroOS", "AI security", "compliance platform"],
    ogType: "website",
  }),
  component: ProductPage,
});

function ProductPage() {
  const { p } = Route.useSearch();
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/product",
              "Products — AgentGuard, CurioComply & AeroOS",
              "Three modules, one execution path for runtime enforcement, compliance evidence and fleet governance.",
            ),
          ),
        }}
      />
      <Nav />
      <ProductShowcase initialSlug={p} />
      <ExecutionGraph />
      <Capabilities />
      <FaqAndCta />
      <Footer />
    </main>
  );
}
