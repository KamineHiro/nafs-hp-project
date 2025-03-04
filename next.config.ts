import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@uiw/react-md-editor'],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "nafs-hp-project.vercel.app",
      },
    ],
    // 画像の最適化設定
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['localhost', 'example.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              img-src 'self' data: blob: https:;
              style-src 'self' 'unsafe-inline' https:;
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https:;
              font-src 'self' https: data:;
              connect-src 'self' https:;
              frame-src 'self';
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000']
    }
  }
}

// next-intlの設定を別のファイルから読み込む
export default withNextIntl('./src/lib/i18n/request.ts')(config);
