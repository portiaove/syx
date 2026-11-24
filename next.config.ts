import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sin output: "export". El export estático obliga a images.unoptimized, y eso
  // anulaba por completo los sizes que las galerías ya declaran: el navegador
  // se descargaba la foto de 2896 px para pintarla en una caja de 750 px.
  // Vercel sigue pre-renderizando estas páginas a HTML estático en el build,
  // así que los rastreadores reciben lo mismo que antes.
  trailingSlash: true,
  images: {
    // El valor por defecto es solo webp; añadir avif da otro 30-40 % de ahorro
    // en los navegadores que lo soportan. deviceSizes se deja al valor por
    // defecto de Next, que ya es el que estaba escrito aquí.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
