// ¿Cuánto pesaría una foto servida al ancho en el que de verdad se muestra?
// Las galerías ya declaran sizes="(max-width: 768px) 100vw, 50vw", así que el
// navegador pediría estos anchos según el dispositivo. Esto simula lo que
// generaría next/image si la optimización estuviera activa.
const sharp = require("sharp");
const fs = require("node:fs");

// Anchos que next/image pide con esos sizes, según deviceSizes.
const ESCENARIOS = [
  { nombre: "móvil 390px DPR2", ancho: 828 },
  { nombre: "móvil 430px DPR3", ancho: 1080 },
  { nombre: "portátil 1440px", ancho: 750 },
  { nombre: "escritorio 1920px", ancho: 1080 },
  { nombre: "retina 2560px DPR2", ancho: 1920 },
];

(async () => {
  const ruta = process.argv[2];
  const original = fs.readFileSync(ruta);
  const meta = await sharp(original).metadata();

  console.log(`${ruta}`);
  console.log(`  original: ${meta.width}x${meta.height}  ${(original.length / 1024).toFixed(0)} KB  (es lo que se descarga HOY en el grid)\n`);
  console.log("  " + "escenario".padEnd(22) + "ancho".padStart(7) + "AVIF q75".padStart(11) + "WebP q75".padStart(11) + "vs hoy".padStart(10));
  console.log("  " + "-".repeat(61));

  for (const e of ESCENARIOS) {
    const base = sharp(original).resize({ width: e.ancho, withoutEnlargement: true });
    const avif = await base.clone().avif({ quality: 75 }).toBuffer();
    const webp = await base.clone().webp({ quality: 75 }).toBuffer();
    const factor = original.length / avif.length;
    console.log(
      "  " + e.nombre.padEnd(22) +
      String(e.ancho).padStart(7) +
      ((avif.length / 1024).toFixed(0) + " KB").padStart(11) +
      ((webp.length / 1024).toFixed(0) + " KB").padStart(11) +
      (factor.toFixed(0) + "x menos").padStart(10),
    );
  }
})();
