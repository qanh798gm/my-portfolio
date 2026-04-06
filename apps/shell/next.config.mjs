import pkg from '@module-federation/enhanced/webpack'

const { ModuleFederationPlugin } = pkg

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@portfolio/ui', '@portfolio/tokens'],
  experimental: {
    optimizePackageImports: ['@portfolio/ui'],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // Register MF remotes so runtime can fetch them
      config.plugins.push(
        new ModuleFederationPlugin({
          name: 'shell',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            showcase_hitachi: `showcase_hitachi@${
              process.env.NEXT_PUBLIC_HITACHI_REMOTE_URL ??
              'http://localhost:5001'
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
        if (isServer && request && request.startsWith('showcase_hitachi/')) {
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
