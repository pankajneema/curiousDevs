import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { BookingDialog } from "./BookingDialog";
import { Logo, Wordmark } from "./Logo";
import { products } from "@/content/site";
import { solutions } from "./solutions-data";

const productItems = products.map((p) => ({
  label: p.name,
  desc: p.category,
  to: "/product" as const,
  search: { p: p.slug },
}));

const solutionItems = solutions.map((s) => ({
  label: s.name,
  to: "/solutions" as const,
  search: { industry: s.slug },
}));

const resourceItems = [
  {
    label: "How It Works",
    desc: "Control plane & runtime enforcement",
    to: "/how-it-works" as const,
  },
  { label: "Roadmap", desc: "2026 – 2030", to: "/roadmap" as const },
  { label: "The Problem", desc: "Where autonomy breaks", to: "/problem" as const },
];

const flatLinks = [
  // { label: "Pricing", to: "/pricing" as const },
  { label: "Careers", to: "/careers" as const },
  { label: "Contact", to: "/contact" as const },
];

function DropdownTrigger({
  label, 
  open,
  onClick,

}: {
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      aria-expanded={open}
      aria-haspopup="menu"
    >
      {label}
      <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
  );
}

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"product" | "solutions" | "resources" | null>(null);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  const toggle = (m: "product" | "solutions" | "resources") => setMenu((v) => (v === m ? null : m));

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="w-full max-w-5xl">
        <nav className="flex items-center gap-2 rounded-none border border-hairline bg-surface/85 px-3 py-2 shadow-[0_10px_30px_rgba(10,20,36,0.08)] backdrop-blur-xl sm:gap-5 sm:px-5">
          <Link to="/" className="flex items-center gap-2 pr-1">
            <Logo size={26} />
            <Wordmark />
          </Link>

          <div ref={ddRef} className="hidden flex-1 items-center gap-5 lg:flex">
            <div className="relative">
              <DropdownTrigger
                label="Product"
                open={menu === "product"}
                onClick={() => toggle("product")}
              />
              {menu === "product" && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-3 w-72 rounded-none border border-hairline bg-surface p-2 shadow-lg"
                >
                  {productItems.map((p, i) => (
                    <Link
                      key={p.label}
                      to={p.to}
                      search={p.search}
                      role="menuitem"
                      className="flex items-center gap-3 rounded-none px-3 py-2.5 transition-colors hover:bg-surface-2"
                    >
                      <span className="font-mono text-[10px] text-amber-soft">0{i + 1}</span>
                      <div>
                        <div className="text-sm font-semibold tracking-tight">{p.label}</div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-hairline pt-1">
                    <Link
                      to="/product"
                      search={{ p: undefined }}
                      className="block rounded-none px-3 py-2.5 text-sm font-medium text-amber-accent transition-colors hover:bg-surface-2 hover:text-foreground"
                    >
                      View all products →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <DropdownTrigger
                label="Solutions"
                open={menu === "solutions"}
                onClick={() => toggle("solutions")}
              />
              {menu === "solutions" && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-3 w-64 rounded-none border border-hairline bg-surface/95 p-2 shadow-[0_18px_40px_rgba(10,20,36,0.12)] backdrop-blur-xl"
                >
                  {solutionItems.map((s) => (
                    <Link
                      key={s.label}
                      to={s.to}
                      search={s.search}
                      role="menuitem"
                      className="block rounded-none px-3 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
                    >
                      {s.label}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-hairline pt-1">
                    <Link
                      to="/solutions"
                      search={{ industry: undefined }}
                      className="block rounded-none px-3 py-2.5 text-sm font-medium text-amber-accent transition-colors hover:bg-surface-2 hover:text-foreground"
                    >
                      View all industries →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <DropdownTrigger
                label="Resources"
                open={menu === "resources"}
                onClick={() => toggle("resources")}
              />
              {menu === "resources" && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-3 w-72 rounded-none border border-hairline bg-surface p-2 shadow-lg"
                >
                  {resourceItems.map((r) => (
                    <Link
                      key={r.label}
                      to={r.to}
                      role="menuitem"
                      className="block rounded-none px-3 py-2.5 transition-colors hover:bg-surface-2"
                    >
                      <div className="text-sm font-semibold tracking-tight">{r.label}</div>
                      <div className="text-xs text-muted-foreground">{r.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {flatLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={`text-sm transition-colors hover:text-foreground ${
                  pathname === l.to ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <BookingDialog>
              <button className="btn-shine rounded-none bg-foreground px-4 py-2 text-xs font-semibold text-background sm:text-sm">
                Talk to us
              </button>
            </BookingDialog>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex size-9 min-h-9 items-center justify-center rounded-none border border-hairline text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="animate-fade-in mt-2 max-h-[75vh] overflow-y-auto rounded-none border border-hairline bg-surface p-2.5 shadow-lg lg:hidden">
            <p className="eyebrow px-3 pt-2 pb-1">Product</p>
            <ul className="divide-y divide-[var(--hairline)]">
              {productItems.map((p) => (
                <li key={p.label}>
                  <Link
                    to={p.to}
                    search={p.search}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow px-3 pt-4 pb-1">Solutions</p>
            <ul className="divide-y divide-[var(--hairline)]">
              {solutionItems.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    search={s.search}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow px-3 pt-4 pb-1">Resources</p>
            <ul className="divide-y divide-[var(--hairline)]">
              {resourceItems.map((r) => (
                <li key={r.label}>
                  <Link
                    to={r.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-hairline pt-2">
              <ul className="divide-y divide-[var(--hairline)]">
                {flatLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
