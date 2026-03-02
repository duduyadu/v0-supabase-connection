/** @type {import('next').NextConfig} */
// Cache invalidation: Using Google Fonts only (Noto Sans, Noto Sans KR) - no local fonts
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
