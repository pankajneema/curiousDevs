import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { FaqPage } from "@/components/landing/FaqPage";
import { FinalCta } from "@/components/landing/FinalCta";
import { PageIntro } from "@/components/landing/PageIntro";
import { detailedFaqs } from "@/content/faq";
import { buildFaqSchema, buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    buildSeoHead({
      path: "/faq",
      title: "FAQ — CuriousDevs",
      description:
        "What CuriousDevs builds today, what it is researching, what Noema and Soma are, and how to get in touch.",
      keywords: ["CuriousDevs FAQ", "intelligent systems", "Noema", "Soma", "AI engineering"],
      ogType: "article",
    }),
  component: FaqRoute,
});

function FaqRoute() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildFaqSchema(detailedFaqs.map((item) => ({ question: item.q, answer: item.a }))),
          ),
        }}
      />
      <Nav />
      <PageIntro
        compact
        eyebrow="FAQ"
        title="Clear answers,"
        accent="before we start."
        body="What we build today, what we are researching, what Noema and Soma are — and how to reach us."
      />
      <FaqPage />
      <FinalCta />
      <Footer />
    </main>
  );
}
