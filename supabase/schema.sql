-- KaryaSetu (कार्यसेतु) Supabase PostgreSQL Schema with PostGIS Location Support

-- Enable PostGIS for geospatial worker and booking coordinates
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Services Table (Indian Trade Catalog)
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT NOT NULL,
    description_hi TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('core', 'desi', 'commerce', 'tech')),
    base_wage NUMERIC(10, 2) NOT NULL,
    unit TEXT NOT NULL,
    societies_count INTEGER NOT NULL DEFAULT 1,
    avg_rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    completed_jobs INTEGER NOT NULL DEFAULT 0,
    popular_services JSONB NOT NULL DEFAULT '[]'::jsonb,
    gov_wage_standard TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Workers Table (Cooperative Artisans & Guild Members)
CREATE TABLE IF NOT EXISTS public.workers (
    id TEXT PRIMARY KEY,
    worker_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    phone TEXT NOT NULL,
    trade TEXT NOT NULL,
    trade_hi TEXT NOT NULL,
    trade_mr TEXT NOT NULL,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    total_jobs INTEGER NOT NULL DEFAULT 0,
    society_name TEXT NOT NULL,
    society_tier TEXT NOT NULL DEFAULT 'Primary Society',
    verified_aadhaar BOOLEAN NOT NULL DEFAULT true,
    verified_ncd BOOLEAN NOT NULL DEFAULT true,
    e_shram_card_no TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('available', 'busy', 'offline')) DEFAULT 'available',
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    location GEOMETRY(Point, 4326),
    area TEXT NOT NULL,
    today_earnings NUMERIC(10, 2) NOT NULL DEFAULT 0,
    today_welfare_saved NUMERIC(10, 2) NOT NULL DEFAULT 0,
    upi_id TEXT NOT NULL,
    skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    languages JSONB NOT NULL DEFAULT '[]'::jsonb,
    has_smartphone BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bookings Table (Dispatches with 92/6/2 Automated UPI Splits)
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    service_id TEXT REFERENCES public.services(id),
    service_name TEXT NOT NULL,
    category TEXT NOT NULL,
    area TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Nagpur',
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    timestamp TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('unassigned', 'assigned', 'in_transit', 'otp_verified', 'completed', 'cancelled')) DEFAULT 'unassigned',
    base_amount NUMERIC(10, 2) NOT NULL,
    worker_payout NUMERIC(10, 2) NOT NULL, -- 92%
    welfare_locker NUMERIC(10, 2) NOT NULL, -- 6%
    admin_fund NUMERIC(10, 2) NOT NULL, -- 2%
    assigned_worker_id TEXT REFERENCES public.workers(id),
    otp_code TEXT NOT NULL,
    is_offline_worker BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Statutory Welfare Ledgers (Code on Social Security 2020 Trust)
CREATE TABLE IF NOT EXISTS public.welfare_ledgers (
    id BIGSERIAL PRIMARY KEY,
    booking_id TEXT NOT NULL,
    worker_id TEXT REFERENCES public.workers(id),
    worker_uan TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    scheme_name TEXT NOT NULL DEFAULT 'Code on Social Security 2020 - PMSBY & Pension Trust',
    status TEXT NOT NULL DEFAULT 'SETTLED',
    settled_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Audit Logs Table (Tamper-evident cooperative ledger)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id BIGSERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,
    description TEXT NOT NULL,
    payload JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.welfare_ledgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for Discovery
CREATE POLICY "Public services read" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public workers read" ON public.workers FOR SELECT USING (true);
CREATE POLICY "Public bookings read" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Public bookings insert" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public bookings update" ON public.bookings FOR UPDATE USING (true);
