import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { supabaseAdmin } from '@/lib/supabase'

function getTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_SERVER  || 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, company, type } = body

    if (!email)
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })

    const listType = type || 'newsletter'

    // ── 1. Store in Supabase (upsert — safe for re-subscribes) ─
    const { error: dbError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .upsert(
        { email, company: company || null, type: listType, active: true },
        { onConflict: 'email' }
      )

    if (dbError) console.error('[Newsletter] DB upsert failed (non-fatal):', dbError.message)

    // ── 2. Send via Gmail SMTP ────────────────────────────────
    const fromEmail = process.env.SMTP_EMAIL
    const toEmail   = process.env.CONTACT_EMAIL || 'pankaj200321@gmail.com'

    if (fromEmail && process.env.SMTP_PASSWORD) {
      const transporter = getTransporter()

      const welcomeHtml = `
        <div style="font-family:sans-serif;max-width:540px;margin:0 auto">
          <div style="background:#1A1A2E;padding:32px 24px;border-radius:12px;text-align:center;margin-bottom:28px">
            <h2 style="color:#fff;margin:0 0 4px;font-size:20px">You're in! 🎉</h2>
            <p style="color:rgba(255,255,255,0.55);margin:0;font-size:13px">CuriousDevs newsletter</p>
          </div>
          <p style="color:#1A1A2E;font-size:15px">Welcome aboard!</p>
          <p style="color:#6B6B8A;line-height:1.7">You've subscribed to the CuriousDevs newsletter. Here's what you'll get:</p>
          <ul style="color:#6B6B8A;line-height:1.8;padding-left:20px">
            <li><strong style="color:#1A1A2E">Monthly deep-dives</strong> on LLM FinOps and cost optimisation</li>
            <li><strong style="color:#1A1A2E">Model benchmarks</strong> — real workloads, real numbers</li>
            <li><strong style="color:#1A1A2E">AI governance updates</strong> — EU AI Act, compliance engineering</li>
            <li><strong style="color:#1A1A2E">Building in public</strong> — what we're shipping at CuriousDevs</li>
          </ul>
          <p style="color:#6B6B8A;line-height:1.7">First issue drops soon. Check out our latest posts on the <a href="https://curiousdevs.com/blog" style="color:#E8533A;font-weight:600">blog</a>.</p>
          <div style="background:#F9F8F5;border-radius:10px;padding:20px;margin:24px 0">
            <p style="color:#1A1A2E;font-weight:600;margin:0 0 8px;font-size:14px">While you're here →</p>
            <p style="color:#6B6B8A;margin:0;font-size:13px">TokenFin is live in private beta — LLM cost attribution for AI teams. Free plan, no credit card. <a href="https://tokenfin.curiousdevs.com" style="color:#E8533A;font-weight:600">Try it now</a></p>
          </div>
          <p style="color:#6B6B8A">— Pankaj, CuriousDevs</p>
          <hr style="border:none;border-top:1px solid #E8E6E0;margin:24px 0"/>
          <p style="font-size:11px;color:#aaa;text-align:center">CuriousDevs · hello@curiousdevs.com · curiousdevs.com</p>
        </div>`

      await Promise.all([
        transporter.sendMail({
          from:    `"CuriousDevs Website" <${fromEmail}>`,
          to:      toEmail,
          subject: `[Newsletter] New subscriber: ${email}`,
          html:    `<p>New subscriber: <strong>${email}</strong>${company ? ` (${company})` : ''}<br/>Type: ${listType}</p>`,
        }),
        transporter.sendMail({
          from:    `"CuriousDevs" <${fromEmail}>`,
          to:      email,
          subject: "You're subscribed to CuriousDevs — welcome!",
          html:    welcomeHtml,
        }),
      ])
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
