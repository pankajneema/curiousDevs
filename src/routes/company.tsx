import { createFileRoute, Link } from "@tanstack/react-router";

import { pageHead } from "@/lib/seo";
import { HOME, STUDIO } from "@/content/studio";
import { PageHero } from "@/components/site/PageHero";
import { CtaPanel } from "@/components/site/Studio";
import {
  Callout,
  DefinitionList,
  Label,
  Section,
  SectionHeader,
  TickList,
} from "@/components/system/primitives";

const TITLE = "Company — AI systems built for production | CuriousDevs";
const DESCRIPTION =
  "CuriousDevs is an independent AI engineering studio in Delhi NCR, India. We build, fix and scale AI systems for production, alongside applied research and Physical AI.";

export const Route = createFileRoute("/company")({
  head: () =>
    pageHead({
      path: "/company",
      crumb: "Company",
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: CompanyPage,
});

const UNITS = [
  {
    n: "01",
    label: "Studio",
    title: "Client engineering",
    body: "We turn real operating problems into useful AI products, dependable platforms and systems teams can run with confidence.",
    link: { label: "Services", to: "/services" },
  },
  {
    n: "02",
    label: "Research",
    title: "CuriousDevs Research",
    body: "Applied research into agent reliability, evaluation, efficient models and the real cost of running AI in production.",
    link: { label: "Research", to: "/research" },
  },
  {
    n: "03",
    label: "Long-term bet",
    title: "Physical AI Lab",
    body: "OJAS is the intelligence that decides and acts. PARTH is the body it moves in. Together, they are our bet on AI that works in the physical world.",
    link: { label: "The lab", to: "/lab" },
  },
] as const;

const PRINCIPLES = [
  {
    n: "01",
    title: "Start with the system",
    body: "We look at the workflow, the data and the people around the problem before choosing a model or a tool.",
  },
  {
    n: "02",
    title: "Make it measurable",
    body: "Every serious build gets a baseline, useful acceptance criteria and a way to see whether it is improving the work.",
  },
  {
    n: "03",
    title: "Stay for the handover",
    body: "The result should be understandable, documented and operable by your team — not dependent on a permanent black box.",
  },
] as const;

const ENGAGEMENTS = [
  {
    n: "01",
    label: "Build",
    title: "From important idea to working system.",
    body: "We shape the product, architecture and first production path together — with a clear baseline and working demonstrations along the way.",
  },
  {
    n: "02",
    label: "Fix",
    title: "Find what is failing and why.",
    body: "We diagnose accuracy, security, cost, latency and operational gaps, then focus the next engineering decision on the highest-value failure.",
  },
  {
    n: "03",
    label: "Scale",
    title: "Make useful AI dependable.",
    body: "We put the right evaluation, deployment, observability and ownership around a system so your team can run it with confidence.",
  },
] as const;

function CompanyPage() {
  return (
    <>
      <PageHero
        label="Company"
        title="AI systems built for production."
        lede="CuriousDevs is an independent AI engineering studio for teams with important problems, imperfect systems and a need for evidence. We build, fix and scale the technology around the model — then make it reliable in the real world."
      />

      <Section id="engagements">
        <SectionHeader
          label="01 · What we do"
          title="Three ways to make progress."
          lede="The right starting point depends on where you are: a new capability to build, a system that is not holding up, or a production path that needs to become dependable."
        />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {ENGAGEMENTS.map((engagement) => (
            <article key={engagement.n} className="bg-background p-6 md:p-8">
              <div className="flex items-baseline justify-between">
                <span className="mono-xs text-muted-foreground">{engagement.n}</span>
                <Label className="text-signal">{engagement.label}</Label>
              </div>
              <h3 className="mt-12 text-2xl leading-tight">{engagement.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {engagement.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* 02 Structure */}
      <Section id="structure">
        <SectionHeader
          label="02 · Structure"
          title="One studio. Three ways to move forward."
          lede="Client engineering, applied research and physical AI are connected by the same standard: build carefully, measure honestly and make the result useful."
        />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {UNITS.map((u) => (
            <Link
              key={u.n}
              to={u.link.to}
              className="cell-link flex min-h-60 flex-col gap-4 bg-background p-6 text-foreground md:p-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="mono-xs text-muted-foreground">{u.n}</span>
                <Label className="text-signal">{u.label}</Label>
              </div>
              <h3 className="text-2xl">{u.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{u.body}</p>
              <span className="mt-auto font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
                {u.link.label} <span className="cell-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="facts">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-8">
            <SectionHeader
              label="03 · At a glance"
              title="A practical team for ambitious systems."
              lede="You work directly with the people shaping the problem, building the system and learning from what happens after launch."
            />
            <div className="flex flex-col gap-4">
              <Label>Ways to work together</Label>
              <TickList items={HOME.models.map((m) => `${m.name} — ${m.body}`)} />
            </div>
          </div>
          <DefinitionList items={HOME.company} />
        </div>
        <Callout tone="signal" title="Proof over promises" className="mt-12 max-w-[55rem]">
          We do not call a system ready because it looks good in a demo. It is ready when the
          evidence says it works for the people and process it was built for.
        </Callout>
      </Section>

      <Section id="approach">
        <SectionHeader
          label="04 · How we work"
          title="Good engineering is a habit, not a phase."
          lede="The strongest outcomes come from a clear problem, a small feedback loop and enough discipline to keep learning after launch."
        />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <article key={principle.n} className="bg-background p-6 md:p-8">
              <span className="mono-xs text-muted-foreground">{principle.n}</span>
              <h3 className="mt-12 text-2xl leading-tight">{principle.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="open-work">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeader
            label="05 · Open work"
            title="The public work is part of the proof."
            lede="We share the tools, experiments and engineering direction we can. Explore the organisation on GitHub, or follow the research and Physical AI work that sits alongside client delivery."
          />
          <div className="flex flex-wrap gap-3 lg:pt-1">
            <a href={STUDIO.github} target="_blank" rel="noreferrer" className="btn-primary">
              Explore GitHub
            </a>
            <Link to="/research" className="btn-outline">
              Read the research
            </Link>
            <Link to="/lab" className="btn-outline">
              Visit the lab
            </Link>
          </div>
        </div>
      </Section>

      <Section id="cta">
        <CtaPanel label="Talk to us" title="Bring us the hard problem, not a polished brief.">
          <Link to="/contact" className="btn-primary">
            Book a consultation
          </Link>
          <Link to="/services" className="btn-outline">
            View services
          </Link>
        </CtaPanel>
      </Section>
    </>
  );
}
