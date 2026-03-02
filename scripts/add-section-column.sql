-- Add section column to gallery_items to separate YouTube vs Gallery
ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS section text DEFAULT 'gallery';

-- Set existing youtube items to 'youtube' section
UPDATE gallery_items SET section = 'youtube' WHERE type = 'youtube';

-- Set existing image items to 'gallery' section
UPDATE gallery_items SET section = 'gallery' WHERE type = 'image';
