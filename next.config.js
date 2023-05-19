/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
