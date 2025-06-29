// src/components/ThemeSwitcher.tsx
"use client"
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // No renderizar hasta que esté mounted
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
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-neutral/10 backdrop-blur-sm border border-neutral/20 text-primary hover:bg-neutral/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={`Cambiar a modo ${currentTheme === 'dark' ? 'claro' : 'oscuro'}`}
      title={`Modo actual: ${currentTheme === 'dark' ? 'Oscuro' : 'Claro'}`}
    >
      {currentTheme === 'dark' ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-blue-600" />
      )}
    </button>
  )
}

// Versión con 3 opciones (light/dark/system)
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
    { value: 'light', icon: Sun, label: 'Claro' },
    { value: 'dark', icon: Moon, label: 'Oscuro' }, 
    { value: 'system', icon: Monitor, label: 'Sistema' }
  ]

  return (
    <div className="flex rounded-lg bg-neutral/10 backdrop-blur-sm border border-neutral/20 p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-2 rounded transition-all duration-200 ${
            theme === value
              ? 'bg-accent text-neutral shadow-sm'
              : 'text-primary/70 hover:text-primary hover:bg-neutral/20'
          }`}
          aria-label={`Cambiar a modo ${label.toLowerCase()}`}
          title={label}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  )
}