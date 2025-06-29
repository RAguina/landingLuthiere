// src/app/layout.tsx
import { ThemeProvider } from 'next-themes'
import { Inter, Lora } from 'next/font/google'
import { Metadata } from 'next'
import '../styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true
})

const lora = Lora({ 
  subsets: ['latin'], 
  variable: '--font-lora',
  display: 'swap',
  preload: true
})

// 🏆 METADATA GLOBAL - FORTUNE 500 LEVEL
export const metadata: Metadata = {
  title: {
    default: 'Luthier de Cuatros | Instrumentos Artesanales Venezolanos',
    template: '%s | Luthier de Cuatros'
  },
  description: 'Luthier especializado en cuatros venezolanos artesanales. Instrumentos únicos hechos a mano con maderas seleccionadas y técnicas tradicionales. Calidad profesional para músicos exigentes.',
  keywords: [
    'luthier', 'cuatro venezolano', 'instrumentos artesanales', 
    'música tradicional', 'cuatro artesanal', 'luthería venezolana',
    'instrumentos musicales', 'cuatro profesional', 'música folklórica',
    'artesanía musical', 'maderas selectas', 'tradición musical'
  ],
  authors: [{ name: 'Luthier de Cuatros' }],
  creator: 'Luthier de Cuatros',
  publisher: 'Luthier de Cuatros',
  applicationName: 'Luthier de Cuatros',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tudominio.com/',
    siteName: 'Luthier de Cuatros',
    title: 'Luthier de Cuatros | Instrumentos Artesanales Venezolanos',
    description: 'Luthier especializado en cuatros venezolanos artesanales. Instrumentos únicos hechos a mano con maderas seleccionadas.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cuatro artesanal venezolano - Luthier profesional',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luthier de Cuatros | Instrumentos Artesanales',
    description: 'Luthier especializado en cuatros venezolanos artesanales. Calidad profesional, tradición musical.',
    creator: '@tucuenta',
    site: '@tucuenta',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://tudominio.com/',
  },
  category: 'music',
  // 🔧 Verification será añadida cuando tengas el código real
  // verification: {
  //   google: 'tu_codigo_google_verificado',
  //   yandex: 'tu_codigo_yandex',
  //   'msvalidate.01': 'tu_codigo_bing',
  // },
}

// 🔧 VIEWPORT SEPARADO (Next.js 15+ requirement)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F4EF' },
    { media: '(prefers-color-scheme: dark)', color: '#22212C' }
  ],
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <head>
        {/* 🏆 FORTUNE 500: Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* 🏆 FORTUNE 500: DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* 🏆 FORTUNE 500: Structured data will be added here */}
      </head>
      <body className="min-h-screen bg-neutral text-primary antialiased">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* 🏆 FORTUNE 500: Skip navigation for accessibility */}
          <a href="#main-content" className="skip-link">
            Saltar al contenido principal
          </a>
          
          {/* Main content wrapper */}
          <div id="__next" className="min-h-screen flex flex-col">
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}