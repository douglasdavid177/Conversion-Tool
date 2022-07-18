/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
  experimental: {
    urlImports: ["https://example.com/modules/"],
  },
};
