import React, { useCallback, useRef } from 'react';
import MapView, {
  Circle,
  Marker,
  Polygon,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  type Region,
} from 'react-native-maps';
import { Platform } from 'react-native';

import {
  clampToMasaya,
  estaDentroDeMasaya,
  MASAYA_BOUNDS,
  MASAYA_CENTER,
  MASAYA_POLIGONO,
  PARQUE_CENTRAL_MASAYA,
  RADIO_5KM,
} from '@/constants/masaya';

/** Zoom mínimo/máximo del área de Masaya */
const MIN_ZOOM_LEVEL = 13.5;
const MAX_ZOOM_LEVEL = 18;

/**
 * Rectángulo exterior (grande) para la máscara: todo lo de fuera del polígono
 * queda oscurecido.
 */
const MASCARA_EXTERIOR = [
  { latitude: MASAYA_CENTER.lat - 2, longitude: MASAYA_CENTER.lng - 2 },
  { latitude: MASAYA_CENTER.lat + 2, longitude: MASAYA_CENTER.lng - 2 },
  { latitude: MASAYA_CENTER.lat + 2, longitude: MASAYA_CENTER.lng + 2 },
  { latitude: MASAYA_CENTER.lat - 2, longitude: MASAYA_CENTER.lng + 2 },
];

/** Polígono del sector urbano de Masaya (agujero de la máscara) */
const MASCARA_BORDE = MASAYA_POLIGONO.map((p) => ({
  latitude: p.lat,
  longitude: p.lng,
}));

const BOUNDS_LAT_SPAN = MASAYA_BOUNDS.latMax - MASAYA_BOUNDS.latMin;
const BOUNDS_LNG_SPAN = MASAYA_BOUNDS.lngMax - MASAYA_BOUNDS.lngMin;

/**
 * Si la región actual se sale del polígono de Masaya (centro fuera) o está más
 * alejada que el bbox del sector, devuelve la región recortada; si está bien,
 * devuelve null (nada que corregir).
 */
function clampRegionToMasaya(r: Region): Region | null {
  // Factor de zoom máximo permitido (que el bbox quepa en la vista)
  const factor = Math.min(
    1,
    r.latitudeDelta > BOUNDS_LAT_SPAN * 1.001 ? BOUNDS_LAT_SPAN / r.latitudeDelta : 1,
    r.longitudeDelta > BOUNDS_LNG_SPAN * 1.001 ? BOUNDS_LNG_SPAN / r.longitudeDelta : 1,
  );

  let lat = r.latitude;
  let lng = r.longitude;

  if (!estaDentroDeMasaya({ lat, lng })) {
    const interior = clampToMasaya({ lat, lng });
    lat = interior.lat;
    lng = interior.lng;
  }

  const sinCambios = factor === 1 && lat === r.latitude && lng === r.longitude;
  if (sinCambios) return null;

  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta: r.latitudeDelta * factor,
    longitudeDelta: r.longitudeDelta * factor,
  };
}

/**
 * Zonas de riesgo semilla sobre la ciudad de Masaya, Nicaragua.
 * Color por nivel: verde (bajo), naranja (medio), rojo (alto).
 * TODO: alimentar desde GET /prediccion/riesgo del motor de IA (mapa de calor real).
 */
const ZONAS_RIESGO = [
  { id: 1, lat: 11.9738, lng: -86.0959, radio: 900, nivel: 'ALTO' },
  { id: 2, lat: 11.9665, lng: -86.0995, radio: 700, nivel: 'MEDIO' },
  { id: 3, lat: 11.9812, lng: -86.1031, radio: 600, nivel: 'MEDIO' },
  { id: 4, lat: 11.9689, lng: -86.0858, radio: 800, nivel: 'BAJO' },
  { id: 5, lat: 11.9789, lng: -86.0893, radio: 500, nivel: 'BAJO' },
] as const;

const NIVEL_COLOR: Record<string, { fill: string; stroke: string }> = {
  ALTO: { fill: 'rgba(239,68,68,0.22)', stroke: 'rgba(239,68,68,0.55)' },
  MEDIO: { fill: 'rgba(249,115,22,0.2)', stroke: 'rgba(249,115,22,0.5)' },
  BAJO: { fill: 'rgba(34,197,94,0.18)', stroke: 'rgba(34,197,94,0.4)' },
};

interface MapaNativoProps {
  region: Region;
  onRegionChange: (region: Region) => void;
  ubicacion: { lat: number; lng: number } | null;
  onCentro: () => void;
  /** El mapa terminó de cargar (para ocultar el skeleton) */
  onMapReady?: () => void;
}

/**
 * Mapa con react-native-maps solo para móvil nativo.
 * Este archivo NUNCA debe importarse de forma estática desde código que
 * también corre en web (react-native-maps no existe en web).
 *
 * Delimitado al municipio de Masaya (centro: Parque Central):
 * - Zoom acotado y recorte de cámara en cada gesto (no se puede ver más allá).
 * - Máscara oscura con "agujero" sobre los límites (feedback visual).
 */
export default function MapaNativo({
  region,
  onRegionChange,
  ubicacion,
  onCentro,
  onMapReady,
}: MapaNativoProps) {
  const mapRef = useRef<MapView>(null);

  const handleRegionChangeComplete = useCallback(
    (nueva: Region) => {
      const corregida = clampRegionToMasaya(nueva);
      if (corregida) {
        // Regresa la cámara suavemente a dentro de los límites de Masaya
        mapRef.current?.animateToRegion(corregida, 250);
      }
      onRegionChange(corregida ?? nueva);
    },
    [onRegionChange],
  );

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={handleRegionChangeComplete}
      onMapReady={onMapReady}
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      showsUserLocation
      showsMyLocationButton={false}
      showsCompass={false}
      showsScale={false}
      toolbarEnabled={false}
      rotateEnabled={false}
      pitchEnabled={false}
      zoomControlEnabled={false}
      zoomEnabled
      minZoomLevel={MIN_ZOOM_LEVEL}
      maxZoomLevel={MAX_ZOOM_LEVEL}
    >
      {/* Máscara: oscurece TODO lo que está fuera del área de Masaya */}
      <Polygon
        coordinates={MASCARA_EXTERIOR}
        holes={[MASCARA_BORDE]}
        strokeWidth={1.5}
        strokeColor="rgba(217,155,38,0.65)"
        fillColor="rgba(15,23,42,0.30)"
      />

      {/* Punto principal: Parque Central de Masaya */}
      <Marker
        coordinate={{
          latitude: PARQUE_CENTRAL_MASAYA.lat,
          longitude: PARQUE_CENTRAL_MASAYA.lng,
        }}
        title="Parque Central de Masaya"
        description="Centro del área de operación"
        pinColor="#d99b26"
      />

      {/* Radio de estudio: 5 km alrededor del Parque Central */}
      <Circle
        center={{ latitude: MASAYA_CENTER.lat, longitude: MASAYA_CENTER.lng }}
        radius={RADIO_5KM}
        strokeWidth={1}
        strokeColor="rgba(217,155,38,0.5)"
        fillColor="rgba(217,155,38,0.06)"
      />

      {/* Zonas de riesgo (futuras capas de mapa de calor del motor IA) */}
      {ZONAS_RIESGO.map((z) => (
        <Circle
          key={z.id}
          center={{ latitude: z.lat, longitude: z.lng }}
          radius={z.radio}
          strokeWidth={1.5}
          strokeColor={NIVEL_COLOR[z.nivel].stroke}
          fillColor={NIVEL_COLOR[z.nivel].fill}
        />
      ))}

      {/* Recentrar en la ubicación del usuario al mover el pin de respaldo */}
      {ubicacion && (
        <Marker
          coordinate={{ latitude: ubicacion.lat, longitude: ubicacion.lng }}
          title="Estás aquí"
          description="Tu ubicación actual"
          onPress={onCentro}
          pinColor="#2F74D0"
        />
      )}
    </MapView>
  );
}
