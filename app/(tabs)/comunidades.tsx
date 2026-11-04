import '../../global.css';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppHeader } from '@/components/AppHeader';

const COMUNIDADES = [
  {
    id: 1,
    nombre: 'Col. Centro',
    miembros: 320,
    alertas: 4,
    icon: 'city' as const,
  },
  {
    id: 2,
    nombre: 'Fracc. Los Álamos',
    miembros: 185,
    alertas: 2,
    icon: 'home' as const,
  },
  {
    id: 3,
    nombre: 'Unidad Habitacional Norte',
    miembros: 512,
    alertas: 7,
    icon: 'building' as const,
  },
];

export default function ComunidadesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <AppHeader />

      <View className="px-5 pt-2 pb-2">
        <Text className="text-2xl font-bold text-slate-900">Comunidades</Text>
        <Text className="text-slate-500 text-sm mt-0.5">
          Conecta con vecinos y mantente informado
        </Text>
      </View>

      <ScrollView
        contentContainerClassName="px-5 pb-24 gap-3"
        showsVerticalScrollIndicator={false}
      >
        {COMUNIDADES.map((c) => (
          <TouchableOpacity key={c.id} activeOpacity={0.7}>
            <View className="flex-row items-center bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <View className="w-12 h-12 rounded-2xl bg-slate-900 items-center justify-center">
                <FontAwesome5 name={c.icon} size={18} color="#F5D547" />
              </View>

              <View className="flex-1 ml-3">
                <Text className="text-[15px] font-semibold text-slate-900">{c.nombre}</Text>
                <Text className="text-sm text-slate-500 mt-0.5">
                  {c.miembros} vecinos · {c.alertas} alertas activas
                </Text>
              </View>

              <FontAwesome5 name="chevron-right" size={14} color="#cbd5e1" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
