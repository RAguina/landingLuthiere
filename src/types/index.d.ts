// src/types/index.d.ts

// ===========================
// TIPOS DE INSTRUMENTOS
// ===========================
export interface Instrument {
  id: string
  name: string
  type: 'cuatro' | 'quatro' | 'mandolina' | 'bandola'
  price: number
  description: string
  images: string[]
  materials: {
    top: string
    back: string
    sides: string
    neck: string
    fingerboard: string
  }
  specifications: {
    scale: string
    nutWidth: string
    bodyLength: string
    bodyWidth: string
    bodyDepth: string
  }
  availability: 'available' | 'sold' | 'custom_order'
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

// ===========================
// TIPOS DE FORMULARIOS
// ===========================
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  instrumentType?: string
  budget?: string
}

export interface CustomOrderFormData extends ContactFormData {
  instrumentType: 'cuatro' | 'quatro' | 'mandolina' | 'bandola' | 'other'
  preferredMaterials?: string
  specialRequirements?: string
  timeline?: string
  budget: string
}

// ===========================
// TIPOS DE UI COMPONENTS
// ===========================
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

// ===========================
// TIPOS DE NAVEGACIÓN
// ===========================
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ size?: number }>
  external?: boolean
}

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

// ===========================
// TIPOS DE GALERÍA
// ===========================
export interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  category?: 'process' | 'finished' | 'materials' | 'workshop'
  featured?: boolean
}

export interface GalleryCategory {
  id: string
  name: string
  description: string
  image: string
  count: number
}

// ===========================
// TIPOS DE TESTIMONIOS
// ===========================
export interface Testimonial {
  id: string
  name: string
  location?: string
  avatar?: string
  rating: number
  comment: string
  instrumentType?: string
  date: Date
  featured?: boolean
}

// ===========================
// TIPOS DE API RESPONSES
// ===========================
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// ===========================
// TIPOS DE CONFIGURACIÓN
// ===========================
export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter?: string
    instagram?: string
    facebook?: string
    youtube?: string
    whatsapp?: string
  }
  contact: {
    email: string
    phone?: string
    address?: string
  }
}

// ===========================
// TIPOS DE HOOKS
// ===========================
export interface UseLocalStorageReturn<T> {
  value: T
  setValue: (value: T | ((prev: T) => T)) => void
  removeValue: () => void
}

// ===========================
// TIPOS DE EVENTOS
// ===========================
export interface FormSubmitEvent<T = any> {
  data: T
  isValid: boolean
  errors?: Record<string, string>
}

// ===========================
// EXTENSIONES DE TIPOS GLOBALES
// ===========================
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

// ===========================
// TIPOS DE UTILIDADES
// ===========================
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type WithId<T> = T & { id: string }
export type WithTimestamps<T> = T & {
  createdAt: Date
  updatedAt: Date
}