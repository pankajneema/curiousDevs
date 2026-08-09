import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Reveal } from "@/components/landing/Reveal";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    buildSeoHead({
      path: "/how-it-works",
      title: "How It Works — CuriousDevs AI Engineering Delivery",
      description:
        "The CuriousDevs delivery system for discovering, building, auditing, optimizing, evaluating, and deploying AI systems.",
      keywords: ["AI engineering process", "AI audit process", "AI productionization", "MLOps"],
      ogType: "article",
    }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/how-it-works",
              "How It Works — CuriousDevs AI Engineering Delivery",
              "The evidence-based delivery system behind every CuriousDevs engagement.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="The delivery system"
        title="Build or fix the system,"
        accent="prove the result afterwards."
        body="Every engagement follows the same discipline: discover, baseline, architect, build or diagnose, evaluate, harden, deploy, and document. No improvement claim without comparable evidence."
      />
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Footer />
    </main>
  );
}
