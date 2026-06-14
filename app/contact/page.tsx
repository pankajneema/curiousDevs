import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — CuriousDevs',
  description: 'Reach the CuriousDevs team. We respond within 24 hours.',
  alternates: { canonical: 'https://curiousdevs.com/contact' },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="bg-midnight pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}/>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal/20 text-teal font-mono text-xs px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse"/>
            We respond within 24 hours
          </div>
          <h1 className="font-head font-black text-5xl lg:text-6xl text-white mb-4">Let&apos;s talk.</h1>
          <p className="text-white/60 text-xl">
            Whether you&apos;re evaluating TokenFin, exploring a partnership, or just want to say hi — we&apos;re a reply away.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">

          {/* Left — contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Direct contact cards */}
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: 'Email us',
                value: 'hello@curiousdevs.com',
                href: 'mailto:hello@curiousdevs.com',
                sub: 'General & product questions',
                color: 'text-teal',
                bg: 'bg-teal/10',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                ),
                label: 'Call us',
                value: '+91 8171268630',
                href: 'tel:+918171268630',
                sub: 'Mon–Fri, 10am–6pm IST',
                color: 'text-coral',
                bg: 'bg-coral/10',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: 'Location',
                value: 'India',
                href: null,
                sub: 'Serving teams worldwide',
                color: 'text-[#8B5CF6]',
                bg: 'bg-[#8B5CF6]/10',
              },
            ].map(c => (
              <div key={c.label} className="bg-white rounded-2xl border border-border p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.color} flex items-center justify-center shrink-0`}>
                  {c.icon}
                </div>
                <div>
                  <p className="font-mono text-[10px] text-sub uppercase tracking-widest mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className={`font-head font-semibold text-midnight hover:${c.color} transition-colors`}>
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-head font-semibold text-midnight">{c.value}</p>
                  )}
                  <p className="text-xs text-sub mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}

            {/* Enterprise CTA */}
            <div className="bg-midnight rounded-2xl p-6 mt-2">
              <p className="font-mono text-[10px] text-coral uppercase tracking-widest mb-2">Enterprise</p>
              <h3 className="font-head font-bold text-lg text-white mb-2">Need a custom deal?</h3>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">
                Custom SLA, SSO, on-prem deployment, or volume pricing — our enterprise team can put together a proposal within 24 hours.
              </p>
              <a href="mailto:hello@curiousdevs.com?subject=Enterprise%20Inquiry"
                className="inline-block px-5 py-2.5 bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl text-sm transition-all">
                Email enterprise sales →
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
