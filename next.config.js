/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },

}

module.exports = nextConfig
