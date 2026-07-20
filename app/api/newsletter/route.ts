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
          <p style="color:#0B0E15;font-size:15px">Welcome aboard!</p>
          <p style="color:#6B7280;line-height:1.7">You've subscribed to The Autonomous Brief from CuriosDevs. Here's what you'll get:</p>
          <ul style="color:#6B7280;line-height:1.8;padding-left:20px">
            <li><strong style="color:#0B0E15">Agent security deep-dives</strong> — prompt injection, MCP, real attack chains</li>
            <li><strong style="color:#0B0E15">DPDP readiness</strong> — India's data-protection deadline, explained</li>
            <li><strong style="color:#0B0E15">The autonomous frontier</strong> — where agents, data and machines are heading</li>
            <li><strong style="color:#0B0E15">Building in public</strong> — what we're shipping at CuriosDevs</li>
          </ul>
          <div style="background:#F3F6FB;border-radius:10px;padding:20px;margin:24px 0">
            <p style="color:#0B0E15;font-weight:600;margin:0 0 8px;font-size:14px">While you're here →</p>
            <p style="color:#6B7280;margin:0;font-size:13px">AgentGuard is entering early access — the open-source firewall for AI agents. <a href="https://curiousdevs.com" style="color:#2E9BD8;font-weight:600">Join the waitlist</a></p>
          </div>
          <p style="color:#6B7280">— The CuriosDevs team</p>
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
