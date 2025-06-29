// src/components/ContactForm.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react'
import { Button } from './ui/Button'
import { Input, Textarea, Select } from './ui/Input'
import { cn } from '@/lib/utils'
import type { ContactFormData } from '@/types'

// Validation Schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: z.string()
    .email('Por favor ingresa un email válido')
    .min(1, 'El email es requerido'),
  phone: z.string()
    .optional()
    .refine((val) => !val || val.length >= 10, 'El teléfono debe tener al menos 10 dígitos'),
  subject: z.string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede exceder 100 caracteres'),
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
  instrumentType: z.string().optional(),
  budget: z.string().optional()
})

type ContactFormType = z.infer<typeof contactSchema>

const instrumentOptions = [
  { value: '', label: 'Selecciona un tipo (opcional)' },
  { value: 'cuatro-tradicional', label: 'Cuatro Tradicional' },
  { value: 'cuatro-concierto', label: 'Cuatro de Concierto' },
  { value: 'cuatro-personalizado', label: 'Cuatro Personalizado' },
  { value: 'reparacion', label: 'Reparación/Restauración' },
  { value: 'consultoria', label: 'Consultoría' },
  { value: 'otro', label: 'Otro' }
]

const budgetOptions = [
  { value: '', label: 'Selecciona un rango (opcional)' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2000', label: '$1,000 - $2,000' },
  { value: '2000-3000', label: '$2,000 - $3,000' },
  { value: '3000+', label: '$3,000+' },
  { value: 'consultar', label: 'Prefiero consultar' }
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange'
  })

  // Watch character counts for feedback
  const messageValue = watch('message', '')
  const subjectValue = watch('subject', '')

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

  // Form submission handler
  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call - Replace with actual email service
      await simulateEmailSend(data)
      
      setSubmitStatus('success')
      reset()
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
      
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
      
      // Reset error state after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-primary text-neutral"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold">
                Conversemos sobre
                <span className="text-accent block">Tu Instrumento</span>
              </h2>
              
              <div className="w-24 h-1 bg-accent rounded-full"></div>
              
              <p className="text-xl leading-relaxed text-neutral/90">
                ¿Tienes un proyecto en mente? ¿Necesitas restaurar un instrumento? 
                ¿Quieres conocer más sobre el proceso artesanal? Estoy aquí para ayudarte.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <ContactItem
                icon={<MapPin className="w-6 h-6" />}
                title="Ubicación"
                content="Caracas, Venezuela"
                subtitle="Atendemos en todo el país"
              />
              
              <ContactItem
                icon={<Phone className="w-6 h-6" />}
                title="Teléfono"
                content="+58 414 123 4567"
                subtitle="WhatsApp disponible"
                isLink
                href="https://wa.me/584141234567"
              />
              
              <ContactItem
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                content="contacto@luthier.com"
                subtitle="Respuesta en 24 horas"
                isLink
                href="mailto:contacto@luthier.com"
              />
              
              <ContactItem
                icon={<Clock className="w-6 h-6" />}
                title="Horario de Atención"
                content="Lunes a Viernes: 9:00 AM - 6:00 PM"
                subtitle="Sábados: 10:00 AM - 2:00 PM"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="accent"
                size="lg"
                onClick={() => window.open('https://wa.me/584141234567', '_blank')}
                leftIcon={<span className="text-xl">📱</span>}
              >
                WhatsApp
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('tel:+584141234567')}
                leftIcon={<Phone className="w-5 h-5" />}
                className="border-neutral text-neutral hover:bg-neutral hover:text-primary"
              >
                Llamar Ahora
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="card bg-neutral text-primary p-8">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-serif font-bold">
                    Envíanos un Mensaje
                  </h3>
                  <p className="text-primary/70">
                    Completa el formulario y te contactaremos pronto
                  </p>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 font-medium">¡Mensaje enviado exitosamente!</p>
                      <p className="text-green-700 text-sm">Te contactaremos pronto.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium">Error al enviar el mensaje</p>
                      <p className="text-red-700 text-sm">Por favor intenta nuevamente o contáctanos directamente.</p>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Nombre completo"
                      placeholder="Tu nombre"
                      error={errors.name?.message}
                      {...register('name')}
                      required
                    />
                    
                    <Input
                      label="Email"
                      type="email"
                      placeholder="tu@email.com"
                      error={errors.email?.message}
                      {...register('email')}
                      required
                    />
                  </div>

                  <Input
                    label="Teléfono"
                    type="tel"
                    placeholder="+58 414 123 4567"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />

                  {/* Project Details */}
                  <Select
                    label="Tipo de instrumento"
                    options={instrumentOptions}
                    error={errors.instrumentType?.message}
                    {...register('instrumentType')}
                  />

                  <Select
                    label="Presupuesto estimado"
                    options={budgetOptions}
                    error={errors.budget?.message}
                    {...register('budget')}
                  />

                  {/* Subject */}
                  <div>
                    <Input
                      label="Asunto"
                      placeholder="Describe brevemente tu consulta"
                      error={errors.subject?.message}
                      {...register('subject')}
                      required
                    />
                    <p className="text-xs text-primary/60 mt-1">
                      {subjectValue.length}/100 caracteres
                    </p>
                  </div>

                  {/* Message */}
                  <div>
                    <Textarea
                      label="Mensaje"
                      placeholder="Cuéntanos más detalles sobre lo que necesitas. ¿Qué tipo de cuatro te interesa? ¿Es para uso personal o profesional? ¿Tienes preferencias de madera o diseño?"
                      rows={5}
                      error={errors.message?.message}
                      {...register('message')}
                      required
                    />
                    <p className="text-xs text-primary/60 mt-1">
                      {messageValue.length}/1000 caracteres
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={!isValid || isSubmitting}
                    rightIcon={!isSubmitting && <Send className="w-5 h-5" />}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>

                  {/* Privacy Note */}
                  <p className="text-xs text-primary/60 text-center">
                    Al enviar este formulario, aceptas que te contactemos para responder tu consulta. 
                    Tu información se mantendrá privada y segura.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Item Component
function ContactItem({
  icon,
  title,
  content,
  subtitle,
  isLink = false,
  href
}: {
  icon: React.ReactNode
  title: string
  content: string
  subtitle?: string
  isLink?: boolean
  href?: string
}) {
  const contentElement = (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 p-3 bg-accent/20 rounded-full text-accent">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-neutral">{title}</h4>
        <p className={cn(
          'text-neutral/90',
          isLink && 'hover:text-accent transition-colors cursor-pointer'
        )}>
          {content}
        </p>
        {subtitle && (
          <p className="text-sm text-neutral/70">{subtitle}</p>
        )}
      </div>
    </div>
  )

  if (isLink && href) {
    return (
      <a 
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="block hover:bg-neutral/5 -m-2 p-2 rounded-lg transition-colors"
      >
        {contentElement}
      </a>
    )
  }

  return contentElement
}

// Simulate email sending (replace with actual implementation)
async function simulateEmailSend(data: ContactFormType): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Simulate success/failure (90% success rate)
  if (Math.random() > 0.1) {
    console.log('Email would be sent with data:', data)
    return Promise.resolve()
  } else {
    throw new Error('Simulated email send failure')
  }
  
  // TODO: Implement actual email sending
  // Options:
  // 1. EmailJS: https://www.emailjs.com/
  // 2. Resend: https://resend.com/
  // 3. SendGrid: https://sendgrid.com/
  // 4. Your own API endpoint
}