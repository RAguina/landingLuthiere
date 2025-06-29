# 🎸 Landing Luthiere

Sitio web profesional para luthier especializado en cuatros venezolanos artesanales.

## 🎯 Características

- ✅ **Next.js 15** con TypeScript
- ✅ **Tailwind CSS v4** para estilos
- ✅ **Dark Mode** automático y manual
- ✅ **Galería interactiva** con filtros
- ✅ **Formulario de contacto** con validación
- ✅ **Responsive design** móvil-first
- ✅ **SEO optimizado** para buscadores
- ✅ **Accesibilidad AAA** (WCAG 2.1)
- ✅ **Performance optimizada** (Lighthouse 90+)

## 🚀 Tecnologías

### Frontend
- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utilitarios
- **Framer Motion** - Animaciones

### Formularios
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

### UI/UX
- **Lucide React** - Iconos
- **Next Themes** - Dark mode
- **React Error Boundary** - Manejo de errores

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/R4guBo3/landingLuthiere.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 🎨 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── styles/
│       └── globals.css    # Estilos globales Tailwind
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Button, Modal, Input)
│   ├── Gallery.tsx       # Galería de instrumentos
│   ├── ContactForm.tsx   # Formulario de contacto
│   ├── HeroSection.tsx   # Sección principal
│   ├── About.tsx         # Sobre el luthier
│   ├── Footer.tsx        # Pie de página
│   └── Navbar.tsx        # Navegación
├── lib/                  # Utilidades
│   ├── utils.ts          # Funciones utilitarias
│   └── validations.ts    # Esquemas de validación
└── types/                # Definiciones TypeScript
    └── index.d.ts        # Tipos globales
```

## 🎨 Paleta de Colores

- **Primary**: `#4F3824` (Marrón madera)
- **Secondary**: `#C2A77C` (Beige dorado)
- **Accent**: `#6B9080` (Verde musgo)
- **Neutral**: `#F8F4EF` (Fondo claro)
- **Dark**: `#22212C` (Fondo oscuro)

## 📱 Secciones

1. **Hero** - Presentación impactante
2. **About** - Historia del luthier
3. **Gallery** - Galería de instrumentos
4. **Contact** - Formulario de contacto

## 🔧 Configuración

### Variables de Entorno (opcional)

```bash
# .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=tu_user_id
```

### EmailJS Setup

1. Crear cuenta en [EmailJS](https://www.emailjs.com/)
2. Configurar servicio de email
3. Crear template de email
4. Añadir variables de entorno

## 📈 Performance

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🌐 Deployment

### Vercel (Recomendado)
```bash
npx vercel --prod
```

### Netlify
```bash
npm run build
# Subir carpeta 'out' a Netlify
```

## 👨‍💻 Desarrollo

```bash
# Ejecutar linter
npm run lint

# Verificar tipos
npm run type-check

# Analizar bundle
npm run analyze
```

## 📞 Contacto

Para consultas sobre el desarrollo del sitio:
- **Desarrollador**: [Tu nombre]
- **Email**: [tu-email@ejemplo.com]

## 📄 Licencia

Este proyecto está bajo licencia privada para uso del cliente.

---

*Desarrollado con ❤️ para preservar la tradición musical venezolana*