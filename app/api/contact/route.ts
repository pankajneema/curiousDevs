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
    const { name, email, message, subject, company } = body

    if (!name || !email || !message)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    if (message.length > 5000)
      return NextResponse.json({ error: 'Message too long' }, { status: 400 })

    // ── 1. Store in Supabase ──────────────────────────────────
    const { error: dbError } = await supabaseAdmin
      .from('contact_submissions')
      .insert({ name, email, company: company || null, subject: subject || null, message })

    if (dbError) console.error('[Contact] DB insert failed (non-fatal):', dbError.message)

    // ── 2. Send via Gmail SMTP ────────────────────────────────
    const fromEmail = process.env.SMTP_EMAIL
    const toEmail   = process.env.CONTACT_EMAIL || 'pankaj200321@gmail.com'

    if (fromEmail && process.env.SMTP_PASSWORD) {
      const transporter = getTransporter()

      const teamHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#1A1A2E;margin-bottom:16px">📬 New contact form submission</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6B6B8A;width:110px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6B6B8A">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#E8533A">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;color:#6B6B8A">Company</td><td style="padding:8px 0">${company}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#6B6B8A">Topic</td><td style="padding:8px 0">${subject || 'General enquiry'}</td></tr>
            <tr><td style="padding:8px 0;color:#6B6B8A;vertical-align:top">Message</td><td style="padding:8px 0;white-space:pre-wrap;line-height:1.6">${message}</td></tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #E8E6E0"/>
          <p style="font-size:11px;color:#aaa">Submitted via curiousdevs.com/contact · Reply directly to this email</p>
        </div>`

      const userHtml = `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#1A1A2E;padding:32px 24px;border-radius:12px;text-align:center;margin-bottom:28px">
            <h2 style="color:#fff;margin:0 0 6px;font-size:20px">Thanks, ${name.split(' ')[0]}! 👋</h2>
            <p style="color:rgba(255,255,255,0.55);margin:0;font-size:14px">We'll reply within 24 hours.</p>
          </div>
          <p style="color:#1A1A2E;font-size:15px">Hi ${name.split(' ')[0]},</p>
          <p style="color:#6B6B8A;line-height:1.6">We received your message and will reply to <strong style="color:#1A1A2E">${email}</strong> shortly — usually within a few hours during business days (IST).</p>
          <p style="color:#6B6B8A;line-height:1.6">While you wait, learn more about how we secure autonomous systems at <a href="https://curiousdevs.com" style="color:#2E9BD8;font-weight:600">curiousdevs.com</a>.</p>
          <p style="color:#6B6B8A;margin-top:24px">— The CuriosDevs team</p>
          <hr style="border:none;border-top:1px solid #E8E6E0;margin:28px 0"/>
          <p style="font-size:11px;color:#aaa;text-align:center">CuriousDevs · hello@curiousdevs.com · +91 8171268630 · India</p>
        </div>`

      await Promise.all([
        transporter.sendMail({
          from:    `"CuriousDevs Website" <${fromEmail}>`,
          to:      toEmail,
          replyTo: email,
          subject: `[Contact] ${name} — ${subject || 'New message'}`,
          html:    teamHtml,
        }),
        transporter.sendMail({
          from:    `"CuriousDevs" <${fromEmail}>`,
          to:      email,
          subject: `We got your message, ${name.split(' ')[0]} — reply coming soon`,
          html:    userHtml,
        }),
      ])
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
