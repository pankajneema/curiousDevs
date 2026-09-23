import { createFileRoute, Link } from "@tanstack/react-router";

import { COMPANY_COPY as C } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/site/PageHero";
import { Label, Reveal, Section, SectionHeader } from "@/components/system/primitives";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company — a Physical AI company | CuriousDevs" },
      {
        name: "description",
        content:
          "CuriousDevs builds the intelligence and the robotic systems that let machines understand and act in the physical world: two engineering divisions and the research that feeds them, in Noida, India.",
      },
      { property: "og:title", content: "CuriousDevs — a Physical AI company" },
      {
        property: "og:description",
        content:
          "Intelligence builds the mind, Robotics builds the body, and Research asks what is next.",
      },
      { property: "og:url", content: "/company" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/company" }],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        label={C.hero.label}
        title={C.hero.title}
        lede={
          <>
            <p>{C.hero.lede}</p>
            <p className="mt-4 text-muted-foreground">{C.hero.support}</p>
          </>
        }
      />

      {/* 2 — Why we exist */}
      <Section id="why">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <SectionHeader label={C.why.label} title={C.why.title} />
          <div className="space-y-6 lg:pt-2">
            {C.why.paragraphs.map((p, i) => (
              <p
                key={p}
                className={cn(
                  "leading-relaxed",
                  i === 0
                    ? "text-lg text-foreground/90 md:text-xl"
                    : "text-base text-muted-foreground md:text-lg",
                )}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 3 — The company, drawn once. This page is the only place the whole
             structure is visible at a glance, so it is this page's signature. */}
      <Section id="structure" className="bg-ground-2">
        <SectionHeader
          label={C.structure.label}
          title={C.structure.title}
          lede={C.structure.lede}
        />

        <ol
          aria-label="Company structure"
          className="mono-xs mt-12 flex flex-wrap items-center gap-3 text-muted-foreground"
        >
          {C.structure.chain.map((step) => (
            <li key={step} className="flex items-center gap-3">
              <span className="rounded-full border border-line px-4 py-2">
                {step.toUpperCase()}
              </span>
              <span aria-hidden className="text-signal">
                →
              </span>
            </li>
          ))}
          <li className="text-foreground">INTELLIGENCE · ROBOTICS · RESEARCH</li>
        </ol>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {C.structure.divisions.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06}>
              <Link
                to={d.to}
                className="group flex h-full flex-col rounded-3xl border border-line bg-background/40 p-7 transition-colors duration-300 hover:border-line-strong hover:bg-surface/50 md:p-9"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl tracking-[-0.035em] md:text-3xl">
                    {d.name}
                  </h3>
                  <span className="mono-xs text-muted-foreground transition-colors group-hover:text-signal">
                    {d.role.toUpperCase()}
                  </span>
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {d.body}
                </p>
                <div className="mt-8 flex items-baseline justify-between gap-4 border-t border-line pt-6">
                  <span className="font-display text-lg tracking-[-0.035em]">{d.project}</span>
                  <span className="mono-xs text-muted-foreground">
                    {d.projectNote.toUpperCase()}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — How we think */}
      <Section id="how">
        <SectionHeader label={C.how.label} title={C.how.title} lede={C.how.lede} />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2">
          {C.how.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.05} className="bg-background">
              <article className="group h-full p-7 transition-colors duration-300 hover:bg-surface/50 md:p-9">
                <p className="mono-xs text-muted-foreground transition-colors group-hover:text-signal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 font-display text-xl tracking-[-0.035em] md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5 — Where we are going */}
      <Section id="going" className="bg-ground-2">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <SectionHeader label={C.going.label} title={C.going.title} />
          <p className="text-base leading-relaxed text-muted-foreground lg:pt-2 md:text-lg">
            {C.going.body}
          </p>
        </div>
        <ol className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {C.going.steps.map((s, i) => (
            <li key={s.step} className="bg-ground-2 p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="mono-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < C.going.steps.length - 1 ? (
                  <span aria-hidden className="mono-xs text-line-strong">
                    →
                  </span>
                ) : null}
              </div>
              <h3 className="mt-5 font-display text-lg tracking-[-0.035em] md:text-xl">{s.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.note}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6 — The team, and the close */}
      <Section id="team">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Label className="text-signal">{C.team.label}</Label>
            <h2 className="mt-6 text-3xl leading-[1.05] sm:text-4xl md:text-5xl">{C.team.title}</h2>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {C.team.body}
            </p>
            <div className="mt-8">
              <Link to={C.team.cta.to} className="btn-primary">
                {C.team.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
