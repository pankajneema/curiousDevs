import type { MetadataRoute } from 'next'

const SITE = 'https://curiousdevs.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = [
    { path: '/', priority: 1.0, freq: 'weekly' as const },
    { path: '/careers', priority: 0.8, freq: 'weekly' as const },
    { path: '/contact', priority: 0.7, freq: 'monthly' as const },
    { path: '/privacy', priority: 0.3, freq: 'yearly' as const },
    { path: '/terms', priority: 0.3, freq: 'yearly' as const },
    { path: '/security', priority: 0.4, freq: 'yearly' as const },
  ]
  return routes.map(r => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
