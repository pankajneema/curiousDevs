import { createFileRoute, Link } from "@tanstack/react-router";

import { INTERLOCK, OJAS_IS_NOT, VALIDATION_CHECKS } from "@/lib/content";
import { FailureMap } from "@/components/system/FailureMap";
import { OjasLoop } from "@/components/system/OjasLoop";
import { PhysicalAIStack } from "@/components/system/PhysicalAIStack";
import {
  Callout,
  Label,
  Reveal,
  Section,
  SectionHeader,
  TickList,
} from "@/components/system/primitives";
import perceptionImage from "@/assets/ojas-perception.jpg";

export const Route = createFileRoute("/products/ojas")({
  head: () => ({
    meta: [
      { title: "OJAS — the intelligence system that runs real machines | CuriousDevs" },
      {
        name: "description",
        content:
          "OJAS runs AI models next to real machines: it perceives, holds a picture of the world, plans, checks every action against your rules, and executes it on edge hardware you already own.",
      },
      { property: "og:title", content: "OJAS — intelligence that acts" },
      {
        property: "og:description",
        content:
          "The model proposes; OJAS decides what is allowed and executes it. Perception, world state, reasoning, planning, policy, action.",
      },
      { property: "og:url", content: "/products/ojas" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/products/ojas" }],
  }),
  component: OjasPage,
});

/* The four things a buyer is actually weighing. Packaging and hardware appear
   here as single lines rather than as a section of their own. */
const VALUE = [
  {
    n: "01",
    title: "Works with any model",
    body: "A CuriousDevs model, a third-party model or your own — all behind one contract, on the edge compute you already have.",
  },
  {
    n: "02",
    title: "Nothing moves without permission",
    body: "Every action passes a rule check with no machine learning inside it. What you forbid stays forbidden, even when the model is wrong.",
  },
  {
    n: "03",
    title: "You can see what it did",
    body: "Every cycle is recorded: what was seen, what was proposed, what was allowed, and what happened.",
  },
  {
    n: "04",
    title: "One package to deploy",
    body: "Model, rules, tools, actions and configuration ship as one versioned unit, so you reproduce a deployment instead of rebuilding it.",
  },
];

/* The boundaries a buyer needs before talking to us. The rest are in the docs. */
const BOUNDARY_CLAIMS = [
  "Not only a model",
  "Not general-purpose autonomy",
  "Not a safety certification",
];
const BOUNDARIES = OJAS_IS_NOT.filter((n) => BOUNDARY_CLAIMS.includes(n.claim));

function OjasPage() {
  return (
    <>
      {/* ── Hero: copy left, the perception frame beside it ──────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-field opacity-30 field-mask"
        />
        <div className="shell relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Label>OJAS</Label>
            <h1 className="mt-8 max-w-3xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              The model proposes.
              <br />
              <span className="text-signal">OJAS decides</span> and acts.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              OJAS turns AI output into controlled action on a real machine. It perceives, keeps a
              live picture of the scene, plans the next step, checks it against your rules, and
              carries it out — continuously, at the edge.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Talk to us
              </Link>
              <Link to="/intelligence" className="btn-outline">
                About Intelligence
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 rounded-full bg-signal/10 blur-3xl"
            />
            <figure className="relative overflow-hidden rounded-3xl border border-line">
              <img
                src={perceptionImage}
                alt="A robotic arm scanning metal parts on a workbench, each part outlined with a detection box and measurement lines"
                width={1600}
                height={1008}
                className="w-full object-cover"
              />
              <figcaption className="mono-xs absolute right-4 bottom-4 left-4 text-muted-foreground">
                SENSOR STREAMS BECOME STRUCTURED OBSERVATION
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────────────────────── */}
      <Section id="value">
        <SectionHeader
          label="What you get"
          title="Four things a trained model does not give you."
        />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2">
          {VALUE.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05} className="bg-background">
              <article className="group h-full p-7 transition-colors duration-300 hover:bg-surface/50 md:p-9">
                <p className="mono-xs text-muted-foreground transition-colors group-hover:text-signal">
                  {v.n}
                </p>
                <h3 className="mt-5 font-display text-xl tracking-[-0.035em] md:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <Section id="how">
        <SectionHeader
          label="How it works"
          title="A trained model answers once. OJAS keeps going."
          lede="Each cycle reads the world, updates state, runs the model, plans, checks policy and acts — then observes the result and starts again. Select a stage to see what it owns."
        />
        <div className="mt-14">
          <OjasLoop />
        </div>
      </Section>

      {/* ── Where it sits ────────────────────────────────────────────────── */}
      <Section id="stack">
        <SectionHeader
          label="Where it sits"
          title="One layer, with clear contracts above and below."
          lede="Models supply intelligence. Edge compute supplies capacity. Sensors and actuators supply the physical world. OJAS owns the path between them."
        />
        <div className="mt-14">
          <PhysicalAIStack />
        </div>
      </Section>

      {/* ── What goes wrong, and what stops it ───────────────────────────── */}
      <Section id="authority" className="bg-ground-2">
        <SectionHeader
          label="Authority"
          title="What goes wrong, and what stops it."
          lede="A model returns a proposal. It has no idea what is legal or safe right now, so the layer around it decides — and there is no machine learning inside that decision."
        />
        <div className="mt-14 grid gap-12 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-16">
          <div>
            <Label className="mb-6">Failure classes designed against</Label>
            <FailureMap />
          </div>
          <div>
            <Label className="mb-6">Rejected before it reaches the motors</Label>
            <ul className="divide-y divide-line border-y border-line">
              {VALIDATION_CHECKS.map((v) => (
                <li key={v.check} className="py-4">
                  <p className="text-sm text-foreground">{v.check}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.rejects}</p>
                </li>
              ))}
            </ul>
            <Callout tone="alert" className="mt-10" title="Hardware first, software second">
              {INTERLOCK}
            </Callout>
          </div>
        </div>
      </Section>

      {/* ── Boundaries ───────────────────────────────────────────────────── */}
      <Section id="not">
        <SectionHeader label="Boundaries" title="What OJAS is not." />
        <div className="mt-14 grid gap-px bg-line md:grid-cols-3">
          {BOUNDARIES.map((n, i) => (
            <Reveal key={n.claim} delay={i * 0.05} className="bg-background">
              <article className="h-full p-7 transition-colors duration-300 hover:bg-surface/50 md:p-8">
                <span aria-hidden className="block h-px w-6 bg-signal" />
                <h3 className="mt-5 font-display text-lg tracking-[-0.035em] md:text-xl">
                  {n.claim}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mono-xs mt-8 text-muted-foreground">
          FIGURES ON THIS SITE ARE ENGINEERING TARGETS WITH STATED METHODS · PUBLISHED AS RESULTS
          ONLY ONCE MEASURED
        </p>
      </Section>

      {/* ── Getting started: the page closes on the conversation ─────────── */}
      <Section id="start">
        <div className="grid gap-12 [&>*]:min-w-0 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeader label="Getting started" title="How an engagement begins." />
          <div>
            <TickList
              items={[
                "You describe one station: the machine, the task, and what happens today when it fails.",
                "We agree on what success means and how it will be measured.",
                "We bring one loop up end to end on your hardware, and record how it behaves.",
                "Only then do we widen to more objects, more stations or more machines.",
              ]}
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Talk to us
              </Link>
              <Link to="/products/parth" className="btn-outline">
                Meet PARTH
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
