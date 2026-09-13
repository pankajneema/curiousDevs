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
import { PageBackground } from "../components/landing/PageBackground";
import { SiteEffects } from "../components/landing/SiteEffects";
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
    <main className="on-dark relative isolate flex min-h-screen items-center overflow-hidden px-5">
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
      />
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow text-amber-accent">Error 404</p>
        <h1 className="display mt-5 text-[clamp(2.5rem,7vw,4.5rem)]">
          This page <span className="text-orange">doesn't exist.</span>
        </h1>
        <p className="mt-5 text-muted-foreground">
          It may have moved when the site changed. Start from the homepage instead.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
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
    <main className="on-dark flex min-h-screen items-center justify-center px-5">
      <div className="max-w-md text-center">
        <p className="eyebrow text-amber-accent">Something went wrong</p>
        <h1 className="display mt-5 text-4xl">This page didn't load.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
      title: `${SITE_NAME} — From Research to Real-World Technology`,
      description: SITE_DESCRIPTION,
      keywords: [
        "intelligent systems",
        "AI engineering",
        "production AI",
        "Noema",
        "Soma",
        "robotics research",
      ],
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
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
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
    <html lang="en">
      <head>
        <HeadContent />
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-amber-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-background"
      >
        Skip to content
      </a>
      <PageBackground />
      <SiteEffects />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
