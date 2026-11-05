import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import '../global.css';
import { Logo } from '@/components/Logo';
import { loginGuest } from '@/services/authService';

export default function GuestLoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    const trimmedName = username.trim();

    if (!trimmedName) {
      Alert.alert('Nombre requerido', 'Ingresa un nombre de usuario para continuar.');
      return;
    }
    if (trimmedName.length < 3) {
      Alert.alert('Nombre muy corto', 'El nombre debe tener al menos 3 caracteres.');
      return;
    }

    try {
      setLoading(true);
      await loginGuest(trimmedName);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert(
        'Error de acceso',
        error.message || 'No se pudo iniciar sesión como invitado. Inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#FFF5C3', '#FFFFFF']}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
          className="flex-1"
        >
          <ScrollView
            contentContainerClassName="flex-grow p-6 md:p-10 pb-16"
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header con logo + nombre */}
            <View className="flex-row items-center gap-3 pt-2">
              <Logo size={16} />
              <Text className="text-[15px] font-bold text-slate-900 tracking-tight">
                Seguridad Ciudadana
              </Text>
            </View>

            {/* Botón atrás justo debajo del header, arriba de la tarjeta */}
            <TouchableOpacity
              onPress={() => router.back()}
              disabled={loading}
              className="self-start flex-row items-center mt-4"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <FontAwesome5 name="chevron-left" size={16} color="#d99b26" />
              <Text className="text-[#d99b26] font-semibold text-[15px] ml-1.5">Atrás</Text>
            </TouchableOpacity>

            <View className="my-auto py-6 max-w-sm self-center w-full">
              <View className="items-center mb-8">
                <View className="w-16 h-16 rounded-2xl bg-slate-900 items-center justify-center shadow-lg border-2 border-[#F5D547]">
                  <FontAwesome5 name="user-secret" size={24} color="#F5D547" />
                </View>
                <Text className="text-[28px] font-extrabold text-slate-900 tracking-tight mt-5">
                  Modo invitado
                </Text>
                <Text className="text-[15px] text-slate-500 mt-1 text-center leading-relaxed">
                  Ingresa un nombre con el que identificarte en el sistema
                </Text>
              </View>

              {/* Campo estilo iOS */}
              <View className="flex-row items-center bg-[#F2F2F7] rounded-2xl px-4 py-3.5 mb-8">
                <FontAwesome5 name="user-tag" size={15} color="#8E8E93" />
                <TextInput
                  placeholder="Nombre de usuario"
                  placeholderTextColor="#8E8E93"
                  value={username}
                  onChangeText={setUsername}
                  className="flex-1 text-slate-900 text-[15px] ml-3 p-0"
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={20}
                  editable={!loading}
                />
              </View>

              {/* Botón principal con gradiente */}
              <TouchableOpacity
                onPress={handleGuestLogin}
                activeOpacity={0.85}
                disabled={loading}
                className="items-center justify-center h-[52px] overflow-hidden shadow-lg rounded-2xl"
                style={{ shadowColor: '#d99b26', shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 8 }}
              >
                <LinearGradient
                  colors={!loading ? ['#E8B33A', '#d99b26'] : ['#9CA3AF', '#9CA3AF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ flex: 1, alignSelf: 'stretch', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text className="text-[#1E1E1E] font-bold text-base tracking-wide">
                      Continuar
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <View className="items-center mt-8">
                <TouchableOpacity onPress={() => router.push('/login' as any)} disabled={loading}>
                  <Text className="text-slate-600 text-[15px]">
                    ¿Tienes cuenta?{' '}
                    <Text className="text-[#d99b26] font-bold">Inicia sesión</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
