import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { LegalDoc, LegalSection } from "@/components/landing/LegalDoc";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/security")({
  head: () =>
    buildSeoHead({
      path: "/security",
      title: "Security | CuriousDevs",
      description:
        "How CuriousDevs handles security today, stated plainly — and how to report an issue.",
      keywords: ["security policy", "responsible disclosure", "AI security", "product security"],
      ogType: "website",
      robots: "index, follow",
    }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/security",
              "Security",
              "CuriousDevs' current security posture and responsible disclosure process.",
            ),
          ),
        }}
      />
      <Nav />
      <LegalDoc
        eyebrow="Legal"
        title="Security"
        updated="28 July 2026"
        intro="Security is part of how we engineer intelligent systems, so we hold this site and our own practices to the same standard. That means saying plainly what's true today and what isn't yet — not borrowing the language of certifications we don't hold."
      >
        <LegalSection n="01" title="Where we are">
          <p>
            CuriousDevs is a pre-launch, founding-stage team. We are{" "}
            <strong className="text-foreground">not</strong> currently SOC 2 or ISO 27001 certified.
            Where those frameworks are mentioned, they describe regulatory or compliance frameworks
            a given scenario touches, not certifications CuriousDevs holds. We think that
            distinction matters enough to state it twice.
          </p>
        </LegalSection>

        <LegalSection n="02" title="This website, specifically">
          <ul className="list-disc space-y-2 pl-5">
            <li>Served entirely over HTTPS/TLS.</li>
            <li>
              No cookies, analytics, or third-party tracking scripts (see our Privacy Policy).
            </li>
            <li>
              Contact, booking, and careers submissions are sent by email over an authenticated SMTP
              connection and are not stored in a database.
            </li>
            <li>
              Resume attachments are capped at 8MB and are validated on both the browser and server
              before being accepted.
            </li>
          </ul>
        </LegalSection>

        <LegalSection n="03" title="Responsible disclosure">
          <p>
            If you find a security issue on this website or in anything we've published, we want to
            know before anyone else does. Email{" "}
            <a
              href="mailto:hello@curiousdevs.com"
              className="text-foreground underline underline-offset-4"
            >
              hello@curiousdevs.com
            </a>{" "}
            with the subject line "Security report" and a way to reach you. We'll acknowledge within
            one business day. We don't yet run a paid bug bounty — we intend to once a paid product
            is live — but we will credit you publicly if you'd like, and we won't pursue legal
            action against good-faith, non-destructive research.
          </p>
        </LegalSection>

        <LegalSection n="04" title="What's on the roadmap">
          <p>
            As our work grows, our plan is to pursue SOC 2 Type II, complete a third-party
            penetration test, and publish a technical security overview. None of that exists yet;
            this line will be updated the moment any of it does, not before.
          </p>
        </LegalSection>

        <LegalSection n="05" title="Contact">
          <p>
            <a
              href="mailto:hello@curiousdevs.com"
              className="text-foreground underline underline-offset-4"
            >
              hello@curiousdevs.com
            </a>{" "}
            · CuriousDevs, Gurugram, India.
          </p>
        </LegalSection>
      </LegalDoc>
      <Footer />
    </main>
  );
}
