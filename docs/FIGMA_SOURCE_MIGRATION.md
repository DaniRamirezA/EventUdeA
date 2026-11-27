# EventUdeA — migración desde Figma Make

## Fuente de verdad del frontend

La exportación `EventUdeA Web Application.make` contiene un repositorio Git de Figma Make. Se reconstruyó localmente desde el archivo exportado y se verificó el commit fuente `5ed08f0e08d2107c4ecf93c18d8177f85c58a8ca`.

Estructura identificada en la fuente:

- `src/App.tsx`: aplicación React con navegación y pantallas para asistente, organizador y administrador.
- `src/index.css`: estilos globales y responsive originales.
- `src/components/Logo.tsx` y `src/components/ui.tsx`: componentes visuales.
- `src/lib/mock-data.ts`: datos de demostración.
- `src/lib/business.ts`: reglas de negocio locales.
- `src/lib/types.ts`: tipos de dominio.

## Decisión de implementación

La fuente visual es Figma Make. La aplicación Next.js existente es el destino de integración, no la referencia visual. La migración debe preservar el JSX, los nombres de clases y los estilos originales, y adaptar únicamente los puntos de entrada, imports y servicios.

## Alcance por etapas

1. Portar los componentes y estilos de Figma a la estructura App Router de Next.js.
2. Verificar build y comparar las pantallas contra Figma.
3. Sustituir los datos simulados por servicios Supabase sin rediseñar la interfaz.

## Restricciones

- No modificar `main`.
- No rediseñar ni simplificar las pantallas de Figma.
- No conectar Supabase hasta validar la fidelidad visual.
- No declarar la migración terminada hasta que compile y se haya revisado la vista previa.
