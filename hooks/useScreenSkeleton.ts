import { useEffect, useState } from 'react';

/**
 * Devuelve `true` durante el primer montaje de una pantalla, para mostrar un
 * skeleton mientras se pinta el contenido. Se apaga tras un mínimo visible
 * corto (evita el parpadeo de 1 frame).
 *
 * Solo aplica al PRIMER montaje: las pantallas de tabs quedan montadas (y
 * congeladas al cambiar), así que el skeleton no reaparece al volver.
 */
export function useScreenSkeleton(minVisibleMs = 220): boolean {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setCargando(false), minVisibleMs);
    return () => clearTimeout(timer);
  }, [minVisibleMs]);

  return cargando;
}
