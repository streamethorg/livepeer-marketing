const shouldAnalyzeBundles = process.env.ANALYZE === true

/** @type {import('next').NextConfig} */
let nextConfig = {
  redirects: async () => [
    {
      source: '/',
      has: [
        {
          type: 'host',
          value: 'watch.protocol.berlin',
        },
      ],
      destination: 'https://watch.protocol.berlin/ethberlin/protocol_berg',
      permanent: true,
    },
    {
      source: '/',
      has: [
        {
          type: 'host',
          value: 'launch.scroll.io',
        },
      ],
      destination: 'https://launch.scroll.io/scroll/scroll_announcement_stream',
      permanent: true,
    },
  ],

  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV': false,
      })
    )

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
  },
  staticPageGenerationTimeout: 1000,
}

if (shouldAnalyzeBundles) {
  console.log('Analyzing bundles..')
  const withNextBundleAnalyzer = require('next-bundle-analyzer')({
    enabled: true,
  })
  nextConfig = withNextBundleAnalyzer(nextConfig)
}

module.exports = nextConfig
