import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCoverIllustration } from "@/components/blog/BlogCoverIllustration";
import { BlogSubscribeCard } from "@/components/blog/BlogSubscribeCard";
import { blogPosts } from "@/content/blogs";

export default function Blog() {
  const [featuredPost, ...otherPosts] = blogPosts;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <section className="section-container">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Cybersecurity Blog
          </div>

          {featuredPost && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] items-start">
              <article className="group overflow-hidden rounded-2xl border border-border/80 bg-card card-glow">
                <Link to={`/blog/${featuredPost.slug}`} className="block">
                  <div className="relative">
                    {featuredPost.coverImage ? (
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.coverAlt}
                        className="w-full h-[280px] sm:h-[360px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-[280px] sm:h-[360px]">
                        <BlogCoverIllustration title={featuredPost.coverAlt} theme={featuredPost.coverTheme} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                      <span className="inline-flex rounded-full border border-primary/30 bg-primary/15 text-primary px-3 py-1 text-xs font-medium mb-3">
                        {featuredPost.category}
                      </span>
                      <h2 className="text-xl sm:text-2xl lg:text-[30px] leading-tight font-semibold max-w-3xl">
                        {featuredPost.title}
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="inline-flex items-center gap-2 text-primary font-medium mt-4">
                        Read full article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>

              <BlogSubscribeCard />
            </div>
          )}

          {otherPosts.length > 0 && (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {otherPosts.map((post) => (
                <article key={post.slug} className="rounded-2xl border border-border/80 bg-card overflow-hidden hover:border-primary/35 transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.coverAlt} className="h-48 w-full object-cover" loading="lazy" />
                    ) : (
                      <BlogCoverIllustration title={post.coverAlt} theme={post.coverTheme} />
                    )}
                    <div className="p-7">
                      <span className="inline-flex rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
