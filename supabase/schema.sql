-- ============================================================
-- Corwin Pool Service — Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  service_type TEXT,
  status TEXT DEFAULT 'active', -- active | inactive | vip
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads (form submissions)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  service_type TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new', -- new | contacted | qualified | lost | converted
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  lead_id UUID REFERENCES leads(id),
  service_type TEXT,
  scheduled_at TIMESTAMPTZ,
  duration_minutes INT DEFAULT 60,
  status TEXT DEFAULT 'scheduled', -- scheduled | completed | cancelled | no-show
  technician TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Availability (bookable time slots)
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_date DATE,
  slot_time TIME,
  is_booked BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security (set policies per your auth setup)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Public read for availability (booking page)
CREATE POLICY "Public can view availability" ON availability FOR SELECT USING (TRUE);

-- Public insert for leads (contact form)
CREATE POLICY "Public can submit leads" ON leads FOR INSERT WITH CHECK (TRUE);

-- Public insert for appointments (booking form)
CREATE POLICY "Public can create appointments" ON appointments FOR INSERT WITH CHECK (TRUE);

-- Public select for appointments (booking confirmation)
CREATE POLICY "Public can view own appointments" ON appointments FOR SELECT USING (TRUE);
