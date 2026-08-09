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
  head: () =>
    buildSeoHead({
      path: "/solutions",
      title: "Solutions by Industry — Fintech, Healthcare, SaaS & Government | CuriousDevs",
      description:
        "How CuriousDevs builds, audits, diagnoses, secures, and productionizes AI systems across fintech, healthcare, enterprise SaaS, and government.",
      keywords: [
        "AI engineering solutions",
        "fintech AI",
        "healthcare AI",
        "enterprise AI",
        "government AI",
      ],
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
              "AI engineering for regulated, high-stakes environments where reliability, security, and evidence matter.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="Use cases"
        title="See where AI can help"
        accent="and where it needs care."
        body="Explore simple examples of how CuriousDevs can help teams build useful AI, improve an existing system, and move it into production safely."
        action={false}
      />
      <Solutions initialSlug={industry} />
      <FaqAndCta />
      <Footer />
    </main>
  );
}
