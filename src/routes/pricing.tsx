import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Pricing } from "@/components/landing/Pricing";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    buildSeoHead({
      path: "/pricing",
      title: "Services — Build, Fix, and Scale AI | CuriousDevs",
      description:
        "Explore CuriousDevs service lines for AI-native development, audits, diagnosis, optimization, hardening, and production infrastructure.",
      keywords: [
        "AI engineering services",
        "AI development",
        "AI audit",
        "AI optimization",
        "MLOps",
      ],
      ogType: "website",
      robots: "noindex, follow",
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
              "Services — Build, Fix, and Scale AI",
              "AI-native development, audit, diagnosis, optimization, hardening, and production infrastructure from CuriousDevs.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="Services"
        title="Build AI for production,"
        accent="fix AI that is already failing."
        body="We are not publishing fixed prices during the founding customer cohort. Tell us what you are building or what is going wrong, and we will return with a scoped proposal after discovery."
        action={false}
      />
      <Pricing />
      <FaqAndCta />
      <Footer />
    </main>
  );
}
