import React from 'react';
import MapView, {
  Circle,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  type Region,
} from 'react-native-maps';
import { Platform } from 'react-native';

/**
 * Centro geográfico de estudio del sistema, según el protocolo de tesis:
 * ciudad de Masaya, Nicaragua, con un radio de análisis aproximado de 5 km.
 */
export const MASAYA_CENTER = { lat: 11.9744, lng: -86.0942 };
export const RADIO_5KM = 5000;

/**
 * Zonas de riesgo semilla sobre la ciudad de Masaya, Nicaragua.
 * Color por nivel: verde (bajo), naranja (medio), rojo (alto).
 * TODO: alimentar desde GET /prediccion/riesgo del motor de IA (mapa de calor real).
 */
const ZONAS_RIESGO = [
  { id: 1, lat: 11.9744, lng: -86.0942, radio: 900, nivel: 'ALTO' },
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
}

/**
 * Mapa con react-native-maps solo para móvil nativo.
 * Este archivo NUNCA debe importarse de forma estática desde código que
 * también corre en web (react-native-maps no existe en web).
 */
export default function MapaNativo({ region, onRegionChange, ubicacion, onCentro }: MapaNativoProps) {
  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={onRegionChange}
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
    >
      {/* Radio de estudio: 5 km alrededor de Masaya */}
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
