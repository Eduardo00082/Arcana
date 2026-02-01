/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- Para o Capacitor
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
