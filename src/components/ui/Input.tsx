// src/components/ui/Input.tsx
import React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  variant?: 'default' | 'filled' | 'underlined'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      leftIcon,
      rightIcon,
      fullWidth = true,
      variant = 'default',
      className,
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    const inputVariants = {
      default: 'border border-accent bg-neutral focus:border-secondary',
      filled: 'border-0 bg-secondary/10 focus:bg-secondary/20',
      underlined: 'border-0 border-b-2 border-accent bg-transparent focus:border-secondary rounded-none'
    }

    const getStateClasses = () => {
      if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-200'
      if (success) return 'border-green-500 focus:border-green-500 focus:ring-green-200'
      return inputVariants[variant]
    }

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-primary">
            {label}
            {props.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60">
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              // Base styles
              'w-full px-3 py-2 rounded-md font-sans text-primary',
              'placeholder:text-primary/50',
              'focus:outline-none focus:ring-2 focus:ring-opacity-50',
              'transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              
              // Padding adjustments for icons
              leftIcon && 'pl-10',
              (rightIcon || isPassword || error) && 'pr-10',
              
              // State-based styles
              getStateClasses(),
              
              className
            )}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {/* Error Icon */}
            {error && (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}

            {/* Success Icon */}
            {success && !error && (
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* Password Toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-primary/60 hover:text-primary transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}

            {/* Custom Right Icon */}
            {rightIcon && !isPassword && !error && !success && (
              <div className="text-primary/60">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Textarea Component
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string
    error?: string
    success?: boolean
    fullWidth?: boolean
  }
>(
  (
    {
      label,
      error,
      success,
      fullWidth = true,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const getStateClasses = () => {
      if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-200'
      if (success) return 'border-green-500 focus:border-green-500 focus:ring-green-200'
      return 'border-accent focus:border-secondary'
    }

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-primary">
            {label}
            {props.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full px-3 py-2 rounded-md border bg-neutral font-sans text-primary',
            'placeholder:text-primary/50 resize-y min-h-[100px]',
            'focus:outline-none focus:ring-2 focus:ring-opacity-50',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            getStateClasses(),
            className
          )}
          {...props}
        />

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

// Select Component
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string
    error?: string
    success?: boolean
    fullWidth?: boolean
    options: { value: string; label: string }[]
    placeholder?: string
  }
>(
  (
    {
      label,
      error,
      success,
      fullWidth = true,
      options,
      placeholder,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const getStateClasses = () => {
      if (error) return 'border-red-500 focus:border-red-500'
      if (success) return 'border-green-500 focus:border-green-500'
      return 'border-accent focus:border-secondary'
    }

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-primary">
            {label}
            {props.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        {/* Select */}
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full px-3 py-2 rounded-md border bg-neutral font-sans text-primary',
            'focus:outline-none focus:ring-2 focus:ring-opacity-50',
            'transition-all duration-200 cursor-pointer',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            getStateClasses(),
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'