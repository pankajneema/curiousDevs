export const SITE_NAME = "CuriousDevs";
export const SITE_DOMAIN = "https://www.curiousdevs.com";
export const SITE_DESCRIPTION =
  "CuriousDevs researches, engineers and builds intelligent systems — from production AI and automation to the technologies that connect intelligence with the physical world.";
export const DEFAULT_IMAGE = `${SITE_DOMAIN}/og-image.jpg`;
export const DEFAULT_KEYWORDS = [
  "intelligent systems",
  "AI engineering",
  "production AI",
  "RAG",
  "AI agents",
  "agentic automation",
  "AI evaluation",
  "AI security",
  "computer vision",
  "edge AI",
  "robotics research",
  "Janus intelligent systems platform",
];

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type SeoPageOptions = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogType?: string;
  robots?: string;
  image?: string;
  locale?: string;
  siteName?: string;
  author?: string;
  publisher?: string;
  article?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  canonicalUrl?: string;
};

export function buildCanonicalUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_DOMAIN}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function buildSeoHead(options: SeoPageOptions) {
  const {
    path,
    title,
    description,
    keywords = DEFAULT_KEYWORDS,
    ogType = "website",
    robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    image = DEFAULT_IMAGE,
    locale = "en",
    siteName = SITE_NAME,
    author = SITE_NAME,
    publisher = SITE_NAME,
    article = false,
    canonicalUrl,
  } = options;

  const canonical = canonicalUrl || buildCanonicalUrl(path);
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "keywords", content: [...keywords].join(", ") },
      { name: "robots", content: robots },
      { name: "googlebot", content: robots },
      { name: "author", content: author },
      { name: "publisher", content: publisher },
      { name: "language", content: locale },
      { name: "theme-color", content: "#050a12" },
      { name: "color-scheme", content: "light" },
      { name: "application-name", content: siteName },
      { name: "apple-mobile-web-app-title", content: siteName },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: siteName },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: fullTitle },
      { property: "og:locale", content: locale },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      article ? { property: "article:publisher", content: publisher } : undefined,
      article ? { property: "article:author", content: author } : undefined,
    ].filter(Boolean),
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", href: canonical, hrefLang: "en" },
      { rel: "alternate", href: canonical, hrefLang: "x-default" },
      { rel: "alternate", href: `${SITE_DOMAIN}/rss.xml`, type: "application/rss+xml" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/brand/curiousdevs-mark-128.png", type: "image/png", sizes: "128x126" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "preload",
        href: "/fonts/inter-400.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "preload",
        href: "/fonts/inter-500.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "preload",
        href: "/fonts/inter-600.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "preload",
        href: "/fonts/inter-700.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "preload",
        href: "/fonts/jetbrains-mono-400.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "preload",
        href: "/fonts/jetbrains-mono-700.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous" as const,
      },
    ],
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_DOMAIN}/#organization`,
    name: SITE_NAME,
    url: SITE_DOMAIN,
    logo: `${SITE_DOMAIN}/favicon.svg`,
    email: "hello@curiousdevs.com",
    description: SITE_DESCRIPTION,
    knowsAbout: [
      "Intelligent systems",
      "AI engineering",
      "Production AI systems",
      "Retrieval-augmented generation",
      "AI agents",
      "AI evaluation",
      "AI security",
      "Computer vision",
      "Edge AI",
      "Robotics",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "general inquiries",
      email: "hello@curiousdevs.com",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    foundingDate: "2026",
    keywords: DEFAULT_KEYWORDS.join(", "),
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_DOMAIN}/#website`,
    name: SITE_NAME,
    url: SITE_DOMAIN,
    inLanguage: "en",
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_DOMAIN}/#organization`,
    },
  };
}

export function buildWebPageSchema(path: string, title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: buildCanonicalUrl(path),
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_DOMAIN}/#website` },
    about: { "@id": `${SITE_DOMAIN}/#organization` },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: buildCanonicalUrl(item.href),
    })),
  };
}

export function buildFaqSchema(questionAnswers: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questionAnswers.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function buildHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildArticleSchema(
  path: string,
  title: string,
  description: string,
  datePublished: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: buildCanonicalUrl(path),
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@id": `${SITE_DOMAIN}/#organization`,
    },
    mainEntityOfPage: buildCanonicalUrl(path),
  };
}

export function buildPersonSchema(name: string, jobTitle: string, sameAs: string[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    sameAs,
  };
}

export function buildCollectionPageSchema(path: string, title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url: buildCanonicalUrl(path),
    description,
  };
}

export function buildBlogPostingSchema(
  path: string,
  title: string,
  description: string,
  datePublished: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: buildCanonicalUrl(path),
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@id": `${SITE_DOMAIN}/#organization`,
    },
    mainEntityOfPage: buildCanonicalUrl(path),
  };
}

export function buildTechArticleSchema(
  path: string,
  title: string,
  description: string,
  datePublished: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: buildCanonicalUrl(path),
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@id": `${SITE_DOMAIN}/#organization`,
    },
  };
}
