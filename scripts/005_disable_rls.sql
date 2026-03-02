-- Disable RLS on gallery_items table completely
ALTER TABLE gallery_items DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public read access" ON gallery_items;
DROP POLICY IF EXISTS "Allow public insert" ON gallery_items;
DROP POLICY IF EXISTS "Allow public update" ON gallery_items;
DROP POLICY IF EXISTS "Allow public delete" ON gallery_items;
