import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, View, Text, type ColorValue } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabIcon({
  name,
  solid,
  focused,
  color,
}: {
  name: string;
  solid?: boolean;
  focused: boolean;
  color: ColorValue;
}) {
  return (
    <View className="items-center justify-center" style={{ width: 28 }}>
      <FontAwesome5 name={name as any} size={20} color={color} solid={solid} />
      {focused && (
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: '#d99b26',
            marginTop: 3,
          }}
        />
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Deshabilitar el header estático para usar headers propios en cada pantalla
        headerShown: false,
        // === Rendimiento de navegación ===
        // La pestaña inactiva se congela: no re-renderiza ni ejecuta frames
        // (el mapa de Google deja de trabajar al cambiar a otra tab).
        freezeOnBlur: true,
        // Montaje diferido: cada tab se monta hasta la primera vez que se visita.
        lazy: true,
        tabBarActiveTintColor: '#d99b26',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 10 : 6,
          left: 16,
          right: 16,
          height: 64,
          borderRadius: 20,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          shadowColor: '#0f172a',
          shadowOpacity: 0.08,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 6 },
          elevation: 10,
        },
        // El header se renderiza de forma estática en web y puede causar
        // errores de hidratación en React Navigation v6.
        headerShadowVisible: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="map-marker-alt" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reportes"
        options={{
          title: 'Reportes',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="clipboard-list" solid focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="comunidades"
        options={{
          title: 'Comunidades',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="users" solid focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
