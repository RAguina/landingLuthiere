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
    default: 'Luthier de Guitarras | Instrumentos Artesanales Españoles',
    template: '%s | Luthier de Guitarras'
  },
  description: 'Luthier especializado en guitarras españolas artesanales. Instrumentos únicos hechos a mano con maderas seleccionadas y técnicas tradicionales. Calidad profesional para músicos exigentes.',
  keywords: [
    'luthier', 'guitarra española', 'instrumentos artesanales', 
    'música tradicional', 'guitarra artesanal', 'luthería española',
    'instrumentos musicales', 'guitarra profesional', 'música clásica',
    'artesanía musical', 'maderas selectas', 'tradición musical', 'guitarra flamenca'
  ],
  authors: [{ name: 'Luthier de Guitarras' }],
  creator: 'Luthier de Guitarras',
  publisher: 'Luthier de Guitarras',
  applicationName: 'Luthier de Guitarras',
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
    siteName: 'Luthier de Guitarras',
    title: 'Luthier de Guitarras | Instrumentos Artesanales Españoles',
    description: 'Luthier especializado en guitarras españolas artesanales. Instrumentos únicos hechos a mano con maderas seleccionadas.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guitarra artesanal española - Luthier profesional',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luthier de Guitarras | Instrumentos Artesanales',
    description: 'Luthier especializado en guitarras españolas artesanales. Calidad profesional, tradición musical.',
    creator: '@tucuenta',
    site: '@tucuenta',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://tudominio.com/',
  },
  category: 'music',
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
    <html lang="es" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        {/* 🏆 FORTUNE 500: Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-neutral text-primary antialiased">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="luthier-theme"
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