// src/components/ErrorBoundary.tsx
"use client"
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div role="alert" className="card text-center my-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2">¡Algo salió mal!</h2>
      <p className="text-red-600">{error.message}</p>
      <button className="btn mt-4" onClick={resetErrorBoundary}>
        Reintentar
      </button>
    </div>
  )
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  )
}
