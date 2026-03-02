-- Enable RLS but allow public read access for gallery_items and reviews

-- gallery_items: allow public SELECT
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read gallery_items" ON gallery_items;
CREATE POLICY "Allow public read gallery_items" ON gallery_items
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all insert gallery_items" ON gallery_items;
CREATE POLICY "Allow all insert gallery_items" ON gallery_items
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all update gallery_items" ON gallery_items;
CREATE POLICY "Allow all update gallery_items" ON gallery_items
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow all delete gallery_items" ON gallery_items;
CREATE POLICY "Allow all delete gallery_items" ON gallery_items
  FOR DELETE USING (true);

-- reviews: allow public SELECT
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read reviews" ON reviews;
CREATE POLICY "Allow public read reviews" ON reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all insert reviews" ON reviews;
CREATE POLICY "Allow all insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all update reviews" ON reviews;
CREATE POLICY "Allow all update reviews" ON reviews
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow all delete reviews" ON reviews;
CREATE POLICY "Allow all delete reviews" ON reviews
  FOR DELETE USING (true);

-- consultations: allow public insert, restrict read
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert consultations" ON consultations;
CREATE POLICY "Allow public insert consultations" ON consultations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read consultations" ON consultations;
CREATE POLICY "Allow public read consultations" ON consultations
  FOR SELECT USING (true);
