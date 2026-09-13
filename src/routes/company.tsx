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
import { CompanyBannerVisual } from "@/components/landing/CompanyBannerVisual";
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
      <section className="on-dark grain relative isolate overflow-hidden border-b border-hairline">
        <div
          aria-hidden="true"
          className="tech-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(90%_90%_at_20%_20%,black,transparent)]"
        />
        <div
          aria-hidden="true"
          className="glow-orange pointer-events-none absolute -bottom-64 left-[-18%] -z-10 size-[min(720px,100vw)] rounded-full opacity-60"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <div className="order-2 lg:order-1" data-reveal>
            <CompanyBannerVisual />
          </div>
          <div className="order-1 lg:order-2" data-reveal>
            <p className="eyebrow flex items-center gap-2.5 text-amber-accent">
              <span className="h-px w-6 bg-orange" aria-hidden="true" />
              {company.eyebrow}
            </p>
            <h1 className="display mt-7 max-w-3xl text-[clamp(2.7rem,5.2vw,4.8rem)]">
              <span className="text-sheen">{company.title}</span>
              <br />
              <span className="text-orange">{company.accent}</span>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted-foreground sm:text-lg">
              {company.body} We connect research, disciplined engineering, and product thinking to
              make intelligent systems useful, measurable, secure, and ready for the world outside
              the demo.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary group">
                Start a Conversation
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/technology" className="btn-outline">
                Explore our technology
              </Link>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-hairline pt-5">
              {[
                ["01", "Research"],
                ["02", "Engineer"],
                ["03", "Build"],
              ].map(([n, label]) => (
                <div key={label}>
                  <span className="font-mono text-xs text-orange">{n}</span>
                  <p className="mt-2 text-sm text-foreground/80">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-hairline bg-night/70">
          <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4 sm:px-8">
            {coreStory.map((m, i) => (
              <li key={m} className="flex items-center gap-5 text-[13px] text-foreground/70">
                {i > 0 && <span aria-hidden="true" className="h-px w-6 bg-orange/60" />}
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="About CuriousDevs"
            title="A small studio for"
            accent="difficult technology."
            body="We work where software, intelligent systems, and the physical world meet. Our job is to turn unclear questions into systems that can be understood, tested, shipped, and improved."
          />
          <div className="mt-16 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="panel p-7 sm:p-10" data-reveal>
              <p className="max-w-2xl text-[19px] leading-relaxed text-foreground/90 sm:text-2xl">
                AI demos are easy to make. Dependable systems require a different kind of work:
                clear scope, grounded data, evaluation, security, observability, deployment, and a
                team that can operate what it built.
              </p>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
                CuriousDevs brings those disciplines together. We help teams build AI-native
                products, understand why an existing system fails, and create an operating path from
                first experiment to production. As our work deepens, the same discipline extends
                toward edge intelligence, robotics, advanced hardware, and embodied systems.
              </p>
            </div>
            <div className="on-navy rounded-[20px] border border-hairline p-7 sm:p-10" data-reveal>
              <p className="eyebrow text-amber-accent">The standard</p>
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                Useful is not enough.
                <br />
                <span className="text-orange">It has to hold up.</span>
              </h3>
              <ul className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <li className="border-t border-hairline pt-4">
                  A measurable baseline before intervention.
                </li>
                <li className="border-t border-hairline pt-4">A clear owner and operating path.</li>
                <li className="border-t border-hairline pt-4">
                  Evidence before claims and handover before exit.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
