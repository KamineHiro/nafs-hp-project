/** @type {import('next').NextConfig} */
const nextConfig = {
  // Service Workerを無効化
    skipWaiting: true,
  // その他の設定
    images: {
    domains: ['localhost'],
    },
}

module.exports = nextConfig 