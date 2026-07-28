import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Roadmap } from "@/components/landing/Roadmap";
import { Reveal } from "@/components/landing/Reveal";
import { PageIntro } from "@/components/landing/PageIntro";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap 2026–2030 — Agents, Data, Machines | CuriosDevs" },
      {
        name: "description",
        content:
          "The CuriosDevs path from AgentGuard runtime control to CurioComply evidence automation and AeroOS command for autonomous fleets, 2026 through 2030.",
      },
      { property: "og:title", content: "Roadmap 2026–2030 — Agents, Data, Machines" },
      {
        property: "og:description",
        content:
          "Ambitious, but in order: each layer ships only once the one below it is running in production.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/roadmap" },
      { property: "og:site_name", content: "CuriosDevs" },
    ],
    links: [{ rel: "canonical", href: "/roadmap" }],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <main className="relative min-h-dvh">
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
