-- 모든 미확인 사용자의 이메일을 확인 처리합니다
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
