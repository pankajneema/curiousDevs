-- CuriousDevs — Supabase schema
-- Paste this in: https://supabase.com/dashboard/project/jolfgtrjvfueoaoopous/sql/new

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
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

CREATE INDEX IF NOT EXISTS idx_contact_email   ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              BIGSERIAL PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  company         TEXT,
  type            TEXT DEFAULT 'newsletter',
  active          BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email  ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(active, created_at DESC);

-- Enable Row Level Security (Supabase best practice)
ALTER TABLE contact_submissions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers  ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS automatically — no extra policy needed for server-side access
