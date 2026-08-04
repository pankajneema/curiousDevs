import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Roadmap } from "@/components/landing/Roadmap";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Reveal } from "@/components/landing/Reveal";
import { Footer } from "@/components/landing/Footer";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => buildSeoHead({
    path: "/",
    title: "CuriousDevs — Security Infrastructure for Autonomous Systems",
    description:
      "AgentGuard, CurioComply and AeroOS: runtime security for AI agents, DPDP compliance automation, and an operating system for autonomous fleets.",
    keywords: [
      "AI security",
      "autonomous systems",
      "DPDP compliance",
      "agent guard",
      "runtime enforcement",
    ],
    ogType: "website",
  }),
  component: Index,
});

function Index() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/",
              "CuriousDevs — Security Infrastructure for Autonomous Systems",
              "Runtime security, compliance evidence and fleet governance for autonomous systems.",
            ),
          ),
        }}
      />
      <Nav />
      <Hero />
      <Reveal>
        <Problem />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Roadmap />
      </Reveal>
      <Reveal>
        <FaqAndCta schema />
      </Reveal>
      <Footer />
    </main>
  );
}
