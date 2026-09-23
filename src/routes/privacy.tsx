import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Body, Label, Section } from "@/components/system/primitives";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — what we collect and why | CuriousDevs" },
      {
        name: "description",
        content:
          "What CuriousDevs collects through this website and through deployed cells, how operational data is used, and how to have an enquiry deleted.",
      },
      { property: "og:title", content: "Privacy | CuriousDevs" },
      {
        property: "og:description",
        content: "Enquiry data, operational data from deployed cells, and retention.",
      },
      { property: "og:url", content: "/privacy" },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const CLAUSES = [
  {
    term: "Enquiries",
    body: "When you submit the contact form we store the name, work email, company, and the task details you provide, so that a founder can reply. Submissions are not readable from the public website; only CuriousDevs can access them.",
  },
  {
    term: "Analytics",
    body: "This site is built to work without behavioural advertising trackers. If a support messenger is enabled, it loads only after the page has rendered and can be blocked without breaking the site.",
  },
  {
    term: "Operational data from deployed cells",
    body: "OJAS records per-cycle operational data — timestamps, observation hashes, commanded actions, validation results, latencies and outcomes. In commercial discussions we state plainly that CuriousDevs retains rights to use collected operational data for model improvement, with customer-identifying information excluded. This is negotiated in writing, not assumed.",
  },
  {
    term: "Retention and deletion",
    body: "Enquiry records are kept while the conversation is live and for our records afterwards. To have an enquiry deleted, reply to the thread with the request and we will remove it.",
  },
  {
    term: "Third parties",
    body: "We use infrastructure providers to host this site, store enquiries, and — where enabled — provide a support messenger. We do not sell personal data.",
  },
  {
    term: "Contact",
    body: "Questions about this notice can be sent through the contact form. A founder answers; there is no privacy department.",
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHero
        index="—"
        label="Legal"
        title="Privacy"
        lede="Short, because there is not much to say. This is a two-person engineering company with a contact form."
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
