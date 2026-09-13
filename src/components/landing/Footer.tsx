import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { company } from "@/content/site";
import { Logo, Wordmark } from "./Logo";

type FooterLink = { label: string; to: LinkProps["to"]; hash?: string };

const columns: { title: string; items: FooterLink[] }[] = [
  {
    title: "Technology",
    items: [
      { label: "AI Engineering", to: "/technology", hash: "ai-engineering" },
      { label: "Intelligent Systems", to: "/technology", hash: "intelligent-systems" },
      { label: "DeepTech", to: "/technology", hash: "deeptech" },
      { label: "Robotics", to: "/technology", hash: "robotics" },
      { label: "Noema", to: "/technology/noema" },
      { label: "Soma", to: "/technology/soma" },
    ],
  },
  {
    title: "Research",
    items: [
      { label: "Research areas", to: "/research" },
      { label: "Selected work", to: "/work" },
      { label: "Engineering notes", to: "/blog" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/company" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const legal: FooterLink[] = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Security", to: "/security" },
];

export function Footer() {
  return (
    <footer className="on-dark relative isolate overflow-hidden border-t border-hairline">
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 sm:pt-24">
        <div className="grid gap-12 sm:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="sm:col-span-3 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
              aria-label="CuriousDevs — home"
            >
              <Logo size={34} variant="light" />
              <Wordmark variant="light" size="lg" />
            </Link>
            <p className="display text-sheen mt-8 max-w-xs text-[2.1rem]">
              Let's build what's next.
            </p>
            <Link to="/contact" className="btn-primary group mt-8">
              Start a Project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-6 space-y-3.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      hash={item.hash}
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-7 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail className="size-3.5" /> {company.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5" /> {company.base}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="eyebrow">© {new Date().getFullYear()} CuriousDevs</p>
            {legal.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="eyebrow transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display text-fade pointer-events-none mt-10 -mb-[0.18em] text-center text-[clamp(4.5rem,17.5vw,14.5rem)] leading-[0.85] tracking-[-0.055em] select-none"
      >
        CuriousDevs
      </p>
    </footer>
  );
}
