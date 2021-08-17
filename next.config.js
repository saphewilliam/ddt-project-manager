module.exports = {
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    API_ROOT_SELF: process.env.API_ROOT_SELF,
  },
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com'],
  },
  eslint: {
    dirs: ['components', 'graphql', 'hooks', 'lib', 'pages'],
  },
};
