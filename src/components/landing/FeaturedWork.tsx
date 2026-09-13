import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { EngineeringGrid } from "./EngineeringGrid";

export function FeaturedWork() {
  const posts = getAllPosts().slice(0, 2);

  return (
    <section className="border-b border-hairline py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-amber-accent">Featured work</p>
            <h2 className="mt-4 text-[clamp(2.2rem,5.5vw,3.75rem)] leading-[1] font-extrabold tracking-[-0.03em]">
              Real problems. Real systems.
            </h2>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-accent hover:text-foreground"
          >
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          A selection of systems, experiments, and engineering work across AI and intelligent
          technology. No public customer case studies yet — the founding cohort is still in
          progress, and we don't publish results without permission.
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-none border border-hairline bg-[var(--hairline)] md:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="cell-hover group flex flex-col bg-surface"
            >
              <div className="relative h-28 overflow-hidden border-b border-hairline bg-[var(--near-black)]">
                <EngineeringGrid
                  seed={200 + i}
                  density="medium"
                  width={600}
                  height={280}
                  className="absolute inset-0 h-full w-full opacity-80"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                  {post.category} · Engineering note
                </p>
                <h3 className="text-sm font-bold tracking-tight transition-colors group-hover:text-amber-accent">
                  {post.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <ArrowRight className="mt-auto size-4 pt-2 text-muted-foreground transition-colors group-hover:text-amber-accent" />
              </div>
            </Link>
          ))}

          <Link to="/janus" className="cell-hover group flex flex-col bg-surface">
            <div className="relative h-28 overflow-hidden border-b border-hairline bg-[var(--near-black)]">
              <EngineeringGrid
                seed={210}
                density="medium"
                width={600}
                height={280}
                className="absolute inset-0 h-full w-full opacity-80"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                Proprietary technology · In development
              </p>
              <h3 className="text-sm font-bold tracking-tight transition-colors group-hover:text-amber-accent">
                Janus — built on our own methodology
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                The same evaluation and production discipline we bring to client work, applied to
                our own technology.
              </p>
              <ArrowRight className="mt-auto size-4 pt-2 text-muted-foreground transition-colors group-hover:text-amber-accent" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
