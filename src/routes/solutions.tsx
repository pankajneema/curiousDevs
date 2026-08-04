import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Solutions } from "@/components/landing/Solutions";
import { FaqAndCta } from "@/components/landing/FaqAndCta";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/solutions")({
  validateSearch: (search: Record<string, unknown>) => ({
    industry: typeof search.industry === "string" ? search.industry : undefined,
  }),
  head: () => buildSeoHead({
    path: "/solutions",
    title: "Solutions by Industry — Fintech, Healthcare, SaaS & Government | CuriousDevs",
    description:
      "How CuriousDevs governs AI agents across fintech, healthcare, enterprise SaaS and government — real risk scenarios and the verdicts that stop them.",
    keywords: ["AI governance", "regulatory AI", "fintech AI security", "healthcare AI", "government AI"],
    ogType: "website",
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const { industry } = Route.useSearch();
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/solutions",
              "Solutions by Industry",
              "Deterministic enforcement for AI agents operating in regulated, high-stakes environments.",
            ),
          ),
        }}
      />
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
