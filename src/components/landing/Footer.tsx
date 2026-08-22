import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { BookingDialog } from "./BookingDialog";
import { Logo, Wordmark } from "./Logo";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Janus (product)", to: "/janus" },
      { label: "Service catalog", to: "/product" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Frequently asked questions", to: "/faq" },
      { label: "Operating model", to: "/roadmap" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Fintech & Banking", to: "/solutions", search: { industry: "fintech" } },
      { label: "Healthcare", to: "/solutions", search: { industry: "healthcare" } },
      { label: "Enterprise SaaS & IT", to: "/solutions", search: { industry: "enterprise-saas" } },
      { label: "Government & Public Sector", to: "/solutions", search: { industry: "government" } },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "The problem", to: "/problem" },
      { label: "Blog", to: "/blog" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Security", to: "/security" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Logo size={22} />
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An AI engineering studio that builds, fixes, and scales serious AI systems for
              production.
            </p>
            <BookingDialog>
              <button className="btn-quiet mt-6 rounded-none border border-hairline bg-surface-2 px-5 py-2.5 text-sm font-semibold">
                Start an AI Project
              </button>
            </BookingDialog>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      search={"search" in l ? l.search : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="eyebrow">Reach us</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:hello@curiousdevs.com"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 text-amber-soft" /> hello@curiousdevs.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-amber-soft" /> Gurugram, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
          <span className="eyebrow">© {new Date().getFullYear()} CuriousDevs</span>
          <span className="eyebrow">AI engineering studio · Engineered in India</span>
        </div>
      </div>
    </footer>
  );
}
