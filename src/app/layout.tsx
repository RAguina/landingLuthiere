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

export const metadata: Metadata = {
  title: {
    default: 'Luthier de Cuatros | Instrumentos artesanales',
    template: '%s | Luthier de Cuatros'
  },
  description: 'Cuatro/Quatro artesanal, hecho a mano con maderas seleccionadas. Calidad y sonido únicos.',
  keywords: ['luthier', 'cuatro', 'quatro', 'instrumentos', 'artesanal', 'venezuela'],
  authors: [{ name: 'Tu Nombre' }],
  creator: 'Luthier de Cuatros',
  publisher: 'Luthier de Cuatros',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
    title: 'Luthier de Cuatros | Instrumentos artesanales',
    description: 'Cuatro/Quatro artesanal, hecho a mano con maderas seleccionadas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cuatro artesanal - Luthier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luthier de Cuatros | Instrumentos artesanales',
    description: 'Cuatro/Quatro artesanal, hecho a mano con maderas seleccionadas.',
    creator: '@tucuenta',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'tu_codigo_google_aqui',
  },
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-neutral text-primary antialiased">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Skip link para accesibilidad */}
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