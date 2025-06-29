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

// Metadata para SEO
export const metadata: Metadata = {
  title: 'Inicio | Luthier de Cuatros',
  description: 'Descubre instrumentos artesanales únicos. Cuatros venezolanos hechos a mano con maderas seleccionadas y técnicas tradicionales.',
  keywords: ['luthier', 'cuatro venezolano', 'instrumentos artesanales', 'música tradicional'],
  openGraph: {
    title: 'Luthier de Cuatros - Instrumentos Artesanales',
    description: 'Cuatros venezolanos hechos a mano con maderas seleccionadas',
    images: ['/images/hero-cuatro.jpg'],
  },
}

export default function HomePage() {
  return (
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
  )
}