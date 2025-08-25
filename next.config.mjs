/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return process.env.NODE_ENV === 'dev'
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:5050/api/:path*',
          },
        ]
      : []
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spf.sebastian.sh',
      },
    ],
  },
}

export default nextConfig
