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
          "What CuriousDevs collects through this website, how client project data is handled, and how to have your data corrected or deleted.",
      },
      { property: "og:title", content: "Privacy | CuriousDevs" },
      {
        property: "og:description",
        content: "Enquiry data, client project data, your rights and retention.",
      },
      { property: "og:url", content: "https://www.curiousdevs.com/privacy" },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.curiousdevs.com/privacy" }],
  }),
  component: PrivacyPage,
});

const CLAUSES = [
  {
    term: "Enquiries",
    body: "When you send the contact form we receive your name, work email, company (if given), the area you selected, your description of the problem and, if given, a timeline. It is delivered to our inbox by email so that a founder can reply, and it is not published or readable from this website.",
  },
  {
    term: "Spam protection",
    body: "The form uses a hidden field and a minimum completion time to filter automated submissions. No additional data is collected for this, and no CAPTCHA service is used.",
  },
  {
    term: "Cookies and analytics",
    body: "This site does not use advertising or behavioural tracking. Your light or dark theme choice is stored in your own browser. If a support messenger is enabled, it loads only after the page has rendered and can be blocked without breaking the site.",
  },
  {
    term: "Client project data",
    body: "Information shared with us during an engagement is used for that engagement only, and is handled under the written agreement and non-disclosure agreement for that engagement.",
  },
  {
    term: "Your rights",
    body: "You can ask to see, correct or delete the personal data we hold about you, in line with the Digital Personal Data Protection Act, 2023. Write to hello@curiousdevs.com and a founder will respond.",
  },
  {
    term: "Grievance contact",
    body: "The founder, Pankaj Kumar, is responsible for personal data collected through this website and answers grievances directly at hello@curiousdevs.com.",
  },
  {
    term: "Retention and deletion",
    body: "Enquiry records are kept while the conversation is live and for our records afterwards. To have an enquiry deleted, reply to the thread with the request and we will remove it.",
  },
  {
    term: "Third parties",
    body: "We use infrastructure providers to host this site, deliver email and — where enabled — provide a support messenger. We do not sell personal data.",
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHero
        index="—"
        label="Legal"
        title="Privacy"
        lede="What this website collects, why, and how to have it removed."
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
