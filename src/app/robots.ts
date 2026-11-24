import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /gracias/ solo tiene sentido tras enviar el formulario; que no compita
      // en los resultados. El resto se rastrea, rastreadores de IA incluidos.
      disallow: ['/gracias/'],
    },
    sitemap: 'https://syxestudio.es/sitemap.xml',
  };
}