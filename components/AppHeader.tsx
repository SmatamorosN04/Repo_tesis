import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Logo } from '@/components/Logo';

interface AppHeaderProps {
  onProfilePress?: () => void;
}

export function AppHeader({ onProfilePress }: AppHeaderProps) {
  const router = useRouter();

  const handleProfile = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push('/perfil' as any);
    }
  };

  return (
    <View className="flex-row items-center justify-between px-5 pb-2">
      {/* Icono de perfil (izquierda) */}
      <TouchableOpacity
        onPress={handleProfile}
        activeOpacity={0.7}
        className="w-11 h-11 rounded-full bg-white items-center justify-center shadow-md border border-slate-100"
      >
        <FontAwesome5 name="user-circle" size={24} color="#334155" solid />
      </TouchableOpacity>

      {/* Logo + nombre (centro) */}
      <View className="flex-row items-center gap-2">
        <Logo size={14} />
        <Text className="text-[15px] font-bold text-slate-900 tracking-tight">
          Seguridad Ciudadana
        </Text>
      </View>

      {/* Espaciador derecho para mantener el título centrado */}
      <View className="w-11 h-11" />
    </View>
  );
}
