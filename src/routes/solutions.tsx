import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Solutions } from "@/components/landing/Solutions";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";

export const Route = createFileRoute("/solutions")({
  validateSearch: (search: Record<string, unknown>) => ({
    industry: typeof search.industry === "string" ? search.industry : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Solutions by Industry — Fintech, Healthcare, SaaS & Government | CuriousDevs" },
      {
        name: "description",
        content:
          "How CuriousDevs governs AI agents across fintech, healthcare, enterprise SaaS and government — real risk scenarios and the verdicts that stop them.",
      },
      { property: "og:title", content: "Solutions by Industry" },
      {
        property: "og:description",
        content:
          "Deterministic enforcement for AI agents operating in regulated, high-stakes environments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://curiousdevs.com/solutions" },
      { property: "og:site_name", content: "CuriousDevs" },
    ],
    links: [{ rel: "canonical", href: "https://curiousdevs.com/solutions" }],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const { industry } = Route.useSearch();
  return (
    <main id="main-content" className="relative">
      <Nav />
      <PageIntro
        eyebrow="Use cases"
        title="Built for the industries"
        accent="that can't afford to guess."
        body="Deterministic enforcement for AI agents operating in regulated, high-stakes environments. Every action governed before execution."
        action={false}
      />
      <Solutions initialSlug={industry} />
      <FaqAndCta />
      <Footer />
    </main>
  );
}
