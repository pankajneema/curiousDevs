import { Marked } from "marked";

const PRODUCT_SERVICE_SLUGS = ["build", "audit", "fix", "scale"] as const;
export type ProductServiceSlug = (typeof PRODUCT_SERVICE_SLUGS)[number];

export type BlogHeading = { id: string; text: string };

export type BlogPostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: string;
  targetQuery: string;
  canonical: string;
  service: ProductServiceSlug;
};

export type BlogPost = BlogPostFrontmatter & {
  html: string;
  readingTime: string;
  headings: BlogHeading[];
};

const WORDS_PER_MINUTE = 200;

function computeReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return minutes;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/**
 * Flat frontmatter only (string key/value pairs) — this repo's posts never
 * need lists or nested YAML, so a full YAML parser (and the Buffer usage
 * gray-matter drags in, which breaks once this module lands in the client
 * bundle for hydration) isn't worth the dependency.
 */
function parseFrontmatter(source: string): { data: Record<string, string>; content: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: source };

  const [, frontmatterBlock, content] = match;
  const data: Record<string, string> = {};

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    if (key) data[key] = stripQuotes(value);
  }

  return { data, content };
}

/**
 * A fresh Marked instance per post rather than the module-level singleton —
 * the renderer needs to collect h2 headings (for the sticky TOC) as a side
 * effect of parsing, and per-instance state keeps that from leaking across
 * posts if this ever runs concurrently.
 */
function renderMarkdown(content: string): { html: string; headings: BlogHeading[] } {
  const headings: BlogHeading[] = [];
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth, text }) {
        const id = slugify(text);
        if (depth === 2) headings.push({ id, text });
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });
  const html = marked.parse(content, { async: false }) as string;
  return { html, headings };
}

const rawPosts = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parsePost(source: string, filePath: string): BlogPost {
  const { data, content } = parseFrontmatter(source);

  if (!data.title || !data.slug || !data.description || !data.date || !data.service) {
    throw new Error(
      `Blog post ${filePath} is missing required frontmatter (title, slug, description, date, service).`,
    );
  }

  if (!PRODUCT_SERVICE_SLUGS.includes(data.service as ProductServiceSlug)) {
    throw new Error(
      `Blog post ${filePath} has an invalid "service" value: "${data.service}". Must be one of ${PRODUCT_SERVICE_SLUGS.join(", ")}.`,
    );
  }

  const { html, headings } = renderMarkdown(content);
  const minutes = computeReadingTime(content);

  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    date: data.date,
    category: data.category || "Notes",
    targetQuery: data.targetQuery ?? "",
    canonical: data.canonical ?? "",
    service: data.service as ProductServiceSlug,
    html,
    headings,
    readingTime: `${minutes} min read`,
  };
}

const allPosts: BlogPost[] = Object.entries(rawPosts)
  .map(([filePath, source]) => parsePost(source, filePath))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(allPosts.map((post) => post.category)));
}
