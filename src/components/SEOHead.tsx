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

export const SEOPresets = {
  home: {
    title: "SYX Estudio — Plató audiovisual en Madrid",
    description: "Estudio de fotografía y vídeo de 322 m² en Vallecas, Madrid. Luz natural controlable, iluminación PROFOTO y acceso para vehículos.",
    url: "https://syxestudio.es",
    image: "/img/main.jpg",
  },
  estudio1: {
    title: "El Estudio",
    description: "322 m² diáfanos con 7 metros de altura, luz natural controlable y equipamiento PROFOTO en Vallecas, Madrid.",
    url: "https://syxestudio.es/el-estudio",
    image: "/img/_SX_5180-1__msi___jpg.jpg",
  },
  produccion: {
    title: "Servicios de producción",
    description: "Shootings de fotografía, rodajes de vídeo y eventos corporativos en nuestro estudio de Madrid.",
    url: "https://syxestudio.es/servicios",
  },
  alquiler: {
    title: "Alquiler de material audiovisual",
    description: "Equipos profesionales de iluminación PROFOTO, cámaras y accesorios disponibles en SYX Estudio.",
    url: "https://syxestudio.es/alquiler-de-material",
  },
  fondos: {
    title: "Fondos de fotografía",
    description: "Fondos pintados a mano en distintos colores y acabados para tus proyectos fotográficos.",
    url: "https://syxestudio.es/fondos",
  },
  contacto: {
    title: "Contacto y reservas",
    description: "Contacta con SYX Estudio para reservar el espacio o pedir información.",
    url: "https://syxestudio.es/contacto",
  },
  sostenibilidad: {
    title: "Sostenibilidad",
    description: "SYX Estudio funciona con energía 100% renovable mediante placas fotovoltaicas — estudio NET ZERO.",
    url: "https://syxestudio.es/sostenibilidad",
  },
};
