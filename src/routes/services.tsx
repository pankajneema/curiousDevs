import { createFileRoute, Link } from "@tanstack/react-router";

import { pageHead, buildServiceSchema } from "@/lib/seo";
import { PRACTICES, SERVICES_HERO_META } from "@/content/studio";
import { PageHero } from "@/components/site/PageHero";
import { CtaPanel, Illustration, Outcome } from "@/components/site/Studio";
import {
  DefinitionList,
  Label,
  Section,
  SectionHeader,
  TickList,
} from "@/components/system/primitives";

const TITLE = "Services — AI engineering from decision to deployment | CuriousDevs";
const DESCRIPTION =
  "AI strategy, generative AI apps, agents, voice AI, enterprise search, fine-tuning, document AI, business platforms and MLOps — ten services, one team.";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead({
      path: "/services",
      crumb: "Services",
      title: TITLE,
      description: DESCRIPTION,
      schema: PRACTICES.flatMap((p) =>
        p.services.map((s) => buildServiceSchema(s.name, s.desc, `/services#${s.id}`)),
      ),
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="AI engineering, from decision to deployment."
        lede="We work across the full life of an AI system: deciding where it creates value, engineering it into your products and operations, and operating it once it is live. Ten services, organised in four practices, each delivered by the engineers who build and support it."
        meta={SERVICES_HERO_META}
      />

      <Section id="practices">
        <SectionHeader
          label="Four practices"
          title="Choose where to begin."
          lede="Most engagements start in one practice and extend into others as a system moves towards production."
        />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {PRACTICES.map((p) => (
            <div key={p.id} className="flex flex-col bg-background">
              <Illustration name={p.img} alt={p.alt} className="border-b border-line" />
              <div className="flex grow flex-col gap-3.5 p-6 md:p-7">
                <Label className="text-signal">{p.n}</Label>
                <h3 className="text-2xl">{p.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <ul className="mt-2 border-t border-line">
                  {p.services.map((s) => (
                    <li key={s.id} className="border-b border-line">
                      <a
                        href={`#${s.id}`}
                        className="flex justify-between gap-3 py-3 text-sm text-foreground transition-colors hover:text-signal"
                      >
                        <span>{s.name}</span>
                        <span className="mono-xs text-muted-foreground">{s.n}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {PRACTICES.map((p) => (
        <Section key={p.id} id={p.id}>
          <div className="flex max-w-[52rem] flex-col gap-4">
            <Label className="text-signal">{p.n} · Practice</Label>
            <h2 className="text-3xl leading-[1.05] sm:text-4xl md:text-5xl">{p.name}</h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{p.long}</p>
          </div>

          {p.services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="mt-16 grid scroll-mt-24 items-start gap-10 border-t border-line-strong pt-12 lg:grid-cols-2 lg:gap-14"
            >
              <div className="flex flex-col gap-5">
                <span className="font-display text-4xl tracking-[-0.03em] text-muted-foreground md:text-5xl">
                  {s.n}
                </span>
                <h3 className="text-3xl leading-[1.05] md:text-5xl">{s.name}</h3>
                <p className="max-w-[38rem] text-base leading-relaxed text-foreground/90 md:text-lg">
                  {s.desc}
                </p>
                <div className="flex max-w-[38rem] flex-col gap-3.5">
                  <Label>The problem</Label>
                  <TickList items={s.problems} />
                </div>
                <div className="mt-2">
                  <Link to="/contact" className="btn-outline">
                    {s.cta}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-4">
                  <Label>What we engineer</Label>
                  <DefinitionList items={s.caps} />
                </div>
                <Outcome label="The outcome">{s.outcome}</Outcome>
              </div>
            </article>
          ))}
        </Section>
      ))}

      <Section id="cta">
        <CtaPanel
          label="Start with the problem"
          title="Describe what is slow, costly or error-prone today. We will tell you which of these services applies — or that none does."
        >
          <Link to="/contact" className="btn-primary">
            Book a consultation
          </Link>
          <Link to="/industries" className="btn-outline">
            View industries
          </Link>
        </CtaPanel>
      </Section>
    </>
  );
}
