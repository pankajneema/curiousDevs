import { Link } from "@tanstack/react-router";

import { STUDIO } from "@/content/studio";
import { Logo, Wordmark } from "@/components/layout/Logo";
import { FooterWordmark } from "@/components/visuals/FooterWordmark";

type FooterLink = { label: string; to?: string; hash?: string; href?: string };

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Advisory", to: "/services", hash: "advisory" },
      { label: "Applied AI Engineering", to: "/services", hash: "applied-ai" },
      { label: "Software and Data Platforms", to: "/services", hash: "platforms" },
      { label: "AI Operations", to: "/services", hash: "ai-operations" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Industries", to: "/industries" },
      { label: "Work", to: "/work" },
      { label: "Research", to: "/research" },
      { label: "Physical AI Lab", to: "/lab" },
      { label: "About", to: "/company" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Talk to us", to: "/contact" },
      { label: "GitHub", href: STUDIO.github },
      { label: "Security", to: "/security" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="hairline-t relative isolate overflow-hidden">
      <FooterWordmark text="CuriousDevs" />

      <div className="shell relative z-10 grid gap-12 py-16 md:grid-cols-[1.4fr_2fr] md:py-20">
        <div>
          <Link
            to="/"
            className="group flex w-fit items-center gap-2.5 transition-opacity hover:opacity-80"
            aria-label="CuriousDevs — home"
          >
            <span className="transition-transform duration-1000 ease-out group-hover:rotate-[360deg] motion-reduce:transition-none motion-reduce:group-hover:rotate-0">
              <Logo size={30} className="transition-colors group-hover:text-signal" />
            </span>
            <Wordmark size="lg" className="transition-colors group-hover:text-signal" />
          </Link>
          <p className="mono-xs mt-3 text-muted-foreground">{STUDIO.location.toUpperCase()}</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {STUDIO.blurb}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="label-tech">{col.heading}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        to={l.to}
                        hash={l.hash}
                        className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="mono-xs text-muted-foreground">© {new Date().getFullYear()} CURIOUSDEVS</p>
          <p className="mono-xs text-muted-foreground">
            WORK IN PROGRESS IS LABELLED AS WORK IN PROGRESS
          </p>
        </div>
      </div>
    </footer>
  );
}
