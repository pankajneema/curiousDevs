import { Link } from "@tanstack/react-router";

import { SITE } from "@/lib/copy";
import { Logo, Wordmark } from "@/components/layout/Logo";
import { FooterWordmark } from "@/components/visuals/FooterWordmark";

const COLUMNS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "OJAS", to: "/products/ojas" },
      { label: "PARTH", to: "/products/parth" },
    ],
  },
  {
    heading: "Technology",
    links: [
      { label: "Intelligence", to: "/intelligence" },
      { label: "Robotics", to: "/robotics" },
      { label: "Research", to: "/research" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/company" },
      { label: "Contact", to: "/contact" },
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
          <div className="flex items-center gap-2.5">
            <Logo size={30} />
            <Wordmark size="lg" />
          </div>
          <p className="mono-xs mt-3 text-muted-foreground">{SITE.location.toUpperCase()}</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            OJAS is the intelligence that decides and acts. PARTH is the body it moves in. Together,
            Physical AI.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="label-tech">{col.heading}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="hairline-t relative z-10">
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
