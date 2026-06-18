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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    workerThreads: false,
    cpus: 1,
  },
}

module.exports = nextConfig
