import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const glypha = localFont({
  src: [
    { path: "../fonts/glypha/GlyphaLTPro35Thin.ttf",    weight: "100", style: "normal" },
    { path: "../fonts/glypha/GlyphaLTPro35ThinObl.ttf", weight: "100", style: "italic" },
    { path: "../fonts/glypha/GlyphaLTPro45Light.ttf",   weight: "300", style: "normal" },
    { path: "../fonts/glypha/GlyphaLTPro45LtObl.ttf",   weight: "300", style: "italic" },
    { path: "../fonts/glypha/GlyphaLTPro55Rg.ttf",      weight: "400", style: "normal" },
    { path: "../fonts/glypha/GlyphaLTPro55Obl.ttf",     weight: "400", style: "italic" },
    { path: "../fonts/glypha/GlyphaLTPro65Bold.ttf",    weight: "700", style: "normal" },
    { path: "../fonts/glypha/GlyphaLTPro65BoldObl.ttf", weight: "700", style: "italic" },
    { path: "../fonts/glypha/GlyphaLTPro75Black.ttf",   weight: "900", style: "normal" },
    { path: "../fonts/glypha/GlyphaLTPro75BlackObl.ttf",weight: "900", style: "italic" },
  ],
  variable: "--font-glypha",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | SYX Estudio',
    default: 'SYX Estudio — Plató audiovisual en Madrid',
  },
  description: 'Estudio de fotografía y vídeo de 322 m² en Vallecas, Madrid. Luz natural controlable, iluminación PROFOTO y acceso para vehículos.',
  metadataBase: new URL('https://syxestudio.es'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'SYX Estudio',
    images: [{ url: '/img/main.jpg', width: 1200, height: 630, alt: 'SYX Estudio' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#322f32" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#322f32" />
      </head>
      <body className={`${glypha.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
