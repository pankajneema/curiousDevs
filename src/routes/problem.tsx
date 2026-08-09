import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Problem } from "@/components/landing/Problem";
import { Reveal } from "@/components/landing/Reveal";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/problem")({
  head: () =>
    buildSeoHead({
      path: "/problem",
      title: "The Problem — Why AI Projects Fail in Production | CuriousDevs",
      description:
        "Unclear scope, RAG failures, unreliable agents, and missing production systems: the ways AI projects fail inside companies.",
      keywords: ["AI project failure", "RAG reliability", "agent reliability", "production AI"],
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
              "The Problem — Why AI Projects Fail in Production",
              "The failure modes CuriousDevs helps teams diagnose, fix, and prevent in production AI systems.",
            ),
          ),
        }}
      />
      <Nav />
      <Reveal>
        <Problem />
      </Reveal>
      <Footer />
    </main>
  );
}
