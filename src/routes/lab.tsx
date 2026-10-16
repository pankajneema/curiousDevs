import { createFileRoute, Link } from "@tanstack/react-router";

import { pageHead } from "@/lib/seo";
import { LAB } from "@/content/studio";
import { PageHero } from "@/components/site/PageHero";
import { Illustration } from "@/components/site/Studio";
import { PhysicalAIStack } from "@/components/system/PhysicalAIStack";
import {
  Callout,
  DataTable,
  Label,
  NumberedCard,
  Section,
  SectionHeader,
  TechCard,
  TickList,
} from "@/components/system/primitives";

const TITLE = "Physical AI Lab — OJAS and PARTH | CuriousDevs";
const DESCRIPTION =
  "Our long bet: OJAS, an intelligence layer that turns model output into controlled action on real machines, and PARTH, the body it runs in.";

export const Route = createFileRoute("/lab")({
  head: () =>
    pageHead({
      path: "/lab",
      crumb: "Physical AI Lab",
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: LabPage,
});

function LabPage() {
  return (
    <>
      <PageHero
        label="Physical AI Lab"
        title="Intelligence that moves matter."
        lede="Client work keeps the studio running. This is our long bet: an intelligence layer that turns model output into controlled action on real machines, and the body it runs in."
        meta={LAB.heroMeta}
      />

      {/* 01 Why this layer */}
      <Section id="thesis">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeader
            label="01 · Why this layer"
            title="A model can describe a scene. It cannot decide whether acting on it is permitted right now."
            lede="Model output carries no notion of what is legal, safe or currently possible, and no memory of what the machine was doing a second ago. Everything between the model and the motors is the engineering problem — and that is where we work."
          />
          <Illustration
            name="lab-loop"
            alt="Line illustration of the perceive, understand, decide and act loop around the OJAS core, with decide highlighted"
            className="border border-line"
          />
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LAB.loop.map((s) => (
            <NumberedCard key={s.title} title={s.title}>
              {s.body}
            </NumberedCard>
          ))}
        </div>
      </Section>

      {/* 02 Brain and body */}
      <Section id="layers">
        <SectionHeader
          label="02 · Brain and body"
          title="One decides. One moves."
          lede="The boundary between intelligence and embodiment is deliberate and typed. Intent flows down as structured requests; state flows up as structured feedback. Each side can evolve on its own clock."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <TechCard className="flex flex-col gap-4 p-7 md:p-9">
            <Label className="text-signal">Intelligence · The brain</Label>
            <h3 className="text-3xl md:text-5xl">OJAS</h3>
            <p className="leading-relaxed text-muted-foreground">
              A general-purpose execution runtime for Physical AI, in early engineering. It is
              designed to connect models to cameras, sensors and machines through adapters, and to
              put a policy check with no machine learning in it between every proposal and every
              actuator.
            </p>
            <TickList items={LAB.ojas} />
          </TechCard>
          <TechCard className="flex flex-col gap-4 p-7 md:p-9">
            <Label>Embodiment · The body · Paused</Label>
            <h3 className="text-3xl md:text-5xl">PARTH</h3>
            <p className="leading-relaxed text-muted-foreground">
              A human-scale robot designed to bring OJAS into the physical world. PARTH is a
              customer of OJAS, not its owner — the same runtime is meant to run machines we did not
              build. Work on PARTH is paused until OJAS can drive a machine end to end.
            </p>
            <TickList items={LAB.parth} />
          </TechCard>
        </div>
      </Section>

      {/* 03 The stack */}
      <Section id="stack">
        <SectionHeader
          label="03 · The stack"
          title="Model-agnostic. Policy-gated. On hardware that already exists."
          lede="Open a layer to see what it does and who owns it."
        />
        <div className="mt-14 max-w-[61rem]">
          <PhysicalAIStack layers={LAB.layers} />
        </div>
      </Section>

      {/* 04 Where it stands */}
      <Section id="status">
        <SectionHeader
          label="04 · Where it stands"
          title="What exists, and what does not yet."
          lede="Built in order: runtime first, then the data and training platform, then our own model. Each row says what it is today, not what we hope it becomes."
        />
        <DataTable className="mt-14" head={LAB.statusHead} rows={LAB.statusRows} />
        <p className="mono-xs mt-4 text-muted-foreground">STATUS AS OF OCTOBER 2026</p>
        <Callout tone="signal" title="Our standing rule" className="mt-8 max-w-[55rem]">
          Nothing here is described as available before it has recorded, repeatable evidence.
          Simulation is labelled as simulation, and a target is never shown as a result.
        </Callout>
      </Section>

      {/* Join */}
      <Section id="join">
        <div className="grid gap-4 lg:grid-cols-2">
          <TechCard interactive className="flex min-h-60 flex-col gap-4 p-7 md:p-9">
            <Label className="text-signal">Founding team</Label>
            <h3 className="text-3xl md:text-4xl">Build OJAS with us.</h3>
            <p className="leading-relaxed text-muted-foreground">
              We are forming a small founding team of two or three engineers for the runtime:
              robotics middleware, real-time systems and edge inference. Send the hardest thing you
              have shipped.
            </p>
            <div className="mt-auto pt-2">
              <Link to="/contact" className="btn-primary">
                Write to us
              </Link>
            </div>
          </TechCard>
          <TechCard interactive className="flex min-h-60 flex-col gap-4 p-7 md:p-9">
            <Label>Partners and early users</Label>
            <h3 className="text-3xl md:text-4xl">Have a machine, a task and a tolerance?</h3>
            <p className="leading-relaxed text-muted-foreground">
              Describe the station, not the vision: the machine, the task, and what happens today
              when it fails. Research partners, labs and grant programmes are welcome too.
            </p>
            <div className="mt-auto pt-2">
              <Link to="/contact" className="btn-outline">
                Talk to the lab
              </Link>
            </div>
          </TechCard>
        </div>
      </Section>
    </>
  );
}
