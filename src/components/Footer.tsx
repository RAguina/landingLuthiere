// src/components/Footer.tsx
import Link from 'next/link'
import { Music, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/tu_cuenta',
    icon: Instagram,
    color: 'hover:text-pink-500'
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/tu_pagina',
    icon: Facebook,
    color: 'hover:text-blue-500'
  },
  {
    name: 'Email',
    href: 'mailto:contacto@luthier.com',
    icon: Mail,
    color: 'hover:text-accent'
  }
]

const quickLinks = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre Mí', href: '#about' },
  { name: 'Galería', href: '#gallery' },
  { name: 'Contacto', href: '#contact' },
]

const services = [
  'Cuatros Tradicionales',
  'Instrumentos Personalizados',
  'Reparación y Mantenimiento',
  'Consultoría Musical',
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-primary text-neutral">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-accent" />
              <span className="text-2xl font-serif font-bold">Luthier de Cuatros</span>
            </div>
            
            <p className="text-neutral/80 leading-relaxed">
              Preservando la tradición musical venezolana a través de instrumentos 
              artesanales únicos, creados con pasión y técnicas ancestrales.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-neutral/10 transition-all duration-300 hover:bg-neutral/20 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-accent">
              Navegación
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-neutral/80 hover:text-accent transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-accent">
              Servicios
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-neutral/80">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-accent">
              Contacto
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-neutral/80">
                  <p>Caracas, Venezuela</p>
                  <p className="text-sm">Atendemos en todo el país</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a 
                  href="tel:+584141234567" 
                  className="text-neutral/80 hover:text-accent transition-colors"
                >
                  +58 414 123 4567
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a 
                  href="mailto:contacto@luthier.com" 
                  className="text-neutral/80 hover:text-accent transition-colors"
                >
                  contacto@luthier.com
                </a>
              </div>
            </div>

            {/* WhatsApp Button */}
            <button 
              onClick={() => window.open('https://wa.me/584141234567', '_blank')}
              className="btn bg-green-600 hover:bg-green-700 text-white w-full"
            >
              <span className="text-xl mr-2">📱</span>
              WhatsApp
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral/60 text-sm">
              © {currentYear} Luthier de Cuatros. Todos los derechos reservados.
            </p>
            
            <div className="flex space-x-6 text-sm text-neutral/60">
              <Link href="/privacidad" className="hover:text-accent transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-accent transition-colors">
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}