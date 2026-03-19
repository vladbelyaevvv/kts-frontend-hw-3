import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front-school-strapi.ktsdev.ru',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'front-school.minio.ktsdev.ru',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
