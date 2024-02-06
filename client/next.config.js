/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/userhome',
        permanent: true,
      },
    ]
  },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Cross-Origin-Opener-Policy",
              value: "same-origin-allow-popups", 
            },
          ],
        },
      ];
    },
  };
