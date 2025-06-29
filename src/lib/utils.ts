// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility para formatear precios
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

// Utility para delays
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Utility para validar email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Utility para generar IDs únicos
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Utility para formatear teléfonos venezolanos
export function formatPhone(phone: string): string {
  // Remover caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '')
  
  // Formato venezolano: +58 414 123 4567
  if (cleaned.length === 11 && cleaned.startsWith('58')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  
  // Formato local: 0414 123 4567
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  }
  
  return phone
}

// Utility para capitalizar texto
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Utility para truncar texto
export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}...` : str
}

// Utility para detectar device móvil
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

// Utility para scroll suave a elemento
export function scrollToElement(id: string, offset: number = 80): void {
  const element = document.getElementById(id)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}