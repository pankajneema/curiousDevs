import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { LegalDoc, LegalSection } from "@/components/landing/LegalDoc";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => buildSeoHead({
    path: "/privacy",
    title: "Privacy Policy | CuriousDevs",
    description:
      "What CuriousDevs collects through this website, why, and how to exercise your rights under India's DPDP Act, 2023.",
    keywords: ["privacy policy", "DPDP", "India privacy", "data rights"],
    ogType: "website",
    robots: "index, follow",
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/privacy",
              "Privacy Policy",
              "The privacy terms for curiousdevs.com and the data handling practices on this website.",
            ),
          ),
        }}
      />
      <Nav />
      <LegalDoc
        eyebrow="Legal"
        title="Privacy Policy"
        updated="28 July 2026"
        intro="This page explains, in plain language, what CuriousDevs collects through this website, why, and how you can ask us to change or delete it. We are a small, pre-launch team — this policy describes exactly what our own site does today, not a template written for a product we don't yet operate."
      >
        <LegalSection n="01" title="Who this covers">
          <p>
            This policy covers <strong className="text-foreground">curiousdevs.com</strong> — the
            marketing website you're on now. It does not yet cover AgentGuard, CurioComply, or
            AeroOS as deployed products, since none of them are generally available. A separate,
            product-specific privacy policy will ship alongside each product's public release.
          </p>
        </LegalSection>

        <LegalSection n="02" title="What we collect">
          <p>
            We collect information only when you choose to give it to us, through one of three
            forms:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Contact form</strong> — name, work email, company,
              the category you select ("AI agents," "Data & DPDP," or "Machine fleets"), and
              anything you write in the message field.
            </li>
            <li>
              <strong className="text-foreground">Booking request</strong> — the same fields, plus
              your preferred time window.
            </li>
            <li>
              <strong className="text-foreground">Careers application</strong> — name, email, the
              role, an optional link to your portfolio or profile, anything you write, and — if you
              choose to attach one — your resume file (capped at 8MB).
            </li>
          </ul>
          <p>
            We do not use cookies, analytics scripts, or tracking pixels anywhere on this site.
            There is no advertising network, no session-replay tool, and no third-party script
            watching what you do here. We checked our own source code to confirm this before
            publishing this policy, rather than asserting it from memory.
          </p>
        </LegalSection>

        <LegalSection n="03" title="How submissions are handled">
          <p>
            Form submissions are sent directly by email to our team; we do not currently store them
            in a database. A resume attachment travels with the email it was submitted alongside and
            is not separately archived. If that changes — for example, once we adopt an applicant-
            tracking system — we will update this section first.
          </p>
        </LegalSection>

        <LegalSection n="04" title="Why we collect it">
          <p>
            Solely to respond to you: to reply to a message, confirm a booking, or evaluate a job
            application. We do not sell, rent, or share this information with third parties, and we
            do not use it for marketing you didn't ask for.
          </p>
        </LegalSection>

        <LegalSection n="05" title="Your rights under the DPDP Act, 2023">
          <p>
            As an Indian entity processing personal data, we recognise your rights as a Data
            Principal under the Digital Personal Data Protection Act, 2023 — including the right to
            access what we hold about you, correct it, and request its erasure. To exercise any of
            these, email{" "}
            <a
              href="mailto:hello@curiousdevs.com"
              className="text-foreground underline underline-offset-4"
            >
              hello@curiousdevs.com
            </a>{" "}
            with the subject line "Data request." We aim to respond within one business day and
            resolve verified requests within a reasonable time frame, consistent with the Act.
          </p>
        </LegalSection>

        <LegalSection n="06" title="Where your data is processed">
          <p>
            Email is handled through a standard SMTP provider. We do not currently operate
            infrastructure outside this. If our processing footprint changes as we grow, this
            section will be updated to name the providers involved.
          </p>
        </LegalSection>

        <LegalSection n="07" title="Changes to this policy">
          <p>
            If this policy changes materially, we'll update the date at the top of this page. Given
            our stage, expect this document to evolve — check back before relying on it for a formal
            procurement or legal review.
          </p>
        </LegalSection>

        <LegalSection n="08" title="Contact">
          <p>
            Questions about this policy, or about data we might hold on you:{" "}
            <a
              href="mailto:hello@curiousdevs.com"
              className="text-foreground underline underline-offset-4"
            >
              hello@curiousdevs.com
            </a>{" "}
            · CuriousDevs, Noida, India.
          </p>
        </LegalSection>
      </LegalDoc>
      <Footer />
    </main>
  );
}
