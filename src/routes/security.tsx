import { createFileRoute, Link } from "@tanstack/react-router";

import { pageHead } from "@/lib/seo";
import { CONTACT_COPY } from "@/lib/copy";
import { PageHero } from "@/components/site/PageHero";
import { CtaPanel } from "@/components/site/Studio";
import {
  Callout,
  DefinitionList,
  Section,
  SectionHeader,
  TickList,
} from "@/components/system/primitives";

export const Route = createFileRoute("/security")({
  head: () =>
    pageHead({
      path: "/security",
      crumb: "Security",
      title: "Security and data handling | CuriousDevs",
      description:
        "How CuriousDevs handles client data: confidentiality, where systems run, who owns the work, how we build access control into AI systems, and how to raise a concern.",
    }),
  component: SecurityPage,
});

const HANDLING = [
  {
    term: "Confidentiality",
    description:
      "We sign a non-disclosure agreement before any confidential detail is shared, and before we receive any of your data.",
  },
  {
    term: "Use of your data",
    description:
      "Data you share is used for your project only. It is not used to train models for anyone else, and it is not shared with other clients.",
  },
  {
    term: "Where systems run",
    description:
      "Inside your own cloud account or on your own hardware, or hosted in India. Where data cannot leave your network, we deploy open-weight models and the full application inside it.",
  },
  {
    term: "Ownership",
    description:
      "Source code, model weights, prompts, documentation and deployment logs produced for you belong to you.",
  },
  {
    term: "End of an engagement",
    description:
      "What happens to your data and our access when an engagement ends is set out in writing in the agreement for that engagement.",
  },
];

const PRACTICES = [
  "Document-level permissions enforced at retrieval time, before anything reaches a model",
  "Scoped permissions and human approval for any action an agent takes on your systems",
  "Complete action logs that can be audited and, where possible, reversed",
  "Evaluation on your own test set before any model or prompt change is released",
  "A model-provider abstraction, so a provider can be changed without a rewrite",
];

function SecurityPage() {
  return (
    <>
      <PageHero
        label="Security"
        title="How we handle your data."
        lede="AI systems touch sensitive data and take real actions. This page sets out how we handle client data, where systems run, and how we build control into what we deliver."
        meta={[
          { term: "Before data", value: "Non-disclosure agreement" },
          { term: "Use", value: "Your project only" },
          { term: "Deployment", value: "Your environment or hosted in India" },
          { term: "Ownership", value: "The work belongs to you" },
        ]}
      />

      <Section id="handling">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeader
            label="01 · Client data"
            title="Confidential by default."
            lede="These commitments apply to every engagement. The written agreement for each engagement sets out the detail."
          />
          <DefinitionList items={HANDLING} />
        </div>
      </Section>

      <Section id="practices">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionHeader
            label="02 · In the systems we build"
            title="Control is designed in, not added later."
            lede="Every system we deliver is specified with these controls from the start."
          />
          <TickList items={PRACTICES} />
        </div>
      </Section>

      <Section id="certification">
        <SectionHeader
          label="03 · Certification"
          title="What we do not claim."
          lede="We do not claim any security certification or attestation. Where your procurement process requires a questionnaire or a security review, we complete it and answer each question as things stand."
        />
        <Callout tone="signal" title="Raising a concern" className="mt-10 max-w-[55rem]">
          To report a security concern, or to ask about personal data we hold, write to{" "}
          <a href={`mailto:${CONTACT_COPY.email}`} className="text-foreground underline">
            {CONTACT_COPY.email}
          </a>
          . The founder, Pankaj Kumar, reads and answers these directly. See also the{" "}
          <Link to="/privacy" className="text-foreground underline">
            privacy notice
          </Link>
          .
        </Callout>
      </Section>

      <Section id="cta">
        <CtaPanel
          label="Security review"
          title="Send us your security questionnaire. We answer every question as things stand today."
        >
          <Link to="/contact" className="btn-primary">
            Talk to us
          </Link>
        </CtaPanel>
      </Section>
    </>
  );
}
