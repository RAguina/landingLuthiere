// src/lib/validations.ts
import { z } from 'zod'

// ===========================
// CONTACT FORM VALIDATIONS
// ===========================
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo debe contener letras y espacios'),
  
  email: z.string()
    .email('Por favor ingresa un email válido')
    .min(1, 'El email es requerido')
    .max(100, 'El email es demasiado largo'),
  
  phone: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true // Optional field
      // Venezuelan phone format: +58 414 123 4567 or 0414 123 4567
      const phoneRegex = /^(\+58|0)(4\d{2}|2\d{2}|5\d{2})[\s-]?\d{3}[\s-]?\d{4}$/
      return phoneRegex.test(val.replace(/\s/g, ''))
    }, 'Formato de teléfono venezolano inválido'),
  
  subject: z.string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede exceder 100 caracteres'),
  
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
  
  instrumentType: z.enum([
    'cuatro-tradicional',
    'cuatro-concierto', 
    'cuatro-personalizado',
    'reparacion',
    'consultoria',
    'otro',
    ''
  ]).optional(),
  
  budget: z.enum([
    '500-1000',
    '1000-2000',
    '2000-3000',
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
    'cuatro-tradicional',
    'cuatro-concierto',
    'cuatro-personalizado',
    'mandolina',
    'bandola',
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
    'urgente', // 1-2 semanas
    'normal',  // 1 mes
    'flexible', // 2-3 meses
    'sin-prisa' // Cuando esté listo
  ]).optional(),
  
  budget: z.enum([
    '500-1000',
    '1000-2000',
    '2000-3000',
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
// TYPE EXPORTS
// ===========================
export type ContactFormData = z.infer<typeof contactFormSchema>
export type CustomOrderData = z.infer<typeof customOrderSchema>
export type NewsletterData = z.infer<typeof newsletterSchema>
export type GalleryFilterData = z.infer<typeof galleryFilterSchema>
export type TestimonialData = z.infer<typeof testimonialSchema>

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
  const phoneRegex = /^(\+58|0)(4\d{2}|2\d{2}|5\d{2})[\s-]?\d{3}[\s-]?\d{4}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000) // Limit length
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