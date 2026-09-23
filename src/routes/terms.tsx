import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Body, Label, Section } from "@/components/system/primitives";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — how to read this website | CuriousDevs" },
      {
        name: "description",
        content:
          "How to read status labels on this site, what is a target rather than a measurement, and the limits of the OJAS policy layer.",
      },
      { property: "og:title", content: "Terms | CuriousDevs" },
      {
        property: "og:description",
        content: "Status labels, forward-looking statements, and safety disclaimers.",
      },
      { property: "og:url", content: "/terms" },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const CLAUSES = [
  {
    term: "Status of the work",
    body: "OJAS is in engineering. There are no completed customer deployments and no commercial performance results. Where this site gives a figure, it is an engineering target with a stated measurement method, and it will be reported as measured — including when it is missed.",
  },
  {
    term: "Forward-looking statements",
    body: "Descriptions of behaviour, reliability, timing and drift detection reflect design intent and targets, not verified field results. Figures are validated installation by installation.",
  },
  {
    term: "Safety",
    body: "The OJAS policy layer reduces risk. It is not a safety certification, does not constitute compliance with any standard, and is not a substitute for rated emergency-stop hardware. We recommend rated emergency-stop hardware in every installation and will not deploy without it.",
  },
  {
    term: "No specification for PARTH",
    body: "PARTH is at architecture-definition stage, with no final specification. Figures such as height, mass, degrees of freedom, payload, actuation or power are published only once the engineering exists, and any earlier informal figures should not be relied upon.",
  },
  {
    term: "Third-party names",
    body: "Names of other organisations appear for factual description of the ecosystem — as suppliers, dependencies, or comparable work. Their appearance is not an endorsement, partnership or affiliation.",
  },
  {
    term: "Content",
    body: "Text and diagrams on this site are the property of CuriousDevs. Published reproducibility material — bills of materials, assembly and calibration documentation — will carry its own licence terms when released.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHero
        index="—"
        label="Legal"
        title="Terms"
        lede="Mostly about how to read this website accurately, which matters more here than in most places."
      />
      <Section id="clauses">
        <dl className="divide-y divide-line border-y border-line">
          {CLAUSES.map((c) => (
            <div key={c.term} className="grid gap-4 py-8 md:grid-cols-[16rem_1fr] md:gap-10">
              <dt>
                <Label>{c.term}</Label>
              </dt>
              <dd>
                <Body>{c.body}</Body>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
