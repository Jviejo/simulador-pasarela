import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'vicar.fun.tyt.com:3001',
        'localhost:3003',
        'localhost:3000',
        'localhost:3001',
      ],
    },
  },
};

export default nextConfig;
