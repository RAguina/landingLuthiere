import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modo estricto de React para detectar problemas
  reactStrictMode: true,
  
  // Configuración de imágenes optimizadas
  images: {
    // Formatos modernos - se generan ADEMÁS de los originales
    formats: ['image/avif', 'image/webp'],
    
    // Tamaños de dispositivo para generar imágenes responsive
    // Next.js creará versiones optimizadas para estos anchos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    
    // Tamaños de imagen para breakpoints más pequeños
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Dominios externos permitidos (si usas imágenes de CDNs)
    remotePatterns: [
      // Ejemplo: permitir imágenes de Unsplash
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
    ],
    
    // Tiempo de caché en segundos (31 días por defecto)
    minimumCacheTTL: 60 * 60 * 24 * 31,
    
    // Deshabilitar la optimización estática en build (útil para desarrollo)
    // unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Configuración de headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
  
  // Configuración experimental (úsala con cuidado)
  experimental: {
    // Optimizar el bundle de CSS
    optimizeCss: true,
    
    // Mejorar la velocidad de build
    // turbo: {
    //   resolveAlias: {
    //     'react': 'react',
    //     'react-dom': 'react-dom',
    //   },
    // },
  },
  
  // Configuración de compilación
  compiler: {
    // Remover console.log en producción
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Configuración de TypeScript
  typescript: {
    // Durante el build, Next.js fallará si hay errores de TypeScript
    ignoreBuildErrors: false,
  },
  
  // Configuración de ESLint
  eslint: {
    // Durante el build, Next.js fallará si hay errores de ESLint
    ignoreDuringBuilds: false,
  },
  
  // Configuración de output
  output: 'standalone', // Útil para Docker
  
  // Trailing slash (añadir / al final de las URLs)
  trailingSlash: false,
  
  // Configuración de i18n (si necesitas múltiples idiomas)
  // i18n: {
  //   locales: ['es', 'en'],
  //   defaultLocale: 'es',
  // },
};

export default nextConfig;