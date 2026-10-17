import { createFileRoute, Link } from "@tanstack/react-router";

import { pageHead, buildFaqSchema } from "@/lib/seo";
import { HOME, INDUSTRIES, PRACTICES } from "@/content/studio";
import { CONTACT_COPY } from "@/lib/copy";
import { CtaPanel, HeaderRow, IndexRow, Step, WorkCard } from "@/components/site/Studio";
import {
  DefinitionList,
  Label,
  Reveal,
  Section,
  SectionHeader,
  TickList,
} from "@/components/system/primitives";

const TITLE = "CuriousDevs — AI engineering studio and research lab";
const DESCRIPTION =
  "AI engineering studio in Delhi NCR, India. We find where AI creates value, build it into your products and operations, and run it reliably.";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: TITLE,
      description: DESCRIPTION,
      schema: [buildFaqSchema(HOME.faqs.map((f) => ({ question: f.q, answer: f.a })))],
    }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />

      {/* Principles */}
      <Section id="system">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {HOME.principles.map((p) => (
            <div key={p.t} className="flex flex-col gap-3 bg-background px-6 py-7">
              <Label className="text-signal">{p.t}</Label>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 01 Services */}
      <Section id="services">
        <HeaderRow
          action={
            <Link to="/services" className="btn-outline">
              All services
            </Link>
          }
        >
          <SectionHeader
            label="01 · Services"
            title="From the first decision to the system in production."
            lede="Four practices cover the full life of an AI system. Most engagements begin in one and extend into the others as the work moves towards production."
          />
        </HeaderRow>
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {PRACTICES.map((p) => (
            <div key={p.id} className="flex flex-col bg-background">
              <div className="flex grow flex-col gap-3.5 p-6 md:p-7">
                <Label className="text-signal">{p.n}</Label>
                <h3 className="text-2xl">{p.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <ul className="mt-2 border-t border-line">
                  {p.services.map((s) => (
                    <li key={s.id} className="border-b border-line">
                      <Link
                        to="/services"
                        hash={s.id}
                        className="flex justify-between gap-3 py-3 text-sm text-foreground transition-colors hover:text-signal"
                      >
                        <span>{s.name}</span>
                        <span aria-hidden className="text-muted-foreground">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 02 Industries */}
      <Section id="industries">
        <HeaderRow
          action={
            <Link to="/industries" className="btn-outline">
              All industries
            </Link>
          }
        >
          <SectionHeader
            label="02 · Industries"
            title="Engineered for the sector, not the demo."
            lede="Regulation, data, volumes and the cost of an error differ by industry. Our designs start there."
          />
        </HeaderRow>
        <div className="mt-14 grid gap-x-14 border-t border-line-strong lg:grid-cols-2">
          {INDUSTRIES.map((i) => (
            <IndexRow
              key={i.id}
              n={i.n}
              title={i.name}
              line={i.headline}
              to="/industries"
              hash={i.id}
            />
          ))}
        </div>
      </Section>

      {/* 03 Work */}
      <Section id="work">
        <HeaderRow
          action={
            <Link to="/work" className="btn-outline">
              All work
            </Link>
          }
        >
          <SectionHeader
            label="03 · Work"
            title="Research and production."
            lede="Two tracks of our own work. Research explores what AI systems can do next. Production is what we engineer, ship and support. Client engagements are presented privately, with the client's permission."
          />
        </HeaderRow>
        <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2">
          {HOME.work.map((w) => (
            <WorkCard key={w.name} work={w} />
          ))}
        </div>
      </Section>

      {/* 04 Method */}
      <Section id="process">
        <SectionHeader
          label="04 · Method"
          title="Evidence at every step."
          lede="Small, visible increments, each measured against a baseline agreed at the start. You can stop at the end of any step and keep everything built so far."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOME.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <Step n={s.n} title={s.title}>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <p className="mono-xs uppercase text-foreground">Output · {s.out}</p>
              </Step>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 05 Working with us */}
      <Section id="engage">
        <SectionHeader
          label="05 · Working with us"
          title="Three ways to work together."
          lede="Every engagement is scoped in writing and priced after discovery, so the first commitment is a small one."
        />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {HOME.models.map((m) => (
            <div key={m.name} className="flex flex-col gap-4 bg-background p-6 md:p-9">
              <Label className="text-signal">{m.tag}</Label>
              <h3 className="text-[clamp(1.625rem,3vw,2.125rem)]">{m.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              <TickList items={m.items} />
            </div>
          ))}
        </div>
      </Section>

      {/* 06 Beyond client work */}
      <Section id="research">
        <SectionHeader
          label="06 · Beyond client work"
          title="A research lab, and a long-term bet."
          lede="Research is where we test methods before applying them to anyone else's system. Physical AI is where we are heading."
        />
        <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2">
          <LabCard
            to="/research"
            label="CuriousDevs Research"
            title="Agents, evaluation and efficient models."
            body="How agents fail, how to measure them, and when a small fine-tuned model outperforms a large general one."
            cta="Visit research"
          />
          <LabCard
            to="/lab"
            label="Physical AI Lab"
            title="The brain and body of Physical AI."
            body="OJAS is the intelligence that decides and acts. PARTH is the body it moves in. AI that runs real machines, built in India."
            cta="Visit the lab"
          />
        </div>
      </Section>

      {/* 07 Company */}
      <Section id="company">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-8">
            <SectionHeader
              label="07 · Company"
              title="Accountable, and deliberately small."
              lede="Every system we ship has an owner who built it and answers for it."
            />
            <div>
              <Link to="/company" className="btn-outline">
                About the company
              </Link>
            </div>
          </div>
          <DefinitionList items={HOME.company} />
        </div>
      </Section>

      {/* 08 Questions */}
      <Section id="faq">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeader
            label="08 · Questions"
            title="Asked in most first conversations."
            lede="If yours is not here, ask it directly. We would rather decline a project than win it on a promise we cannot keep."
          />
          <div className="border-b border-line">
            {HOME.faqs.map((f) => (
              <details key={f.q} className="faq-item border-t border-line py-2">
                <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 font-display text-lg tracking-[-0.035em] text-foreground md:text-xl">
                  {f.q}
                  <span
                    aria-hidden
                    className="faq-sign font-mono text-sm text-signal transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="mb-4 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* 09 Contact */}
      <Section id="contact">
        <CtaPanel
          label="09 · Contact"
          title="Describe the problem, not the technology. Our team replies within one working day."
        >
          <Link to="/contact" className="btn-primary">
            Book a consultation
          </Link>
          <a href={`mailto:${CONTACT_COPY.email}`} className="btn-outline">
            {CONTACT_COPY.email}
          </a>
        </CtaPanel>
      </Section>
    </>
  );
}

function LabCard({
  to,
  label,
  title,
  body,
  cta,
}: {
  to: "/research" | "/lab";
  label: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link to={to} className="cell-link flex flex-col bg-background text-foreground">
      <div className="flex grow flex-col gap-4 p-6 md:p-9">
        <Label className="text-signal">{label}</Label>
        <h3 className="text-[clamp(1.625rem,3vw,2.125rem)]">{title}</h3>
        <p className="leading-relaxed text-muted-foreground">{body}</p>
        <span className="mt-auto font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
          {cta} <span className="cell-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-field opacity-[0.14]" />

      <div className="shell relative flex min-h-[72svh] flex-col justify-center pb-16 pt-28 md:pt-32">
        <div className="max-w-5xl">
          <Label className="text-signal">{HOME.eyebrow}</Label>
          <h1 className="mt-8 font-display text-[clamp(2.75rem,8.5vw,7rem)] font-normal leading-[0.94]">
            Applied AI, engineered
            <br />
            for <span className="text-signal">production</span>.
          </h1>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
            {HOME.lede}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/contact" className="btn-primary">
              Book a consultation
            </Link>
            <Link to="/services" className="btn-outline">
              Explore services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
