import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * Centro geográfico de estudio del sistema, según el protocolo de tesis:
 * ciudad de Masaya, Nicaragua, con un radio de análisis aproximado de 5 km.
 */
export const MASAYA_CENTER = { lat: 11.9744, lng: -86.0942 };
export const RADIO_5KM = 5000;

/**
 * Placeholder estilizado del mapa para web (react-native-maps no soporta web).
 * En móvil nativo se usa react-native-maps (app/(tabs)/index.tsx).
 */
export default function MapaWeb() {
  const INCIDENTES = [
    { id: 1, top: '28%', left: '22%', type: 'exclamation-triangle', color: '#ef4444' },
    { id: 2, top: '52%', left: '68%', type: 'fire', color: '#f97316' },
    { id: 3, top: '68%', left: '35%', type: 'car-crash', color: '#eab308' },
  ];

  return (
    <View className="flex-1">
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
            Masaya, Nicaragua · r = {RADIO_5KM / 1000} km
          </Text>
        </View>
      </View>
    </View>
  );
}
