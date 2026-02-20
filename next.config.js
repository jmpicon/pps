/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.DOCKER_BUILD === '1' ? 'standalone' : 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
