// Compara codificaciones candidatas contra el original y mide la diferencia
// real por píxel, para decidir con datos y no con impresiones.
//
// El error medio va en una escala de 0 a 255. Como referencia práctica en
// fotografía: por debajo de 1 la diferencia es invisible incluso comparando
// lado a lado; entre 1 y 2 hace falta un zoom fuerte para encontrarla.
const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

const SALIDA = "tmp-comparativa";

const CANDIDATOS = [
  { etiqueta: "webp q95", ext: "webp", opts: { quality: 95 } },
  { etiqueta: "webp q90", ext: "webp", opts: { quality: 90 } },
  { etiqueta: "webp q85", ext: "webp", opts: { quality: 85 } },
  { etiqueta: "webp q80", ext: "webp", opts: { quality: 80 } },
  { etiqueta: "avif q80", ext: "avif", opts: { quality: 80 } },
  { etiqueta: "avif q65", ext: "avif", opts: { quality: 65 } },
  { etiqueta: "avif q50", ext: "avif", opts: { quality: 50 } },
];

async function raw(buf) {
  return sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
}

async function diferencia(origBuf, candBuf) {
  const a = await raw(origBuf);
  const b = await raw(candBuf);
  if (a.data.length !== b.data.length) return null;
  let suma = 0;
  let maximo = 0;
  for (let i = 0; i < a.data.length; i++) {
    const d = Math.abs(a.data[i] - b.data[i]);
    suma += d;
    if (d > maximo) maximo = d;
  }
  return { medio: suma / a.data.length, maximo };
}

(async () => {
  fs.mkdirSync(SALIDA, { recursive: true });

  const muestras = process.argv.slice(2);
  if (muestras.length === 0) {
    console.error("uso: node scripts/comparar-calidad.js <ruta-imagen> [...]");
    process.exit(1);
  }

  for (const ruta of muestras) {
    const original = fs.readFileSync(ruta);
    const meta = await sharp(original).metadata();
    const kbOrig = original.length / 1024;

    console.log(`\n${path.basename(ruta)}`);
    console.log(`  original: ${meta.format} ${meta.width}x${meta.height}  ${kbOrig.toFixed(0)} KB`);
    console.log("  " + "-".repeat(66));
    console.log("  " + "codificación".padEnd(12) + "tamaño".padStart(9) + "ahorro".padStart(9) + "err.medio".padStart(11) + "err.máx".padStart(9));

    for (const c of CANDIDATOS) {
      const buf = await sharp(original)[c.ext](c.opts).toBuffer();
      const d = await diferencia(original, buf);
      const kb = buf.length / 1024;
      const ahorro = (1 - buf.length / original.length) * 100;

      const nombre = `${path.basename(ruta, path.extname(ruta))}__${c.etiqueta.replace(/\s/g, "")}.${c.ext}`;
      fs.writeFileSync(path.join(SALIDA, nombre), buf);

      console.log(
        "  " + c.etiqueta.padEnd(12) +
        (kb.toFixed(0) + " KB").padStart(9) +
        (ahorro.toFixed(0) + "%").padStart(9) +
        (d ? d.medio.toFixed(2) : "?").padStart(11) +
        (d ? String(d.maximo) : "?").padStart(9),
      );
    }
  }

  console.log(`\nMuestras escritas en ${SALIDA}/ para revisarlas a ojo.`);
})();
