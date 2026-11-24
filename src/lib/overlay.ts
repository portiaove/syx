"use client";

import { useEffect, useRef } from "react";

// Contrato único para todo lo que se abre encima de la página: hoy el menú y
// el visor de fotos.
//
// Una capa abierta manda sobre dos cosas que son globales —el historial del
// navegador y el scroll del documento— y el problema era justamente ese: cada
// componente las gestionaba por su cuenta sin saber del otro. El menú guardaba
// el bloqueo de scroll que había dejado el visor y se lo devolvía al cerrarse,
// con lo que la página quedaba congelada sin nada abierto; y ninguno de los
// dos existía para el historial, así que el gesto de atrás del móvil no
// cerraba la capa, te sacaba de la página.
//
// Las reglas valen igual para cualquier capa que se añada después:
//   - mientras está abierta, la página de debajo no hace scroll;
//   - es una entrada del historial, así que atrás la cierra y te deja donde
//     estabas;
//   - al desmontarse suelta todo lo que había tomado.

// --- bloqueo del scroll ---------------------------------------------------
// Va por clase en <html> y nunca tocando body.style.overflow. react-photo-view
// bloquea el scroll guardando esa propiedad al abrir y restaurándola al
// cerrar; si nosotros usáramos la misma, volveríamos a pisarnos. Dos
// mecanismos distintos se componen sin tener que coordinarse.
const CLASE_BLOQUEO = "capa-abierta";
let capasAbiertas = 0;

function bloquearScroll() {
  if (capasAbiertas++ === 0) {
    document.documentElement.classList.add(CLASE_BLOQUEO);
  }
}

function liberarScroll() {
  capasAbiertas = Math.max(0, capasAbiertas - 1);
  if (capasAbiertas === 0) {
    document.documentElement.classList.remove(CLASE_BLOQUEO);
  }
}

// --- entrada en el historial ----------------------------------------------
let entradaViva = false;
let consumoProgramado: ReturnType<typeof setTimeout> | null = null;

function empujarEntrada() {
  // React monta los efectos dos veces en desarrollo. Si todavía estaba
  // pendiente deshacer la entrada del montaje anterior, ese desmontaje era de
  // mentira: se cancela y se reutiliza la entrada en vez de empujar otra.
  if (consumoProgramado) {
    clearTimeout(consumoProgramado);
    consumoProgramado = null;
    return;
  }
  history.pushState({ capa: true }, "");
  entradaViva = true;
}

function programarConsumo() {
  consumoProgramado = setTimeout(() => {
    consumoProgramado = null;
    // Solo se retrocede si la entrada sigue siendo la nuestra. Cuando la capa
    // se ha cerrado al navegar, encima está ya la ruta nueva y retroceder aquí
    // desharía la navegación.
    if (entradaViva && history.state?.capa) {
      history.back();
    }
    entradaViva = false;
  }, 0);
}

/**
 * Registra una capa. `abierta` es su estado y `cerrar` la forma de cerrarla
 * desde fuera: el hook la llama cuando el usuario retrocede.
 */
export function useOverlay(abierta: boolean, cerrar: () => void) {
  // El cierre se lee de la referencia para que el efecto no se reinicie —y
  // vuelva a empujar historial— cada vez que el componente padre repinta.
  const cerrarRef = useRef(cerrar);
  useEffect(() => {
    cerrarRef.current = cerrar;
  });

  useEffect(() => {
    if (!abierta) return;

    bloquearScroll();
    empujarEntrada();

    const alRetroceder = () => {
      // El navegador ya se ha comido la entrada; queda cerrar la capa.
      entradaViva = false;
      cerrarRef.current();
    };
    window.addEventListener("popstate", alRetroceder);

    return () => {
      window.removeEventListener("popstate", alRetroceder);
      liberarScroll();
      programarConsumo();
    };
  }, [abierta]);
}
