import { createFileRoute, Link } from "@tanstack/react-router";

import {
  HOME_ABOUT,
  HOME_CONTACT,
  HOME_FACTS,
  HOME_HERO,
  HOME_OJAS,
  HOME_PARTH,
  HOME_RESEARCH,
  HOME_WORK,
  PHYSICAL_AI,
  PROBLEM,
  RELATIONSHIP_COPY,
} from "@/lib/copy";
import { RELATIONSHIP } from "@/lib/content";
import { ControlField } from "@/components/system/ControlField";
import {
  Body,
  Label,
  NumberedCard,
  Reveal,
  Section,
  SectionHeader,
  TechCard,
  TickList,
} from "@/components/system/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CuriousDevs — OJAS intelligence, PARTH embodiment" },
      {
        name: "description",
        content:
          "CuriousDevs builds OJAS, an intelligence system that turns model output into controlled action on edge hardware, and PARTH, the human-scale humanoid robot it is embodied in.",
      },
      { property: "og:title", content: "CuriousDevs — OJAS intelligence, PARTH embodiment" },
      {
        property: "og:description",
        content:
          "Physical AI is a closed loop between sensing, judgement and motion. OJAS runs it; PARTH moves in it. Built in Noida, India.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />

      <Section id="physical-ai">
        <SectionHeader
          index="01"
          label={PHYSICAL_AI.label}
          title={PHYSICAL_AI.title}
          lede={PHYSICAL_AI.lede}
        />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PHYSICAL_AI.pillars.map((p) => (
            <Reveal key={p.n} className="bg-background">
              <NumberedCard n={p.n} title={p.title} className="border-0">
                {p.body}
              </NumberedCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* OJAS ↔ PARTH — the relationship, made visible */}
      <Section id="relationship">
        <SectionHeader
          index="02"
          label={RELATIONSHIP_COPY.label}
          title={RELATIONSHIP_COPY.title}
          lede={RELATIONSHIP_COPY.lede}
        />
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {RELATIONSHIP_COPY.columns.map((col, i) => (
            <div key={col.name} className="contents">
              <Reveal delay={i * 0.08}>
                <TechCard
                  className={`h-full rounded-3xl p-8 md:p-10 ${i === 0 ? "border-signal/40" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl tracking-[-0.03em] md:text-4xl">
                      {col.name}
                    </h3>
                    <span className="mono-xs text-signal">{col.role.toUpperCase()}</span>
                  </div>
                  <TickList items={col.items} className="mt-8" />
                </TechCard>
              </Reveal>
              {i === 0 ? (
                <div aria-hidden className="flex items-center justify-center lg:flex-col lg:px-2">
                  <span className="mono-xs rotate-0 whitespace-nowrap text-muted-foreground lg:[writing-mode:vertical-rl]">
                    TYPED INTENT ↓ · STATE ↑
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <Body className="mt-10 max-w-3xl">{RELATIONSHIP}</Body>
      </Section>

      <Section id="problem">
        <SectionHeader index="03" label={PROBLEM.label} title={PROBLEM.title} lede={PROBLEM.lede} />
        <dl className="mt-14 grid gap-px bg-line sm:grid-cols-2">
          {PROBLEM.points.map((p) => (
            <div key={p.n} className="bg-background p-7 md:p-9">
              <span aria-hidden className="block h-px w-6 bg-signal" />
              <dt className="mt-5 font-display text-xl tracking-[-0.02em]">{p.title}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</dd>
            </div>
          ))}
        </dl>
        <Body className="mt-10 max-w-3xl">{PROBLEM.consequence}</Body>
      </Section>

      <Section id="ojas">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <SectionHeader
            index="04"
            label={HOME_OJAS.label}
            title={HOME_OJAS.title}
            lede={HOME_OJAS.lede}
          />
          <div>
            <TickList items={HOME_OJAS.bullets} />
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to={HOME_OJAS.cta.to} className="btn-primary">
                {HOME_OJAS.cta.label}
              </Link>
              <Link to={HOME_OJAS.deep.to} className="btn-outline">
                {HOME_OJAS.deep.label}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section id="parth">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <SectionHeader
            index="05"
            label={HOME_PARTH.label}
            title={HOME_PARTH.title}
            lede={HOME_PARTH.lede}
          />
          <div>
            <TickList items={HOME_PARTH.bullets} />
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to={HOME_PARTH.cta.to} className="btn-primary">
                {HOME_PARTH.cta.label}
              </Link>
              <Link to={HOME_PARTH.deep.to} className="btn-outline">
                {HOME_PARTH.deep.label}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section id="work">
        <SectionHeader
          index="06"
          label={HOME_WORK.label}
          title={HOME_WORK.title}
          lede={HOME_WORK.lede}
        />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2">
          {HOME_WORK.items.map((item) => (
            <div key={item.title} className="bg-background p-7 md:p-9">
              <h3 className="font-display text-xl tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="research">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeader
            index="07"
            label={HOME_RESEARCH.label}
            title={HOME_RESEARCH.title}
            lede={HOME_RESEARCH.lede}
          />
          <div className="flex flex-col justify-end gap-8">
            <SectionHeader
              label={HOME_ABOUT.label}
              title={HOME_ABOUT.title}
              lede={HOME_ABOUT.lede}
              className="max-w-xl"
            />
            <div className="flex flex-wrap gap-3">
              <Link to={HOME_RESEARCH.cta.to} className="btn-outline">
                {HOME_RESEARCH.cta.label}
              </Link>
              <Link to={HOME_ABOUT.cta.to} className="btn-outline">
                {HOME_ABOUT.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section id="cta">
        <TechCard className="flex flex-col gap-8 rounded-3xl p-8 md:flex-row md:items-end md:justify-between md:p-12">
          <div>
            <Label className="text-signal">{HOME_CONTACT.label}</Label>
            <h2 className="mt-5 max-w-xl text-3xl md:text-4xl">{HOME_CONTACT.title}</h2>
            <Body className="mt-5">{HOME_CONTACT.lede}</Body>
          </div>
          <Link to={HOME_CONTACT.cta.to} className="btn-primary shrink-0">
            {HOME_CONTACT.cta.label}
          </Link>
        </TechCard>
      </Section>
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 glow-field" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-field opacity-[0.14]" />
      <ControlField className="pointer-events-none absolute inset-0 size-full opacity-90" />

      <div className="shell relative flex min-h-[78svh] flex-col justify-between gap-14 pb-14 pt-32 md:pt-36">
        <div className="max-w-4xl">
          <h1 className="font-display text-[clamp(2.75rem,8.5vw,7rem)] font-normal leading-[0.94]">
            {HOME_HERO.headline[0]}
            <br />
            <span className="text-signal">moves</span> matter
          </h1>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
            {HOME_HERO.lede}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {HOME_HERO.note}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to={HOME_HERO.primary.to} className="btn-primary">
              {HOME_HERO.primary.label}
            </Link>
            <Link to={HOME_HERO.secondary.to} className="btn-outline">
              {HOME_HERO.secondary.label}
            </Link>
            <span aria-hidden className="mono-xs hidden text-muted-foreground sm:block">
              OJAS → PARTH → PHYSICAL AI
            </span>
          </div>
        </div>

        <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {HOME_FACTS.map((f) => (
            <div key={f.term} className="bg-background/85 p-5 backdrop-blur-sm">
              <dt className="label-tech text-foreground/80">{f.term}</dt>
              <dd className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
