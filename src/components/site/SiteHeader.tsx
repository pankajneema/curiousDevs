import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Logo, Wordmark } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { NAV, type NavItem } from "@/lib/content";

const hasChildren = (item: NavItem): item is Extract<NavItem, { children: unknown[] }> =>
  "children" in item;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Both menus close on navigation, so a link never leaves them hanging open.
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the dropdown; a click outside it does too.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [menu]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line/80 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label="CuriousDevs — home"
        >
          <Logo size={26} />
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <nav
            ref={navRef}
            aria-label="Primary"
            className="flex items-center gap-1 rounded-full border border-line bg-surface/50 p-1.5 backdrop-blur-xl"
          >
            {NAV.map((item) =>
              hasChildren(item) ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMenu(item.label)}
                  onMouseLeave={() => setMenu(null)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={menu === item.label}
                    onClick={() => setMenu(menu === item.label ? null : item.label)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors",
                      item.children.some((c) => pathname.startsWith(c.to)) || menu === item.label
                        ? "bg-surface-2/80 text-foreground"
                        : "text-muted-foreground hover:bg-surface-2/60 hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <svg
                      aria-hidden
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      className={cn(
                        "transition-transform duration-200",
                        menu === item.label && "rotate-180",
                      )}
                    >
                      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </button>

                  {menu === item.label ? (
                    <div className="absolute left-1/2 top-full z-10 w-72 -translate-x-1/2 pt-3">
                      <div className="overflow-hidden rounded-2xl border border-line bg-surface/95 p-2 shadow-lg shadow-black/20 backdrop-blur-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="group block rounded-xl px-4 py-3 transition-colors hover:bg-surface-2"
                            activeProps={{ className: "bg-surface-2" }}
                          >
                            <span className="flex items-baseline justify-between gap-3">
                              <span className="font-display text-base tracking-[-0.03em] text-foreground">
                                {child.label}
                              </span>
                              <span
                                aria-hidden
                                className="mono-xs text-line-strong transition-colors group-hover:text-signal"
                              >
                                →
                              </span>
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                              {child.note}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-full px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-surface-2/60 hover:text-foreground"
                  activeProps={{ className: "bg-surface-2/80 text-foreground" }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <ThemeToggle />

          <Link to="/contact" className="btn-primary min-h-10 px-5">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex size-10 items-center justify-center rounded-full border border-line bg-surface/60 backdrop-blur-xl"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-foreground transition-transform",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-foreground transition-transform",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="hairline-t bg-background lg:hidden">
          <nav aria-label="Primary mobile" className="shell flex flex-col py-4">
            {NAV.map((item) =>
              hasChildren(item) ? (
                <div key={item.label} className="hairline-b py-4">
                  <p className="label-tech">{item.label}</p>
                  <div className="mt-4 flex flex-col gap-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="font-display text-xl tracking-[-0.03em] text-foreground/90"
                        activeProps={{ className: "text-signal" }}
                      >
                        {child.label}
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {child.note}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="hairline-b py-4 font-display text-xl tracking-[-0.03em] text-foreground/90"
                  activeProps={{ className: "text-signal" }}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              className="hairline-b py-4 font-display text-xl tracking-[-0.03em] text-foreground/90"
              activeProps={{ className: "text-signal" }}
            >
              Contact
            </Link>
            <p className="mono-xs py-6 text-muted-foreground">NOIDA, UTTAR PRADESH · INDIA</p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
