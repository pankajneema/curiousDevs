import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of the CuriosDevs website and products.',
  alternates: { canonical: 'https://curiousdevs.com/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 2026">
      <p>These terms govern your use of the CuriosDevs website and any products or services we make available. By using the site you agree to them.</p>

      <div><h2>Use of the site</h2>
      <p>You may use this site for lawful purposes only. You agree not to misuse it, attempt to disrupt it, or access it in any way that breaches applicable law.</p></div>

      <div><h2>Products &amp; early access</h2>
      <p>Some products (such as AgentGuard) are in development or early access. Features, availability and pricing may change. Open-source components are provided under their stated licenses.</p></div>

      <div><h2>Intellectual property</h2>
      <p>All content on this site, other than open-source code under its own license, is owned by CuriosDevs Technologies Pvt Ltd and may not be reproduced without permission.</p></div>

      <div><h2>Disclaimer</h2>
      <p>The site is provided &quot;as is&quot; without warranties of any kind. To the extent permitted by law, CuriosDevs is not liable for any damages arising from its use.</p></div>

      <div><h2>Contact</h2>
      <p>Questions about these terms? Write to <a href="mailto:hello@curiousdevs.com">hello@curiousdevs.com</a>.</p></div>

      <p className="text-faint text-xs">This is a summary for an early-stage product. Full, counsel-reviewed terms will replace it before general availability.</p>
    </LegalPage>
  )
}
