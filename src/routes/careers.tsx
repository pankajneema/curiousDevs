import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { Eyebrow } from "@/components/landing/SectionHeading";
import { careers, company, domains } from "@/content/site";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

const TITLE = "Careers — Build Difficult Technology";
const DESCRIPTION =
  "CuriousDevs lists real openings only. There are no open roles right now; this page will say exactly what a role is when one opens.";

export const Route = createFileRoute("/careers")({
  head: () =>
    buildSeoHead({
      path: "/careers",
      title: TITLE,
      description: DESCRIPTION,
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
          __html: JSON.stringify(buildWebPageSchema("/careers", TITLE, DESCRIPTION)),
        }}
      />
      <Nav />
      <PageIntro
        compact
        eyebrow="Careers"
        title={careers.title}
        accent={careers.accent}
        body={careers.body}
      />

      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="panel overflow-hidden p-8 sm:p-12">
            <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
            <div
              aria-hidden="true"
              className="glow-orange absolute -right-32 -bottom-32 -z-10 size-96 rounded-full"
            />
            <Eyebrow>Open roles</Eyebrow>
            <h2 className="display mt-7 text-[clamp(2.3rem,4.5vw,3.6rem)]">
              No open roles
              <br />
              <span className="text-orange">right now.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              We only list real openings. When a role opens, it will appear here with exactly what
              it is and how to apply.
            </p>
            <a href={`mailto:${company.email}?subject=Careers`} className="btn-outline mt-10">
              <Mail className="size-4" /> Say hello anyway
            </a>
          </div>

          <div data-reveal>
            <p className="eyebrow">The kind of work</p>
            <h3 className="mt-5 max-w-md text-[1.75rem] leading-tight font-normal tracking-tight">
              When we hire, it will be to build difficult technology.
            </h3>
            <ul className="mt-10 divide-y divide-[var(--hairline)] border-y border-hairline">
              {domains.map((d) => (
                <li key={d.id}>
                  <Link
                    to="/technology"
                    hash={d.id}
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-muted-foreground">{d.n}</span>
                      <div>
                        <span className="block text-xl font-medium tracking-tight transition-colors group-hover:text-amber-accent">
                          {d.name}
                        </span>
                        <span className="mt-1 hidden text-sm text-muted-foreground sm:block">
                          {d.statement}
                        </span>
                      </div>
                    </div>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-hairline transition-colors group-hover:border-orange group-hover:bg-orange group-hover:text-ivory">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
