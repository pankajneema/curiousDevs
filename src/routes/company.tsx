import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Gauge,
  Mail,
  MapPin,
  Microscope,
  Mountain,
  Wrench,
} from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { FinalCta } from "@/components/landing/FinalCta";
import { Eyebrow, SectionHeading } from "@/components/landing/SectionHeading";
import { VisionTeaser } from "@/components/landing/VisionTeaser";
import { revealDelay } from "@/components/landing/motion";
import { company, coreStory, coreStoryLong } from "@/content/site";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

const TITLE = "Company — Curiosity Drives What We Build";
const DESCRIPTION =
  "CuriousDevs exists to research and engineer technology that solves difficult real-world problems. Research deeply. Engineer carefully. Measure honestly. Build for reality.";

export const Route = createFileRoute("/company")({
  head: () =>
    buildSeoHead({
      path: "/company",
      title: TITLE,
      description: DESCRIPTION,
      keywords: ["CuriousDevs", "technology company Gurugram", "intelligent systems company"],
      ogType: "website",
    }),
  component: CompanyPage,
});

const PRINCIPLE_ICONS = [Microscope, Wrench, Gauge, Mountain];

function CompanyPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebPageSchema("/company", TITLE, DESCRIPTION)),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow={company.eyebrow}
        title={company.title}
        accent={company.accent}
        body={company.body}
        actions={
          <>
            <Link to="/contact" className="btn-primary group">
              Start a Conversation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/careers" className="btn-outline">
              Careers
            </Link>
          </>
        }
        meta={coreStory}
      />

      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="How we work"
            title="Four principles."
            accent="One discipline."
            body="Research deeply. Engineer carefully. Measure honestly. Build for reality."
          />
          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {company.principles.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[i] ?? Microscope;
              return (
                <li
                  key={p.title}
                  data-reveal
                  style={revealDelay(i * 80)}
                  className="panel spotlight flex flex-col p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-hairline bg-background">
                      <Icon className="size-5 text-orange" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-10 text-xl font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="on-navy border-t border-hairline py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Core story"
            title="One company."
            accent="One continuous story."
            body="Research → Engineering → Systems → Products → Real-world impact."
          />
          <ol className="relative mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <span
              aria-hidden="true"
              className="absolute top-[7px] right-0 left-0 hidden h-px bg-[linear-gradient(to_right,var(--signal-bright),var(--border-dark)_60%)] lg:block"
            />
            {coreStoryLong.map((s, i) => (
              <li key={s.n} data-reveal style={revealDelay(i * 80)} className="relative">
                <span
                  className={`relative block size-3.5 rounded-full border-2 ${i === 0 ? "border-orange-bright bg-orange-bright" : "border-hairline bg-background"}`}
                />
                <p className="mt-7 font-mono text-xs text-amber-accent">{s.n}</p>
                <h3 className="mt-2 text-xl font-medium tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            data-reveal
            className="on-dark grain relative isolate overflow-hidden rounded-[24px] border border-hairline bg-night px-7 py-14 sm:px-14 sm:py-20"
          >
            <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
            <div
              aria-hidden="true"
              className="glow-orange absolute -right-40 -bottom-56 -z-10 size-[640px] rounded-full"
            />
            <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end">
              <div>
                <Eyebrow>Where we work</Eyebrow>
                <h2 className="display mt-6 text-[clamp(2.3rem,4.5vw,3.9rem)]">
                  <span className="text-sheen">Based in Gurugram.</span>
                  <br />
                  <span className="text-orange">Built for the real world.</span>
                </h2>
              </div>
              <ul className="divide-y divide-[var(--hairline)] border-y border-hairline">
                <li className="flex items-center gap-4 py-4 text-foreground/85">
                  <MapPin className="size-4 text-orange" /> {company.base}
                </li>
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="group flex items-center gap-4 py-4 text-foreground/85 transition-colors hover:text-foreground"
                  >
                    <Mail className="size-4 text-orange" /> {company.email}
                    <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="group flex items-center gap-4 py-4 text-foreground/85 transition-colors hover:text-foreground"
                  >
                    <Briefcase className="size-4 text-orange" /> Careers
                    <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <VisionTeaser />
      <FinalCta />
      <Footer />
    </main>
  );
}
