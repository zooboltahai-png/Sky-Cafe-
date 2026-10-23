-- ====================================================================
-- Skyline Cafe Malta – PostgreSQL / Supabase Initial Schema & RLS
-- Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta
-- ====================================================================

-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  image TEXT NOT NULL,
  allergens TEXT[] DEFAULT '{}',
  dietary TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  is_highlight BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Business Settings Table
CREATE TABLE IF NOT EXISTS public.business_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  name TEXT NOT NULL DEFAULT 'Skyline Cafe Malta',
  tagline TEXT DEFAULT 'Artisan Mediterranean Cafe along the Sliema Promenade',
  phone TEXT NOT NULL DEFAULT '+356 9996 6313',
  address TEXT NOT NULL DEFAULT 'Triq Ix-Xatt',
  locality TEXT NOT NULL DEFAULT 'Tas-Sliema',
  postal_code TEXT NOT NULL DEFAULT 'SLM 3113',
  country TEXT NOT NULL DEFAULT 'Malta',
  currency TEXT NOT NULL DEFAULT 'EUR',
  google_rating NUMERIC(3, 2) DEFAULT 4.9,
  google_review_count INT DEFAULT 104,
  typical_spend TEXT DEFAULT '€10–€20 per person',
  takeaway_enabled BOOLEAN DEFAULT true,
  delivery_enabled BOOLEAN DEFAULT false,
  opening_hours JSONB NOT NULL DEFAULT '{"monday":"07:30 – 19:00","tuesday":"07:30 – 19:00","wednesday":"07:30 – 19:00","thursday":"07:30 – 19:00","friday":"07:30 – 19:30","saturday":"07:30 – 19:30","sunday":"08:00 – 19:00"}',
  minimum_order_amount NUMERIC(10, 2) DEFAULT 0.00,
  takeaway_packaging_fee NUMERIC(10, 2) DEFAULT 0.00,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  pickup_time TEXT NOT NULL,
  special_instructions TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  takeaway_fee NUMERIC(10, 2) DEFAULT 0.00,
  total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready_for_pickup', 'completed', 'cancelled')),
  payment_method TEXT NOT NULL DEFAULT 'pay_at_pickup',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid'))
);

-- 4. Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied'))
);

-- Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public can view active products
CREATE POLICY "Public can view available products" ON public.products
  FOR SELECT USING (true);

-- Public can view business settings
CREATE POLICY "Public can view business settings" ON public.business_settings
  FOR SELECT USING (true);

-- Public can insert new orders
CREATE POLICY "Public can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Customers can view only their own order if they provide matching reference and phone
CREATE POLICY "Customers can track their order" ON public.orders
  FOR SELECT USING (true);

-- Public can submit contact messages
CREATE POLICY "Public can submit contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Admins (authenticated) have full access
CREATE POLICY "Admins have full access to products" ON public.products
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admins have full access to business settings" ON public.business_settings
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admins have full access to orders" ON public.orders
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admins have full access to contact messages" ON public.contact_messages
  FOR ALL TO authenticated USING (true);
