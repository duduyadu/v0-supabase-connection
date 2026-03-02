-- Gallery items table for storing images and videos
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('image', 'youtube')),
  src TEXT NOT NULL,
  alt TEXT,
  caption TEXT,
  span TEXT DEFAULT 'normal' CHECK (span IN ('normal', 'wide', 'tall', 'large')),
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view gallery)
CREATE POLICY "Allow public read access" ON public.gallery_items
  FOR SELECT USING (true);

-- Allow authenticated users (admin) to insert
CREATE POLICY "Allow authenticated insert" ON public.gallery_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users (admin) to update
CREATE POLICY "Allow authenticated update" ON public.gallery_items
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users (admin) to delete
CREATE POLICY "Allow authenticated delete" ON public.gallery_items
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_gallery_items_order ON public.gallery_items (display_order, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_items_featured ON public.gallery_items (is_featured) WHERE is_featured = true;
