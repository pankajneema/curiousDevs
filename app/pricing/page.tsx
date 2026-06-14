import type { Metadata } from 'next'
import Pricing from '@/components/home/Pricing'

export const metadata: Metadata = {
  title: 'Pricing — CuriousDevs TokenFin',
  description: 'Simple, transparent pricing for TokenFin. Start free, scale as you grow. Starter $0, Pro $39/mo, Enterprise custom.',
  alternates: { canonical: 'https://curiousdevs.com/pricing' },
}

export default function PricingPage() {
  return (
    <main className="pt-24">
      <div className="bg-midnight py-16 px-6 text-center">
        <h1 className="font-head font-black text-5xl text-white mb-3">Simple pricing.</h1>
        <p className="text-white/60 text-lg">Start free. No credit card. Scale when you&apos;re ready.</p>
      </div>
      <Pricing />
      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-head font-bold text-2xl text-midnight mb-3">Questions about pricing?</h2>
          <p className="text-sub mb-6">We&apos;re happy to walk through the right plan for your team.</p>
          <a href="mailto:hello@curiousdevs.com?subject=Pricing Question"
            className="inline-block px-8 py-3 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl transition-all">
            Talk to us →
          </a>
        </div>
      </section>
    </main>
  )
}
