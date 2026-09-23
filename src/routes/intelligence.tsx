import { createFileRoute, Link } from "@tanstack/react-router";

import { INTELLIGENCE_COPY as C } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/site/PageHero";
import { IntelligenceLoop } from "@/components/system/IntelligenceLoop";
import {
  DefinitionList,
  Label,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/system/primitives";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [
      { title: "Intelligence — the intelligence layer for Physical AI | CuriousDevs" },
      {
        name: "description",
        content:
          "CuriousDevs Intelligence builds the models, systems and runtimes that enable machines to perceive, understand, reason, plan and act in the physical world.",
      },
      {
        property: "og:title",
        content: "CuriousDevs Intelligence — the intelligence layer for Physical AI",
      },
      {
        property: "og:description",
        content:
          "Models, world understanding, reasoning, planning, memory, runtimes and evaluation — the technologies that let machines act in the physical world.",
      },
      { property: "og:url", content: "/intelligence" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/intelligence" }],
  }),
  component: IntelligencePage,
});

function IntelligencePage() {
  const [model, system] = C.modelsSystems.columns;

  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        label={C.hero.label}
        title={C.hero.title}
        lede={
          <>
            <p>{C.hero.lede}</p>
            <p className="mt-4 text-muted-foreground">{C.hero.support}</p>
          </>
        }
      />

      {/* 2 — What intelligence means */}
      <Section id="meaning">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <SectionHeader label={C.meaning.label} title={C.meaning.title} />
          <div className="space-y-6 lg:pt-2">
            {C.meaning.paragraphs.map((p, i) => (
              <p
                key={p}
                className={cn(
                  "leading-relaxed",
                  i === 0
                    ? "text-lg text-foreground/90 md:text-xl"
                    : "text-base text-muted-foreground md:text-lg",
                )}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 3 — The intelligence stack */}
      <Section id="stack">
        <SectionHeader label={C.stack.label} title={C.stack.title} lede={C.stack.lede} />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {C.stack.areas.map((a, i) => (
            <Reveal key={a.index} delay={(i % 4) * 0.05} className="bg-background">
              <article className="group h-full p-6 transition-colors duration-300 hover:bg-surface/50 md:p-7">
                <p className="mono-xs text-muted-foreground transition-colors group-hover:text-signal">
                  {a.index}
                </p>
                <span aria-hidden className="mt-4 block h-px w-6 bg-signal" />
                <h3 className="mt-5 font-display text-lg tracking-[-0.035em] md:text-xl">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — Models and systems, drawn as containment: the model is one block
             held inside the layer that makes it useful. */}
      <Section id="models-systems" className="bg-ground-2">
        <SectionHeader
          label={C.modelsSystems.label}
          title={C.modelsSystems.title}
          lede={C.modelsSystems.lede}
        />

        <div className="mt-14 rounded-3xl border border-line p-6 md:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <Label>{system.name}</Label>
            <span className="mono-xs text-muted-foreground">THE LAYER AROUND THE MODEL</span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-12">
            {/* the model, held inside the frame */}
            <div className="rounded-2xl border border-signal/40 bg-surface p-6 md:p-7">
              <Label className="text-signal">{model.name}</Label>
              <p className="mono-xs mt-3 text-muted-foreground">ONE COMPONENT</p>
              <ul className="mt-7 space-y-3">
                {model.items.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-sm text-foreground/90">
                    <span aria-hidden className="h-px w-4 shrink-0 bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* what the layer adds around it */}
            <ul className="grid gap-x-12 self-start sm:grid-cols-2">
              {system.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-line py-3.5 text-sm text-foreground/90"
                >
                  <span aria-hidden className="h-px w-4 shrink-0 bg-line-strong" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-3 border-t border-line pt-8">
            <span aria-hidden className="mono-xs text-signal">
              =
            </span>
            <p className="font-display text-xl tracking-[-0.035em] md:text-2xl">
              {C.modelsSystems.closing}
            </p>
          </div>
        </div>
      </Section>

      {/* 5 — The physical intelligence loop: copy left, the ring beside it */}
      <Section id="loop">
        <div className="grid gap-12 [&>*]:min-w-0 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <SectionHeader label={C.loop.label} title={C.loop.title} lede={C.loop.lede} />
          <IntelligenceLoop />
        </div>
      </Section>

      {/* 6 — Design principles */}
      <Section id="principles" className="bg-ground-2">
        <div className="grid gap-12 [&>*]:min-w-0 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <SectionHeader
            label={C.principles.label}
            title={C.principles.title}
            lede={C.principles.lede}
          />
          <DefinitionList items={C.principles.items} />
        </div>
      </Section>

      {/* 7 — Close */}
      <Section id="next">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <h2 className="text-3xl leading-[1.05] sm:text-4xl md:text-5xl">{C.final.title}</h2>
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {C.final.lede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={C.final.primary.to} className="btn-primary">
                {C.final.primary.label}
              </Link>
              <Link to={C.final.secondary.to} className="btn-outline">
                {C.final.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
