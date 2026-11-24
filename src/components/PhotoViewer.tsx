"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useOverlay } from "@/lib/overlay";

// react-photo-view avisa de cuándo se abre, pero no admite modo controlado: no
// hay forma de cerrarlo desde fuera. El cierre se recoge de overlayRender, que
// es por donde la propia librería lo expone, y se guarda para poder llamarlo
// cuando el usuario retrocede.
function RecogerCierre({
  onClose,
  destino,
}: {
  onClose: () => void;
  destino: React.RefObject<(() => void) | null>;
}) {
  useEffect(() => {
    destino.current = onClose;
  });
  return null;
}

/**
 * Único punto donde se monta el visor de fotos. Las galerías le pasan sus
 * PhotoView y él se encarga de que el visor se comporte como cualquier otra
 * capa del sitio: atrás lo cierra, Escape lo cierra y la página de debajo no
 * se mueve mientras está abierto.
 */
export default function PhotoViewer({ children }: { children: React.ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  const cierreDelVisor = useRef<(() => void) | null>(null);

  const cerrar = useCallback(() => {
    cierreDelVisor.current?.();
  }, []);

  useOverlay(abierto, cerrar);

  return (
    <PhotoProvider
      onVisibleChange={(visible) => setAbierto(visible)}
      overlayRender={({ onClose }) => (
        <RecogerCierre onClose={onClose} destino={cierreDelVisor} />
      )}
    >
      {children}
    </PhotoProvider>
  );
}
