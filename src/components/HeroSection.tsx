// src/components/HeroSection.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown, Music, Award, Clock } from 'lucide-react'

const features = [
  {
    icon: Music,
    title: 'Artesanía Tradicional',
    description: 'Técnicas ancestrales venezolanas'
  },
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Maderas seleccionadas a mano'
  },
  {
    icon: Clock,
    title: 'Dedicación Exclusiva',
    description: 'Cada instrumento es único'
  }
]

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-cuatro.jpg" // Asegúrate de tener esta imagen
          alt="Cuatro artesanal"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral/90 via-neutral/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight">
                <span className="text-primary">Cuatros</span>
                <br />
                <span className="text-accent">Artesanales</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-primary/80 max-w-2xl leading-relaxed">
                Instrumentos únicos creados con técnicas tradicionales venezolanas. 
                Cada cuatro cuenta una historia de pasión y dedicación artesanal.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn text-lg px-8 py-4"
              >
                Ver Galería
              </button>
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn bg-secondary text-dark hover:bg-accent hover:text-neutral text-lg px-8 py-4"
              >
                Solicitar Presupuesto
              </button>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`text-center space-y-2 transition-all duration-700 delay-${index * 200} ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                >
                  <feature.icon className="w-8 h-8 mx-auto text-accent" />
                  <h3 className="font-semibold text-primary">{feature.title}</h3>
                  <p className="text-sm text-primary/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual Element (opcional) */}
          <div className={`hidden lg:block transition-all duration-1200 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="card bg-neutral/50 backdrop-blur-sm p-8 space-y-4">
                <h3 className="text-2xl font-serif font-bold text-primary">
                  ¿Por qué elegir un cuatro artesanal?
                </h3>
                <ul className="space-y-3 text-primary/80">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Sonido único y resonancia natural</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Maderas seleccionadas por su calidad</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Acabado y detalles personalizados</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Tradición y cultura venezolana</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary hover:text-accent transition-colors animate-bounce"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  )
}