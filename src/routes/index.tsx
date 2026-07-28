import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Roadmap } from "@/components/landing/Roadmap";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Reveal } from "@/components/landing/Reveal";
import { Footer } from "@/components/landing/Footer";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CuriousDevs — Security Infrastructure for Autonomous Systems" },
      {
        name: "description",
        content:
          "AgentGuard, CurioComply and AeroOS: runtime security for AI agents, DPDP compliance automation, and an operating system for autonomous fleets.",
      },
      {
        property: "og:title",
        content: "CuriousDevs — Security Infrastructure for Autonomous Systems",
      },
      {
        property: "og:description",
        content:
          "The accountability layer for autonomous systems — from AI agents to physical machines. Built in Bharat, for the world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "CuriousDevs" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-dvh">
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
        <FaqAndCta />
      </Reveal>
      <Footer />
    </main>
  );
}

