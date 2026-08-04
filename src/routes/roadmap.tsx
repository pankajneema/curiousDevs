import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Roadmap } from "@/components/landing/Roadmap";
import { Reveal } from "@/components/landing/Reveal";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/roadmap")({
  head: () => buildSeoHead({
    path: "/roadmap",
    title: "Roadmap 2026–2030 — Agents, Data, Machines | CuriousDevs",
    description:
      "The CuriousDevs path from AgentGuard runtime control to CurioComply evidence automation and AeroOS command for autonomous fleets, 2026 through 2030.",
    keywords: ["AI roadmap", "agent security roadmap", "DPDP product roadmap", "autonomous fleets"],
    ogType: "article",
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/roadmap",
              "Roadmap 2026–2030 — Agents, Data, Machines",
              "The product path from AgentGuard to CurioComply and AeroOS for autonomous fleets.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="The path, 2026 to 2030"
        title="One layer at a time,"
        accent="in the order it has to ship."
        body="We are not selling a platform vision. Runtime control for agents comes first, the evidence engine follows because it needs those verdicts, and machine fleets come last because they need both."
      />
      <Reveal>
        <Roadmap />
      </Reveal>
      <Footer />
    </main>
  );
}
