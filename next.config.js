/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.cdn.zo.xyz", "nft-cdn.zo.xyz"],
  },
};

module.exports = nextConfig;
