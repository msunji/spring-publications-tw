/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dxzcdb0pm/image/**"
      }
    ]
  }
}

module.exports = nextConfig
