import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageIntro } from "@/components/landing/PageIntro";
import { ApplyDialog } from "@/components/landing/ApplyDialog";
import { roles } from "@/content/site";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Compliance Lead at CuriousDevs" },
      {
        name: "description",
        content:
          "CuriousDevs is a founding security team hiring one role at a time. Right now: Compliance Lead, Noida, remote-friendly.",
      },
      { property: "og:title", content: "Careers — Security Roles at CuriousDevs" },
      {
        property: "og:description",
        content: "Building the founding security team. Everyone ships code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://curiousdevs.com/careers" },
      { property: "og:site_name", content: "CuriousDevs" },
    ],
    links: [{ rel: "canonical", href: "https://curiousdevs.com/careers" }],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <main id="main-content" className="relative">
      <Nav />
      <PageIntro
        eyebrow="Careers"
        title="We're hiring for one role right now,"
        accent="deliberately."
        body="CuriousDevs is a founding team, not a department store. We open roles one at a time as the product needs them — right now, that's security compliance. Everyone ships code."
        action={false}
      />

      <section className="border-b border-hairline pb-24 sm:pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col divide-y divide-[var(--hairline)] border border-hairline bg-surface/70 shadow-[0_8px_24px_rgba(10,20,36,0.04)]">
            {roles.map((r) => (
              <div
                key={r.title}
                className="cell-hover flex flex-col gap-3 bg-surface/80 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-7"
              >
                <div>
                  <p className="eyebrow">
                    {r.team} · {r.location}
                  </p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">{r.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                </div>
                <ApplyDialog role={r.title}>
                  <button className="btn-quiet inline-flex shrink-0 items-center gap-2 border border-hairline bg-surface/90 px-5 py-2.5 text-sm font-semibold">
                    <Mail className="size-3.5" /> Apply
                  </button>
                </ApplyDialog>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t see your role?{" "}
            <ApplyDialog role="General application">
              <button className="text-foreground underline underline-offset-4">
                Write to us anyway
              </button>
            </ApplyDialog>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
