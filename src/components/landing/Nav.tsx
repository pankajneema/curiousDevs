import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { domains, type DomainId } from "@/content/site";
import {
  AiEngineeringIcon,
  DeepTechIcon,
  IntelligentSystemsIcon,
  RoboticsIcon,
} from "./DomainIcon";
import { Logo, Wordmark } from "./Logo";

const ICON: Record<DomainId, typeof AiEngineeringIcon> = {
  "ai-engineering": AiEngineeringIcon,
  "intelligent-systems": IntelligentSystemsIcon,
  robotics: RoboticsIcon,
  deeptech: DeepTechIcon,
};

const DOMAIN_ORDER: Record<DomainId, number> = {
  "ai-engineering": 1,
  "intelligent-systems": 2,
  deeptech: 3,
  robotics: 4,
};
const orderedDomains = [...domains].sort((a, b) => DOMAIN_ORDER[a.id] - DOMAIN_ORDER[b.id]);

const links = [
  { label: "Work", to: "/work" },
  { label: "Research", to: "/research" },
  { label: "Company", to: "/company" },
] as const;

// Routes whose first section is light: the bar stays solid over them.
const LIGHT_TOP = ["/privacy", "/terms", "/security"];

const itemCls = (active: boolean) =>
  `flex h-9 items-center gap-1 rounded-full px-3.5 text-[13px] outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-orange-bright/60 ${
    active ? "bg-foreground/[0.08] text-foreground" : "text-muted-foreground"
  }`;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  const solid = scrolled || open || pathname.startsWith("/blog") || LIGHT_TOP.includes(pathname);

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "border-hairline bg-night/80 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="CuriousDevs — home">
          <Logo size={26} variant="light" />
          <Wordmark variant="light" />
        </Link>

        <NavigationMenu.Root
          aria-label="Primary"
          delayDuration={60}
          className="relative mx-auto hidden lg:block"
        >
          <NavigationMenu.List className="flex items-center gap-1">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild active={isActive("/")}>
                <Link to="/" className={itemCls(isActive("/"))}>
                  Home
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={`group ${itemCls(isActive("/technology"))}`}>
                Technology
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full left-1/2 w-[760px] -translate-x-1/2 pt-3 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1">
                <div className="grid grid-cols-[1.4fr_1fr] gap-2 rounded-2xl border border-hairline bg-night/95 p-2 shadow-[var(--shadow-3)] backdrop-blur-xl">
                  <ul className="grid gap-1 p-1">
                    {orderedDomains.map((d) => {
                      const Icon = ICON[d.id];
                      return (
                        <li key={d.id}>
                          <NavigationMenu.Link asChild>
                            <Link
                              to="/technology"
                              hash={d.id}
                              className="flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-foreground/[0.05]"
                            >
                              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface-2">
                                <Icon className="size-5 text-orange" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-medium text-foreground">
                                  {d.name}
                                </span>
                                <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                                  {d.statement}
                                </span>
                              </span>
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      );
                    })}
                  </ul>

                  <NavigationMenu.Link asChild>
                    <Link
                      to="/technology/noema"
                      className="spotlight flex flex-col justify-between overflow-hidden rounded-xl border border-hairline bg-surface-2 p-6"
                    >
                      <div
                        aria-hidden="true"
                        className="glow-orange absolute -right-24 -bottom-24 -z-10 size-72 rounded-full"
                      />
                      <div aria-hidden="true" className="tech-grid absolute inset-0 -z-10" />
                      <div>
                        <p className="eyebrow">Proprietary technology</p>
                        <p className="mt-5 text-3xl font-normal tracking-tight text-foreground">
                          Noema & Soma
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Intelligence and embodiment, connected.
                        </p>
                      </div>
                      <span className="link-arrow mt-10">
                        Explore the direction <ArrowRight className="size-4" />
                      </span>
                    </Link>
                  </NavigationMenu.Link>

                  <div className="col-span-2 flex items-center justify-between gap-6 rounded-xl border border-hairline px-4 py-3 text-[13px] text-muted-foreground">
                    <span>One intelligent-systems thesis. Four connected areas.</span>
                    <NavigationMenu.Link asChild>
                      <Link to="/technology" className="link-arrow shrink-0 text-[13px]">
                        All technology <ArrowRight className="size-3.5" />
                      </Link>
                    </NavigationMenu.Link>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {links.map((l) => (
              <NavigationMenu.Item key={l.to}>
                <NavigationMenu.Link asChild active={isActive(l.to)}>
                  <Link to={l.to} className={itemCls(isActive(l.to))}>
                    {l.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            to="/contact"
            className="group hidden h-9 items-center gap-2 rounded-full bg-foreground px-4 text-[13px] font-medium text-night transition-colors hover:bg-orange-bright sm:inline-flex"
          >
            Let's Build
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex size-10 items-center justify-center rounded-full border border-hairline text-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-hairline bg-night lg:hidden"
        >
          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center text-lg text-foreground"
            >
              Home
            </Link>
            <p className="eyebrow mt-3 mb-3">Technology</p>
            <ul className="grid grid-cols-2 gap-2">
              {orderedDomains.map((d) => {
                const Icon = ICON[d.id];
                return (
                  <li key={d.id}>
                    <Link
                      to="/technology"
                      hash={d.id}
                      onClick={() => setOpen(false)}
                      className="flex h-full flex-col gap-3 rounded-xl border border-hairline bg-surface-2 p-3.5"
                    >
                      <Icon className="size-5 text-orange" />
                      <span className="text-sm text-foreground">{d.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="mt-4 divide-y divide-[var(--hairline)] border-y border-hairline">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-12 items-center justify-between text-lg ${isActive(l.to) ? "text-foreground" : "text-foreground/75"}`}
                  >
                    {l.label}
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">
              Let's Build <ArrowRight className="size-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
