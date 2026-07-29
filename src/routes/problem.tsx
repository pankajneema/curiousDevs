import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Problem } from "@/components/landing/Problem";
import { Reveal } from "@/components/landing/Reveal";
import { PageIntro } from "@/components/landing/PageIntro";

export const Route = createFileRoute("/problem")({
  head: () => ({
    meta: [
      { title: "The Problem — Autonomy Without Accountability | CuriousDevs" },
      {
        name: "description",
        content:
          "Borrowed authority, instruction hijack, quiet data exit and machines in motion: the four ways autonomous systems fail silently inside enterprises.",
      },
      { property: "og:title", content: "The Problem — Autonomy Without Accountability" },
      {
        property: "og:description",
        content:
          "Nothing alarms when autonomy goes wrong. Here are the four failure modes we built the checkpoint for.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://curiousdevs.com/problem" },
      { property: "og:site_name", content: "CuriousDevs" },
    ],
    links: [{ rel: "canonical", href: "https://curiousdevs.com/problem" }],
  }),
  component: ProblemPage,
});

function ProblemPage() {
  return (
    <main id="main-content" className="relative">
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
