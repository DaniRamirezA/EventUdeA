# EventUdeA

Aplicación web para descubrir y gestionar eventos universitarios. Esta versión migra a Next.js la experiencia y los flujos del prototipo de Figma Make.

## Tecnologías
- Next.js 15, React 19 y TypeScript
- Tailwind CSS 4
- Supabase (integración preparada; persistencia y autenticación real pendientes)
- Vercel

## Desarrollo local
Requiere Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Completa las variables de Supabase en `.env.local` cuando se conecte el proyecto. Los perfiles y eventos actuales son datos demostrativos en memoria; no representan autenticación ni persistencia reales.
