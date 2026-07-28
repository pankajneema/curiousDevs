import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Solutions } from "@/components/landing/Solutions";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions by Industry — Fintech, Healthcare, SaaS & Government | CuriosDevs" },
      {
        name: "description",
        content:
          "How CuriosDevs governs AI agents across fintech, healthcare, enterprise SaaS and government — real risk scenarios and the verdicts that stop them.",
      },
      { property: "og:title", content: "Solutions by Industry" },
      {
        property: "og:description",
        content: "Deterministic enforcement for AI agents operating in regulated, high-stakes environments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/solutions" },
      { property: "og:site_name", content: "CuriosDevs" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <main className="relative min-h-dvh">
      <Nav />
      <PageIntro
        eyebrow="Use cases"
        title="Built for the industries"
        accent="that can't afford to guess."
        body="Deterministic enforcement for AI agents operating in regulated, high-stakes environments. Every action governed before execution."
        action={false}
      />
      <Solutions />
      <FaqAndCta />
      <Footer />
    </main>
  );
}
