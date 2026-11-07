import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import React, {useState} from "react";
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert, ActivityIndicator } from "react-native";
import { registerUser } from "@/services/authService";
import { LinearGradient } from "expo-linear-gradient";
import BrandLogo from "@/components/BrandLogo";

export default function RegisterScreen(){
    const router = useRouter();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

   const handleRegister = async (e?: any) => {
    if(e?.preventDefault){
        e.preventDefault();
    }
    if (!user || !email || !password || !confirmPassword) {
        Alert.alert('Campos incompletos', 'Por favor llena todos los campos para continuar.');
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden.');
        return;
    }

    try {
        setLoading(true);
        await registerUser(user.trim(), email.trim(), password);

        Alert.alert(
            'Registro exitoso',
            'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
            [
                {
                    text: 'OK',
                    onPress: () => router.replace('/login' as any),
                },
            ]
        );
    } catch (error: any) {
        Alert.alert('Error al registrar', error.message || 'Ocurrió un error al crear la cuenta.');

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
                    behavior={Platform.OS === 'ios' ? 'padding': undefined}
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
                            <BrandLogo variant="svg" size={34} />
                            <Text className="text-[15px] font-bold text-slate-900 tracking-tight">
                                Seguridad Ciudadana
                            </Text>
                        </View>

                        <View className="my-auto py-8 max-w-sm self-center w-full">
                            {/* Botón atrás estilo iOS */}
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="self-start flex-row items-center mb-4"
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                <FontAwesome5 name="chevron-left" size={16} color="#d99b26" />
                                <Text className="text-[#d99b26] font-semibold text-[15px] ml-1.5">Atrás</Text>
                            </TouchableOpacity>

                            <View className="items-center mb-8">
                                <BrandLogo variant="png" size={72} />
                                <Text className="text-[28px] font-extrabold text-slate-900 tracking-tight mt-5">
                                    Crear cuenta
                                </Text>
                                <Text className="text-[15px] text-slate-500 mt-1 text-center">
                                    Únete a tu comunidad segura
                                </Text>
                            </View>

                            {/* Campos estilo iOS */}
                            <View className="gap-3">
                                <View className="flex-row items-center bg-[#F2F2F7] rounded-2xl px-4 py-3.5">
                                    <FontAwesome5 name="user" size={15} color="#8E8E93" />
                                    <TextInput
                                        placeholder="Nombre de usuario"
                                        placeholderTextColor="#8E8E93"
                                        value={user}
                                        onChangeText={setUser}
                                        className="flex-1 text-slate-900 text-[15px] ml-3 p-0"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View className="flex-row items-center bg-[#F2F2F7] rounded-2xl px-4 py-3.5">
                                    <FontAwesome5 name="envelope" size={15} color="#8E8E93" />
                                    <TextInput
                                        placeholder="Correo electrónico"
                                        placeholderTextColor="#8E8E93"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        className="flex-1 text-slate-900 text-[15px] ml-3 p-0"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View className="flex-row items-center bg-[#F2F2F7] rounded-2xl px-4 py-3.5">
                                    <FontAwesome5 name="lock" size={15} color="#8E8E93" />
                                    <TextInput
                                        placeholder="Contraseña"
                                        placeholderTextColor="#8E8E93"
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={setPassword}
                                        className="flex-1 text-slate-900 text-[15px] ml-3 p-0"
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                        <FontAwesome5
                                            name={showPassword ? "eye-slash": "eye"}
                                            size={15}
                                            color="#8E8E93"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-row items-center bg-[#F2F2F7] rounded-2xl px-4 py-3.5">
                                    <FontAwesome5 name="check-double" size={15} color="#8E8E93" />
                                    <TextInput
                                        placeholder="Confirmar contraseña"
                                        placeholderTextColor="#8E8E93"
                                        secureTextEntry={!showPassword}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        className="flex-1 text-slate-900 text-[15px] ml-3 p-0"
                                    />
                                </View>
                            </View>

                            {/* Botón principal con gradiente */}
                            <TouchableOpacity
                                onPress={() => handleRegister()}
                                disabled={loading}
                                activeOpacity={0.85}
                                className="mt-8 items-center justify-center h-[52px] rounded-2xl overflow-hidden shadow-lg"
                                style={{ shadowColor: '#d99b26', shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 8 }}
                            >
                                <LinearGradient
                                    colors={!loading ? ['#E8B33A', '#d99b26'] : ['#9CA3AF', '#9CA3AF']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ flex: 1, alignSelf: 'stretch', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {loading ? (
                                        <ActivityIndicator color='#ffffff' />
                                    ):(
                                        <Text className="text-[#1E1E1E] font-bold text-base tracking-wide">
                                            Registrarse
                                        </Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                            <View className="items-center mt-8">
                                <TouchableOpacity onPress={() => router.push('/login' as any)}>
                                    <Text className="text-slate-600 text-[15px]">
                                        ¿Ya tienes cuenta?{' '}
                                        <Text className="text-[#d99b26] font-bold">Inicia sesión</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>

    )
}
