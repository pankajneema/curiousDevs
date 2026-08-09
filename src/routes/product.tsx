import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { ExecutionGraph } from "@/components/landing/ExecutionGraph";
import { Capabilities } from "@/components/landing/Capabilities";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Footer } from "@/components/landing/Footer";
import { products } from "@/components/landing/product-data";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/product")({
  validateSearch: (search: Record<string, unknown>) => ({
    p: typeof search.p === "string" ? search.p : undefined,
  }),
  head: () =>
    buildSeoHead({
      path: "/product",
      title: "AI Engineering Services — Build, Fix, and Scale | CuriousDevs",
      description:
        "Explore CuriousDevs services for AI-native development, audits, diagnosis, optimization, hardening, and production infrastructure.",
      keywords: [
        "AI engineering services",
        "AI-native development",
        "AI audit",
        "AI optimization",
        "MLOps",
      ],
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
              "AI Engineering Services — Build, Fix, and Scale",
              "AI-native development, audit, diagnosis, optimization, hardening, and production infrastructure.",
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "CuriousDevs AI engineering services",
            itemListElement: products.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.name,
                serviceType: service.category,
                description: service.summary,
                provider: { "@id": "https://curiousdevs.com/#organization" },
                areaServed: ["IN", "US", "CA", "GB", "AE"],
              },
            })),
          }),
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
