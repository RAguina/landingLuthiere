// src/components/LoadingPage.tsx
import { LoadingSpinner } from './LoadingSpinner'

export function LoadingPage({ message = "Cargando..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral">
      <div className="text-center space-y-4">
        <LoadingSpinner size={40} />
        <p className="text-primary font-medium">{message}</p>
      </div>
    </div>
  )
}