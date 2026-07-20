import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function CTA() {
  return (
    <section className="border-t border-brd bg-gradient-to-b from-ink to-ink-2">
      <div className="max-w-content mx-auto px-6 py-24 text-center">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Ship agents you can trust</span>
          <h2 className="font-head font-bold text-3xl md:text-5xl mt-4 max-w-[18ch] mx-auto tracking-tight">
            Your machines are already acting. Start watching them today.
          </h2>
          <p className="text-muted max-w-[52ch] mx-auto mt-5 text-[17px]">
            Get early access to AgentGuard, or talk to us about DPDP compliance and autonomous fleets.
          </p>
          <div className="flex gap-3.5 justify-center mt-9 flex-wrap">
            <Link href="/contact" className="px-6 py-3.5 bg-gradient-to-br from-accent to-accent-deep text-ink text-sm font-semibold rounded-xl hover:brightness-110 hover:-translate-y-0.5 transition-all">
              Get early access →
            </Link>
            <Link href="/careers" className="px-6 py-3.5 bg-white/[0.04] border border-brd-2 text-tx text-sm font-semibold rounded-xl hover:border-accent hover:text-accent transition-all">
              Join the team
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
