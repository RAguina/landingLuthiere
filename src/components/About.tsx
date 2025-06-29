// src/components/About.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Users, Award, Calendar, Music2 } from 'lucide-react'

const stats = [
  {
    icon: Calendar,
    number: '15+',
    label: 'Años de Experiencia',
    description: 'Perfeccionando el arte de la lutería',
    delay: 'delay-[600ms]' // Clase estática
  },
  {
    icon: Music2,
    number: '200+',
    label: 'Instrumentos Creados',
    description: 'Cada uno único y especial',
    delay: 'delay-[750ms]'
  },
  {
    icon: Users,
    number: '150+',
    label: 'Músicos Satisfechos',
    description: 'En España y el mundo',
    delay: 'delay-[900ms]'
  },
  {
    icon: Award,
    number: '5',
    label: 'Reconocimientos',
    description: 'Por preservar la tradición',
    delay: 'delay-[1050ms]'
  }
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section bg-neutral">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary">
                La Pasión por la
                <span className="text-accent block mt-2">Lutería Tradicional</span>
              </h2>
              
              <div className="w-24 h-1 bg-accent rounded-full"></div>
              
              <div className="space-y-6 text-lg leading-relaxed text-primary/80">
                <p>
                  Desde hace más de 15 años, me dedico a preservar y perpetuar el arte 
                  tradicional de la construcción de guitarras españolas. Cada instrumento 
                  que sale de mi taller es resultado de técnicas ancestrales combinadas 
                  con mi pasión por la música.
                </p>
                
                <p>
                  Utilizo exclusivamente maderas seleccionadas: cedro para las tapas, 
                  palo santo para aros y fondos, y ébano para los diapasones. Cada pieza 
                  es cuidadosamente elegida para garantizar no solo la belleza visual, 
                  sino también la calidad sonora excepcional.
                </p>
                
                <p>
                  Mi compromiso va más allá de la construcción: es preservar nuestra 
                  cultura musical para las futuras generaciones.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn"
              >
                Ver Mi Trabajo
              </button>
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-secondary"
              >
                Conversar Conmigo
              </button>
            </div>
          </div>

          {/* Image & Stats */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            {/* Main Image */}
            <div className="relative">
              <div className="card card-hover p-0 overflow-hidden">
                <Image
                  src="/images/luthier-working.jpg"
                  alt="Luthier trabajando en su taller"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`card card-hover text-center space-y-3 transition-all duration-700 ${stat.delay} ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                >
                  <stat.icon className="w-8 h-8 mx-auto text-accent" />
                  <div>
                    <div className="text-3xl font-bold text-primary font-serif">
                      {stat.number}
                    </div>
                    <div className="font-semibold text-primary text-sm">
                      {stat.label}
                    </div>
                    <div className="text-xs text-primary/60 leading-relaxed mt-1">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}