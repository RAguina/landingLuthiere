// src/lib/validations.ts
import { z } from 'zod'

// ===========================
// CONTACT FORM VALIDATIONS
// ===========================
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, 'El nombre solo debe contener letras y espacios'),
  
  email: z.string()
    .email('Por favor ingresa un email válido')
    .min(1, 'El email es requerido')
    .max(100, 'El email es demasiado largo'),
  
  phone: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true // Campo opcional
      // Formato español: +34 6XX XXX XXX, +34 9XX XXX XXX o 6XX XXX XXX, 9XX XXX XXX
      const phoneRegex = /^(\+34[\s-]?)?[679]\d{2}[\s-]?\d{3}[\s-]?\d{3}$/
      return phoneRegex.test(val.replace(/\s/g, ''))
    }, 'Formato de teléfono español inválido'),
  
  subject: z.string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede exceder 100 caracteres'),
  
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
  
  instrumentType: z.enum([
    'guitarra-clasica',
    'guitarra-flamenca', 
    'guitarra-acustica',
    'guitarra-personalizada',
    'reparacion',
    'consultoria',
    'otro',
    ''
  ]).optional(),
  
  budget: z.enum([
    '300-800',
    '800-1500',
    '1500-3000',
    '3000+',
    'consultar',
    ''
  ]).optional()
})

// ===========================
// CUSTOM ORDER FORM VALIDATIONS
// ===========================
export const customOrderSchema = contactFormSchema.extend({
  instrumentType: z.enum([
    'guitarra-clasica',
    'guitarra-flamenca',
    'guitarra-acustica',
    'guitarra-personalizada',
    'mandolina',
    'bandurria',
    'laud',
    'otro'
  ], {
    required_error: 'Por favor selecciona un tipo de instrumento'
  }),
  
  preferredMaterials: z.string()
    .max(200, 'La descripción de materiales no puede exceder 200 caracteres')
    .optional(),
  
  specialRequirements: z.string()
    .max(500, 'Los requerimientos especiales no pueden exceder 500 caracteres')
    .optional(),
  
  timeline: z.enum([
    'urgente', // 2-4 semanas
    'normal',  // 1-2 meses
    'flexible', // 3-4 meses
    'sin-prisa' // Cuando esté listo
  ]).optional(),
  
  budget: z.enum([
    '300-800',
    '800-1500',
    '1500-3000',
    '3000+',
    'consultar'
  ], {
    required_error: 'Por favor selecciona un rango de presupuesto'
  })
})

// ===========================
// NEWSLETTER SUBSCRIPTION
// ===========================
export const newsletterSchema = z.object({
  email: z.string()
    .email('Por favor ingresa un email válido')
    .min(1, 'El email es requerido'),
  
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .optional(),
  
  interests: z.array(z.enum([
    'nuevos-instrumentos',
    'proceso-construccion',
    'eventos',
    'promociones'
  ])).optional()
})

// ===========================
// SEARCH/FILTER VALIDATIONS
// ===========================
export const galleryFilterSchema = z.object({
  category: z.enum([
    'all',
    'finished',
    'process',
    'materials',
    'workshop'
  ]).default('all'),
  
  search: z.string()
    .max(50, 'La búsqueda no puede exceder 50 caracteres')
    .optional(),
  
  sortBy: z.enum([
    'newest',
    'oldest',
    'featured',
    'title'
  ]).default('newest'),
  
  limit: z.number()
    .min(1)
    .max(50)
    .default(12)
})

// ===========================
// USER FEEDBACK VALIDATIONS
// ===========================
export const testimonialSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  
  email: z.string()
    .email('Por favor ingresa un email válido'),
  
  rating: z.number()
    .min(1, 'La calificación mínima es 1')
    .max(5, 'La calificación máxima es 5'),
  
  comment: z.string()
    .min(10, 'El comentario debe tener al menos 10 caracteres')
    .max(500, 'El comentario no puede exceder 500 caracteres'),
  
  instrumentType: z.string()
    .max(50, 'El tipo de instrumento no puede exceder 50 caracteres')
    .optional(),
  
  location: z.string()
    .max(100, 'La ubicación no puede exceder 100 caracteres')
    .optional(),
  
  allowPublicDisplay: z.boolean()
    .default(true)
})

// ===========================
// ADDRESS VALIDATION (España)
// ===========================
export const addressSchema = z.object({
  street: z.string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(100, 'La dirección no puede exceder 100 caracteres'),
  
  city: z.string()
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'La ciudad no puede exceder 50 caracteres'),
  
  province: z.enum([
    'A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias',
    'Ávila', 'Badajoz', 'Baleares', 'Barcelona', 'Burgos', 'Cáceres',
    'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca',
    'Girona', 'Granada', 'Guadalajara', 'Gipuzkoa', 'Huelva', 'Huesca',
    'Jaén', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Ourense', 'Palencia',
    'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Segovia',
    'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia',
    'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
  ]),
  
  postalCode: z.string()
    .regex(/^[0-5]\d{4}$/, 'El código postal debe tener 5 dígitos y ser válido para España')
    .length(5, 'El código postal debe tener exactamente 5 dígitos')
})

// ===========================
// TYPE EXPORTS
// ===========================
export type ContactFormData = z.infer<typeof contactFormSchema>
export type CustomOrderData = z.infer<typeof customOrderSchema>
export type NewsletterData = z.infer<typeof newsletterSchema>
export type GalleryFilterData = z.infer<typeof galleryFilterSchema>
export type TestimonialData = z.infer<typeof testimonialSchema>
export type AddressData = z.infer<typeof addressSchema>

// ===========================
// VALIDATION HELPERS
// ===========================
export function validateEmail(email: string): boolean {
  const emailSchema = z.string().email()
  try {
    emailSchema.parse(email)
    return true
  } catch {
    return false
  }
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true // Optional
  // Formato español: +34 6XX XXX XXX, +34 9XX XXX XXX o 6XX XXX XXX, 9XX XXX XXX
  const phoneRegex = /^(\+34[\s-]?)?[679]\d{2}[\s-]?\d{3}[\s-]?\d{3}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function validateSpanishPostalCode(postalCode: string): boolean {
  // Códigos postales españoles: 00000-52999
  const postalRegex = /^[0-5]\d{4}$/
  return postalRegex.test(postalCode)
}

export function validateSpanishNIF(nif: string): boolean {
  // Validación básica de NIF español (8 números + 1 letra)
  const nifRegex = /^\d{8}[A-Z]$/
  if (!nifRegex.test(nif.toUpperCase())) return false
  
  // Validación del dígito de control
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
  const numbers = nif.slice(0, 8)
  const letter = nif.slice(8).toUpperCase()
  const expectedLetter = letters[parseInt(numbers) % 23]
  
  return letter === expectedLetter
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000) // Limit length
}

// ===========================
// SPANISH SPECIFIC HELPERS
// ===========================
export function formatSpanishPhone(phone: string): string {
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

export function formatSpanishPostalCode(postalCode: string): string {
  // Formato estándar español: XXXXX
  const cleaned = postalCode.replace(/\D/g, '').slice(0, 5)
  return cleaned.padStart(5, '0')
}

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

// ===========================
// ERROR FORMATTERS
// ===========================
export function formatZodError(error: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {}
  
  error.errors.forEach((err) => {
    const path = err.path.join('.')
    formattedErrors[path] = err.message
  })
  
  return formattedErrors
}

// ===========================
// SPANISH INSTRUMENTS SPECIFIC
// ===========================
export const spanishInstrumentTypes = [
  { value: 'guitarra-clasica', label: 'Guitarra Clásica' },
  { value: 'guitarra-flamenca', label: 'Guitarra Flamenca' },
  { value: 'guitarra-acustica', label: 'Guitarra Acústica' },
  { value: 'guitarra-personalizada', label: 'Guitarra Personalizada' },
  { value: 'mandolina', label: 'Mandolina' },
  { value: 'bandurria', label: 'Bandurria' },
  { value: 'laud', label: 'Laúd' },
  { value: 'reparacion', label: 'Reparación/Restauración' },
  { value: 'consultoria', label: 'Consultoría' },
  { value: 'otro', label: 'Otro' }
] as const

export const spanishBudgetRanges = [
  { value: '300-800', label: '300€ - 800€' },
  { value: '800-1500', label: '800€ - 1.500€' },
  { value: '1500-3000', label: '1.500€ - 3.000€' },
  { value: '3000+', label: '3.000€+' },
  { value: 'consultar', label: 'Prefiero consultar' }
] as const