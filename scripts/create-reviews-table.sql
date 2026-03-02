-- Create reviews table for managing study abroad review posts
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ko TEXT NOT NULL,
  title_vi TEXT,
  excerpt_ko TEXT,
  excerpt_vi TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allow public read access
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON reviews
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON reviews
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete" ON reviews
  FOR DELETE TO authenticated USING (true);

-- Insert default review data
INSERT INTO reviews (title_ko, title_vi, excerpt_ko, excerpt_vi, image_url, display_order) VALUES
  ('서울에서의 첫 학기, 새로운 시작', 'Học kỳ đầu tiên tại Seoul, khởi đầu mới', '처음 한국에 도착했을 때의 설렘과 어학당에서의 첫 수업, 그리고 새로운 친구들과의 만남까지...', 'Sự hồi hộp khi đến Hàn Quốc lần đầu, bài học đầu tiên ở trường ngôn ngữ, và gặp gỡ bạn bè mới...', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop', 1),
  ('한양대 합격 후기 | 준비부터 합격까지', 'Review đậu Đại học Hanyang | Từ chuẩn bị đến trúng tuyển', '한양대학교에 합격하기까지의 여정을 공유합니다. 서류 준비부터 면접까지 모든 과정을...', 'Chia sẻ hành trình đậu Đại học Hanyang. Từ chuẩn bị hồ sơ đến phỏng vấn...', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop', 2),
  ('한국어 TOPIK 4급 달성 비법', 'Bí quyết đạt TOPIK cấp 4 tiếng Hàn', '6개월 만에 TOPIK 4급을 달성한 공부법을 소개합니다. 어학당 수업과 자기 학습을 병행하며...', 'Giới thiệu phương pháp học đạt TOPIK cấp 4 trong 6 tháng. Kết hợp học trên lớp và tự học...', 'https://images.unsplash.com/photo-1523050854058-8df90110c8f1?w=400&h=300&fit=crop', 3),
  ('한국에서의 아르바이트 경험담', 'Trải nghiệm làm thêm tại Hàn Quốc', '유학 중 아르바이트를 하며 느낀 점들. 카페에서 일하면서 한국어 실력도 늘고...', 'Những điều cảm nhận khi làm thêm trong thời gian du học. Làm việc ở quán café giúp cải thiện tiếng Hàn...', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', 4),
  ('성균관대 장학금 받고 입학한 이야기', 'Câu chuyện nhận học bổng và nhập học Đại học Sungkyunkwan', '성균관대학교에서 장학금을 받고 입학하게 된 과정을 솔직하게 이야기합니다...', 'Chia sẻ thật lòng về quá trình nhận học bổng và nhập học Đại học Sungkyunkwan...', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop', 5),
  ('한국 음식 적응기 | 베트남 학생의 솔직 후기', 'Thích nghi ẩm thực Hàn Quốc | Review thật lòng từ du học sinh Việt Nam', '매운 음식을 못 먹던 제가 한국에서 어떻게 적응했는지, 좋아하는 한국 음식 추천까지...', 'Từ một người không ăn được cay, tôi đã thích nghi tại Hàn Quốc như thế nào, gợi ý món Hàn yêu thích...', 'https://images.unsplash.com/photo-1530099486328-e021101a494a?w=400&h=300&fit=crop', 6),
  ('고려대 캠퍼스 라이프 | 동아리 활동', 'Cuộc sống tại Đại học Korea | Hoạt động câu lạc bộ', '고려대학교에서의 캠퍼스 생활과 동아리 활동을 소개합니다. 한국 친구들과 함께하는...', 'Giới thiệu cuộc sống campus và hoạt động câu lạc bộ tại Đại học Korea. Cùng bạn bè Hàn Quốc...', 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=300&fit=crop', 7);
