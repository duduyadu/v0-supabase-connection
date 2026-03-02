-- Create gallery_items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'image',
  src TEXT NOT NULL,
  alt TEXT,
  caption TEXT,
  span TEXT DEFAULT 'normal',
  section TEXT NOT NULL DEFAULT 'gallery',
  display_order INTEGER DEFAULT 0,
  youtube_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  major TEXT,
  topik_level TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ko TEXT,
  title_vi TEXT,
  excerpt_ko TEXT,
  excerpt_vi TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for gallery_items
CREATE POLICY "Public read gallery_items" ON gallery_items
  FOR SELECT USING (true);

-- Public insert for gallery_items (for admin page)
CREATE POLICY "Public insert gallery_items" ON gallery_items
  FOR INSERT WITH CHECK (true);

-- Public delete for gallery_items (for admin page)
CREATE POLICY "Public delete gallery_items" ON gallery_items
  FOR DELETE USING (true);

-- Public read access for reviews
CREATE POLICY "Public read reviews" ON reviews
  FOR SELECT USING (true);

-- Public all for reviews (for admin page)
CREATE POLICY "Public insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update reviews" ON reviews
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Public delete reviews" ON reviews
  FOR DELETE USING (true);

-- Public insert for consultations
CREATE POLICY "Public insert consultations" ON consultations
  FOR INSERT WITH CHECK (true);

-- Public read for consultations (for admin page)
CREATE POLICY "Public read consultations" ON consultations
  FOR SELECT USING (true);
