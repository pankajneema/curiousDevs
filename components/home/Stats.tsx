import Reveal from '@/components/ui/Reveal'

const stats = [
  { b: '45:1', s: 'agents-to-humans in the cloud' },
  { b: '₹250cr', s: 'DPDP penalty per violation' },
  { b: '$44B', s: 'India cyber market by 2034' },
  { b: '3', s: 'products · 1 security core' },
]

export default function Stats() {
  return (
    <div className="border-y border-brd bg-ink-2">
      <div className="max-w-content mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
        {stats.map((s, i) => (
          <Reveal key={s.b} delay={(i % 4) as 0 | 1 | 2 | 3} className="text-center md:text-left">
            <span className="block font-head font-bold text-3xl md:text-4xl tracking-tight bg-gradient-to-br from-tx to-accent bg-clip-text text-transparent">
              {s.b}
            </span>
            <span className="text-[13px] text-muted font-mono">{s.s}</span>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
