import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Roadmap } from "@/components/landing/Roadmap";
import { Reveal } from "@/components/landing/Reveal";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/roadmap")({
  head: () =>
    buildSeoHead({
      path: "/roadmap",
      title: "Operating Model — Service to IP | CuriousDevs",
      description:
        "How CuriousDevs moves from founding AI engineering engagements to repeatable delivery systems and reusable internal IP.",
      keywords: [
        "AI engineering studio",
        "AI services roadmap",
        "service to IP",
        "AI startup operating model",
      ],
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
              "Operating Model — Service to IP",
              "The CuriousDevs path from founding AI engineering engagements to repeatable internal IP.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="The path from service to IP"
        title="Solve real problems first,"
        accent="then build leverage."
        body="We are building a service engine before a product company: complete founding engagements, measure outcomes, publish proof, standardize delivery, and turn repeated customer problems into reusable internal IP."
      />
      <Reveal>
        <Roadmap />
      </Reveal>
      <Footer />
    </main>
  );
}
