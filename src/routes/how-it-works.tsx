import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Reveal } from "@/components/landing/Reveal";
import { PageIntro } from "@/components/landing/PageIntro";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Control Plane & Runtime Enforcement | CuriosDevs" },
      {
        name: "description",
        content:
          "From adversarial discovery and policy signatures to inline runtime enforcement and signed evidence — the five steps behind every CuriosDevs verdict.",
      },
      { property: "og:title", content: "How It Works — Control Plane & Runtime Enforcement" },
      {
        property: "og:description",
        content:
          "Two planes, five steps: baseline behaviour before production, enforce deterministically at runtime, and keep an append-only record.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/how-it-works" },
      { property: "og:site_name", content: "CuriosDevs" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <main className="relative min-h-dvh">
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
