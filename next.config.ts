import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // This is a single-page site with one small global stylesheet. Inlining it
    // removes a render-blocking network round trip without deferring critical
    // hero styles or causing a flash of unstyled content.
    inlineCss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
