import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { supabaseAdmin } from '@/lib/supabase'

function getTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_SERVER || 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASSWORD },
  })
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const name       = String(form.get('name') || '').trim()
    const email      = String(form.get('email') || '').trim()
    const role       = String(form.get('role') || '').trim()
    const experience = String(form.get('experience') || '').trim()
    const links      = String(form.get('links') || '').trim()
    const message    = String(form.get('message') || '').trim()
    const resume     = form.get('resume') as File | null

    if (!name || !email || !role)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    if (!resume || resume.size === 0)
      return NextResponse.json({ error: 'Resume is required' }, { status: 400 })
    if (resume.size > 8 * 1024 * 1024)
      return NextResponse.json({ error: 'Resume too large (max 8 MB)' }, { status: 400 })

    const buffer = Buffer.from(await resume.arrayBuffer())

    // ── 1. Store metadata in Supabase (non-fatal if table absent) ──
    try {
      await supabaseAdmin.from('job_applications').insert({
        name, email, role, experience, links: links || null, message: message || null,
        resume_name: resume.name,
      })
    } catch (e) {
      console.error('[Careers] DB insert failed (non-fatal):', e)
    }

    // ── 2. Email the team with the resume attached ──
    const fromEmail = process.env.SMTP_EMAIL
    const toEmail   = process.env.CAREERS_EMAIL || process.env.CONTACT_EMAIL || 'pankaj200321@gmail.com'

    if (fromEmail && process.env.SMTP_PASSWORD) {
      const transporter = getTransporter()

      const teamHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#0B0E15;margin-bottom:16px">🛡️ New security-team application</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6B7280;width:130px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#2E9BD8">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Role</td><td style="padding:8px 0">${role}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Experience</td><td style="padding:8px 0">${experience}</td></tr>
            ${links ? `<tr><td style="padding:8px 0;color:#6B7280">Links</td><td style="padding:8px 0">${links}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:8px 0;color:#6B7280;vertical-align:top">Note</td><td style="padding:8px 0;white-space:pre-wrap;line-height:1.6">${message}</td></tr>` : ''}
          </table>
          <p style="font-size:11px;color:#aaa;margin-top:20px">Resume attached · submitted via curiousdevs.com/careers</p>
        </div>`

      const applicantHtml = `
        <div style="font-family:sans-serif;max-width:540px;margin:0 auto">
          <div style="background:#0B0E15;padding:32px 24px;border-radius:12px;text-align:center;margin-bottom:24px">
            <h2 style="color:#fff;margin:0 0 6px;font-size:20px">Application received, ${name.split(' ')[0]} 🛡️</h2>
            <p style="color:rgba(255,255,255,.55);margin:0;font-size:13px">CuriosDevs · Security team</p>
          </div>
          <p style="color:#0B0E15;font-size:15px">Hi ${name.split(' ')[0]},</p>
          <p style="color:#6B7280;line-height:1.7">Thanks for applying for <strong>${role}</strong>. We read every application ourselves and will reply — usually within a few days.</p>
          <p style="color:#6B7280;line-height:1.7">— The CuriosDevs team</p>
          <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0"/>
          <p style="font-size:11px;color:#aaa;text-align:center">CuriosDevs · Securing the Autonomous Future</p>
        </div>`

      await Promise.all([
        transporter.sendMail({
          from: `"CuriosDevs Careers" <${fromEmail}>`,
          to: toEmail, replyTo: email,
          subject: `[Careers] ${name} — ${role}`,
          html: teamHtml,
          attachments: [{ filename: resume.name || 'resume', content: buffer }],
        }),
        transporter.sendMail({
          from: `"CuriosDevs" <${fromEmail}>`,
          to: email,
          subject: `We received your application, ${name.split(' ')[0]}`,
          html: applicantHtml,
        }),
      ])
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Careers API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
