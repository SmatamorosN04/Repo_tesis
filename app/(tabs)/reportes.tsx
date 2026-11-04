import '../../global.css';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppHeader } from '@/components/AppHeader';

const REPORTES = [
  {
    id: 1,
    tipo: 'Robo a transeúnte',
    lugar: 'Av. Principal, Col. Centro',
    time: 'Hace 15 min',
    icon: 'user-secret' as const,
    color: '#ef4444',
    bg: 'bg-red-50',
  },
  {
    id: 2,
    tipo: 'Incendio en vehículo',
    lugar: 'Calle Reforma #45',
    time: 'Hace 1 h',
    icon: 'fire' as const,
    color: '#f97316',
    bg: 'bg-orange-50',
  },
  {
    id: 3,
    tipo: 'Accidente de tránsito',
    lugar: 'Esquina Juárez / Madero',
    time: 'Hace 2 h',
    icon: 'car-crash' as const,
    color: '#eab308',
    bg: 'bg-yellow-50',
  },
  {
    id: 4,
    tipo: 'Alumbrado público dañado',
    lugar: 'Calle Los Pinos #12',
    time: 'Ayer',
    icon: 'lightbulb' as const,
    color: '#22c55e',
    bg: 'bg-green-50',
  },
];

export default function ReportesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <AppHeader />

      <View className="px-5 pt-2 pb-2">
        <Text className="text-2xl font-bold text-slate-900">Reportes</Text>
        <Text className="text-slate-500 text-sm mt-0.5">
          Últimos incidentes reportados en tu zona
        </Text>
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-24 gap-3"
        showsVerticalScrollIndicator={false}
      >
        {REPORTES.map((r) => (
          <View
            key={r.id}
            className="flex-row items-center bg-white rounded-2xl p-4 border border-slate-100 shadow-sm"
          >
            <View className={`w-12 h-12 rounded-2xl ${r.bg} items-center justify-center`}>
              <FontAwesome5 name={r.icon} size={18} color={r.color} />
            </View>

            <View className="flex-1 ml-3">
              <Text className="text-[15px] font-semibold text-slate-900">{r.tipo}</Text>
              <Text className="text-sm text-slate-500 mt-0.5">{r.lugar}</Text>
            </View>

            <Text className="text-xs text-slate-400 font-medium">{r.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
