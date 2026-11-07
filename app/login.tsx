import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import '../global.css'
import BrandLogo from '@/components/BrandLogo';
import React, { useState } from 'react';
import { loginUser } from '@/services/authService';
import { LinearGradient } from 'expo-linear-gradient';

export default  function LoginScreen(){
    const router  = useRouter();
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setPasswordVisibility] = useState(false);

    const handleLogin = async () => {
  if (!usuario.trim() || !contrasena.trim()) {
    Alert.alert('Campos incompletos', 'Por favor ingresa tu usuario y contraseña.');
    return;
  }

  try {
    setLoading(true);
    await loginUser(usuario.trim(), contrasena);
    router.replace('/(tabs)');
  } catch (error: any) {
    Alert.alert('Error de inicio de sesión', error.message || 'Credenciales inválidas.');
  } finally {
    setLoading(false);
  }
};
    return(

      <LinearGradient
         colors={['#FFF5C3', '#FFFFFF']}
        style={{ flex: 1 }}
      >
          <SafeAreaView className='flex-1'>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
              className="flex-1"
            >
              <ScrollView
                contentContainerClassName="flex-grow justify-end p-6 md:p-10 pb-12"
                bounces={false}
                keyboardShouldPersistTaps="handled"
               >
                 {/* Header con logo + nombre */}
                 

                 {/* Tarjeta principal estilo iOS */}
                 <View className="my-auto py-10">
                   <View className="items-center mb-8">
                     <BrandLogo variant="png" size={72} />
                     <Text className="text-[28px] font-extrabold text-slate-900 tracking-tight mt-5">
                       Bienvenido
                     </Text>
                     <Text className="text-[15px] text-slate-500 mt-1 text-center">
                       Ingresa a tu cuenta para continuar
                     </Text>
                   </View>

                   {/* Campos estilo iOS: fondo gris, sin borde */}
                   <View className="gap-3">
                     <View className="flex-row items-center bg-[#F2F2F7] rounded-2xl px-4 py-3.5">
                       <FontAwesome5 name="user" size={15} color="#8E8E93" />
                       <TextInput
                         placeholder="Usuario o correo electrónico"
                         placeholderTextColor="#8E8E93"
                         value={usuario}
                         onChangeText={setUsuario}
                         className="flex-1 text-slate-900 text-[15px] ml-3 p-0"
                         autoCapitalize="none"
                         autoCorrect={false}
                         keyboardType='email-address'
                       />
                     </View>

                     <View className="flex-row items-center bg-[#F2F2F7] rounded-2xl px-4 py-3.5">
                       <FontAwesome5 name="lock" size={15} color="#8E8E93" />
                       <TextInput
                         placeholder="Contraseña"
                         placeholderTextColor="#8E8E93"
                         secureTextEntry={!showPassword}
                         value={contrasena}
                         onChangeText={setContrasena}
                         className="flex-1 text-slate-900 text-[15px] ml-3 p-0"
                       />
                       <TouchableOpacity
                         onPress={() => setPasswordVisibility(!showPassword)}
                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                       >
                         <FontAwesome5
                           name={showPassword ? "eye-slash" : "eye"}
                           size={15}
                           color="#8E8E93"
                         />
                       </TouchableOpacity>
                     </View>
                   </View>

                   <TouchableOpacity
                     onPress={() => router.push('/recuperar' as any)}
                     className="self-end mt-3"
                     hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                   >
                     <Text className="text-[#d99b26] text-[13px] font-semibold">
                       ¿Olvidaste tu contraseña?
                     </Text>
                   </TouchableOpacity>

                   {/* Botón principal con gradiente */}
                   <TouchableOpacity
                     onPress={handleLogin}
                     activeOpacity={0.85}
                     disabled={loading}
                     className="mt-7 items-center justify-center h-[52px] rounded-2xl overflow-hidden shadow-lg"
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
                           Iniciar sesión
                         </Text>
                       )}
                     </LinearGradient>
                   </TouchableOpacity>

                   <View className="items-center mt-8">
                     <TouchableOpacity onPress={() => router.push('/registro' as any)}>
                       <Text className="text-slate-600 text-[15px]">
                         ¿No tienes cuenta?{' '}
                         <Text className="text-[#d99b26] font-bold">Regístrate</Text>
                       </Text>
                     </TouchableOpacity>
                   </View>
                 </View>

                 {/* Pie */}
                 <View className="items-center pb-2">
                   <Text className="text-xs text-slate-400 font-medium">
                     Al continuar aceptas los Términos y el Aviso de Privacidad
                   </Text>
                 </View>

              </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

      </LinearGradient>

    )
}
