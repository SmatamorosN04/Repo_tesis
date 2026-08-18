import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
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
                contentContainerClassName='flex-grow justify-between p-6 md:p-12'
                bounces={false}
            >
                <View className='flex-row items-center gap-3'>
                    <Logo size={22}/>
                    <View>
                        <Text className='text-base md:text-lg font-bold text-slate-900 leading-tight'>
                            Seguridad
                        </Text>
                        <Text className='text-base md:text-lg font-bold text-slate-900 leading-tight'>
                            Ciudadana
                        </Text>
                    </View>
                </View>

                <View className="my-auto items-center md:flex-row md:justify-around md:px-10 py-6 gap-8">
                    <View className='items-center justify-center my-4 md:my-0'>
                        <View className='w-64 h-64 md:h-80 rounded-full bg-amber-200/60 border-2 border-amber-300 items-center justify-center shadow-inner'>
                            <FontAwesome5 name="users" size={80} color="#334155"/>
                        </View>
                    </View>

                    <View className='text-center md:items-start max-w-sm w-full'>
                        <Text className='text-2xl md:text-3xl font-extrabold text-slate-900 text-center md:text-left leading-tight mb-3'>
                            Tu comunidad Segura, Alerta, Reporta y Protege
                        </Text>

                        <Text className='text-slate-600 text-center md:text-left text-sm md:text-base leading-relaxed mb-8'>
                            BIenvenido a Alerta Ciudadana, Mantente Informado y colabora para un entorno mas seguro.
                        </Text>

                        <View className='w-full gap-3.5'>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => router.push('/login' as any)}
                                className='w-full bg-[#F5D547] py-4 rounded-full items-center shadow-md active:bg-amber-400'
                            >
                                <Text className='text-slate-900 font-black tracking-wider uppercase text-sm md:text-base'>
                                    Iniciar Sesion
                                </Text>
                            </TouchableOpacity>
                           <GuestLoginButton onSuccess={() => router.push('/GuestLogin' as any)}/>
                        </View>
                    </View>
                </View>

                <View className='flex-row justify-center md:justify-start gap-8 pt-4 border-t border-amber-300/50'>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => router.push('/privacidad')}
                    >
                        <Text className='text-xs text-slate-700 font-semibold'>
                            Aviso de privacidad
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6}>
                        <Text className='text-xs text-slate-700 font-semibold'>
                            Ayuda
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    )
}