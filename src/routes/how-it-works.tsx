import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Reveal } from "@/components/landing/Reveal";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () => buildSeoHead({
    path: "/how-it-works",
    title: "How It Works — Control Plane & Runtime Enforcement | CuriousDevs",
    description:
      "From adversarial discovery and policy signatures to inline runtime enforcement and signed evidence — the five steps behind every CuriousDevs verdict.",
    keywords: ["runtime enforcement", "policy engine", "AI governance", "control plane"],
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
              "How It Works — Control Plane & Runtime Enforcement",
              "The five-step mechanism behind every CuriousDevs runtime verdict.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="The mechanism"
        title="Decide before the action runs,"
        accent="prove it afterwards."
        body="Discovery and evaluation happen off the hot path. Enforcement happens inline, deterministically, in under 10 milliseconds. Every verdict leaves a signed record an auditor can read without trusting us."
      />
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Footer />
    </main>
  );
}
