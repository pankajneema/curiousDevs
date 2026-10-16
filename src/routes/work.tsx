import { createFileRoute, Link } from "@tanstack/react-router";

import { HOME } from "@/content/studio";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { CtaPanel, WorkCard } from "@/components/site/Studio";
import { Callout, Section, SectionHeader } from "@/components/system/primitives";

export const Route = createFileRoute("/work")({
  head: () =>
    pageHead({
      path: "/work",
      crumb: "Work",
      title: "Work — research and production | CuriousDevs",
      description:
        "TokenFin, LLM cost attribution and control, and OJAS, a runtime for Physical AI. Client engagements are presented privately, with permission.",
    }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <PageHero
        label="Work"
        title="Research and production."
        lede="Two tracks of our own work. Research explores what AI systems can do next. Production is what we engineer, ship and support. Client engagements are presented privately, with the client's permission."
        meta={[
          { term: "Production", value: "TokenFin — in development" },
          { term: "Research", value: "OJAS — early engineering" },
          { term: "Client work", value: "Shown privately, with permission" },
          { term: "Standard", value: "Status stated as it is today" },
        ]}
      />

      <Section id="projects">
        <SectionHeader
          label="01 · Our own work"
          title="What we are building now."
          lede="Each project carries its current status. Nothing is described as available before there is evidence behind it."
        />
        <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2">
          {HOME.work.map((w) => (
            <WorkCard key={w.name} work={w} />
          ))}
        </div>
      </Section>

      <Section id="clients">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeader
            label="02 · Client engagements"
            title="Presented privately, with the client's permission."
            lede="Client work is not published without the client's agreement. Where a client has agreed, we can take you through it under a non-disclosure agreement."
          />
          <Callout tone="signal" title="What a walkthrough covers">
            The problem as it was before, the baseline agreed in discovery, what we built, and what
            was measured against that baseline.
          </Callout>
        </div>
      </Section>

      <Section id="cta">
        <CtaPanel
          label="See relevant work"
          title="Tell us your sector and the problem you need solved."
        >
          <Link to="/contact" className="btn-primary">
            Request a walkthrough
          </Link>
          <Link to="/services" className="btn-outline">
            View services
          </Link>
        </CtaPanel>
      </Section>
    </>
  );
}
