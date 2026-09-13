import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { format } from "date-fns";
import { Link2, Check } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { getPostBySlug } from "@/lib/blog";
import {
  buildSeoHead,
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildCanonicalUrl,
} from "@/lib/seo";

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

const flowStages = ["Document", "Chunks", "Embeddings", "Retrieval", "Answer"];

function RagFlowDiagram() {
  const gap = 190;
  const y = 60;
  return (
    <svg
      viewBox="0 0 980 180"
      className="w-full min-w-[720px]"
      role="img"
      aria-label="Diagram of a RAG pipeline: document, chunks, embeddings, retrieval, answer, with evaluation checking retrieval"
    >
      <g className="text-[color:rgb(255_255_255/0.55)]">
        {flowStages.slice(0, -1).map((_, i) => (
          <line
            key={i}
            x1={70 + i * gap + 90}
            y1={y}
            x2={70 + (i + 1) * gap}
            y2={y}
            stroke="currentColor"
            strokeWidth="1.5"
            markerEnd="url(#rag-arrow)"
          />
        ))}
        <line
          x1={70 + 3 * gap}
          y1={y + 24}
          x2={70 + 3 * gap}
          y2={y + 80}
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1={70 + 3 * gap}
          y1={y + 80}
          x2={70 + 2 * gap + 90}
          y2={y + 80}
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#rag-arrow)"
        />
      </g>

      <defs>
        <marker
          id="rag-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="rgb(255 255 255 / 0.55)" />
        </marker>
      </defs>

      {flowStages.map((label, i) => (
        <g key={label} transform={`translate(${70 + i * gap}, ${y})`}>
          <rect
            x="-70"
            y="-22"
            width="140"
            height="44"
            fill="var(--navy-raised)"
            stroke="rgb(255 255 255 / 0.18)"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="12"
            fill="white"
          >
            {label.toUpperCase()}
          </text>
        </g>
      ))}

      <g transform={`translate(${70 + 3 * gap}, ${y + 80})`}>
        <rect
          x="-60"
          y="-20"
          width="120"
          height="40"
          fill="none"
          stroke="rgb(255 255 255 / 0.35)"
          strokeDasharray="3 3"
        />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="rgb(255 255 255 / 0.75)"
        >
          RECALL@K EVAL
        </text>
      </g>
    </svg>
  );
}

function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3">
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="flex size-8 items-center justify-center border border-hairline text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" className="size-3.5 fill-current">
          <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.7l-5.2-6.8L5.6 22H2.4l8.1-9.3L1.4 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z" />
        </svg>
      </a>
      <a
        href={liHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex size-8 items-center justify-center border border-hairline text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" className="size-3.5 fill-current">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
        </svg>
      </a>
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
        aria-label="Copy link"
        className="flex size-8 items-center justify-center border border-hairline text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
      >
        {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
      </button>
    </div>
  );
}

function BlogPostRoute() {
  const post = Route.useLoaderData();
  const shareUrl = post.canonical || buildCanonicalUrl(`/blog/${post.slug}`);

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

      <header className="mx-auto max-w-6xl px-6 pt-32 sm:px-8 sm:pt-36">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted-foreground uppercase">
          <Link to="/blog" className="text-amber-accent transition-colors hover:text-foreground">
            / Blog
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span>{post.category}</span>
        </nav>

        <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-hairline pt-5 font-mono text-xs text-muted-foreground uppercase">
          <span>{post.readingTime}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
          <span aria-hidden="true">·</span>
          <span>CuriousDevs</span>
        </div>

        <div
          className="mt-10 overflow-hidden border border-hairline bg-[var(--ink)] py-14"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="mx-auto max-w-4xl px-8">
            <RagFlowDiagram />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-12 pt-12 lg:grid-cols-[180px_minmax(0,1fr)_240px] lg:gap-16">
          {post.headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="eyebrow">On this page</p>
                <ol className="mt-4 flex flex-col gap-3">
                  {post.headings.map((h, i) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="flex gap-2 text-xs leading-snug text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                        <span>{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          )}

          <article className="min-w-0 blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          <aside className="lg:block">
            <div className="flex flex-col gap-8 lg:sticky lg:top-28">
              <div>
                <p className="eyebrow">Share</p>
                <div className="mt-4">
                  <ShareButtons url={shareUrl} title={post.title} />
                </div>
              </div>

              <div className="border-t border-hairline pt-6">
                <p className="eyebrow">Related</p>
                <ul className="mt-4 flex flex-col gap-4">
                  {(
                    [
                      { label: "Systems thinking", to: "/systems" },
                      { label: "Research areas", to: "/research" },
                      { label: "Our technology", to: "/technology" },
                    ] as const
                  ).map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="group flex items-start justify-between gap-2 text-sm font-medium tracking-tight transition-colors hover:text-amber-accent"
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-muted-foreground">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="on-dark rounded-[var(--radius-card)] border border-hairline bg-night p-6">
                <p className="text-sm font-medium tracking-tight">Have a difficult problem?</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Tell us what you're trying to build, fix or explore.
                </p>
                <Link to="/contact" className="btn-primary mt-4 w-full">
                  Start the Conversation
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
}
