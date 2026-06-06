/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http',  hostname: '**' },
    ],
  },
  // Tell Next.js not to bundle these Node.js-only packages — required for Vercel
  serverExternalPackages: ['nodemailer', 'bcryptjs', '@vercel/blob', 'mongoose'],
}

module.exports = nextConfig
