import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
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
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
