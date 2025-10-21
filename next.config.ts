import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: '/Users/marioruizdiaz/Documents/Tech/crypto-oracle-fortune/crypto-oracle-fortune',
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;