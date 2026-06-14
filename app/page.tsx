import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Products from '@/components/home/Products'
import Platform from '@/components/home/Platform'
import HowItWorks from '@/components/home/HowItWorks'
import Integrations from '@/components/home/Integrations'
import WhyUs from '@/components/home/WhyUs'
import Pricing from '@/components/home/Pricing'
import FAQ from '@/components/home/FAQ'
import Newsletter from '@/components/home/Newsletter'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = {
  title: 'CuriousDevs — LLM Cost Attribution & AI Governance Platform',
  description: 'TokenFin gives AI teams real-time cost attribution, model analytics, and budget guardrails. Cut your LLM bill by 20–40% in week one. Free to start.',
  openGraph: {
    title: 'CuriousDevs — LLM FinOps & AI Governance',
    description: 'Token-level cost attribution for every LLM call. Built for AI teams that want to scale without surprises.',
    url: 'https://curiousdevs.com',
    siteName: 'CuriousDevs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CuriousDevs — LLM Cost Attribution',
    description: 'Cut your AI bill 20-40% with token-level cost attribution. Free to start.',
  },
  alternates: { canonical: 'https://curiousdevs.com' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Products />
      <Platform />
      <HowItWorks />
      <Integrations />
      <WhyUs />
      <Pricing />
      <FAQ />
      <Newsletter />
      <CTA />
    </>
  )
}
