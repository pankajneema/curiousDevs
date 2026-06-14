import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TawkToChat from '@/components/TawkToChat'

const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', display: 'swap', preload: false })
const inter   = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', preload: false })
const mono    = Space_Mono({ subsets: ['latin'], weight: ['400','700'], variable: '--font-mono', display: 'swap', preload: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://curiousdevs.com'),
  title: { default: 'CuriousDevs — AI Infrastructure for the Production Era', template: '%s | CuriousDevs' },
  description: 'CuriousDevs builds AI infrastructure products enterprises need. TokenFin for LLM cost attribution. AgentOS for enterprise AI agent governance.',
  keywords: ['LLM cost attribution', 'AI FinOps', 'TokenFin', 'AgentOS', 'AI agent governance', 'LLMOps', 'AI observability'],
  authors: [{ name: 'CuriousDevs', url: 'https://curiousdevs.com' }],
  creator: 'CuriousDevs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://curiousdevs.com',
    siteName: 'CuriousDevs',
    title: 'CuriousDevs — AI Infrastructure for the Production Era',
    description: 'LLM cost visibility. AI agent governance. The infrastructure layer the AI era is missing.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CuriousDevs — AI Infrastructure for the Production Era',
    description: 'LLM cost visibility. AI agent governance.',
    creator: '@curiousdevs',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://curiousdevs.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}>
      <body className="font-body bg-surface text-midnight antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <TawkToChat />
      </body>
    </html>
  )
}
