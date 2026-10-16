import { createFileRoute, Link } from "@tanstack/react-router";

import { pageHead } from "@/lib/seo";
import { INDUSTRIES, INDUSTRIES_HERO_META } from "@/content/studio";
import { PageHero } from "@/components/site/PageHero";
import { CtaPanel, Illustration, Outcome } from "@/components/site/Studio";
import { DefinitionList, Label, Section, TickList } from "@/components/system/primitives";

const TITLE = "Industries — AI engineered for the sector | CuriousDevs";
const DESCRIPTION =
  "AI for financial services, healthcare, manufacturing, retail, logistics, SaaS, real estate and education — designed around each sector's constraints.";

export const Route = createFileRoute("/industries")({
  head: () =>
    pageHead({
      path: "/industries",
      crumb: "Industries",
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industries"
        title="Industry context decides the system."
        lede="The same model behaves very differently inside a lender, a hospital and a factory. Regulation, data, volumes and the cost of an error shape every design decision. These are the sectors we engineer for, the problems we find there, and the constraints we design around."
        meta={INDUSTRIES_HERO_META}
      />

      <Section id="index">
        <nav
          aria-label="Industries"
          className="grid gap-x-14 border-t border-line-strong lg:grid-cols-2"
        >
          {INDUSTRIES.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className="cell-link grid grid-cols-[3.5rem_minmax(0,1fr)_1.5rem] items-baseline gap-4 border-b border-line px-2 py-6 text-foreground"
            >
              <span className="mono-xs text-muted-foreground">{i.n}</span>
              <span className="flex flex-col gap-1.5">
                <span className="font-display text-lg tracking-[-0.035em] md:text-xl">
                  {i.name}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{i.headline}</span>
              </span>
              <span aria-hidden className="cell-arrow text-muted-foreground">
                →
              </span>
            </a>
          ))}
        </nav>
      </Section>

      {INDUSTRIES.map((i) => (
        <Section key={i.id} id={i.id} className="scroll-mt-16">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col gap-5">
              <Label className="text-signal">
                {i.n} · {i.sub}
              </Label>
              <h2 className="text-3xl leading-[1.05] sm:text-4xl md:text-5xl">{i.name}</h2>
              <p className="font-display text-2xl leading-[1.3] tracking-[-0.035em]">
                {i.headline}
              </p>
              <p className="max-w-[40rem] leading-relaxed text-muted-foreground">{i.intro}</p>
              <Illustration name={i.img} alt={i.alt} className="mt-2 border border-line" />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Label>Operational challenges</Label>
                <TickList items={i.challenges} />
              </div>
              <div className="flex flex-col gap-4">
                <Label>Where AI and software engineering apply</Label>
                <DefinitionList items={i.apps} />
              </div>
              <Outcome label="What we design for">
                <TickList items={i.reqs} />
              </Outcome>
              <div>
                <Link to="/contact" className="btn-outline">
                  {i.cta}
                </Link>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section id="cta">
        <CtaPanel
          label="Another sector?"
          title="The pattern matters more than the sector. Where people repeat work under time pressure, AI usually has a role."
        >
          <Link to="/contact" className="btn-primary">
            Talk to us
          </Link>
          <Link to="/services" className="btn-outline">
            View services
          </Link>
        </CtaPanel>
      </Section>
    </>
  );
}
