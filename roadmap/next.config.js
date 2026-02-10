/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  env: {
    DEPLOYMENT_TARGET: process.env.DEPLOYMENT_TARGET || 'production'
  }
}

module.exports = nextConfig
