import { createFileRoute, Link } from "@tanstack/react-router";

import { PARTH, PARTH_IS_NOT, PARTH_STANDARDS } from "@/lib/content";
import { AuthorityLadder } from "@/components/system/AuthorityLadder";
import { ParthAnatomy } from "@/components/system/ParthAnatomy";
import {
  Body,
  Callout,
  Label,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/system/primitives";
import parthImage from "@/assets/parth-humanoid.jpg";

export const Route = createFileRoute("/products/parth")({
  head: () => ({
    meta: [
      { title: "PARTH — a human-scale humanoid robot | CuriousDevs" },
      {
        name: "description",
        content:
          "PARTH is the current flagship project of CuriousDevs Robotics: a human-scale, electrically actuated robot designed to pick, carry and place objects in indoor spaces built for people.",
      },
      { property: "og:title", content: "PARTH — intelligence, embodied" },
      {
        property: "og:description",
        content:
          "A human-scale body for work that needs hands. Independent safety hardware sits below every software layer.",
      },
      { property: "og:url", content: "/products/parth" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/products/parth" }],
  }),
  component: ParthPage,
});

const CAPABILITY = [
  {
    n: "01",
    title: "Pick and place",
    body: "Reach into a tote or onto a table, grasp an everyday object, and put it where the task says it belongs.",
  },
  {
    n: "02",
    title: "Carry between points",
    body: "Move a held object across a defined indoor route and hand it to the next station.",
  },
  {
    n: "03",
    title: "Work where people work",
    body: "Human-scale reach and height, so aisles, benches and shelving stay as they are.",
  },
];

function ParthPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-field opacity-30 field-mask"
        />
        <div className="shell relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Label>PARTH</Label>
            <h1 className="mt-8 max-w-3xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
              Intelligence,
              <br />
              <span className="text-signal">embodied</span>.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              PARTH is our humanoid robot: human-scale, electrically actuated, and built for
              handling work in indoor spaces designed for people. CuriousDevs Robotics builds the
              body and its real-time control; OJAS provides the intelligence.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Talk to us
              </Link>
              <Link to="/products/ojas" className="btn-outline">
                Explore OJAS
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 rounded-full bg-signal/10 blur-3xl"
            />
            <img
              src={parthImage}
              alt="Studio render of the PARTH humanoid robot: human-scale white composite shell, articulated arms and hands, sensor head, wheeled base"
              width={1280}
              height={1600}
              className="relative mx-auto w-full max-w-md rounded-3xl border border-line object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Status, stated before anything is claimed ────────────────────── */}
      <Section id="status">
        <Callout tone="alert" title="Where PARTH stands today">
          {PARTH.status}
        </Callout>
      </Section>

      {/* ── What it is for ───────────────────────────────────────────────── */}
      <Section id="capability">
        <SectionHeader
          label="What it is for"
          title="A body for work that needs hands."
          lede="PARTH is designed around one class of job: moving objects in a structured indoor space, reliably, without rebuilding the room around the robot."
        />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-3">
          {CAPABILITY.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06} className="bg-background">
              <article className="group h-full p-7 transition-colors duration-300 hover:bg-surface/50 md:p-9">
                <p className="mono-xs text-muted-foreground transition-colors group-hover:text-signal">
                  {c.n}
                </p>
                <h3 className="mt-5 font-display text-xl tracking-[-0.035em] md:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Anatomy ──────────────────────────────────────────────────────── */}
      <Section id="anatomy">
        <SectionHeader
          label="Anatomy"
          title="Sensing, manipulation, locomotion, power."
          lede="Select a component to see its baseline design decision and the reasoning behind it."
        />
        <div className="mt-14">
          <ParthAnatomy />
        </div>
      </Section>

      {/* ── Why this shape ───────────────────────────────────────────────── */}
      <Section id="why" className="bg-ground-2">
        <div className="grid gap-12 [&>*]:min-w-0 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeader label="Why this shape" title="Redeployability, not novelty." />
          <Body className="max-w-none text-base md:text-lg">{PARTH.whyHuman}</Body>
        </div>
      </Section>

      {/* ── Configurations ───────────────────────────────────────────────── */}
      <Section id="configurations">
        <SectionHeader
          label="Configurations"
          title="Three bodies, one stack."
          lede="Head, torso, arms, hands, compute and software are shared. What changes is how the machine supports itself."
        />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-3">
          {PARTH.configurations.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} className="bg-background">
              <article className="group h-full p-7 transition-colors duration-300 hover:bg-surface/50 md:p-9">
                <p className="mono-xs text-muted-foreground transition-colors group-hover:text-signal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 font-display text-xl tracking-[-0.035em] md:text-2xl">
                  {c.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mono-xs mt-8 max-w-4xl leading-relaxed text-muted-foreground">
          {PARTH.configurationNote}
        </p>
      </Section>

      {/* ── Safety: the ladder, then the standards it is written against ─── */}
      <Section id="safety" className="bg-ground-2">
        <SectionHeader
          label="Safety"
          title="The model holds the least authority in the machine."
          lede="A proposal has to survive policy, skills and controller limits, and the lowest layer — emergency stop and Safe Torque Off — does not depend on software at all."
        />
        <div className="mt-14">
          <AuthorityLadder />
        </div>
        <Callout className="mt-12" title="Standards the safety case is written against">
          {PARTH_STANDARDS}
        </Callout>
      </Section>

      {/* ── Boundaries ───────────────────────────────────────────────────── */}
      <Section id="not">
        <SectionHeader
          label="Boundaries"
          title="What PARTH is not."
          lede="Stated plainly, so nothing on this page is mistaken for a finished product."
        />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PARTH_IS_NOT.map((n, i) => (
            <Reveal key={n.claim} delay={(i % 3) * 0.05} className="bg-background">
              <article className="h-full p-7 transition-colors duration-300 hover:bg-surface/50 md:p-8">
                <span aria-hidden className="block h-px w-6 bg-signal" />
                <h3 className="mt-5 font-display text-lg tracking-[-0.035em] md:text-xl">
                  {n.claim}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
              </article>
            </Reveal>
          ))}
          {/* sixth cell keeps the ruled grid whole and carries the standing rule */}
          <div className="flex h-full items-end bg-background p-7 md:p-8">
            <p className="mono-xs leading-relaxed text-muted-foreground">
              FIGURES ON THIS PAGE ARE RECOMMENDED ENGINEERING TARGETS · PUBLISHED AS RESULTS ONLY
              ONCE MEASURED
            </p>
          </div>
        </div>
      </Section>

      {/* ── Close ────────────────────────────────────────────────────────── */}
      <Section id="next">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <h2 className="text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            One body today. A division built for more.
          </h2>
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              PARTH is the first platform to come out of CuriousDevs Robotics. The division builds
              the machines; CuriousDevs Intelligence builds what runs on them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Talk to us
              </Link>
              <Link to="/robotics" className="btn-outline">
                About Robotics
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
