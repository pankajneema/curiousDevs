// Run this once to create all tables in Supabase
// Usage: node scripts/setup-db.mjs

const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvbGZndHJqdmZ1ZW9hb29wb3VzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTQ2NDg0MywiZXhwIjoyMDk3MDQwODQzfQ.2o2CrmiD2a-hKt5k8wN5AbhRI3MtuWxgfqcs2rR3v9M'
const SUPABASE_URL = 'https://jolfgtrjvfueoaoopous.supabase.co'

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal',
}

async function runSQL(sql) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ sql }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`SQL failed: ${err}`)
  }
  return res
}

async function tableExists(name) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${name}?limit=1`,
    { headers }
  )
  return res.status === 200
}

async function setup() {
  console.log('🔄 Setting up CuriousDevs database...\n')

  // contact_submissions
  const contactExists = await tableExists('contact_submissions')
  if (contactExists) {
    console.log('✅ contact_submissions — already exists')
  } else {
    await runSQL(`
      CREATE TABLE contact_submissions (
        id           BIGSERIAL PRIMARY KEY,
        name         TEXT NOT NULL,
        email        TEXT NOT NULL,
        company      TEXT,
        subject      TEXT,
        message      TEXT NOT NULL,
        replied      BOOLEAN DEFAULT FALSE,
        replied_at   TIMESTAMPTZ,
        created_at   TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX idx_contact_email     ON contact_submissions(email);
      CREATE INDEX idx_contact_created   ON contact_submissions(created_at DESC);
    `)
    console.log('✅ contact_submissions — created')
  }

  // newsletter_subscribers
  const newsletterExists = await tableExists('newsletter_subscribers')
  if (newsletterExists) {
    console.log('✅ newsletter_subscribers — already exists')
  } else {
    await runSQL(`
      CREATE TABLE newsletter_subscribers (
        id             BIGSERIAL PRIMARY KEY,
        email          TEXT NOT NULL UNIQUE,
        company        TEXT,
        type           TEXT DEFAULT 'newsletter',
        active         BOOLEAN DEFAULT TRUE,
        unsubscribed_at TIMESTAMPTZ,
        created_at     TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX idx_newsletter_email  ON newsletter_subscribers(email);
      CREATE INDEX idx_newsletter_active ON newsletter_subscribers(active, created_at DESC);
    `)
    console.log('✅ newsletter_subscribers — created')
  }

  // Test insert + delete
  const testRes = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'return=representation' },
    body: JSON.stringify({ name: 'Setup Test', email: 'setup@curiousdevs.com', message: 'DB setup test' }),
  })
  if (!testRes.ok) throw new Error('Test insert failed: ' + await testRes.text())
  const [row] = await testRes.json()

  await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions?id=eq.${row.id}`, {
    method: 'DELETE',
    headers,
  })

  console.log('\n🎉 Database ready! Tables: contact_submissions, newsletter_subscribers')
  console.log('   Open Supabase dashboard → Table Editor to see your data.')
}

setup().catch(e => {
  console.error('\n❌ Setup failed:', e.message)
  console.log('\n── Manual fallback ─────────────────────────────────')
  console.log('Go to: https://supabase.com/dashboard/project/jolfgtrjvfueoaoopous/sql/new')
  console.log('Paste the SQL from: db/schema.sql')
  process.exit(1)
})
