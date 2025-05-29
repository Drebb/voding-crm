/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Disable cache during development to prevent corruption
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack caching in development to prevent ENOENT errors
      config.cache = false;
    }
    return config;
  }
};

module.exports = nextConfig;