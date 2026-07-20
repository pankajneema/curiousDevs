import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach the CuriosDevs team — AgentGuard early access, DPDP compliance, partnerships or investment. We respond within 24 hours.',
  alternates: { canonical: 'https://curiousdevs.com/contact' },
}

const methods = [
  { label: 'Email us', value: 'hello@curiousdevs.com', href: 'mailto:hello@curiousdevs.com', sub: 'General & product questions',
    icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" strokeLinecap="round" /></> },
  { label: 'Partnerships', value: 'partners@curiousdevs.com', href: 'mailto:partners@curiousdevs.com', sub: 'Integrations & channel',
    icon: <><path d="M4 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z" strokeLinejoin="round" /></> },
  { label: 'Based in', value: 'India · Remote-first', href: null, sub: 'Serving teams worldwide',
    icon: <><path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></> },
]

export default function ContactPage() {
  return (
    <>
      <section className="pt-24 pb-12 px-6 text-center border-b border-brd">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-p2/10 text-p2 font-mono text-xs px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-p2 animate-blink" />
            We respond within 24 hours
          </div>
          <h1 className="font-head font-bold text-4xl lg:text-6xl mb-4 tracking-tight">Let&apos;s talk.</h1>
          <p className="text-muted text-lg lg:text-xl max-w-[56ch] mx-auto">
            Building agents, facing a DPDP deadline, want to partner, invest, or join the team? Tell us what you need — we reply to every message.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {methods.map(c => (
              <div key={c.label} className="card-grad rounded-2xl p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent grid place-items-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{c.icon}</svg>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-0.5">{c.label}</p>
                  {c.href
                    ? <a href={c.href} className="font-head font-semibold text-tx hover:text-accent transition-colors">{c.value}</a>
                    : <p className="font-head font-semibold text-tx">{c.value}</p>}
                  <p className="text-xs text-muted mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
            <div className="card-grad rounded-2xl p-6 mt-1">
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-2">Careers</p>
              <h3 className="font-head font-bold text-lg mb-2">Want to build security with us?</h3>
              <p className="text-muted text-sm mb-4 leading-relaxed">We&apos;re hiring security engineers and researchers. Send your resume through the careers page.</p>
              <a href="/careers" className="inline-block px-5 py-2.5 bg-gradient-to-br from-accent to-accent-deep text-ink font-semibold rounded-xl text-sm hover:brightness-110 transition-all">
                See open roles →
              </a>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
