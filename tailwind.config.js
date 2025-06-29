/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  // En v4, el tema se define en CSS con @theme, 
  // pero esto ayuda a VS Code a entender tus colores personalizados
  theme: {
    extend: {
      colors: {
        primary: '#4F3824',
        secondary: '#C2A77C', 
        accent: '#6B9080',
        neutral: '#F8F4EF',
        dark: '#22212C',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      boxShadow: {
        'card': '0 2px 8px 0 rgba(60, 50, 10, 0.10)',
      },
      borderRadius: {
        'md': '0.75rem',
      },
      spacing: {
        'lg': '2rem',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(.4,0,.2,1)',
      },
    },
  },
  
  darkMode: 'class', // Para tu .dark class
  plugins: [],
}