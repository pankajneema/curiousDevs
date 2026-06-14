import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security — CuriousDevs',
  alternates: { canonical: 'https://curiousdevs.com/security' },
}

export default function Page() {
  return (
    <main>
      <section className="bg-midnight pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-head font-black text-5xl text-white mb-4">Security at CuriousDevs</h1>
          <p className="text-white/60 text-lg">Security is a first-class product requirement, not an afterthought.</p>
        </div>
      </section>
      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-5">
              <div key={"Encryption"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🔐</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Encryption</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">All data encrypted at rest with AES-256. All traffic encrypted in transit with TLS 1.3. Encryption keys rotated quarterly.</p>
                <a href="#" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"Infrastructure"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Infrastructure</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Hosted on SOC 2 Type II certified infrastructure. Regular penetration testing by third-party security firms. 99.9% uptime SLA on Pro and Enterprise plans.</p>
                <a href="#" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"Vulnerability Disclosure"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🐛</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Vulnerability Disclosure</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Found a security issue? We operate a responsible disclosure program. Email security@curiousdevs.com with details. We commit to a 72-hour initial response.</p>
                <a href="mailto:security@curiousdevs.com" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
              <div key={"Access Controls"} className="bg-white rounded-2xl border border-border p-7">
                <div className="text-3xl mb-3">🔑</div>
                <h3 className="font-head font-bold text-lg text-midnight mb-2">Access Controls</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">Role-based access control (RBAC), SSO/SAML on Enterprise, MFA on all accounts, audit logs for all admin actions.</p>
                <a href="#" className="text-coral font-semibold text-sm hover:underline">Learn more →</a>
              </div>
        </div>
      </section>
    </main>
  )
}
