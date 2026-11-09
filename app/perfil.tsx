import '../global.css';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import BrandLogo from '@/components/BrandLogo';
import ScreenSkeleton from '@/components/ScreenSkeleton';
import { useScreenSkeleton } from '@/hooks/useScreenSkeleton';

const OPCIONES = [
  { id: 1, icon: 'user-edit' as const, label: 'Editar perfil' },
  { id: 2, icon: 'bell' as const, label: 'Notificaciones' },
  { id: 3, icon: 'lock' as const, label: 'Privacidad y seguridad' },
  { id: 4, icon: 'moon' as const, label: 'Apariencia' },
  { id: 5, icon: 'info-circle' as const, label: 'Acerca de la app' },
];

export default function PerfilScreen() {
  const router = useRouter();
  // Skeleton mientras la pantalla se monta por primera vez
  const cargando = useScreenSkeleton();

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F7]" edges={['top', 'bottom']}>
      {/* Botón de regreso */}
      <View className="px-4 pt-2">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
          <FontAwesome5 name="chevron-left" size={18} color="#d99b26" />
          <Text className="text-[#d99b26] font-semibold text-base ml-1">Atrás</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {cargando ? (
          <ScreenSkeleton variant="profile" />
        ) : (
          <ScrollView
            contentContainerClassName="px-5 pb-10"
            showsVerticalScrollIndicator={false}
          >
        {/* Tarjeta de perfil */}
        <View className="items-center mt-6 mb-8">
          {/* Avatar con el logo de la app (variante jpeg: ocasión especial) */}
          <View className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-[#F5D547]">
            <BrandLogo variant="jpeg" size={88} />
          </View>
          <Text className="text-xl font-bold text-slate-900 mt-4">usuario</Text>
          <Text className="text-slate-500 text-sm mt-1">usuario@correo.com</Text>

          <TouchableOpacity activeOpacity={0.7} className="mt-4">
            <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm border border-slate-100">
              <FontAwesome5 name="pen" size={12} color="#d99b26" />
              <Text className="text-[#d99b26] font-semibold text-sm ml-2">Editar perfil</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Opciones */}
        <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {OPCIONES.map((op, i) => (
            <TouchableOpacity key={op.id} activeOpacity={0.6}>
              <View
                className={`flex-row items-center px-4 py-4 ${
                  i !== OPCIONES.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <View className="w-9 h-9 rounded-full bg-[#FFF5C3] items-center justify-center">
                  <FontAwesome5 name={op.icon} size={14} color="#d99b26" />
                </View>
                <Text className="flex-1 text-[15px] text-slate-800 font-medium ml-3">
                  {op.label}
                </Text>
                <FontAwesome5 name="chevron-right" size={13} color="#cbd5e1" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity activeOpacity={0.7} className="mt-6">
          <View className="bg-white rounded-2xl shadow-sm px-4 py-4 flex-row items-center justify-center border border-slate-100">
            <FontAwesome5 name="sign-out-alt" size={16} color="#ef4444" />
            <Text className="text-[#ef4444] font-semibold text-base ml-2">Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
