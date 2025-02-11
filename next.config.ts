/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-01.daraz.com.np", // Replace with your actual image host
      },
      {
        protocol: "https",
        hostname: "static-01.daraz.com.bd", // Replace with your actual image host
      },
    ],
  },
};

export default nextConfig;
