// src/components/Gallery.tsx
'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Filter, Search, Grid3X3, Grid2X2, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { ImageModal } from './ui/Modal'
import { cn } from '@/lib/utils'
import type { GalleryImage, GalleryCategory } from '@/types'

// Mock data - Reemplaza con tus imágenes reales
const mockImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery/cuatro-tradicional-1.jpg',
    alt: 'Cuatro tradicional con tapa de cedro',
    title: 'Cuatro Tradicional Premium',
    description: 'Cuatro artesanal con tapa de cedro, aros y fondo de caoba. Acabado en goma laca con detalles en nácar.',
    category: 'finished',
    featured: true
  },
  {
    id: '2',
    src: '/images/gallery/proceso-tallado.jpg',
    alt: 'Proceso de tallado del mástil',
    title: 'Tallado Artesanal del Mástil',
    description: 'Proceso detallado de tallado a mano del mástil, respetando las técnicas tradicionales.',
    category: 'process'
  },
  {
    id: '3',
    src: '/images/gallery/maderas-seleccionadas.jpg',
    alt: 'Maderas seleccionadas para instrumentos',
    title: 'Maderas Premium',
    description: 'Selección de maderas de cedro, caoba y ébano, secadas naturalmente por años.',
    category: 'materials'
  },
  {
    id: '4',
    src: '/images/gallery/cuatro-concierto.jpg',
    alt: 'Cuatro de concierto personalizado',
    title: 'Cuatro de Concierto',
    description: 'Modelo especial para conciertos con incrustaciones personalizadas y acabado brillante.',
    category: 'finished',
    featured: true
  },
  {
    id: '5',
    src: '/images/gallery/taller-luteria.jpg',
    alt: 'Vista del taller de lutería',
    title: 'Taller de Lutería',
    description: 'Espacio dedicado donde nacen los instrumentos, con herramientas tradicionales y modernas.',
    category: 'workshop'
  },
  {
    id: '6',
    src: '/images/gallery/barnizado.jpg',
    alt: 'Proceso de barnizado',
    title: 'Proceso de Barnizado',
    description: 'Aplicación cuidadosa de múltiples capas de barniz para proteger y realzar la madera.',
    category: 'process'
  }
]

const categories: GalleryCategory[] = [
  {
    id: 'all',
    name: 'Todos',
    description: 'Ver toda la galería',
    image: '',
    count: mockImages.length
  },
  {
    id: 'finished',
    name: 'Instrumentos Terminados',
    description: 'Cuatros completamente terminados',
    image: '',
    count: mockImages.filter(img => img.category === 'finished').length
  },
  {
    id: 'process',
    name: 'Proceso de Construcción',
    description: 'Pasos del proceso artesanal',
    image: '',
    count: mockImages.filter(img => img.category === 'process').length
  },
  {
    id: 'materials',
    name: 'Materiales',
    description: 'Maderas y materiales utilizados',
    image: '',
    count: mockImages.filter(img => img.category === 'materials').length
  },
  {
    id: 'workshop',
    name: 'Taller',
    description: 'Espacio de trabajo',
    image: '',
    count: mockImages.filter(img => img.category === 'workshop').length
  }
]

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [gridCols, setGridCols] = useState<2 | 3>(3)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Filter images based on category and search
  const filteredImages = useMemo(() => {
    let filtered = mockImages

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(img =>
        img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.alt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [selectedCategory, searchTerm])

  // Categories to show (with toggle for mobile)
  const visibleCategories = useMemo(() => {
    if (showAllCategories) return categories
    return categories.slice(0, 4) // Show first 4 on mobile
  }, [showAllCategories])

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-20 bg-neutral"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center space-y-6 mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary">
            Galería de
            <span className="text-accent block">Instrumentos</span>
          </h2>
          
          <div className="w-24 h-1 bg-accent rounded-full mx-auto"></div>
          
          <p className="text-xl text-primary/80 max-w-3xl mx-auto leading-relaxed">
            Descubre el proceso artesanal y los instrumentos únicos que nacen en nuestro taller. 
            Cada pieza cuenta una historia de tradición y pasión musical.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className={`space-y-6 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <Input
              type="search"
              placeholder="Buscar en la galería..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              className="text-center"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {visibleCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
              >
                {category.name}
                <span className="ml-2 text-xs bg-accent/20 px-2 py-0.5 rounded-full">
                  {category.id === 'all' ? mockImages.length : category.count}
                </span>
              </Button>
            ))}
            
            {/* Show More/Less Categories (Mobile) */}
            {categories.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="md:hidden"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Grid Controls */}
          <div className="flex justify-center items-center space-x-4">
            <span className="text-sm text-primary/60">Vista:</span>
            <div className="flex space-x-1">
              <Button
                variant={gridCols === 2 ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setGridCols(2)}
                className="p-2"
                aria-label="Vista de 2 columnas"
              >
                <Grid2X2 className="w-4 h-4" />
              </Button>
              <Button
                variant={gridCols === 3 ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setGridCols(3)}
                className="p-2"
                aria-label="Vista de 3 columnas"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="text-center mb-8">
          <p className="text-primary/60">
            Mostrando {filteredImages.length} de {mockImages.length} elementos
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>

        {/* Gallery Grid */}
        <div 
          className={cn(
            'grid gap-6 transition-all duration-1000 delay-500',
            gridCols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}
        >
          {filteredImages.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              index={index}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-4">
              <Filter className="w-12 h-12 mx-auto text-primary/40" />
              <h3 className="text-xl font-semibold text-primary">
                No se encontraron resultados
              </h3>
              <p className="text-primary/60 max-w-md mx-auto">
                {searchTerm 
                  ? `No hay imágenes que coincidan con "${searchTerm}"`
                  : 'No hay imágenes en esta categoría'
                }
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
        )}

        {/* Load More Button (Future feature) */}
        {filteredImages.length > 0 && filteredImages.length >= 12 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Cargar más imágenes
            </Button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          src={selectedImage.src}
          alt={selectedImage.alt}
          title={selectedImage.title}
          description={selectedImage.description}
        />
      )}
    </section>
  )
}

// Individual Gallery Card Component
function GalleryCard({
  image,
  index,
  onClick
}: {
  image: GalleryImage
  index: number
  onClick: () => void
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div 
      className={`group cursor-pointer transition-all duration-700 delay-${index * 100}`}
      onClick={onClick}
    >
      <div className="card p-0 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-secondary/10">
          {!hasError ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={cn(
                'object-cover transition-all duration-500',
                'group-hover:scale-110',
                isLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/20">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎸</span>
                </div>
                <p className="text-sm text-primary/60">Imagen no disponible</p>
              </div>
            </div>
          )}

          {/* Featured Badge */}
          {image.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-accent text-neutral text-xs font-semibold px-2 py-1 rounded-full">
                Destacado
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover Info */}
          <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white text-sm font-medium">
              Click para ver en detalle
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-serif font-semibold text-primary group-hover:text-accent transition-colors">
            {image.title || image.alt}
          </h3>
          
          {image.description && (
            <p className="text-sm text-primary/70 leading-relaxed line-clamp-2">
              {image.description}
            </p>
          )}

          {/* Category Tag */}
          <div className="pt-2">
            <span className="text-xs text-accent font-medium">
              {categories.find(cat => cat.id === image.category)?.name || 'General'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}