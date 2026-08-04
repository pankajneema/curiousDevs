export const SITE_NAME = "CuriousDevs";
export const SITE_DOMAIN = "https://curiousdevs.com";
export const SITE_DESCRIPTION =
  "CuriousDevs builds the accountability layer for autonomous systems: runtime enforcement, compliance evidence, and fleet governance for AI agents and machines.";
export const DEFAULT_IMAGE = `${SITE_DOMAIN}/og-image.jpg`;
export const DEFAULT_KEYWORDS = [
  "AI security",
  "autonomous systems",
  "agent runtime control",
  "compliance automation",
  "DPDP",
  "AI governance",
  "agent guard",
  "curiocomply",
  "aeroos",
  "LLM security",
  "machine fleet security",
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
  } = options;

  const canonical = buildCanonicalUrl(path);
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
      { name: "theme-color", content: "#ffffff" },
      { name: "color-scheme", content: "light dark" },
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
      { name: "twitter:site", content: "@curiousdevs" },
      { name: "twitter:creator", content: "@curiousdevs" },
      article ? { property: "article:publisher", content: publisher } : undefined,
      article ? { property: "article:author", content: author } : undefined,
    ].filter(Boolean),
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", href: canonical, hreflang: "en" },
      { rel: "alternate", href: canonical, hreflang: "x-default" },
      { rel: "alternate", href: `${SITE_DOMAIN}/rss.xml`, type: "application/rss+xml" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://www.google-analytics.com" },
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
      { rel: "preload", href: "/fonts/inter-400.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/inter-500.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/inter-600.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/inter-700.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/jetbrains-mono-400.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/jetbrains-mono-700.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_DOMAIN,
    logo: `${SITE_DOMAIN}/favicon.svg`,
    email: "hello@curiousdevs.com",
    sameAs: ["https://www.linkedin.com/", "https://github.com/"],
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
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
    name: SITE_NAME,
    url: SITE_DOMAIN,
    inLanguage: "en",
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_DOMAIN}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_DOMAIN}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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

export function buildSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AgentGuard",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web, Linux, macOS, Windows",
    description:
      "A runtime control plane for AI agents and autonomous tools that enforces deterministic policy before execution.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function buildProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "CuriousDevs Security Platform",
    description: SITE_DESCRIPTION,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: "AI security and compliance software",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
    },
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

export function buildHowToSchema(name: string, description: string, steps: Array<{ name: string; text: string }>) {
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

export function buildArticleSchema(path: string, title: string, description: string, datePublished: string) {
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

export function buildTechArticleSchema(path: string, title: string, description: string, datePublished: string) {
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
