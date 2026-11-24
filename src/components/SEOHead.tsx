import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export function generateSEOMetadata({ title, description, url, image }: SEOProps): Metadata {
  const ogImage = image
    ? image.startsWith("http") ? image : `https://syxestudio.es${image}`
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(url ? { url } : {}),
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] } : {}),
    },
    ...(url ? { alternates: { canonical: url } } : {}),
  };
}

// Las URL llevan barra final porque next.config.ts tiene trailingSlash: true.
// Si no coinciden, cada canonical apunta a una URL que redirige.
export const SEOPresets = {
  home: {
    title: "SYX Estudio — Plató audiovisual en Madrid",
    description: "Estudio de fotografía y vídeo de 322 m² en Vallecas, Madrid. Luz natural controlable, iluminación PROFOTO y acceso para vehículos.",
    url: "https://syxestudio.es/",
    image: "/img/main.jpg",
  },
  estudio1: {
    title: "El Estudio",
    description: "322 m² diáfanos con 7 metros de altura, luz natural controlable y equipamiento PROFOTO en Vallecas, Madrid.",
    url: "https://syxestudio.es/el-estudio/",
    image: "/img/og/el-estudio.jpg",
  },
  caracteristicas: {
    title: "Características",
    description: "Especificaciones del plató SYX en Vallecas, Madrid: 322 m² totales, 155 m² de estudio, 7 m de altura, acceso para vehículos, iluminación PROFOTO y fondos pintados a mano.",
    url: "https://syxestudio.es/caracteristicas/",
  },
  contacto: {
    title: "Contacto y reservas",
    description: "Contacta con SYX Estudio para reservar el espacio o pedir información. Vallecas, Madrid. Lunes a sábado de 08:00 a 20:00.",
    url: "https://syxestudio.es/contacto/",
  },
};
