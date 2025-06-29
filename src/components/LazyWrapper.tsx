// src/components/LazyWrapper.tsx - Para lazy loading de componentes
import { Suspense } from 'react'
import { SkeletonCard } from './SkeletonLoader'

export function LazyWrapper({ 
  children, 
  fallback = <SkeletonCard /> 
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}