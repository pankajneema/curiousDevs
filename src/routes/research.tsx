import { createFileRoute, Link } from "@tanstack/react-router";

import { RESEARCH_COPY as C } from "@/lib/copy";
import { RESEARCH_HYPOTHESES, STANDING_COMMITMENT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/site/PageHero";
import { ResearchTrack } from "@/components/system/ResearchTrack";
import {
  Callout,
  DefinitionList,
  Label,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/system/primitives";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — the questions behind future Physical AI | CuriousDevs" },
      {
        name: "description",
        content:
          "Research at CuriousDevs investigates the technologies that may become future intelligence systems, robotic platforms, models and infrastructure. Every question carries its method, and results are published exactly as measured.",
      },
      { property: "og:title", content: "Research — we publish questions before answers" },
      {
        property: "og:description",
        content:
          "Model behaviour, world representation, decision under constraint, embodiment, evaluation and learning in service. Directions of inquiry, not programmes with results.",
      },
      { property: "og:url", content: "/research" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: ResearchPage,
});

function ResearchPage() {
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

      {/* 2 — Why we research */}
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

      {/* 3 — What we explore */}
      <Section id="explore">
        <SectionHeader label={C.explore.label} title={C.explore.title} lede={C.explore.lede} />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {C.explore.areas.map((a, i) => (
            <Reveal key={a.index} delay={(i % 3) * 0.05} className="bg-background">
              <article className="group h-full p-6 transition-colors duration-300 hover:bg-surface/50 md:p-7">
                <p className="mono-xs text-muted-foreground transition-colors group-hover:text-signal">
                  {a.index}
                </p>
                <span aria-hidden className="mt-4 block h-px w-6 bg-signal" />
                <h3 className="mt-5 font-display text-lg tracking-[-0.035em] md:text-xl">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mono-xs mt-8 text-muted-foreground">{C.explore.note.toUpperCase()}</p>
      </Section>

      {/* 4 — How we research */}
      <Section id="method" className="bg-ground-2">
        <div className="grid gap-12 [&>*]:min-w-0 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <SectionHeader label={C.method.label} title={C.method.title} lede={C.method.lede} />
          <DefinitionList items={C.method.items} />
        </div>
      </Section>

      {/* 5 — The questions themselves */}
      <Section id="questions">
        <SectionHeader
          label={C.questions.label}
          title={C.questions.title}
          lede={C.questions.lede}
        />
        <div className="mt-14 grid gap-px bg-line lg:grid-cols-2">
          {RESEARCH_HYPOTHESES.map((h, i) => (
            <Reveal key={h.id} delay={(i % 2) * 0.06} className="bg-background">
              <article className="group h-full p-7 transition-colors duration-300 hover:bg-surface/50 md:p-9">
                <p className="mono-xs text-muted-foreground transition-colors group-hover:text-signal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 max-w-xl font-display text-xl leading-snug tracking-[-0.035em] md:text-2xl">
                  {h.question}
                </h3>
                <dl className="mt-7 space-y-6 border-t border-line pt-6">
                  <div>
                    <dt className="label-tech text-foreground/70">{C.questions.methodLabel}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {h.method}
                    </dd>
                  </div>
                  <div>
                    <dt className="label-tech text-foreground/70">{C.questions.commitmentLabel}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {h.commitment}
                    </dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mono-xs mt-8 text-muted-foreground">{C.questions.note.toUpperCase()}</p>
      </Section>

      {/* 6 — Honesty */}
      <Section id="honesty" className="bg-ground-2">
        <div className="grid gap-12 [&>*]:min-w-0 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeader label={C.honesty.label} title={C.honesty.title} />
          <div>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {C.honesty.body}
            </p>
            <Callout tone="signal" className="mt-10" title={C.honesty.commitmentTitle}>
              {STANDING_COMMITMENT}
            </Callout>
          </div>
        </div>
      </Section>

      {/* 7 — Where it leads, and the close */}
      <Section id="leads">
        <SectionHeader label={C.leads.label} title={C.leads.title} lede={C.leads.lede} />
        <ResearchTrack className="mt-14" steps={C.leads.track} outcomes={C.leads.outcomes} />
        <div className="mt-14 flex flex-wrap gap-3">
          <Link to={C.leads.primary.to} className="btn-primary">
            {C.leads.primary.label}
          </Link>
          <Link to={C.leads.secondary.to} className="btn-outline">
            {C.leads.secondary.label}
          </Link>
        </div>
      </Section>
    </>
  );
}
