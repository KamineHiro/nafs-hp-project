const withNextIntl = require('next-intl/plugin')(
  './src/lib/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@uiw/react-md-editor'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
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
              img-src 'self' data: blob: https: *.google.com *.googleapis.com *.gstatic.com;
              style-src 'self' 'unsafe-inline' https: *.googleapis.com;
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https: *.google.com *.googleapis.com *.gstatic.com;
              font-src 'self' https: data: *.gstatic.com;
              connect-src 'self' https: *.google.com *.googleapis.com;
              frame-src 'self' https://www.youtube.com https://www.google.com *.google.com;
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
  },
  // よりシンプルなwebpack設定
  webpack: (config, { isServer }) => {
    // Next.js 14の仕様に合わせた最適化設定
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // シンプルな共通チャンク設定
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true
          },
          // ライブラリ用の単純な設定
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      };
    }
    return config;
  },
  output: 'standalone'
};

module.exports = withNextIntl(config);