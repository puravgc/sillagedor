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
      {
        protocol: "https",
        hostname: "static3.webx.pk", // Replace with your actual image host
      },
      {
        protocol: "https",
        hostname: "img.drz.lazcdn.com", // Replace with your actual image host
      },
      {
        protocol: "https",
        hostname: "cdn.notinoimg.com",
      },
      {
        protocol: "https",
        hostname: "fimgs.net",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // <-- Add this line
  },
};

export default nextConfig;
