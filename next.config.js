const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  exportPathMap: async () => {
    return {
      '/': { page: '/' },
      '/game': { page: '/game' },
      '/posts': { page: '/posts' },
      '/post/testpost': { page: '/post/[postId]', query: { postId: 'testpost' } },
    }
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
});

