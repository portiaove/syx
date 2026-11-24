const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

const toPosix = (p) => p.split(path.sep).join("/");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(jpe?g|png|webp|avif)$/i.test(e.name)) out.push(p);
  }
  return out;
}

(async () => {
  const rows = [];
  for (const f of walk("public/img")) {
    const { size } = fs.statSync(f);
    const rel = toPosix(f).replace("public/img/", "");
    try {
      const m = await sharp(f).metadata();
      rows.push({ f: rel, fmt: m.format, w: m.width, h: m.height, kb: Math.round(size / 1024) });
    } catch {
      rows.push({ f: rel, fmt: "ERROR", w: 0, h: 0, kb: Math.round(size / 1024) });
    }
  }
  rows.sort((a, b) => b.kb - a.kb);

  const total = rows.reduce((s, r) => s + r.kb, 0);
  console.log(`TOTAL: ${rows.length} imágenes, ${(total / 1024).toFixed(1)} MB\n`);

  const porCarpeta = {};
  for (const r of rows) {
    const k = r.f.includes("/") ? r.f.split("/")[0] : "(raíz)";
    porCarpeta[k] ??= { n: 0, kb: 0, maxW: 0 };
    porCarpeta[k].n++;
    porCarpeta[k].kb += r.kb;
    porCarpeta[k].maxW = Math.max(porCarpeta[k].maxW, r.w);
  }
  console.log("POR CARPETA");
  for (const [k, v] of Object.entries(porCarpeta).sort((a, b) => b[1].kb - a[1].kb)) {
    console.log(
      "  " + k.padEnd(12) + String(v.n).padStart(3) + " img  " +
      String((v.kb / 1024).toFixed(1)).padStart(6) + " MB   ancho máx: " + v.maxW,
    );
  }

  console.log("\nLAS 12 MÁS PESADAS");
  for (const r of rows.slice(0, 12)) {
    console.log(
      "  " + String(r.kb).padStart(5) + " KB  " +
      (r.w + "x" + r.h).padEnd(12) + r.fmt.padEnd(6) + r.f,
    );
  }

  console.log("\nPOR FORMATO");
  const fmt = {};
  for (const r of rows) {
    fmt[r.fmt] ??= { n: 0, kb: 0 };
    fmt[r.fmt].n++;
    fmt[r.fmt].kb += r.kb;
  }
  for (const [k, v] of Object.entries(fmt).sort((a, b) => b[1].kb - a[1].kb)) {
    console.log("  " + k.padEnd(6) + String(v.n).padStart(3) + " img  " + (v.kb / 1024).toFixed(1) + " MB");
  }

  // ¿Cuánto ancho se necesita de verdad? El grid más exigente muestra la imagen
  // a 100vw; con una pantalla de 1920 y DPR 2 eso son 3840, pero el tope
  // razonable para fotografía web es 2048 y para el lightbox 2560.
  console.log("\nSOBREDIMENSIÓN (tope útil 2560 px de ancho)");
  const gordas = rows.filter((r) => r.w > 2560);
  console.log(`  ${gordas.length} imágenes superan 2560 px de ancho`);
  console.log(`  pesan ${(gordas.reduce((s, r) => s + r.kb, 0) / 1024).toFixed(1)} MB de los ${(total / 1024).toFixed(1)} MB totales`);
})();
