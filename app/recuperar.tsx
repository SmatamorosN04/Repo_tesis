import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import React, {useState} from 'react';
import { Logo } from '@/components/Logo';

export default function RecuperarScreen(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [send, setSend] = useState(false);

    const handleRecuperar = () => {
        if (!email){
            Alert.alert('Campo requerido', 'Por favor ingresa tu correo electrónico');
            return;
        }

        console.log('solicitud de recuperacion para', email);
        setSend(true);
    };

    return(
        <SafeAreaView className='flex-1 bg-gradient-to-t from-white to-[#FFF5C3]'>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding': undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
                className='flex-1'
            >
                <ScrollView
                    contentContainerClassName='flex-grow p-6 md:p-10 pb-16'
                    bounces={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header con logo + nombre */}
                    <View className='flex-row items-center gap-3 pt-2'>
                        <Logo size={16} />
                        <Text className='text-[15px] font-bold text-slate-900 tracking-tight'>
                            Seguridad Ciudadana
                        </Text>
                    </View>

                    <View className='my-auto py-8 max-w-sm self-center w-full'>
                        {/* Botón atrás estilo iOS */}
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className='self-start flex-row items-center mb-4'
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <FontAwesome5 name="chevron-left" size={16} color="#d99b26" />
                            <Text className='text-[#d99b26] font-semibold text-[15px] ml-1.5'>Atrás</Text>
                        </TouchableOpacity>

                        {!send ? (
                            <>
                                <View className='items-center mb-8'>
                                    <View className='w-16 h-16 rounded-2xl bg-slate-900 items-center justify-center shadow-lg border-2 border-[#F5D547]'>
                                        <FontAwesome5 name='lock' size={24} color='#F5D547' />
                                    </View>
                                    <Text className='text-[28px] font-extrabold text-slate-900 tracking-tight mt-5'>
                                        Recuperar contraseña
                                    </Text>
                                    <Text className='text-[15px] text-slate-500 mt-2 text-center leading-relaxed'>
                                        Ingresa tu correo electrónico registrado y te enviaremos las instrucciones.
                                    </Text>
                                </View>

                                {/* Campo estilo iOS */}
                                <View className='flex-row items-center bg-[#F2F2F7] rounded-2xl px-4 py-3.5 mb-8'>
                                    <FontAwesome5 name="envelope" size={15} color="#8E8E93" />
                                    <TextInput
                                        placeholder='Correo electrónico'
                                        placeholderTextColor="#8E8E93"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType='email-address'
                                        className='flex-1 text-slate-900 text-[15px] ml-3 p-0'
                                        autoCapitalize='none'
                                    />
                                </View>

                                <TouchableOpacity
                                    onPress={handleRecuperar}
                                    activeOpacity={0.85}
                                    className='items-center justify-center h-[52px] mb-5 overflow-hidden shadow-lg rounded-2xl'
                                    style={{ shadowColor: '#d99b26', shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 8 }}
                                >
                                    <View
                                        className='flex-1 self-stretch items-center justify-center rounded-2xl'
                                        style={{ backgroundColor: '#d99b26' }}
                                    >
                                        <Text className='text-[#1E1E1E] font-bold text-base tracking-wide'>
                                            Enviar instrucciones
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        ): (
                            <View className='items-center py-4'>
                                <View className='w-20 h-20 bg-green-50 rounded-full items-center justify-center mb-5 border border-green-200'>
                                    <FontAwesome5 name='check' size={30} color='#22c55e' />
                                </View>

                                <Text className='text-2xl font-extrabold text-slate-900 tracking-tight mb-2'>
                                    ¡Correo enviado!
                                </Text>

                                <Text className='text-slate-500 text-[15px] text-center mb-8 leading-relaxed'>
                                    Enviamos las instrucciones a{'\n'}
                                    <Text className='font-semibold text-slate-800'>{email}</Text>
                                    {'\n'}Revisa tu bandeja de entrada o spam.
                                </Text>

                                <TouchableOpacity
                                    onPress={()=>setSend(false)}
                                    className='self-start flex-row items-center'
                                >
                                    <FontAwesome5 name='redo' size={13} color="#d99b26" />
                                    <Text className='text-[#d99b26] text-[15px] font-semibold ml-2'>
                                        Usar otro correo
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <View className='items-center pt-4'>
                            <TouchableOpacity onPress={()=>router.push('/login' as any)}>
                                <Text className='text-slate-600 text-[15px]'>
                                    Recordaste tu contraseña?{' '}
                                    <Text className='text-[#d99b26] font-bold'>Inicia sesión</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
