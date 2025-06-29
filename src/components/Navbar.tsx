// src/components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Music } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import type { NavItem } from '@/types'

const navigation: NavItem[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Contacto', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to sections
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsOpen(false)
      }
    }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-neutral/95 backdrop-blur-md shadow-lg border-b border-secondary/20' 
          : 'bg-black/30 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/"
            className={`flex items-center space-x-2 font-serif font-bold text-xl transition-colors ${
              isScrolled 
                ? 'text-primary hover:text-accent' 
                : 'text-white hover:text-accent drop-shadow-lg'
            }`}
          >
            <Music className="w-6 h-6" />
            <span>Luthier</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`font-medium transition-colors ${
                  isScrolled 
                    ? 'text-primary hover:text-accent' 
                    : 'text-white hover:text-accent drop-shadow-md'
                }`}
              >
                {item.label}
              </button>
            ))}
            <ThemeSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled 
                  ? 'text-primary hover:text-accent hover:bg-secondary/10' 
                  : 'text-white hover:text-accent hover:bg-white/10 backdrop-blur-sm'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-neutral/95 backdrop-blur-md border-b border-secondary/20 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-primary hover:text-accent transition-colors font-medium py-2 px-4 rounded-lg hover:bg-secondary/10"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}