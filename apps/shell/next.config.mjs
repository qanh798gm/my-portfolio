import pkg from '@module-federation/enhanced/webpack'

const { ModuleFederationPlugin } = pkg

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@portfolio/ui', '@portfolio/tokens'],
  experimental: {
    optimizePackageImports: ['@portfolio/ui'],
  },
  // Next.js 16 defaults to Turbopack. We still need webpack for Module Federation
  // (no Turbopack equivalent yet). Adding an empty turbopack config silences the
  // "webpack config present but no turbopack config" error — the build still uses
  // webpack when a webpack() function is defined.
  turbopack: {},
  webpack(config, { isServer }) {
    if (!isServer) {
      // Register MF remotes so runtime can fetch them
      config.plugins.push(
        new ModuleFederationPlugin({
          name: 'shell',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            showcase_hitachi: `showcase_hitachi@${
              (process.env.NEXT_PUBLIC_HITACHI_REMOTE_URL ?? 'http://localhost:5001').replace(/\/+$/, '')
            }/remoteEntry.js`,
            showcase_aquariux: `showcase_aquariux@${
              (process.env.NEXT_PUBLIC_AQUARIUX_REMOTE_URL ?? 'http://localhost:5002').replace(/\/+$/, '')
            }/remoteEntry.js`,
          },
          exposes: {},
          shared: {
            react: {
              singleton: true,
              eager: true,
              requiredVersion: '^19.0.0',
            },
            'react-dom': {
              singleton: true,
              eager: true,
              requiredVersion: '^19.0.0',
            },
            'react-router-dom': {
              singleton: true,
              eager: false,
            },
          },
        }),
      )
    }

    // Prevent webpack from statically resolving MF remote imports at build time.
    // At runtime, the MF plugin handles module resolution via the remote entry.
    const existingExternals = config.externals ?? []
    config.externals = [
      ...(Array.isArray(existingExternals) ? existingExternals : [existingExternals]),
      ({ request }, callback) => {
        // Only intercept server-side resolution of MF remote namespaces
        if (
          isServer &&
          request &&
          (request.startsWith('showcase_hitachi/') || request.startsWith('showcase_aquariux/'))
        ) {
          // Return a stub so server compilation doesn't fail
          return callback(null, `commonjs ${request}`)
        }
        callback()
      },
    ]

    return config
  },
}

export default nextConfig
