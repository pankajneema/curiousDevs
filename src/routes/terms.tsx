import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { LegalDoc, LegalSection } from "@/components/landing/LegalDoc";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildSeoHead({
      path: "/terms",
      title: "Terms of Service | CuriousDevs",
      description: "The terms that govern your use of curiousdevs.com.",
      keywords: ["terms of service", "website terms", "CuriousDevs legal"],
      ogType: "website",
      robots: "index, follow",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/terms",
              "Terms of Service",
              "The terms governing use of curiousdevs.com and the published CuriousDevs service pages.",
            ),
          ),
        }}
      />
      <Nav />
      <LegalDoc
        eyebrow="Legal"
        title="Terms of Service"
        updated="28 July 2026"
        intro="These terms cover your use of curiousdevs.com — the marketing website and service inquiry flows. They do not replace a statement of work, data-processing agreement, or other written terms agreed for a client engagement."
      >
        <LegalSection n="01" title="Acceptance">
          <p>
            By using this website, you agree to these terms. If you don't agree, the only
            enforceable instruction we can give you is: please don't use the site.
          </p>
        </LegalSection>

        <LegalSection n="02" title="What this site is">
          <p>
            curiousdevs.com is an informational and lead-generation website describing CuriousDevs'
            services, delivery process, operating model, and how to get in touch. Using it does not
            create a customer relationship, a delivery obligation, or a service level agreement.
          </p>
        </LegalSection>

        <LegalSection n="03" title="Forward-looking statements">
          <p>
            Service descriptions, timelines, capability examples, and illustrative workspace screens
            describe our current approach and are not commitments. Final deliverables, timelines,
            acceptance criteria, data handling, and fees are defined in a signed statement of work.
          </p>
        </LegalSection>

        <LegalSection n="04" title="Acceptable use">
          <p>
            Don't attempt to disrupt the site, scrape it at a rate that degrades it for other
            visitors, or submit the contact, booking, or careers forms with false information or
            malicious file attachments. We reserve the right to block traffic that does.
          </p>
        </LegalSection>

        <LegalSection n="05" title="Intellectual property">
          <p>
            The CuriousDevs name, logo, and the text and design of this site are ours. You're
            welcome to link to it or quote it with attribution; you're not licensed to reproduce it
            wholesale or represent it as your own.
          </p>
        </LegalSection>

        <LegalSection n="06" title="No warranty">
          <p>
            This site is provided as-is. We work to keep it accurate and available, but we don't
            warrant it will be error-free, uninterrupted, or perfectly current — particularly given
            our stage, where product details are still moving.
          </p>
        </LegalSection>

        <LegalSection n="07" title="Governing law">
          <p>
            These terms are governed by the laws of India. Disputes arising from use of this site
            fall under the jurisdiction of the courts in Gurugram, Haryana.
          </p>
        </LegalSection>

        <LegalSection n="08" title="Changes">
          <p>
            We may update these terms as the company and its products evolve. Material changes will
            update the date at the top of this page.
          </p>
        </LegalSection>

        <LegalSection n="09" title="Contact">
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
