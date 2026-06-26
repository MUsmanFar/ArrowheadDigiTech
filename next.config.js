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

function buildImageRemotePatterns() {
  const patterns = [
    { protocol: 'https', hostname: 'arrowheaddigitech.com' },
    { protocol: 'https', hostname: 'www.arrowheaddigitech.com' },
    { protocol: 'http', hostname: 'localhost' },
  ];

  const r2PublicUrl = process.env.R2_PUBLIC_URL?.trim();
  if (r2PublicUrl) {
    try {
      const parsed = new URL(r2PublicUrl);
      const protocol = parsed.protocol === 'http:' ? 'http' : 'https';
      if (!patterns.some((p) => p.hostname === parsed.hostname)) {
        patterns.push({ protocol, hostname: parsed.hostname });
      }
    } catch {
      // R2_PUBLIC_URL validated at runtime by upload route
    }
  }

  return patterns;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: buildImageRemotePatterns(),
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
        },
      ],
    },
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
