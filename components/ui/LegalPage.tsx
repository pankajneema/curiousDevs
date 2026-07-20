import type { ReactNode } from 'react'

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="max-w-[760px] mx-auto px-6 pt-24 pb-24">
      <h1 className="font-head font-bold text-4xl tracking-tight">{title}</h1>
      <p className="font-mono text-xs text-faint mt-3">Last updated: {updated}</p>
      <div className="mt-10 flex flex-col gap-6 text-[15px] leading-relaxed text-muted [&_h2]:font-head [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:text-tx [&_h2]:mt-4 [&_a]:text-accent [&_a]:underline [&_strong]:text-tx">
        {children}
      </div>
    </section>
  )
}
