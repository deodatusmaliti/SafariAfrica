/*
# Safari Tanzania — core schema

1. New Tables
- `inquiries` — contact form submissions from the site. Columns: id, name, email, phone, subject, message, status, created_at.
- `packages` — curated tour packages (seeded by the site, editable by operators). Columns: id, slug, title, subtitle, description, duration_days, price_usd, difficulty, region, highlights (text[]), includes (text[]), excludes (text[]), image_url, gallery (text[]), featured, created_at.
- `bookings` — a booking for a fixed package or a custom-built itinerary. Columns: id, reference, type ('package'|'custom'), package_id, traveler_name, email, phone, country, adults, children, start_date, end_date, accommodation, add_ons (text[]), custom_destinations (text[]), total_usd, status, payment_method, created_at.
- `payments` — record of a payment (manual) against a booking. Columns: id, booking_id, method, amount_usd, reference_note, status, created_at.
- `testimonials` — guest reviews. Columns: id, name, country, rating, trip, message, avatar_url, created_at.
2. Security
- Enable RLS on all tables.
- This is a public marketing + booking site with NO sign-in screen, so all policies use `TO anon, authenticated`.
- Public read on packages, testimonials (USING true) — intentionally shared catalog content.
- Public INSERT on inquiries and bookings (the forms write as anon). WITH CHECK true because these are incoming public submissions with no owner concept.
- No public UPDATE/DELETE — only operators (service role) can mutate catalog or manage submissions.
3. Important notes
- `reference` on bookings is a human-readable booking code (e.g. STZ-XXXXXX) generated client-side so guests can quote it.
- All money columns are integer USD for simplicity and to avoid float rounding in the UI.
- text[] arrays store highlights/includes/excludes/add_ons/destinations to keep the schema flat and queryable.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_inquiries" ON inquiries;
CREATE POLICY "anon_select_inquiries" ON inquiries FOR SELECT
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL,
  description text NOT NULL,
  duration_days integer NOT NULL,
  price_usd integer NOT NULL,
  difficulty text NOT NULL DEFAULT 'Moderate',
  region text NOT NULL,
  highlights text[] NOT NULL DEFAULT '{}',
  includes text[] NOT NULL DEFAULT '{}',
  excludes text[] NOT NULL DEFAULT '{}',
  image_url text NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_packages" ON packages;
CREATE POLICY "anon_select_packages" ON packages FOR SELECT
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE NOT NULL,
  type text NOT NULL DEFAULT 'package',
  package_id uuid REFERENCES packages(id) ON DELETE SET NULL,
  traveler_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text,
  adults integer NOT NULL DEFAULT 2,
  children integer NOT NULL DEFAULT 0,
  start_date date,
  end_date date,
  accommodation text NOT NULL DEFAULT 'Comfort',
  add_ons text[] NOT NULL DEFAULT '{}',
  custom_destinations text[] NOT NULL DEFAULT '{}',
  total_usd integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  payment_method text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  method text NOT NULL,
  amount_usd integer NOT NULL,
  reference_note text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_payments" ON payments;
CREATE POLICY "anon_insert_payments" ON payments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_payments" ON payments;
CREATE POLICY "anon_select_payments" ON payments FOR SELECT
  TO anon, authenticated USING (true);


CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  trip text NOT NULL,
  message text NOT NULL,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);


CREATE INDEX IF NOT EXISTS idx_packages_featured ON packages(featured);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(reference);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);