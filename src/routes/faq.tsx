import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { FaqPage } from "@/components/landing/FaqPage";
import { detailedFaqs } from "@/content/faq";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    buildSeoHead({
      path: "/faq",
      title: "FAQ — CuriousDevs AI Engineering Studio",
      description:
        "Answers about CuriousDevs AI engineering services, audits, security, delivery, pricing, ownership, and production deployment.",
      keywords: [
        "AI engineering FAQ",
        "AI audit questions",
        "AI development services",
        "AI productionization",
      ],
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: detailedFaqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <Nav />
      <FaqPage />
      <Footer />
    </main>
  );
}
