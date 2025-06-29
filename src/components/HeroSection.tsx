// src/components/HeroSection.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown, Music, Award, Clock } from 'lucide-react'

const features = [
  {
    icon: Music,
    title: 'Artesanía Tradicional',
    description: 'Técnicas tradicionales españolas'
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
          src="/images/hero-cuatro.jpg" 
          alt="Guitarra artesanal"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight">
                <span className="text-white drop-shadow-lg">Guitarras</span>
                <br />
                <span className="text-accent drop-shadow-lg">Artesanales</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md">
                Instrumentos únicos creados con técnicas tradicionales españolas. 
                Cada guitarra cuenta una historia de pasión y dedicación artesanal.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn text-lg px-8 py-4 bg-primary text-neutral hover:bg-secondary hover:text-dark shadow-lg"
              >
                Ver Galería
              </button>
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn bg-accent text-neutral hover:bg-secondary hover:text-dark text-lg px-8 py-4 shadow-lg"
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
                  <feature.icon className="w-8 h-8 mx-auto text-accent drop-shadow-lg" />
                  <h3 className="font-semibold text-white drop-shadow-md">{feature.title}</h3>
                  <p className="text-sm text-white/80 drop-shadow-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual Element */}
          <div className={`hidden lg:block transition-all duration-1200 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="card bg-white/10 backdrop-blur-md border border-white/20 p-8 space-y-4 shadow-2xl">
                <h3 className="text-2xl font-serif font-bold text-white drop-shadow-md">
                  ¿Por qué elegir una guitarra artesanal?
                </h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 shadow-sm"></span>
                    <span className="drop-shadow-sm">Sonido único y resonancia natural</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 shadow-sm"></span>
                    <span className="drop-shadow-sm">Maderas seleccionadas por su calidad</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 shadow-sm"></span>
                    <span className="drop-shadow-sm">Acabado y detalles personalizados</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 shadow-sm"></span>
                    <span className="drop-shadow-sm">Tradición y cultura españolas</span>
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-accent transition-colors animate-bounce drop-shadow-lg"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  )
}