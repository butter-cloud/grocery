import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // msw config
    if (isServer) {
      if (Array.isArray(config.resolve.alias))
        // remove msw browser when server
        config.resolve.alias.push({ name: 'msw/browser', alias: false })
      else config.resolve.alias['msw/browser'] = false
    } else {
      if (Array.isArray(config.resolve.alias))
        config.resolve.alias.push({ name: 'msw/node', alias: false })
      else config.resolve.alias['msw/node'] = false
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig
