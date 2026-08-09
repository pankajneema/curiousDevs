import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { ContactForm } from "@/components/landing/ContactForm";
import { PageIntro } from "@/components/landing/PageIntro";
import { buildSeoHead, buildWebPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeoHead({
      path: "/contact",
      title: "Contact CuriousDevs — Start an AI Project",
      description:
        "Talk to the CuriousDevs engineers about building, fixing, or scaling an AI system.",
      keywords: [
        "AI engineering contact",
        "AI development",
        "AI audit",
        "MLOps",
        "CuriousDevs contact",
      ],
      ogType: "website",
    }),
  component: ContactPage,
});

const details = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@curiousdevs.com",
    href: "mailto:hello@curiousdevs.com",
  },
  { icon: MapPin, label: "Base", value: "Gurugram, India" },
  { icon: Clock, label: "Response time", value: "One business day" },
];

function ContactPage() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildWebPageSchema(
              "/contact",
              "Contact CuriousDevs — Start an AI Project",
              "Reach CuriousDevs about building, fixing, or scaling an AI system.",
            ),
          ),
        }}
      />
      <Nav />
      <PageIntro
        eyebrow="Talk to us"
        title="Bring the AI problem"
        accent="you need solved."
        body="Tell us what you are building, what is failing, or what needs to reach production. We will help define the right service line and next step."
        action={false}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="card-lift border border-hairline bg-surface/80 p-6 shadow-[0_8px_24px_rgba(10,20,36,0.05)] sm:p-8">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight">Tell us what you need</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pick the service direction, tell us about the system or idea, and we come back with
              two concrete times.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <ul className="grid gap-px overflow-hidden border border-hairline bg-hairline shadow-[0_8px_24px_rgba(10,20,36,0.04)]">
            {details.map((d) => (
              <li
                key={d.label}
                className="cell-hover border-b border-hairline/70 bg-surface/70 px-6 py-6 last:border-b-0 sm:px-8 sm:py-7"
              >
                <p className="eyebrow flex items-center gap-2">
                  <d.icon className="size-3.5 text-amber-soft" /> {d.label}
                </p>
                {d.href ? (
                  <a
                    href={d.href}
                    className="mt-2 block text-lg font-semibold tracking-tight transition-colors hover:text-amber-accent"
                  >
                    {d.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-semibold tracking-tight">{d.value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
