import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { format } from "date-fns";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { products } from "@/components/landing/product-data";
import { getPostBySlug } from "@/lib/blog";
import { buildSeoHead, buildBlogPostingSchema, buildBreadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData: post }) => {
    if (!post) return {};
    return buildSeoHead({
      path: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      keywords: [post.targetQuery],
      ogType: "article",
      article: true,
      canonicalUrl: post.canonical || undefined,
    });
  },
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const post = Route.useLoaderData();
  const service = products.find((p) => p.slug === post.service);

  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBlogPostingSchema(`/blog/${post.slug}`, post.title, post.description, post.date),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />
      <Nav />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 sm:px-8 sm:pb-32">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link to="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
        </nav>

        <p className="eyebrow mt-5 flex items-center gap-2 text-amber-accent">
          <span className="live-dot inline-block size-1.5 rounded-none bg-amber-accent" />
          Blog
        </p>
        <h1 className="mt-4 text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
          {post.title}
        </h1>
        <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </p>

        <div className="blog-prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

        <div className="mt-16 border-t border-hairline pt-8">
          <p className="eyebrow">Continue reading</p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)] sm:grid-cols-2">
            <Link
              to="/problem"
              className="cell-hover group flex flex-col gap-2 bg-surface p-6 sm:p-7"
            >
              <p className="eyebrow text-amber-soft">Where AI projects break</p>
              <p className="text-lg font-bold tracking-tight transition-colors group-hover:text-amber-accent">
                The Problem →
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Unclear scope, RAG failures, unreliable agents, and the ways AI projects fail inside
                companies.
              </p>
            </Link>
            {service && (
              <Link
                to="/product"
                search={{ p: service.slug }}
                className="cell-hover group flex flex-col gap-2 bg-surface p-6 sm:p-7"
              >
                <p className="eyebrow text-amber-soft">Related service</p>
                <p className="text-lg font-bold tracking-tight transition-colors group-hover:text-amber-accent">
                  {service.name} →
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{service.line}</p>
              </Link>
            )}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
