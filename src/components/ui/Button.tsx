// src/components/ui/Button.tsx
import React from 'react'
import { ButtonSpinner } from '../LoadingSpinner'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types'

const buttonVariants = {
  primary: 'bg-primary text-neutral hover:bg-secondary hover:text-dark focus:ring-accent',
  secondary: 'bg-secondary text-dark hover:bg-accent hover:text-neutral focus:ring-primary',
  accent: 'bg-accent text-neutral hover:bg-primary hover:text-neutral focus:ring-secondary',
  outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-neutral focus:ring-accent',
  ghost: 'text-primary hover:bg-primary/10 focus:ring-accent',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
}

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2 text-base',
  lg: 'px-8 py-3 text-lg',
  xl: 'px-10 py-4 text-xl'
}

interface ExtendedButtonProps extends ButtonProps {
  variant?: keyof typeof buttonVariants
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-lg font-semibold',
          'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
          'border-none cursor-pointer shadow-card',
          
          // Variant styles
          buttonVariants[variant],
          
          // Size styles
          buttonSizes[size],
          
          // Full width
          fullWidth && 'w-full',
          
          // Disabled styles
          isDisabled && 'opacity-50 cursor-not-allowed',
          
          // Custom className
          className
        )}
        {...props}
      >
        {/* Left Icon */}
        {leftIcon && !loading && (
          <span className="mr-2 flex-shrink-0">
            {leftIcon}
          </span>
        )}

        {/* Loading Spinner */}
        {loading && (
          <span className="mr-2">
            <ButtonSpinner size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
          </span>
        )}

        {/* Button Text */}
        <span className={loading ? 'opacity-70' : ''}>
          {children}
        </span>

        {/* Right Icon */}
        {rightIcon && !loading && (
          <span className="ml-2 flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Specific button variants for common use cases
export function PrimaryButton(props: Omit<ExtendedButtonProps, 'variant'>) {
  return <Button variant="primary" {...props} />
}

export function SecondaryButton(props: Omit<ExtendedButtonProps, 'variant'>) {
  return <Button variant="secondary" {...props} />
}

export function OutlineButton(props: Omit<ExtendedButtonProps, 'variant'>) {
  return <Button variant="outline" {...props} />
}

export function GhostButton(props: Omit<ExtendedButtonProps, 'variant'>) {
  return <Button variant="ghost" {...props} />
}