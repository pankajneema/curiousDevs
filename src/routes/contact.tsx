import { createFileRoute } from "@tanstack/react-router";

import { pageHead } from "@/lib/seo";
import { CONTACT_COPY as C } from "@/lib/copy";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { Label, Section } from "@/components/system/primitives";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      path: "/contact",
      crumb: "Contact",
      title: "Contact CuriousDevs — talk to our team",
      description:
        "Describe the problem, not the technology. Tell us what happens today and what it costs. Our team replies within one working day.",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero label={C.label} title={C.title} lede={C.lede} />

      <Section id="form">
        <div className="grid gap-14 [&>*]:min-w-0 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          {/* the form is the page; everything else supports it */}
          <ContactForm />

          <aside className="lg:pt-1">
            <Label>{C.emailLabel}</Label>
            <a
              href={`mailto:${C.email}`}
              className="link-underline mt-5 inline-block text-base text-foreground transition-colors hover:text-signal md:text-lg"
            >
              {C.email}
            </a>

            <dl className="mt-12 divide-y divide-line border-y border-line">
              {C.meta.map((m) => (
                <div key={m.term} className="py-5">
                  <dt className="mono-xs text-muted-foreground">{m.term.toUpperCase()}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground/90">{m.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{C.note}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
