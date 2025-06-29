"use client"
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-2 w-10 h-10 rounded-lg bg-neutral/10 animate-pulse" />
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  const toggleTheme = () => {
    if (currentTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-neutral/10 backdrop-blur-sm border border-neutral/20 text-primary hover:bg-neutral/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent overflow-hidden"
      aria-label={`Cambiar a modo ${currentTheme === 'dark' ? 'claro' : 'oscuro'}`}
      title={`Modo actual: ${currentTheme === 'dark' ? 'Oscuro' : 'Claro'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {currentTheme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={20} className="text-yellow-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={20} className="text-blue-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Versión con 3 opciones mejorada
export function AdvancedThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-32 h-10 bg-neutral/10 rounded-lg animate-pulse" />
  }

  const themes = [
    { value: 'light', icon: Sun, label: 'Claro', color: 'text-yellow-500' },
    { value: 'dark', icon: Moon, label: 'Oscuro', color: 'text-blue-600' }, 
    { value: 'system', icon: Monitor, label: 'Sistema', color: 'text-accent' }
  ]

  return (
    <div className="relative flex rounded-lg bg-neutral/10 backdrop-blur-sm border border-neutral/20 p-1">
      {/* Indicador deslizante */}
      <motion.div
        className="absolute h-[calc(100%-8px)] bg-accent rounded"
        layoutId="theme-indicator"
        initial={false}
        animate={{
          x: themes.findIndex(t => t.value === theme) * 40,
          width: 36
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      
      {themes.map(({ value, icon: Icon, label, color }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`relative z-10 p-2 rounded transition-all duration-200 w-9 ${
            theme === value
              ? 'text-neutral'
              : 'text-primary/70 hover:text-primary'
          }`}
          aria-label={`Cambiar a modo ${label.toLowerCase()}`}
          title={label}
        >
          <Icon size={16} className={theme === value ? '' : color} />
        </button>
      ))}
    </div>
  )
}

// Hook personalizado para tema
export function useThemeConfig() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme

  return {
    theme: currentTheme,
    setTheme,
    mounted,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
    toggle: () => setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }
}