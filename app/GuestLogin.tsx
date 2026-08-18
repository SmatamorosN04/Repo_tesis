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
      <SafeAreaView className="flex-1 bg-gradient-to-t from-white to-[#FFF5C3]">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerClassName="flex-grow justify-between p-6 md:p-12"
            bounces={false}
          >
            {/* Header / Logo */}
            <View className="flex-row items-center gap-3">
              <Logo size={22} />
              <View>
                <Text className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                  Seguridad
                </Text>
                <Text className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                  Ciudadana
                </Text>
              </View>
            </View>

            {/* Contenedor principal centrado */}
            <View className="w-full max-w-sm self-center bg-white/80 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 my-auto">
              <Text className="text-2xl font-bold text-slate-900 text-center mb-2">
                Modo Invitado
              </Text>
              <Text className="text-slate-500 text-sm text-center mb-6">
                Ingrese un nombre con el cual identificarse en el sistema
              </Text>

              {/* Input Nombre de Usuario */}
              <View className="mb-6">
                <View className="flex-row items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
                  <FontAwesome5 name="user-tag" size={16} color="#64748b" className="mr-3" />
                  <TextInput
                    placeholder="Nombre de usuario"
                    placeholderTextColor="#94a3b8"
                    value={username}
                    onChangeText={setUsername}
                    className="flex-1 text-slate-800 text-base p-0"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={20}
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Botón Principal */}
              <TouchableOpacity
                onPress={handleGuestLogin}
                activeOpacity={0.8}
                disabled={loading}
                className={`py-3.5 rounded-full items-center justify-center mb-6 shadow-sm ${
                  loading ? 'bg-[#d99b26]/60' : 'bg-[#d99b26]'
                }`}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-white font-bold text-base uppercase tracking-wider">
                    Continuar
                  </Text>
                )}
              </TouchableOpacity>

              <View className="items-center gap-2">
                <TouchableOpacity onPress={() => router.back()} disabled={loading}>
                  <Text className="text-[#d99b26] text-sm font-semibold">
                    Volver al Inicio de sesión
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