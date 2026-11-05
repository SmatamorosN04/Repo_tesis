import '../../global.css';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { AppHeader } from '@/components/AppHeader';
import MapaWeb, { MASAYA_CENTER, RADIO_5KM } from '@/components/MapaPlaceholder';
import ReportarIncidenteFab from '@/components/ReportarIncidenteFab';

export default function MapaScreen() {
  const [busqueda, setBusqueda] = useState('');
  const [ubicacion, setUbicacion] = useState<{ lat: number; lng: number } | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: MASAYA_CENTER.lat,
    longitude: MASAYA_CENTER.lng,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  } as { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number });
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);

  // Obtener la ubicación del usuario (dentro o fuera del radio de estudio)
  useEffect(() => {
    (async () => {
      setCargandoUbicacion(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setUbicacion({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }
      setCargandoUbicacion(false);
    })();
  }, []);

  const handleBuscar = () => {
    // TODO: geocoding (Nominatim/GeoPy del backend) → animar mapRegion al destino
  };

  /** Recentra el mapa en la ubicación real del usuario; si falla, al centro de Masaya */
  const irA_miUbicacion = () => {
    const target = ubicacion ?? { lat: MASAYA_CENTER.lat, lng: MASAYA_CENTER.lng };
    setMapRegion((prev) => ({
      ...prev,
      latitude: target.lat,
      longitude: target.lng,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    }));
  };

  /** Mapa según plataforma: nativo (react-native-maps) o placeholder estilizado (web).
   *  El módulo nativo se require de forma condicional para que web no lo evalúe. */
  const renderMapa = () => {
    if (Platform.OS === 'web') {
      return <MapaWeb />;
    }
    // Evalúa react-native-maps SOLO en nativo
    const MapaNativo = require('@/components/MapaNativo').default;
    return (
      <MapaNativo
        region={mapRegion}
        onRegionChange={setMapRegion}
        ubicacion={ubicacion}
        onCentro={irA_miUbicacion}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F7]" edges={['top']}>
      <View className="flex-1">
        {/* ===== Mapa ===== */}
        <View className="absolute inset-0">{renderMapa()}</View>

        {/* ===== Overlay superior con el degradado del login (#FFF5C3 → transparente) ===== */}
        <LinearGradient
          colors={['#FFF5C3', 'rgba(255,245,195,0)']}
          locations={[0.35, 1]}
          className="pb-2"
        >
          {/* Header flotante: perfil / logo+nombre */}
          <AppHeader />

          {/* Barra de búsqueda de destino */}
          <View className="px-5 pt-2 flex-row gap-2">
            <View className="flex-1 flex-row items-center bg-white rounded-full px-4 py-3 shadow-lg">
              <FontAwesome5 name="search" size={16} color="#64748b" />
              <TextInput
                placeholder="¿A dónde quieres ir?"
                placeholderTextColor="#94a3b8"
                value={busqueda}
                onChangeText={setBusqueda}
                onSubmitEditing={handleBuscar}
                returnKeyType="search"
                autoCorrect={false}
                className="flex-1 text-slate-800 text-[15px] ml-3 p-0"
              />
              {busqueda.length > 0 && (
                <TouchableOpacity onPress={() => setBusqueda('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <FontAwesome5 name="times-circle" size={16} color="#cbd5e1" />
                </TouchableOpacity>
              )}
            </View>

            {/* Botón de geolocalización personalizado */}
            <TouchableOpacity
              onPress={irA_miUbicacion}
              activeOpacity={0.8}
              className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg"
            >
              {cargandoUbicacion ? (
                <ActivityIndicator color="#d99b26" size="small" />
              ) : (
                <FontAwesome5 name="crosshairs" size={18} color="#d99b26" />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ===== Leyenda rápida de estados ===== */}
        <View className="px-5 pt-3">
          <View className="self-start flex-row items-center gap-4 bg-white/90 rounded-full px-4 py-2 shadow-sm">
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <Text className="text-xs text-slate-600 font-medium">Alto</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
              <Text className="text-xs text-slate-600 font-medium">Medio</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              <Text className="text-xs text-slate-600 font-medium">Bajo</Text>
            </View>
          </View>
        </View>

        {/* ===== Botón flotante: Reportar incidente (esquina inferior derecha) ===== */}
        <ReportarIncidenteFab />
      </View>
    </SafeAreaView>
  );
}
