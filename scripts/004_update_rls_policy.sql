-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON gallery_items;
DROP POLICY IF EXISTS "Allow public insert" ON gallery_items;
DROP POLICY IF EXISTS "Allow public update" ON gallery_items;
DROP POLICY IF EXISTS "Allow public delete" ON gallery_items;

-- Create new policies for full public access
CREATE POLICY "Allow public read access" ON gallery_items
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON gallery_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON gallery_items
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete" ON gallery_items
  FOR DELETE USING (true);
