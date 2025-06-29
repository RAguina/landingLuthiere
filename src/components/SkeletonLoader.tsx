// src/components/SkeletonLoader.tsx
interface SkeletonProps {
  className?: string
  width?: string
  height?: string
  rounded?: boolean
}

export function Skeleton({ 
  className = "", 
  width = "100%", 
  height = "20px", 
  rounded = false 
}: SkeletonProps) {
  return (
    <div 
      className={`bg-secondary/20 animate-pulse ${rounded ? 'rounded-full' : 'rounded'} ${className}`}
      style={{ width, height }}
      role="status"
      aria-label="Cargando contenido..."
    >
      <span className="sr-only">Cargando contenido...</span>
    </div>
  )
}

// Skeleton presets comunes
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton 
          key={i}
          height="16px"
          width={i === lines - 1 ? "75%" : "100%"}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="card space-y-4">
      <Skeleton height="200px" className="rounded-lg" />
      <div className="space-y-2">
        <Skeleton height="24px" width="60%" />
        <SkeletonText lines={2} />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton height="32px" width="80px" className="rounded-full" />
        <Skeleton height="40px" width="120px" className="rounded-lg" />
      </div>
    </div>
  )
}