import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, company, type } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Log for now; integrate with Mailchimp/ConvertKit via NEWSLETTER_API_KEY
    console.log('[Newsletter]', { email, company, type: type || 'newsletter' })

    const NEWSLETTER_API_KEY = process.env.NEWSLETTER_API_KEY
    if (NEWSLETTER_API_KEY) {
      // TODO: integrate with your email provider (Mailchimp, ConvertKit, etc.)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
