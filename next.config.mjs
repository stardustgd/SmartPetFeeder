/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5050/api/:path*',
        },
      ]
      : []
  },
}

export default nextConfig
