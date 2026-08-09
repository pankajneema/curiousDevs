import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
  head: () =>
    buildSeoHead({
      path: "/careers",
      title: "Careers — CuriousDevs",
      description:
        "CuriousDevs is not hiring right now. Follow the company for future AI engineering opportunities.",
      keywords: ["CuriousDevs careers", "AI engineering jobs", "Gurugram technology company"],
      ogType: "website",
    }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/careers",
              "Careers — CuriousDevs",
              "CuriousDevs is not hiring right now.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="Careers"
        title="We are not hiring right now,"
        accent="and we want to be clear."
        body="CuriousDevs is focused on building its founding AI engineering service practice. When the next role opens, this page will say exactly what it is and how to apply."
        action={false}
      />

      <section className="border-b border-hairline pb-24 sm:pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="border border-hairline bg-surface/70 p-7 text-center shadow-[0_8px_24px_rgba(10,20,36,0.04)] sm:p-10">
            <p className="eyebrow">Current status</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight">No open roles</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              We are keeping the team intentionally small while we build the service engine. This
              page will be updated when hiring resumes.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
