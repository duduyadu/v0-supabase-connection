import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("[v0] Supabase URL:", supabaseUrl);
console.log("[v0] Supabase Key:", supabaseKey ? "SET (" + supabaseKey.substring(0, 20) + "...)" : "NOT SET");

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection first
console.log("\n[v0] Testing connection...");
const { data: testData, error: testError } = await supabase.from("gallery_items").select("count").limit(1);

if (testError) {
  console.log("[v0] Table does not exist yet or connection issue:", testError.message);
  console.log("[v0] This is expected - tables need to be created via Supabase Dashboard SQL Editor.");
  console.log("\n=== Please run this SQL in your Supabase SQL Editor ===");
  console.log("=== https://supabase.com/dashboard/project/dwzzpmctfvelpvepyohc/sql/new ===\n");
  console.log(`
CREATE TABLE IF NOT EXISTS gallery_items (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'image',
  src TEXT NOT NULL,
  alt TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  span TEXT DEFAULT 'normal',
  youtube_id TEXT DEFAULT '',
  section TEXT NOT NULL DEFAULT 'gallery',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read gallery_items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert gallery_items" ON gallery_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update gallery_items" ON gallery_items FOR UPDATE USING (true);
CREATE POLICY "Allow public delete gallery_items" ON gallery_items FOR DELETE USING (true);

CREATE TABLE IF NOT EXISTS consultations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  major TEXT DEFAULT '',
  topik_level TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert consultations" ON consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read consultations" ON consultations FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  title_ko TEXT DEFAULT '',
  title_vi TEXT DEFAULT '',
  excerpt_ko TEXT DEFAULT '',
  excerpt_vi TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update reviews" ON reviews FOR UPDATE USING (true);
CREATE POLICY "Allow public delete reviews" ON reviews FOR DELETE USING (true);
  `);
} else {
  console.log("[v0] Connection successful! gallery_items table exists.");
  
  // Check other tables
  const { error: e1 } = await supabase.from("consultations").select("count").limit(1);
  console.log("[v0] consultations table:", e1 ? "NOT FOUND" : "EXISTS");
  
  const { error: e2 } = await supabase.from("reviews").select("count").limit(1);
  console.log("[v0] reviews table:", e2 ? "NOT FOUND" : "EXISTS");
}
