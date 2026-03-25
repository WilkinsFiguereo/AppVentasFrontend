/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const ODOO = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8009').replace(/\/$/, '')

    return [
      {
        source:      '/odoo/:path*',
        destination: `${ODOO}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig