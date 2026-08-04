import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Problem } from "@/components/landing/Problem";
import { Reveal } from "@/components/landing/Reveal";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/problem")({
  head: () => buildSeoHead({
    path: "/problem",
    title: "The Problem — Autonomy Without Accountability | CuriousDevs",
    description:
      "Borrowed authority, instruction hijack, quiet data exit and machines in motion: the four ways autonomous systems fail silently inside enterprises.",
    keywords: ["AI autonomy risk", "agent failure modes", "instruction hijack", "AI compliance risk"],
    ogType: "article",
  }),
  component: ProblemPage,
});

function ProblemPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/problem",
              "The Problem — Autonomy Without Accountability",
              "The four failure modes we built the checkpoint for in autonomous systems and AI agents.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="Where it breaks"
        title="Autonomy fails quietly,"
        accent="and the logs stay green."
        body="Agents act with credentials nobody scoped, documents rewrite their instructions, and personal records ride out through an integration that looks routine. These are the four patterns we keep finding."
      />
      <Reveal>
        <Problem />
      </Reveal>
      <Footer />
    </main>
  );
}
