/**
 * Constantes geográficas del sistema — fuente única de verdad.
 *
 * El área de operación del mapa es el **sector urbano del municipio de Masaya**
 * (polígono real de OpenStreetMap), centrado en el **Parque Central de Masaya**.
 * El radio de estudio es de 5 km según el Protocolo de tesis.
 */
import { MASAYA_POLIGONO } from './masayaPolygon';

export { MASAYA_POLIGONO };

/** Punto principal del sistema: Parque Central de Masaya (coords. Google Places). */
export const PARQUE_CENTRAL_MASAYA = {
  lat: 11.9737616,
  lng: -86.0959396,
} as const;

/** Centro de estudio = Parque Central. */
export const MASAYA_CENTER = PARQUE_CENTRAL_MASAYA;

/** Radio de análisis de la tesis (metros). */
export const RADIO_5KM = 5000;

/**
 * Bounding box del polígono del sector urbano (se calcula automáticamente).
 * Se usa para limitar el zoom (delta máximo visible) y para mapear el polígono
 * a la vista del placeholder web. OJO: la validez real del área es el polígono,
 * no este rectángulo.
 */
const LATS = MASAYA_POLIGONO.map((p) => p.lat);
const LNGS = MASAYA_POLIGONO.map((p) => p.lng);

export const MASAYA_BOUNDS = {
  latMin: Math.min(...LATS),
  latMax: Math.max(...LATS),
  lngMin: Math.min(...LNGS),
  lngMax: Math.max(...LNGS),
} as const;

/** Centroide aproximado (promedio de vértices) para reacomodar puntos exteriores. */
const CENTROIDE = {
  lat: LATS.reduce((a, b) => a + b, 0) / LATS.length,
  lng: LNGS.reduce((a, b) => a + b, 0) / LNGS.length,
};

/**
 * Ray casting: ¿el punto cae dentro del polígono de Masaya?
 * (coordenadas tratadas en plano lat/lng; suficiente a escala urbana).
 */
export function estaDentroDeMasaya(p: { lat: number; lng: number }): boolean {
  const poly = MASAYA_POLIGONO;
  let dentro = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].lat;
    const yi = poly[i].lng;
    const xj = poly[j].lat;
    const yj = poly[j].lng;

    const cruza =
      xi > p.lat !== xj > p.lat &&
      p.lng < ((yj - yi) * (p.lat - xi)) / (xj - xi) + yi;
    if (cruza) dentro = !dentro;
  }
  return dentro;
}

/** Punto más cercano sobre el borde del polígono (para reacomodar el exterior). */
function puntoMasCercanoEnBorde(p: { lat: number; lng: number }) {
  const poly = MASAYA_POLIGONO;
  let mejor = poly[0];
  let mejorDist = Infinity;

  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];

    const dx = b.lng - a.lng;
    const dy = b.lat - a.lat;
    const largo2 = dx * dx + dy * dy;

    let t = 0;
    if (largo2 > 0) {
      t = ((p.lng - a.lng) * dx + (p.lat - a.lat) * dy) / largo2;
      t = Math.max(0, Math.min(1, t));
    }

    const lat = a.lat + t * dy;
    const lng = a.lng + t * dx;
    const dist = (p.lat - lat) ** 2 + (p.lng - lng) ** 2;

    if (dist < mejorDist) {
      mejorDist = dist;
      mejor = { lat, lng };
    }
  }
  return mejor;
}

/**
 * Recorta un punto para que quede dentro del polígono de Masaya.
 * Si está fuera, lo mueve al borde más cercano y lo empuja ligeramente
 * hacia el centroide para asegurar que quede adentro.
 */
export function clampToMasaya(p: { lat: number; lng: number }): { lat: number; lng: number } {
  if (estaDentroDeMasaya(p)) return p;

  const borde = puntoMasCercanoEnBorde(p);
  const dx = CENTROIDE.lng - borde.lng;
  const dy = CENTROIDE.lat - borde.lat;
  const largo = Math.hypot(dx, dy) || 1;
  const paso = 0.0015; // ≈ 165 m hacia el interior

  const interior = {
    lat: borde.lat + (dy / largo) * paso,
    lng: borde.lng + (dx / largo) * paso,
  };

  return estaDentroDeMasaya(interior) ? interior : { ...CENTROIDE };
}
