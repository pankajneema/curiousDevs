import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { getAllPosts } from "@/lib/blog";
import { buildSeoHead, buildCollectionPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    buildSeoHead({
      path: "/blog",
      title: "Blog — AI Engineering Notes | CuriousDevs",
      description:
        "Technical notes on building, auditing, and scaling AI systems in production, from the CuriousDevs engineering team.",
      keywords: ["AI engineering blog", "RAG engineering", "AI agents", "production AI"],
      ogType: "website",
    }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCollectionPageSchema(
              "/blog",
              "Blog — AI Engineering Notes",
              "Technical notes on building, auditing, and scaling AI systems in production.",
            ),
          ),
        }}
      />
      <Nav />
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-36 sm:px-8 sm:pb-32">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2 text-amber-accent">
            <span className="live-dot inline-block size-1.5 rounded-none bg-amber-accent" />
            Blog
          </p>
          <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
            AI engineering notes.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Technical notes on building, auditing, and scaling AI systems in production.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)]">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="cell-hover group flex flex-col gap-1 bg-surface p-6 sm:flex-row sm:items-baseline sm:gap-6 sm:p-8"
            >
              <span className="font-mono text-xs text-amber-accent sm:w-10 sm:shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="eyebrow flex items-center gap-2 text-muted-foreground">
                  <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-amber-accent sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
