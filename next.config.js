/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'assets.lolesports.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'static.lolesports.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.lolesports.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'liquipedia.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
