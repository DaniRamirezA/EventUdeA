import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventUdeA | Gestión de eventos universitarios",
  description: "Plataforma centralizada para descubrir, organizar y gestionar eventos de la Universidad de Antioquia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
