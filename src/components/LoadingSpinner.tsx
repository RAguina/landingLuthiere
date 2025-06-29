// src/components/LoadingSpinner.tsx
import { cn } from '@/lib/utils'


interface LoadingSpinnerProps {
  size?: number
  className?: string
  variant?: 'default' | 'accent' | 'secondary'
}

export function LoadingSpinner({ 
  size = 20, 
  className = "",
  variant = 'default'
}: LoadingSpinnerProps) {
  const variants = {
    default: 'border-accent border-t-transparent',
    accent: 'border-primary border-t-transparent', 
    secondary: 'border-secondary border-t-transparent'
  }

  return (
    <div 
      className={cn(
        'inline-block animate-spin rounded-full border-2',
        variants[variant],
        className
      )}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Cargando..."
    >
      <span className="sr-only">Cargando...</span>
    </div>
  )
}

// Variante con texto
export function LoadingWithText({ 
  message = "Cargando...",
  size = 24 
}: { 
  message?: string
  size?: number 
}) {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size={size} />
      <span className="text-primary font-medium">{message}</span>
    </div>
  )
}

// Variante para botones
export function ButtonSpinner({ size = 16 }: { size?: number }) {
  return (
    <LoadingSpinner 
      size={size} 
      className="text-current" 
      variant="default"
    />
  )
}