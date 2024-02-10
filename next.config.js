/** @type {import('next').NextConfig} */

const envVariables = {
  API_HOST: process.env.API_HOST,
  API_KEY: process.env.API_KEY,
  API_TOKEN: process.env.API_TOKEN,
};
const nextConfig = {
  env: envVariables,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

module.exports = nextConfig;
