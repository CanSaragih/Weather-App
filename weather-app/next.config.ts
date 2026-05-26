import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["assets.aceternity.com"],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
    ],
  },
};

export default nextConfig;
