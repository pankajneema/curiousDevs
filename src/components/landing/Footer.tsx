import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { BookingDialog } from "./BookingDialog";
import { Logo, Wordmark } from "./Logo";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Product overview", to: "/product" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Pricing", to: "/pricing" },
      { label: "Roadmap", to: "/roadmap" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Fintech & Banking", to: "/solutions" },
      { label: "Healthcare", to: "/solutions" },
      { label: "Enterprise SaaS & IT", to: "/solutions" },
      { label: "Government & Public Sector", to: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "The problem", to: "/problem" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Logo size={22} />
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The accountability layer for autonomous systems — agents, data and machines under one
              checkpoint.
            </p>
            <BookingDialog>
              <button className="btn-quiet mt-6 rounded-full border border-hairline bg-surface-2 px-5 py-2.5 text-sm font-semibold">
                Book a working session
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
                <MapPin className="size-4 text-amber-soft" /> Noida, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
          <span className="eyebrow">© {new Date().getFullYear()} CuriousDevs</span>
          <span className="eyebrow">Accountable autonomy · Engineered in India</span>
        </div>
      </div>
    </footer>
  );
}
