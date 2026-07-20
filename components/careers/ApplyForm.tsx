'use client'
import { useRef, useState } from 'react'

export default function ApplyForm({ roles }: { roles: string[] }) {
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [fileName, setFileName] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const email = String(fd.get('email') || '')
    const file = fd.get('resume') as File | null
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState('error'); setMsg('Please enter a valid email.'); return }
    if (!file || file.size === 0) { setState('error'); setMsg('Please attach your resume (PDF or DOC).'); return }
    if (file.size > 8 * 1024 * 1024) { setState('error'); setMsg('Resume is too large (max 8 MB).'); return }

    setState('loading'); setMsg('')
    try {
      const res = await fetch('/api/careers', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setState('ok'); setMsg('Application received — we&apos;ll be in touch soon.')
      form.reset(); setFileName('')
    } catch { setState('error'); setMsg('Something went wrong. Email careers@curiousdevs.com and we&apos;ll sort it.') }
  }

  if (state === 'ok') {
    return (
      <div className="card-grad rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-p2/10 text-p2 grid place-items-center mx-auto mb-4">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="font-head font-semibold text-xl">Application received!</h3>
        <p className="text-muted text-sm mt-2">Thanks — we read every application and reply. Keep an eye on your inbox.</p>
      </div>
    )
  }

  const inputCls = 'w-full bg-ink border border-brd-2 rounded-xl px-4 py-3 text-sm text-tx outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition'
  const labelCls = 'font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5 block'

  return (
    <form onSubmit={submit} className="card-grad rounded-2xl p-7 md:p-8 flex flex-col gap-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="ap-name">Full name</label>
          <input id="ap-name" name="name" required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="ap-email">Email</label>
          <input id="ap-email" name="email" type="email" required placeholder="you@email.com" className={inputCls} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="ap-role">Role</label>
          <select id="ap-role" name="role" className={inputCls} defaultValue={roles[0]}>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="ap-exp">Years of experience</label>
          <select id="ap-exp" name="experience" className={inputCls} defaultValue="3–5 years">
            {['0–1 years', '1–3 years', '3–5 years', '5–8 years', '8+ years'].map(x => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="ap-links">LinkedIn / GitHub (optional)</label>
        <input id="ap-links" name="links" placeholder="github.com/you · linkedin.com/in/you" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Resume (PDF or DOC, max 8&nbsp;MB)</label>
        <input ref={fileRef} id="ap-resume" name="resume" type="file" accept=".pdf,.doc,.docx" required
          onChange={e => setFileName(e.target.files?.[0]?.name || '')} className="hidden" />
        <button type="button" onClick={() => fileRef.current?.click()}
          className="w-full flex items-center gap-3 bg-ink border border-dashed border-brd-2 rounded-xl px-4 py-3.5 text-sm text-muted hover:border-accent hover:text-accent transition text-left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 16V4M6 10l6-6 6 6M4 20h16" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {fileName || 'Click to upload your resume'}
        </button>
      </div>

      <div>
        <label className={labelCls} htmlFor="ap-msg">Why security? (optional)</label>
        <textarea id="ap-msg" name="message" rows={3} placeholder="A line or two about what draws you to security work…" className={inputCls} />
      </div>

      <button type="submit" disabled={state === 'loading'}
        className="py-3.5 bg-gradient-to-br from-accent to-accent-deep text-ink text-sm font-semibold rounded-xl hover:brightness-110 transition disabled:opacity-60">
        {state === 'loading' ? 'Submitting…' : 'Submit application →'}
      </button>
      {state === 'error' && <p className="text-p3 font-mono text-xs text-center">{msg}</p>}
    </form>
  )
}
