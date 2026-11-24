// Compara codificaciones del vídeo de portada midiendo el error real por píxel
// contra el master, en varios fotogramas repartidos por el clip.
//
// Se descartó VMAF: su puntuación daba 82 a una codificación AV1 cuyo error por
// píxel (1,06) era MENOR que el de un H.264 al que VMAF puntuaba 97,9. El
// control de referencia-contra-sí-misma daba 100, así que el arnés estaba bien
// montado, pero la comparación entre contenedores distintos introducía un
// sesgo. La diferencia por píxel es directa y comprobable.
//
// Escala 0-255. Por debajo de 1 la diferencia es invisible en reproducción;
// entre 1 y 2 hay que congelar la imagen y ampliar para encontrarla.
const { execFileSync } = require("node:child_process");
const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

const MASTER = "public/videos/SYXHOME_1.mp4";
const TMP = "tmp-video";
const INICIO = "8";
const DURACION = "10";
const FOTOGRAMAS = [30, 100, 170, 240];

const CANDIDATOS = [
  { etiqueta: "AV1 crf30", args: ["-c:v", "libsvtav1", "-crf", "30", "-preset", "6"], ext: "webm" },
  { etiqueta: "AV1 crf35", args: ["-c:v", "libsvtav1", "-crf", "35", "-preset", "6"], ext: "webm" },
  { etiqueta: "AV1 crf40", args: ["-c:v", "libsvtav1", "-crf", "40", "-preset", "6"], ext: "webm" },
  { etiqueta: "H264 crf23", args: ["-c:v", "libx264", "-crf", "23", "-preset", "slow"], ext: "mp4" },
  { etiqueta: "H264 crf26", args: ["-c:v", "libx264", "-crf", "26", "-preset", "slow"], ext: "mp4" },
];

const ff = (args) =>
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { encoding: "utf8" });

function sacarFotograma(video, n, destino) {
  ff(["-i", video, "-vf", `select=eq(n\\,${n}),scale=1920:1080:flags=bicubic`, "-vframes", "1", destino]);
}

async function errorMedio(video, refs) {
  let suma = 0;
  for (const [i, n] of FOTOGRAMAS.entries()) {
    const png = path.join(TMP, "cand.png");
    sacarFotograma(video, n, png);
    const a = await sharp(refs[i]).removeAlpha().raw().toBuffer();
    const b = await sharp(png).removeAlpha().raw().toBuffer();
    let s = 0;
    for (let j = 0; j < a.length; j++) s += Math.abs(a[j] - b[j]);
    suma += s / a.length;
  }
  return suma / FOTOGRAMAS.length;
}

(async () => {
  fs.mkdirSync(TMP, { recursive: true });

  const ref = path.join(TMP, "ref.mp4");
  ff(["-ss", INICIO, "-t", DURACION, "-i", MASTER, "-c:v", "libx264", "-crf", "12", "-preset", "veryfast", "-an", ref]);

  const refs = FOTOGRAMAS.map((n) => path.join(TMP, `ref_${n}.png`));
  FOTOGRAMAS.forEach((n, i) => sacarFotograma(ref, n, refs[i]));

  console.log(`Fragmento: ${DURACION}s del master de 1920x1080\n`);
  console.log("  " + "codificación".padEnd(13) + "resolución".padEnd(12) + "10s".padStart(9) + "35s est.".padStart(10) + "error".padStart(8) + "  veredicto");
  console.log("  " + "-".repeat(66));

  for (const c of CANDIDATOS) {
    for (const alto of [1080, 720, 480]) {
      const ancho = Math.round((alto * 16) / 9 / 2) * 2;
      const salida = path.join(TMP, `${c.etiqueta.replace(/\s/g, "")}_${alto}.${c.ext}`);
      ff(["-ss", INICIO, "-t", DURACION, "-i", MASTER, "-vf", `scale=${ancho}:${alto}`, ...c.args, "-an", salida]);

      const kb = fs.statSync(salida).size / 1024;
      const err = await errorMedio(salida, refs);
      const veredicto = err < 1.5 ? "invisible" : err < 2.5 ? "muy bueno" : err < 4 ? "aceptable" : "se nota";

      console.log(
        "  " + c.etiqueta.padEnd(13) + `${ancho}x${alto}`.padEnd(12) +
        (kb.toFixed(0) + " KB").padStart(9) +
        ((kb * 3.47 / 1024).toFixed(1) + " MB").padStart(10) +
        err.toFixed(2).padStart(8) + "  " + veredicto,
      );
    }
  }
})();
