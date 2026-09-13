import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { EngineeringGrid } from "@/components/landing/EngineeringGrid";
import { getAllPosts, getCategories, type BlogPost } from "@/lib/blog";
import { buildSeoHead, buildCollectionPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    buildSeoHead({
      path: "/blog",
      title: "Engineering Notes — CuriousDevs",
      description:
        "Technical notes from CuriousDevs on building intelligent systems that hold up in production.",
      keywords: ["AI engineering blog", "RAG engineering", "AI agents", "production AI"],
      ogType: "website",
    }),
  component: BlogIndexPage,
});

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy").toUpperCase()}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingTime.toUpperCase()}</span>
    </p>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group grid overflow-hidden border border-hairline sm:grid-cols-[1.1fr_1fr]"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden bg-[var(--ink)] sm:aspect-auto"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <EngineeringGrid
          seed={19}
          density="medium"
          width={500}
          height={500}
          animated={false}
          className="absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 bg-surface p-8 sm:p-10">
        <p className="font-mono text-xs tracking-wide text-amber-accent uppercase">
          01 / {post.category}
        </p>
        <h2 className="text-2xl leading-tight font-extrabold tracking-tight transition-colors group-hover:text-amber-accent sm:text-[1.75rem]">
          {post.title}
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{post.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <PostMeta post={post} />
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
        </div>
      </div>
    </Link>
  );
}

function LatestRow({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex items-baseline gap-6 border-b border-hairline py-7 first:pt-0"
    >
      <span className="w-10 shrink-0 font-mono text-2xl font-extrabold text-muted-foreground/40 tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          {post.category}
        </p>
        <h3 className="mt-1 text-lg font-bold tracking-tight transition-colors group-hover:text-amber-accent">
          {post.title}
        </h3>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
      </div>
      <div className="hidden shrink-0 flex-col items-end gap-2 text-right sm:flex">
        <PostMeta post={post} />
      </div>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
    </Link>
  );
}

function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const [active, setActive] = useState("ALL");

  const [featured, ...rest] = posts;
  const filtered =
    active === "ALL" ? rest : rest.filter((p) => p.category.toUpperCase() === active);

  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCollectionPageSchema(
              "/blog",
              "Engineering Notes — CuriousDevs",
              "Technical notes on building intelligent systems that hold up in production.",
            ),
          ),
        }}
      />
      <Nav />
      <section className="mx-auto max-w-6xl px-6 pt-32 sm:px-8 sm:pt-36">
        <p className="eyebrow text-amber-accent">Engineering notes</p>
        <div className="mt-4 flex flex-col gap-6 border-b border-hairline pb-10 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="display max-w-xl text-[clamp(2.4rem,5.5vw,4rem)]">
            Notes from the <span className="text-orange">engineering.</span>
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Technical notes on building intelligent systems that hold up in production — published
            when there is something real to say.
          </p>
        </div>

        {featured && (
          <div className="pt-10 sm:pt-12">
            <p className="eyebrow">Featured</p>
            <div className="mt-5">
              <FeaturedCard post={featured} />
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="pt-16 sm:pt-20">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
              <p className="eyebrow">Latest</p>
              {categories.length > 1 && (
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {["ALL", ...categories.map((c) => c.toUpperCase())].map((c) => (
                    <button
                      key={c}
                      onClick={() => setActive(c)}
                      className={`border px-2.5 py-1 tracking-wide transition-colors ${
                        active === c
                          ? "border-foreground bg-foreground text-background"
                          : "border-hairline text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2">
              {filtered.map((post, i) => (
                <LatestRow key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        )}

        <div className="on-dark mt-16 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border border-hairline bg-night px-8 py-10 sm:mt-20 sm:flex-row sm:items-center">
          <div>
            <p className="display text-2xl sm:text-3xl">
              Have a difficult <span className="text-orange">problem?</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us what you're trying to build, fix or explore.
            </p>
          </div>
          <Link to="/contact" className="btn-primary shrink-0">
            Start the Conversation <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <div className="mt-24 sm:mt-32">
        <Footer />
      </div>
    </main>
  );
}
