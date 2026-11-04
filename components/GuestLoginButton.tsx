import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';

interface GuestLoginButtonProps {
  onSuccess: () => void;
}

export const GuestLoginButton: React.FC<GuestLoginButtonProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    onSuccess();
    setLoading(false);
  };

  return (
    <View className="w-full mt-2">
      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-px bg-slate-400/40" />
        <Text className="mx-3 text-slate-500 text-sm font-semibold">O</Text>
        <View className="flex-1 h-px bg-slate-400/40" />
      </View>

      <TouchableOpacity
        className={`w-full bg-[#F2F2F7] rounded-2xl h-[54px] items-center justify-center ${
          loading ? 'opacity-60' : 'active:bg-slate-200'
        }`}
        onPress={handlePress}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#d99b26" />
        ) : (
          <Text className="text-slate-900 text-[16px] font-bold tracking-wide">
            Entrar como invitado
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};