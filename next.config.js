module.exports = {
  reactStrictMode: true,
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    API_ROOT_SELF: process.env.API_ROOT_SELF,
  },
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com', 'avatars.dicebear.com'],
  },
  eslint: {
    dirs: ['src'],
  },
};
