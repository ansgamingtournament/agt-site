/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'anselbpl-my.sharepoint.com',
      },
    ],
  },
};

export default nextConfig;
