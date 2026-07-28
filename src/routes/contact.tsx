import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { ContactForm } from "@/components/landing/ContactForm";
import { PageIntro } from "@/components/landing/PageIntro";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CuriosDevs — Book a Checkpoint Review" },
      {
        name: "description",
        content:
          "Talk to the engineers building CuriosDevs. Bring one autonomous workflow and we will show you where the checkpoint goes and what it would have stopped.",
      },
      { property: "og:title", content: "Contact CuriosDevs — Book a Checkpoint Review" },
      {
        property: "og:description",
        content: "45-minute working session, engineers on the call, no sales deck.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/contact" },
      { property: "og:site_name", content: "CuriosDevs" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const details = [
  { icon: Mail, label: "Email", value: "hello@curiosdevs.com", href: "mailto:hello@curiosdevs.com" },
  { icon: MapPin, label: "Base", value: "Noida, India" },
  { icon: Clock, label: "Response time", value: "One business day" },
];

function ContactPage() {
  return (
    <main className="relative min-h-dvh">
      <Nav />
      <PageIntro
        eyebrow="Talk to us"
        title="Bring the workflow"
        accent="you are nervous about."
        body="We run a 45-minute session with the people who built the enforcement path. You leave with a map of where the checkpoint sits in your stack and what it would have blocked last month."
        action={false}
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="card-lift panel-sheen rounded-2xl border border-hairline bg-surface p-8">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
              Send us your workflow
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Pick what you&apos;re securing, tell us about it, and we come back with two concrete
              times.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            {details.map((d) => (
              <li key={d.label} className="cell-hover bg-surface/60 px-8 py-7">
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
