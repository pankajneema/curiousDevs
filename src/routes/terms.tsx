import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { LegalDoc, LegalSection } from "@/components/landing/LegalDoc";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => buildSeoHead({
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
              "The terms governing use of curiousdevs.com and the published product overview pages.",
            ),
          ),
        }}
      />
      <Nav />
      <LegalDoc
        eyebrow="Legal"
        title="Terms of Service"
        updated="28 July 2026"
        intro="These terms cover your use of curiousdevs.com — the marketing website. AgentGuard, CurioComply, and AeroOS will each carry their own terms of service once generally available; nothing here should be read as a service agreement for a product that hasn't shipped."
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
            products, roadmap, and how to get in touch. It is not, itself, a software product, and
            using it does not create a customer relationship, a support obligation, or a service
            level agreement of any kind.
          </p>
        </LegalSection>

        <LegalSection n="03" title="Forward-looking statements">
          <p>
            Product descriptions, pricing, timelines, and the "shipping from 2026" and similar
            horizon labels throughout this site describe our current plans and are not commitments.
            Product screens shown on this site — including the AgentGuard console preview — are
            illustrative mockups, not live product data, and are labeled as such on the page.
            Features, pricing, and availability may change before general release.
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
            fall under the jurisdiction of the courts in Noida, Uttar Pradesh.
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
            · CuriousDevs, Noida, India.
          </p>
        </LegalSection>
      </LegalDoc>
      <Footer />
    </main>
  );
}
