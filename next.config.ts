import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
     unoptimized: true,
   remotePatterns: [{
    protocol: 'https',
    hostname: 'ecommerce.routemisr.com',
    port: '',
    pathname: '/Route-Academy-*/*',
     
   }]
    
  },
transpilePackages: ['react-hot-toast']
};

export default nextConfig;
