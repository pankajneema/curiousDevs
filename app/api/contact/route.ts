import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message, subject } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 })
    }

    // If RESEND_API_KEY is configured, send via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'contact@curiousdevs.com',
          to: process.env.CONTACT_EMAIL || 'hello@curiousdevs.com',
          subject: `[CuriousDevs Contact] ${subject || 'New message'} from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          reply_to: email,
        }),
      })
      if (!res.ok) {
        console.error('Resend error:', await res.text())
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
      }
    } else {
      // Development fallback — log to console
      console.log('[Contact Form]', { name, email, subject, message })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
