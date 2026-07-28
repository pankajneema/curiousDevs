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
      { title: "Careers — Security Roles at CuriousDevs" },
      {
        name: "description",
        content:
          "CuriousDevs is hiring security roles only, right now: research, backend, ML detection and compliance. Noida, remote-friendly.",
      },
      { property: "og:title", content: "Careers — Security Roles at CuriousDevs" },
      {
        property: "og:description",
        content: "Building the founding security team. Everyone ships code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/careers" },
      { property: "og:site_name", content: "CuriousDevs" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <main className="relative min-h-dvh">
      <Nav />
      <PageIntro
        eyebrow="Careers"
        title="We're hiring"
        accent="security roles only."
        body="CuriousDevs is a founding team, not a department store. Every open role right now is a security role — research, backend, detection or compliance. Everyone ships code."
        action={false}
      />

      <section className="border-b border-hairline pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col divide-y divide-[var(--hairline)] border-y border-hairline">
            {roles.map((r) => (
              <div key={r.title} className="cell-hover flex flex-col gap-3 p-7 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="eyebrow">{r.team} · {r.location}</p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">{r.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
                <ApplyDialog role={r.title}>
                  <button className="btn-quiet inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline bg-surface-2 px-5 py-2.5 text-sm font-semibold">
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
