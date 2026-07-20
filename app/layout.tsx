import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', display: 'swap', preload: false })
const inter   = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', preload: false })
const mono    = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-mono', display: 'swap', preload: false })

const SITE = 'https://curiousdevs.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'CuriosDevs — Securing the Autonomous Future',
    template: '%s | CuriosDevs',
  },
  description:
    'CuriosDevs builds the accountability layer for autonomous systems — from AI agents to physical machines. AgentGuard secures AI agents, CurioComply automates DPDP compliance, AeroOS orchestrates autonomous fleets.',
  keywords: [
    'AI agent security', 'AgentGuard', 'prompt injection', 'MCP security',
    'agent firewall', 'DPDP compliance', 'CurioComply', 'AeroOS',
    'autonomous systems security', 'AI governance', 'CuriosDevs',
  ],
  authors: [{ name: 'CuriosDevs', url: SITE }],
  creator: 'CuriosDevs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE,
    siteName: 'CuriosDevs',
    title: 'CuriosDevs — Securing the Autonomous Future',
    description: 'The accountability layer for autonomous systems — from AI agents to physical machines.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CuriosDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CuriosDevs — Securing the Autonomous Future',
    description: 'Security for AI agents, DPDP compliance automation, and autonomous fleet orchestration.',
    creator: '@curiosdevs',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: SITE },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CuriosDevs',
  url: SITE,
  description: 'The accountability layer for autonomous systems — from AI agents to physical machines.',
  sameAs: ['https://github.com/curiosdevs', 'https://x.com/curiosdevs', 'https://linkedin.com/company/curiosdevs'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <meta name="theme-color" content="#07090E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-body bg-ink text-tx antialiased">
        <div className="aurora" aria-hidden="true">
          <span className="b1 animate-drift1" />
          <span className="b2 animate-drift2" />
          <span className="b3 animate-drift3" />
        </div>
        <div className="grid-tex" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
