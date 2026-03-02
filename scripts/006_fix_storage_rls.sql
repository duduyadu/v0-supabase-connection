-- Storage bucket RLS 정책 수정
-- 기존 정책 삭제
DROP POLICY IF EXISTS "Public read access for gallery" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

-- 모든 작업 허용하는 정책 생성
CREATE POLICY "Allow all operations on gallery" ON storage.objects
FOR ALL USING (bucket_id = 'gallery') WITH CHECK (bucket_id = 'gallery');
