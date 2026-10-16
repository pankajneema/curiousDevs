import { createFileRoute, Link } from "@tanstack/react-router";

import { pageHead } from "@/lib/seo";
import { RESEARCH } from "@/content/studio";
import { PageHero } from "@/components/site/PageHero";
import { Illustration, Step } from "@/components/site/Studio";
import { Callout, Label, Section, SectionHeader } from "@/components/system/primitives";

const TITLE = "Research — we publish questions before answers | CuriousDevs";
const DESCRIPTION =
  "Applied research on the problems our client work keeps raising: agent reliability, evaluation, efficient models and the real cost of running AI.";

export const Route = createFileRoute("/research")({
  head: () =>
    pageHead({
      path: "/research",
      crumb: "Research",
      ogType: "article",
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: ResearchPage,
});

const COLLABORATE = [
  {
    label: "Engineers and researchers",
    title: "Build the tools with us.",
    body: "Agents, evaluation, fine-tuning and infrastructure. Send the hardest thing you have shipped.",
    cta: "Write to us",
    to: "/contact",
  },
  {
    label: "Universities and programmes",
    title: "Partner on applied research.",
    body: "Joint projects, student work and grant programmes where an engineering partner helps research reach production.",
    cta: "Start a conversation",
    to: "/contact",
  },
  {
    label: "Sister lab",
    title: "The Physical AI Lab.",
    body: "OJAS and PARTH: the intelligence and the body for AI that runs real machines.",
    cta: "Visit the lab",
    to: "/lab",
  },
] as const;

function ResearchPage() {
  return (
    <>
      <PageHero
        label="CuriousDevs Research"
        title="We publish questions before answers."
        lede="Applied research on the problems our client work keeps raising: agent reliability, evaluation, efficient models and the real cost of running AI. What holds up becomes how we build. What does not is written down, so we do not repeat it."
        meta={RESEARCH.heroMeta}
      />

      {/* 01 Areas */}
      <Section id="areas">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeader
            label="01 · Research areas"
            title="Four questions we keep returning to."
            lede="Each area begins as a question raised by a real system, and ends as a method, a tool or a documented dead end."
          />
          <Illustration
            name="research-frontier"
            aspect="16 / 9"
            alt="Line illustration of a quality-against-cost frontier with one highlighted point"
            className="border border-line"
          />
        </div>
        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
          {RESEARCH.areas.map((a) => (
            <div key={a.n} className="flex min-h-[340px] flex-col gap-4 bg-background p-7 md:p-10">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-4xl tracking-[-0.03em] text-muted-foreground md:text-5xl">
                  {a.n}
                </span>
                <Label className="text-signal">{a.tag}</Label>
              </div>
              <h3 className="text-[clamp(1.625rem,3vw,2.125rem)]">{a.title}</h3>
              <p className="font-display text-lg leading-snug tracking-[-0.035em] text-foreground/90 md:text-xl">
                {a.q}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">{a.why}</p>
              <div className="mt-auto flex flex-col gap-1.5 border-t border-line pt-4">
                <Label>So far</Label>
                <p className="text-sm leading-relaxed text-foreground">{a.output}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 02 From lab to production */}
      <Section id="loop">
        <SectionHeader
          label="02 · From lab to production"
          title="Research that has to survive a client system."
          lede="We do not research for its own sake. Every question has to end somewhere useful."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {RESEARCH.loop.map((l) => (
            <Step key={l.n} n={l.n} title={l.title}>
              <p className="text-sm leading-relaxed text-muted-foreground">{l.body}</p>
            </Step>
          ))}
        </div>
        <Callout tone="signal" title="Our standing rule" className="mt-10 max-w-[55rem]">
          A number without a method is a slogan. Every result we share says how it was measured, and
          a target is never shown as a result.
        </Callout>
      </Section>

      {/* 03 Collaborate */}
      <Section id="collaborate">
        <SectionHeader
          label="03 · Collaborate"
          title="Work on these questions with us."
          lede="We are small, so every collaborator changes what we can take on."
        />
        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {COLLABORATE.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="cell-link flex min-h-60 flex-col gap-4 bg-background p-6 text-foreground md:p-9"
            >
              <Label className="text-signal">{c.label}</Label>
              <h3 className="text-2xl md:text-[1.625rem]">{c.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <span className="mt-auto font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
                {c.cta} <span className="cell-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
