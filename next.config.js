function validateProductionEnvironment() {
  if (process.env.NODE_ENV !== 'production') return;

  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error('DATABASE_URL is required in production.');
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim().length < 32) {
    throw new Error('JWT_SECRET is required in production and must be at least 32 characters.');
  }

  if (process.env.DB_MOCK?.toLowerCase() === 'true') {
    throw new Error('DB_MOCK=true is not allowed in production.');
  }
}

validateProductionEnvironment();

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'arrowheaddigitech.com' },
      { protocol: 'https', hostname: 'www.arrowheaddigitech.com' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  headers: async () => [
    {
      source: '/uploads/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/:path*.(svg|jpg|jpeg|png|webp|avif|ico|woff2)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    workerThreads: false,
    cpus: 1,
  },
}

module.exports = nextConfig
