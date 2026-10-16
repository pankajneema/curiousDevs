import { createFileRoute, Link } from "@tanstack/react-router";

import { pageHead } from "@/lib/seo";
import { HOME, STUDIO } from "@/content/studio";
import { CONTACT_COPY } from "@/lib/copy";
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

const TITLE = "Company — a founder-led AI engineering studio | CuriousDevs";
const DESCRIPTION =
  "CuriousDevs is a founder-led engineering company in Delhi NCR, India: a client engineering studio, with a research lab and a Physical AI lab alongside it.";

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
    body: "We help organisations decide where AI creates value, engineer it into their products and operations, and run it reliably.",
    link: { label: "Services", to: "/services" },
  },
  {
    n: "02",
    label: "Research",
    title: "CuriousDevs Research",
    body: "Applied research on the problems our client work keeps raising: agent reliability, evaluation, efficient models and the real cost of running AI.",
    link: { label: "Research", to: "/research" },
  },
  {
    n: "03",
    label: "Long-term bet",
    title: "Physical AI Lab",
    body: "OJAS, the intelligence that decides and acts, and PARTH, the body it moves in. AI that runs real machines, built in India.",
    link: { label: "The lab", to: "/lab" },
  },
] as const;

function CompanyPage() {
  return (
    <>
      <PageHero
        label="Company"
        title="Small by design. Accountable by default."
        lede="CuriousDevs is a founder-led engineering company. We stay deliberately small so that every system we ship has an owner who built it and answers for it."
        meta={[
          { term: "Founded by", value: "Pankaj Kumar" },
          { term: "Based in", value: "Delhi NCR, India" },
          { term: "Works with", value: "Teams across India and internationally" },
          { term: "Standard", value: "Evidence before claims" },
        ]}
      />

      {/* 01 Structure */}
      <Section id="structure">
        <SectionHeader
          label="01 · Structure"
          title="One studio, with two labs alongside it."
          lede="Client work keeps the studio running and keeps our research honest. What we learn in the labs comes back into how we build for clients."
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

      {/* 04 Facts and engagement models */}
      <Section id="founder">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeader
            label="02 · Founder"
            title="Pankaj Kumar"
            lede="Founder and engineer. Works across backend, voice, real-time and AI infrastructure systems, and leads every engagement from first conversation to support."
          />
          <div className="flex flex-col gap-6">
            <p className="leading-relaxed text-muted-foreground">
              CuriousDevs is founder-led by design: the person you speak to first is the person
              accountable for what is built. Write to him directly.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT_COPY.email}`} className="btn-outline">
                {CONTACT_COPY.email}
              </a>
              <a href={STUDIO.github} target="_blank" rel="noreferrer" className="btn-outline">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section id="facts">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-8">
            <SectionHeader
              label="03 · At a glance"
              title="Who you will work with."
              lede="The engineers in your first conversation are the engineers who build the system."
            />
            <div className="flex flex-col gap-4">
              <Label>Ways to work together</Label>
              <TickList items={HOME.models.map((m) => `${m.name} — ${m.body}`)} />
            </div>
          </div>
          <DefinitionList items={HOME.company} />
        </div>
        <Callout tone="signal" title="Our standing rule" className="mt-12 max-w-[55rem]">
          Nothing is described as available until there is evidence behind it. A target is never
          shown as a result.
        </Callout>
      </Section>

      <Section id="cta">
        <CtaPanel
          label="Talk to us"
          title="Describe the problem, not the technology. A founder reads every message."
        >
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
