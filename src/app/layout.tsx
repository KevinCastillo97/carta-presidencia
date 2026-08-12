import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exigencia Ciudadana a Presidencia",
  description: "Generador de carta formal en PDF y correo para la presidencia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}