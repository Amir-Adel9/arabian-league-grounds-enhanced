/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
        hostname: 'am-a.akamaihd.net',
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
