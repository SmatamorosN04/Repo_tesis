import React, {useState} from "react";
import {
    TouchableOpacity,
    Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import { loginGuest } from "@/services/authService";

interface GuestLoginButtonProps{
    onSuccess: () => void;
}

export const GuestLoginButton: React.FC<GuestLoginButtonProps> =({onSuccess}) => {
    const [loading, setLoading] =useState(false);

    const handleGuestLogin = async () => {
        try{
            setLoading(true);
            await loginGuest();
            onSuccess();;
        }catch (error: any){
            Alert.alert('Error de acceso', error.message || 'no se pudo iniciar sesion como invitado');
        } finally {
            setLoading(false);
        }
    };

    return(
        <View className="w-full mt-4">
            <View className="flex-ow items-center mb-4">
                <View className="flex-1 h-px bg-slate-700"/>
                <Text className="mx-3 text-slate-400 text-sm font-medium">0</Text>
                <View className="flex-1 h-px bg-slate-700"/>
            </View>

            <TouchableOpacity
                className={`w-full bg-slate-800 border border-slate-600 rounded-xl py-3.5 items-center justify-center ${
                    loading? 'opacity-60': 'active:opacity-80'
                }`}
                onPress={handleGuestLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#FFFFFF"/>
                ):(
                    <Text className="text-slate-50 text-base font-semibold">
                        Entrar como invitado
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}