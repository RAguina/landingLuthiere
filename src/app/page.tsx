// src/app/page.tsx
import { Metadata } from 'next'
import { Suspense } from 'react'

// Components
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { About } from '@/components/About'
import { Gallery } from '@/components/Gallery'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'

// Loading components
import { SkeletonCard } from '@/components/SkeletonLoader'
import { LoadingPage } from '@/components/LoadingPage'

// 🏆 METADATA ESPECÍFICO DE LA PÁGINA HOME - FORTUNE 500 LEVEL
export const metadata: Metadata = {
  title: 'Inicio | Luthier de Cuatros Venezolanos',
  description: 'Descubre instrumentos artesanales únicos. Cuatros venezolanos hechos a mano con maderas seleccionadas y técnicas tradicionales. Más de 15 años creando instrumentos de calidad profesional.',
  keywords: [
    'luthier cuatro venezolano', 'instrumentos artesanales Venezuela', 
    'cuatro artesanal', 'música tradicional venezolana', 'luthería profesional',
    'cuatro hecho a mano', 'instrumentos musicales artesanales', 'tradición musical',
    'cuatro de concierto', 'maderas seleccionadas', 'artesano luthier'
  ],
  openGraph: {
    title: 'Luthier de Cuatros - Instrumentos Artesanales Venezolanos',
    description: 'Descubre cuatros venezolanos únicos, hechos a mano con maderas seleccionadas y técnicas tradicionales. Calidad profesional para músicos exigentes.',
    images: ['/images/hero-cuatro.jpg'],
    url: 'https://tudominio.com/',
  },
  twitter: {
    title: 'Luthier de Cuatros - Instrumentos Artesanales',
    description: 'Cuatros venezolanos únicos, hechos a mano con maderas seleccionadas. Tradición y calidad profesional.',
  },
  alternates: {
    canonical: 'https://tudominio.com/',
  },
}

// 🏆 STRUCTURED DATA for Fortune 500 SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Luthier de Cuatros",
  "description": "Luthier especializado en cuatros venezolanos artesanales",
  "url": "https://tudominio.com",
  "telephone": "+58-414-123-4567",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "VE",
    "addressLocality": "Caracas"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "10.4806",
    "longitude": "-66.9036"
  },
  "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-14:00",
  "priceRange": "$500-$3000",
  "image": "https://tudominio.com/images/hero-cuatro.jpg",
  "sameAs": [
    "https://instagram.com/tu_cuenta",
    "https://facebook.com/tu_pagina"
  ]
}

export default function HomePage() {
  return (
    <>
      {/* 🏆 STRUCTURED DATA for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <ErrorBoundary>
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="min-h-screen bg-neutral text-primary">
          {/* Hero Section */}
          <Suspense fallback={<LoadingPage message="Cargando contenido principal..." />}>
            <HeroSection />
          </Suspense>

          {/* About Section */}
          <Suspense fallback={<SkeletonCard />}>
            <About />
          </Suspense>

          {/* Gallery Section */}
          <Suspense fallback={
            <section className="py-16 px-4">
              <div className="container mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              </div>
            </section>
          }>
            <Gallery />
          </Suspense>

          {/* Contact Section */}
          <Suspense fallback={<SkeletonCard />}>
            <ContactForm />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </ErrorBoundary>
    </>
  )
}