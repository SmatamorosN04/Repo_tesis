import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Svg, { Defs, Mask, Polygon, Rect } from 'react-native-svg';

import {
  MASAYA_BOUNDS,
  MASAYA_CENTER,
  MASAYA_POLIGONO,
  RADIO_5KM,
} from '@/constants/masaya';

const PADDING = 14;

/** Convierte coordenadas geográficas a píxeles dentro del área del mapa. */
function geoAPixel(
  lat: number,
  lng: number,
  w: number,
  h: number,
): { x: number; y: number } {
  const innerW = Math.max(1, w - PADDING * 2);
  const innerH = Math.max(1, h - PADDING * 2);
  return {
    x: PADDING + ((lng - MASAYA_BOUNDS.lngMin) / (MASAYA_BOUNDS.lngMax - MASAYA_BOUNDS.lngMin)) * innerW,
    y: PADDING + ((MASAYA_BOUNDS.latMax - lat) / (MASAYA_BOUNDS.latMax - MASAYA_BOUNDS.latMin)) * innerH,
  };
}

/**
 * Placeholder estilizado del mapa para web (react-native-maps no soporta web).
 * En móvil nativo se usa react-native-maps (app/(tabs)/index.tsx).
 *
 * Dibuja el POLÍGONO real del sector urbano de Masaya (OSM) y oscurece
 * todo lo que queda fuera del área de operación.
 */
export default function MapaWeb() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  const INCIDENTES = [
    { id: 1, top: '28%', left: '22%', type: 'exclamation-triangle', color: '#ef4444' },
    { id: 2, top: '52%', left: '68%', type: 'fire', color: '#f97316' },
    { id: 3, top: '68%', left: '35%', type: 'car-crash', color: '#eab308' },
  ];

  const listo = size.w > 0 && size.h > 0;

  const polygonPoints = listo
    ? MASAYA_POLIGONO.map((p) => {
        const { x, y } = geoAPixel(p.lat, p.lng, size.w, size.h);
        return `${x},${y}`;
      }).join(' ')
    : '';

  const parque = listo
    ? geoAPixel(MASAYA_CENTER.lat, MASAYA_CENTER.lng, size.w, size.h)
    : null;

  return (
    <View
      className="flex-1"
      onLayout={(e) =>
        setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })
      }
    >
      <View className="absolute inset-0 bg-[#E8EEF2]" />

      {/* Bloques / manzanas */}
      <View style={{ position: 'absolute', top: '8%', left: '6%', width: '26%', height: '18%' }} className="rounded-xl bg-[#D9E4DC]" />
      <View style={{ position: 'absolute', top: '10%', left: '58%', width: '22%', height: '14%' }} className="rounded-xl bg-[#D9E4DC]" />
      <View style={{ position: 'absolute', top: '55%', left: '8%', width: '20%', height: '22%' }} className="rounded-xl bg-[#D9E4DC]" />
      <View style={{ position: 'absolute', top: '60%', left: '66%', width: '24%', height: '18%' }} className="rounded-xl bg-[#D9E4DC]" />

      {/* Parque */}
      <View style={{ position: 'absolute', top: '32%', left: '70%', width: '26%', height: '20%' }} className="rounded-2xl bg-[#C6E5C8]" />
      <FontAwesome5 name="tree" size={16} color="#4C9A5B" style={{ position: 'absolute', top: '38%', left: '78%' }} />

      {/* Calles "horizontales" */}
      {[20, 45, 70, 88].map((t) => (
        <View
          key={`h${t}`}
          style={{ position: 'absolute', top: `${t}%`, left: 0, right: 0, height: 8 }}
          className="bg-white"
        />
      ))}
      {/* Calles "verticales" */}
      {[15, 40, 65, 90].map((l, i) => (
        <View
          key={`v${l}`}
          style={{ position: 'absolute', left: `${l}%`, top: 0, bottom: 0, width: 8 }}
          className={i === 1 ? 'bg-[#BFD7EA]' : 'bg-white'}
        />
      ))}

      {/* Avenida principal */}
      <View style={{ position: 'absolute', top: '45%', left: 0, right: 0, height: 16 }} className="bg-[#BFD7EA]" />
      <View style={{ position: 'absolute', left: '40%', top: 0, bottom: 0, width: 16 }} className="bg-[#BFD7EA]" />

      {/* Polígono real del sector + máscara oscura fuera del área */}
      {listo && (
        <Svg
          style={StyleSheet.absoluteFill}
          width={size.w}
          height={size.h}
          pointerEvents="none"
        >
          <Defs>
            <Mask
              id="mascara-fuera-masaya"
              x={0}
              y={0}
              width={size.w}
              height={size.h}
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
            >
              <Rect x={0} y={0} width={size.w} height={size.h} fill="#FFFFFF" />
              <Polygon points={polygonPoints} fill="#000000" />
            </Mask>
          </Defs>
          <Rect
            x={0}
            y={0}
            width={size.w}
            height={size.h}
            fill="rgba(15,23,42,0.30)"
            mask="url(#mascara-fuera-masaya)"
          />
          <Polygon
            points={polygonPoints}
            fill="rgba(217,155,38,0.10)"
            stroke="#d99b26"
            strokeWidth={2}
          />
        </Svg>
      )}

      {/* Punto principal: Parque Central de Masaya */}
      <View
        style={
          parque
            ? { position: 'absolute', left: parque.x - 18, top: parque.y - 18, alignItems: 'center' }
            : { position: 'absolute', top: '42%', left: '51%', alignItems: 'center' }
        }
      >
        <View className="w-9 h-9 rounded-full bg-[#F5D547] items-center justify-center shadow-md border border-amber-500/40">
          <FontAwesome5 name="star" size={14} color="#7a5410" />
        </View>
        <View className="bg-white/95 rounded-full px-2 py-0.5 mt-1 shadow-sm">
          <Text className="text-[10px] font-bold text-slate-700">Parque Central</Text>
        </View>
      </View>

      {/* Ubicación del usuario (punto azul estilo iOS) */}
      <View style={{ position: 'absolute', top: '46%', left: '44%' }}>
        <View className="w-16 h-16 rounded-full bg-[#3B82F6]/20 items-center justify-center">
          <View className="w-9 h-9 rounded-full bg-[#3B82F6]/40 items-center justify-center">
            <View className="w-4 h-4 rounded-full bg-[#2F74D0] border-2 border-white shadow-md" />
          </View>
        </View>
      </View>

      {/* Marcadores de incidentes */}
      {INCIDENTES.map((inc) => (
        <View key={inc.id} style={{ position: 'absolute', top: inc.top, left: inc.left }}>
          <View className="w-9 h-9 rounded-full bg-white items-center justify-center shadow-md border border-slate-100">
            <FontAwesome5 name={inc.type as any} size={14} color={inc.color} />
          </View>
        </View>
      ))}

      {/* Indicador del contexto del protocolo */}
      <View style={{ position: 'absolute', bottom: 12, left: 12 }}>
        <View className="bg-white/95 rounded-2xl px-3 py-2 shadow-md">
          <Text className="text-[11px] text-slate-500 font-semibold">Zona de estudio</Text>
          <Text className="text-[13px] text-slate-800 font-bold">
            Masaya · Parque Central · r = {RADIO_5KM / 1000} km
          </Text>
        </View>
      </View>
    </View>
  );
}
