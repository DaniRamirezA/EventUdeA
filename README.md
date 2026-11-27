# EventUdeA

Portal web para descubrir y gestionar eventos universitarios.

## Stack
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4
- Supabase (PostgreSQL, Auth y Storage)
- Despliegue previsto en Vercel

## Requisitos
- Node.js 20.9 o superior
- npm

## Instalación
```bash
npm install
cp .env.example .env.local
npm run dev
```

Completa las variables de Supabase en `.env.local` antes de utilizar autenticación o consultas a la base de datos.

## Estado
Base inicial del proyecto. La portada contiene contenido de demostración; los eventos reales, autenticación, inscripciones, asistencia QR, certificados y paneles por rol se conectarán progresivamente a Supabase.