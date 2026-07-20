'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const delayClass = delay ? `reveal-delay-${delay}` : ''
  return (
    <div ref={ref} className={`reveal ${delayClass} ${seen ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}
