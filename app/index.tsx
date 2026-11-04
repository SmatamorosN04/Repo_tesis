import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css'
import { Logo } from '@/components/Logo';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GuestLoginButton } from '@/components/GuestLoginButton';

export default function WelcomeScreen(){

    const router = useRouter();

    return (

        <LinearGradient
        colors={['#FFF5C3', '#FFFFFF']}
        style={{ flex: 1 }}
    >

        <SafeAreaView className='flex-1'>
            <ScrollView
                contentContainerClassName='flex-grow p-6 md:p-10'
                bounces={false}
            >
                {/* Header con logo + nombre */}
                <View className='flex-row items-center gap-3 pt-2'>
                    <Logo size={16}/>
                    <Text className='text-[15px] font-bold text-slate-900 tracking-tight'>
                        Seguridad Ciudadana
                    </Text>
                </View>

                <View className="my-auto items-center py-8 gap-8">
                    {/* Hero con ilustración */}
                    <View className='items-center justify-center'>
                        <View className='w-52 h-52 rounded-full bg-amber-200/60 border-2 border-amber-300/70 items-center justify-center'>
                            <View className='w-36 h-36 rounded-full bg-white items-center justify-center shadow-lg'>
                                <FontAwesome5 name="users" size={56} color="#334155" />
                            </View>
                        </View>
                    </View>

                    {/* Encabezado y descripción */}
                    <View className='items-center max-w-sm w-full'>
                        <Text className='text-3xl font-extrabold text-slate-900 text-center tracking-tight leading-snug mb-3'>
                            Tu comunidad,{'\n'}segura.
                        </Text>

                        <Text className='text-slate-500 text-center text-[15px] leading-relaxed mb-6'>
                            Reporta incidentes, mantente alerta y colabora
                            con tus vecinos para un entorno más seguro.
                        </Text>

                        {/* Chips de características */}
                        <View className='flex-row items-center justify-center gap-2.5 mb-10 flex-wrap'>
                            <View className='flex-row items-center bg-white rounded-full px-3.5 py-2 shadow-sm border border-slate-100'>
                                <FontAwesome5 name="bell" size={11} color="#d99b26" />
                                <Text className='text-xs text-slate-700 font-semibold ml-1.5'>Alertas en tiempo real</Text>
                            </View>
                            <View className='flex-row items-center bg-white rounded-full px-3.5 py-2 shadow-sm border border-slate-100'>
                                <FontAwesome5 name="map-marker-alt" size={11} color="#d99b26" />
                                <Text className='text-xs text-slate-700 font-semibold ml-1.5'>Mapa de zonas</Text>
                            </View>
                            <View className='flex-row items-center bg-white rounded-full px-3.5 py-2 shadow-sm border border-slate-100'>
                                <FontAwesome5 name="users" size={11} color="#d99b26" />
                                <Text className='text-xs text-slate-700 font-semibold ml-1.5'>Comunidad</Text>
                            </View>
                        </View>

                        <View className='w-full gap-3'>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => router.push('/login' as any)}
                                className="items-center justify-center h-[54px] overflow-hidden shadow-lg rounded-2xl"
                                style={{ shadowColor: '#d99b26', shadowOpacity: 0.4, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 8 }}
                            >
                                <LinearGradient
                                    colors={['#E8B33A', '#d99b26']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ flex: 1, alignSelf: 'stretch', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text className='text-[#1E1E1E] font-bold text-[16px] tracking-wide'>
                                        Iniciar sesión
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                           <GuestLoginButton onSuccess={() => router.push('/GuestLogin' as any)}/>
                        </View>
                    </View>
                </View>

                <View className='flex-row justify-center gap-8 pt-4 pb-2'>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => router.push('/privacidad')}
                    >
                        <Text className='text-xs text-slate-500 font-semibold'>
                            Aviso de privacidad
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6}>
                        <Text className='text-xs text-slate-500 font-semibold'>
                            Ayuda
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    )
}
