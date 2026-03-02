-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to gallery bucket
CREATE POLICY "Public read access for gallery" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

-- Allow authenticated users to upload to gallery bucket
CREATE POLICY "Authenticated upload to gallery" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Allow authenticated users to update gallery files
CREATE POLICY "Authenticated update gallery" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete gallery files
CREATE POLICY "Authenticated delete gallery" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');
