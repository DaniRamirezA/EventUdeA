import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventUdeA | Eventos universitarios",
  description: "Plataforma para descubrir, gestionar y participar en eventos de la Universidad de Antioquia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}