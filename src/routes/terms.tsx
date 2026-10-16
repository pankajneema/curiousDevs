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
          "How to read status labels on this site, how client engagements are governed, and the limits of statements about our own products.",
      },
      { property: "og:title", content: "Terms | CuriousDevs" },
      {
        property: "og:description",
        content: "Status labels, forward-looking statements, and safety disclaimers.",
      },
      { property: "og:url", content: "https://www.curiousdevs.com/terms" },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.curiousdevs.com/terms" }],
  }),
  component: TermsPage,
});

const CLAUSES = [
  {
    term: "Status of our own work",
    body: "TokenFin is in development and is not yet generally available. OJAS is in early engineering. PARTH is paused. There are no completed customer deployments of OJAS or PARTH and no commercial performance results. Where this site gives a figure, it is a target with a stated measurement method, and it will be reported as measured — including when it is missed.",
  },
  {
    term: "Client services",
    body: "Services described on this site are provided under a written proposal and agreement for each engagement. The scope, deliverables, acceptance criteria and terms in that agreement take precedence over anything on this website.",
  },
  {
    term: "Forward-looking statements",
    body: "Descriptions of planned capabilities reflect design intent and targets, not verified results.",
  },
  {
    term: "Safety",
    body: "The OJAS policy layer is designed to reduce risk. It is not a safety certification, does not constitute compliance with any standard, and is not a substitute for rated emergency-stop hardware.",
  },
  {
    term: "Regulatory references",
    body: "References to regulations and standards describe what our designs take into account. They are not legal advice and do not represent a certification or a guarantee of compliance.",
  },
  {
    term: "Third-party names",
    body: "Names of other organisations and products appear for factual description — as model providers, tools, dependencies or platforms we integrate with. Their appearance is not an endorsement, partnership or affiliation.",
  },
  {
    term: "Content",
    body: "Text, illustrations and diagrams on this site are the property of CuriousDevs.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHero
        index="—"
        label="Legal"
        title="Terms"
        lede="How to read this website accurately, and how it relates to the agreements we sign with clients."
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
