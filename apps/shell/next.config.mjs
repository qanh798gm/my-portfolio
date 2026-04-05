/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@portfolio/ui', '@portfolio/tokens'],
  experimental: {
    optimizePackageImports: ['@portfolio/ui'],
  },
}

export default nextConfig
