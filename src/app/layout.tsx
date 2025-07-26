import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | SYX Estudio Madrid',
    default: 'SYX Estudio - Plató Audiovisual en Madrid, Vallecas',
  },
  description: 'Estudio de fotografía y vídeo en Madrid con 322m², luz natural controlable, material PROFOTO y acceso para vehículos.',
  keywords: 'estudio fotografico madrid, plato audiovisual, alquiler estudio madrid, estudio video madrid, vallecas, luz natural, profoto',
  authors: [{ name: 'SYX Estudio' }],
  creator: 'SYX Estudio',
  publisher: 'SYX Estudio',
  metadataBase: new URL('https://syxestudio.es'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://syxestudio.es',
    siteName: 'SYX Estudio - Plató Audiovisual Madrid',
    images: [{
      url: '/img/main.jpg',
      width: 1200,
      height: 630,
      alt: 'SYX Estudio - Plató Audiovisual Madrid',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@syxestudio',
    site: '@syxestudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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
        <Footer />
      </body>
    </html>
  );
}
