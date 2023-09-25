import generateCsp from './src/csp.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Support for Dockerfile
  output: 'standalone',

  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60 * 60 * 24, // 1 day
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hydego.id',
      },
      {
        protocol: 'https',
        hostname: 'hydego.pockethost.io',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: generateCsp(),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'microphone=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
