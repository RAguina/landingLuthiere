// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility para formatear precios en EUROS (España)
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Utility para formatear precios con decimales
export function formatPriceWithDecimals(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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

// Utility para formatear teléfonos ESPAÑOLES
export function formatPhone(phone: string): string {
  // Remover caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '')
  
  // Formato español con prefijo internacional: +34 6XX XXX XXX
  if (cleaned.length === 11 && cleaned.startsWith('34')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  
  // Formato nacional: 6XX XXX XXX
  if (cleaned.length === 9 && ['6', '7', '9'].includes(cleaned[0])) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }
  
  // Si incluye código de país manualmente: 0034 6XX XXX XXX
  if (cleaned.length === 13 && cleaned.startsWith('0034')) {
    return `+34 ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)} ${cleaned.slice(10)}`
  }
  
  return phone // Devolver original si no coincide
}

// Utility para validar teléfono español
export function isValidSpanishPhone(phone: string): boolean {
  if (!phone) return true // Optional field
  const phoneRegex = /^(\+34[\s-]?)?[679]\d{2}[\s-]?\d{3}[\s-]?\d{3}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Utility para capitalizar texto
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Utility para capitalizar cada palabra
export function capitalizeWords(str: string): string {
  return str.split(' ')
    .map(word => capitalize(word))
    .join(' ')
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

// Utility para formatear fechas en español
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Utility para formatear fechas cortas
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

// Utility para formatear números españoles
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num)
}

// Utility para generar slug desde texto
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normalizar caracteres con acentos
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Evitar guiones múltiples
}

// Utility para limpiar texto de caracteres especiales
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/[<>]/g, '') // Remover HTML básico
    .replace(/\s+/g, ' ') // Normalizar espacios
}

// Utility para validar código postal español
export function isValidSpanishPostalCode(postalCode: string): boolean {
  const cleaned = postalCode.replace(/\s/g, '')
  return /^[0-5]\d{4}$/.test(cleaned)
}

// Utility para formatear código postal español
export function formatSpanishPostalCode(postalCode: string): string {
  const cleaned = postalCode.replace(/\D/g, '').slice(0, 5)
  return cleaned.padStart(5, '0')
}

// Utility para obtener provincia desde código postal
export function getProvinceFromPostalCode(postalCode: string): string {
  const code = parseInt(postalCode.substring(0, 2))
  
  const provinces: Record<number, string> = {
    1: 'Álava', 2: 'Albacete', 3: 'Alicante', 4: 'Almería', 5: 'Ávila',
    6: 'Badajoz', 7: 'Baleares', 8: 'Barcelona', 9: 'Burgos', 10: 'Cáceres',
    11: 'Cádiz', 12: 'Castellón', 13: 'Ciudad Real', 14: 'Córdoba', 15: 'A Coruña',
    16: 'Cuenca', 17: 'Girona', 18: 'Granada', 19: 'Guadalajara', 20: 'Gipuzkoa',
    21: 'Huelva', 22: 'Huesca', 23: 'Jaén', 24: 'León', 25: 'Lleida',
    26: 'La Rioja', 27: 'Lugo', 28: 'Madrid', 29: 'Málaga', 30: 'Murcia',
    31: 'Navarra', 32: 'Ourense', 33: 'Asturias', 34: 'Palencia', 35: 'Las Palmas',
    36: 'Pontevedra', 37: 'Salamanca', 38: 'Santa Cruz de Tenerife', 39: 'Cantabria',
    40: 'Segovia', 41: 'Sevilla', 42: 'Soria', 43: 'Tarragona', 44: 'Teruel',
    45: 'Toledo', 46: 'Valencia', 47: 'Valladolid', 48: 'Vizcaya', 49: 'Zamora',
    50: 'Zaragoza', 51: 'Ceuta', 52: 'Melilla'
  }
  
  return provinces[code] || 'Desconocida'
}

// Utility para calcular IVA español
export function calculateIVA(price: number, ivaRate: number = 21): number {
  return (price * ivaRate) / 100
}

// Utility para calcular precio con IVA
export function addIVA(price: number, ivaRate: number = 21): number {
  return price + calculateIVA(price, ivaRate)
}

// Utility para formatear precio con IVA
export function formatPriceWithIVA(price: number, ivaRate: number = 21): string {
  const priceWithIVA = addIVA(price, ivaRate)
  return `${formatPrice(priceWithIVA)} (IVA inc.)`
}

// Utility para detectar horario comercial español
export function isBusinessHours(): boolean {
  const now = new Date()
  const day = now.getDay() // 0 = Domingo, 1 = Lunes, etc.
  const hour = now.getHours()
  
  // Lunes a Viernes: 9:00 - 18:00
  if (day >= 1 && day <= 5) {
    return hour >= 9 && hour < 18
  }
  
  // Sábados: 10:00 - 14:00
  if (day === 6) {
    return hour >= 10 && hour < 14
  }
  
  // Domingos: cerrado
  return false
}

// Utility para obtener saludo según hora del día
export function getGreeting(): string {
  const hour = new Date().getHours()
  
  if (hour < 12) return 'Buenos días'
  if (hour < 18) return 'Buenas tardes'
  return 'Buenas noches'
}

// Utility para convertir bytes a formato legible
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Utility para debounce (útil para búsquedas)
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Utility para throttle (útil para scroll events)
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}