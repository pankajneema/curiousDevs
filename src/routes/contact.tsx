import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { ContactForm } from "@/components/landing/ContactForm";
import { PageIntro } from "@/components/landing/PageIntro";
import { Eyebrow } from "@/components/landing/SectionHeading";
import { company, contact } from "@/content/site";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

const TITLE = "Contact — Have a Difficult Problem?";
const DESCRIPTION =
  "Tell CuriousDevs what you're trying to build, fix or explore — an AI system, a new product, or a research question.";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeoHead({
      path: "/contact",
      title: TITLE,
      description: DESCRIPTION,
      keywords: ["contact CuriousDevs", "AI engineering", "intelligent systems", "robotics"],
      ogType: "website",
    }),
  component: ContactPage,
});

const nextSteps = [
  "You tell us the problem — what you're building, fixing or exploring.",
  "We reply by email with questions, or a time to talk.",
  "We define the problem properly before proposing anything.",
];

function ContactPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebPageSchema("/contact", TITLE, DESCRIPTION)),
        }}
      />
      <Nav />
      <PageIntro
        compact
        eyebrow="Contact"
        title={contact.title}
        accent={contact.accent}
        body={contact.body}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 sm:px-8 lg:grid-cols-[1.4fr_0.6fr] lg:gap-10">
          <div className="panel p-6 sm:p-10">
            <Eyebrow>Start the conversation</Eyebrow>
            <h2 className="mt-4 text-2xl font-medium tracking-tight sm:text-[1.75rem]">
              Tell us what you're working on.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The more context you share, the more useful our first reply can be.
            </p>
            <div className="mt-8 border-t border-hairline pt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="on-dark relative isolate overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-night p-6 sm:p-7">
              <div
                aria-hidden="true"
                className="glow-orange absolute -top-24 -right-24 -z-10 size-64 rounded-full"
              />
              <p className="eyebrow">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-3 block text-lg font-medium tracking-tight break-words transition-colors hover:text-orange"
              >
                {contact.email}
              </a>
              <p className="eyebrow mt-7">Base</p>
              <p className="mt-3 text-lg font-medium tracking-tight">{company.base}</p>
            </div>
            <div className="panel p-6 sm:p-7">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-5 space-y-4">
                {nextSteps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="pt-0.5 font-mono text-xs text-amber-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
