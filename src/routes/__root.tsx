import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IntercomMessenger } from "@/components/forms/IntercomMessenger";
import { AuroraBackground } from "@/components/visuals/AuroraBackground";
import { THEME_INIT_SCRIPT } from "@/components/site/ThemeToggle";
import {
  buildSeoHead,
  buildOrganizationSchema,
  buildWebSiteSchema,
  SITE_DESCRIPTION,
  SITE_DOMAIN,
  SITE_NAME,
} from "@/lib/seo";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen items-center px-6">
      <div className="mx-auto max-w-xl">
        <p className="t-data text-sm font-medium">404</p>
        <h1 className="t-display mt-4 text-[clamp(2.5rem,7vw,4.5rem)]">This page doesn't exist.</h1>
        <p className="t-body mt-5 text-ink-muted">
          It may have moved when the site changed. Start from the homepage instead.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">
            Go home
          </Link>
          <Link to="/contact" className="btn-outline">
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md">
        <p className="t-data text-sm font-medium">Error</p>
        <h1 className="t-h2 mt-4">This page didn't load.</h1>
        <p className="t-small mt-4">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-outline">
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const seo = buildSeoHead({
      path: "/",
      title: `${SITE_NAME} — AI that can run real machines`,
      description: SITE_DESCRIPTION,
      image: `${SITE_DOMAIN}/og-image.jpg`,
      ogType: "website",
    });

    return {
      ...seo,
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        ...seo.meta,
        { name: "author", content: SITE_NAME },
        { name: "twitter:image", content: `${SITE_DOMAIN}/og-image.jpg` },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        // Every route sets its own canonical/hrefLang via buildSeoHead (see
        // e.g. routes/index.tsx for "/"). TanStack Router concatenates
        // `links` across the route tree instead of deduping by rel like it
        // does for `meta`, so including seo.links here unfiltered would
        // stack this root's "/" canonical onto every single page's <head>
        // alongside its real one — two conflicting canonical tags per page.
        ...seo.links.filter((link) => link.rel !== "canonical" && !("hrefLang" in link)),
        {
          rel: "icon",
          href: "/favicon-light.svg",
          type: "image/svg+xml",
          media: "(prefers-color-scheme: light)",
        },
        {
          rel: "icon",
          href: "/favicon-dark.svg",
          type: "image/svg+xml",
          media: "(prefers-color-scheme: dark)",
        },
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    };
  },

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const organizationSchema = buildOrganizationSchema();
const websiteSchema = buildWebSiteSchema();

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
        {/* Scroll entrances start hidden and are settled by an observer.
            Without JavaScript that observer never runs, so this restores
            the document to its complete, static state instead of leaving
            it at opacity 0. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.line-mask>span{transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[var(--radius)] focus:bg-signal focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ground"
      >
        Skip to content
      </a>
      <AuroraBackground />
      <SiteHeader />
      <main id="main-content" className="relative z-10 pt-16 md:pt-[4.5rem]">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
      <IntercomMessenger />
    </QueryClientProvider>
  );
}
