import '../../global.css';
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Circle, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, type Region } from 'react-native-maps';
import { AppHeader } from '@/components/AppHeader';
import MapaWeb, { MASAYA_CENTER, RADIO_5KM } from '@/components/MapaPlaceholder';

/**
 * Zonas de riesgo semilla sobre la ciudad de Masaya, Nicaragua.
 * Color por nivel: verde (bajo), naranja (medio), rojo (alto).
 * TODO: alimentar desde GET /prediccion/riesgo del motor de IA (mapa de calor real).
 */
const ZONAS_RIESGO = [
  { id: 1, lat: 11.9744, lng: -86.0942, radio: 900, nivel: 'ALTO' },
  { id: 2, lat: 11.9665, lng: -86.0995, radio: 700, nivel: 'MEDIO' },
  { id: 3, lat: 11.9812, lng: -86.1031, radio: 600, nivel: 'MEDIO' },
  { id: 4, lat: 11.9689, lng: -86.0858, radio: 800, nivel: 'BAJO' },
  { id: 5, lat: 11.9789, lng: -86.0893, radio: 500, nivel: 'BAJO' },
] as const;

const NIVEL_COLOR: Record<string, { fill: string; stroke: string }> = {
  ALTO: { fill: 'rgba(239,68,68,0.22)', stroke: 'rgba(239,68,68,0.55)' },
  MEDIO: { fill: 'rgba(249,115,22,0.2)', stroke: 'rgba(249,115,22,0.5)' },
  BAJO: { fill: 'rgba(34,197,94,0.18)', stroke: 'rgba(34,197,94,0.4)' },
};

export default function MapaScreen() {
  const [busqueda, setBusqueda] = useState('');
  const [ubicacion, setUbicacion] = useState<{ lat: number; lng: number } | null>(null);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: MASAYA_CENTER.lat,
    longitude: MASAYA_CENTER.lng,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  });
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);

  /**
   * Ubicación de la zona de estudio definida en el protocolo: radio aproximado
   * de 5 km generado por IA, siempre centrado en Masaya.
   */
  const zonaEstudio = useMemo(
    () => ({
      latitude: MASAYA_CENTER.lat,
      longitude: MASAYA_CENTER.lng,
      radius: RADIO_5KM,
    }),
    []
  );

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

  const irAZonaCentro = () => {
    setMapRegion((prev) => ({ ...prev, latitude: MASAYA_CENTER.lat, longitude: MASAYA_CENTER.lng, latitudeDelta: 0.09, longitudeDelta: 0.09 }));
  };

  const renderMapaNativo = () => (
    <MapView
      style={{ flex: 1 }}
      region={mapRegion}
      onRegionChangeComplete={setMapRegion}
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      showsUserLocation
      showsMyLocationButton
      showsCompass={false}
      toolbarEnabled={false}
      rotateEnabled={false}
      pitchEnabled={false}
      zoomControlEnabled
    >
      {/* Radio de estudio: 5 km alrededor de Masaya */}
      <Circle
        center={zonaEstudio}
        radius={zonaEstudio.radius}
        strokeWidth={1}
        strokeColor="rgba(217,155,38,0.5)"
        fillColor="rgba(217,155,38,0.06)"
      />

      {/* Zonas de riesgo (futuras capas de mapa de calor del motor IA) */}
      {ZONAS_RIESGO.map((z) => (
        <Circle
          key={z.id}
          center={{ latitude: z.lat, longitude: z.lng }}
          radius={z.radio}
          strokeWidth={1.5}
          strokeColor={NIVEL_COLOR[z.nivel].stroke}
          fillColor={NIVEL_COLOR[z.nivel].fill}
        />
      ))}

      {/* Ubicación del usuario de respaldo si la API nativa no la muestra */}
      {ubicacion && (
        <Marker
          coordinate={{ latitude: ubicacion.lat, longitude: ubicacion.lng }}
          title="Estás aquí"
          description="Tu ubicación actual"
          pinColor="#2F74D0"
        />
      )}
    </MapView>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F2F5F7]" edges={['top']}>
      <View className="flex-1">
        {/* ===== Mapa react-native-maps (nativo) o placeholder estilizado (web) ===== */}
        <View className="absolute inset-0">
          {Platform.OS === 'web' ? <MapaWeb /> : renderMapaNativo()}
        </View>

        {/* ===== Header flotante: perfil / logo+nombre ===== */}
        <AppHeader />

        {/* ===== Barra de búsqueda de destino ===== */}
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

          {/* Botón volver al centro del radio de estudio */}
          <TouchableOpacity
            onPress={irAZonaCentro}
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

        {/* ===== Botón flotante: Reportar incidente ===== */}
        {/* Conectará con POST /incidentes/reportar del backend */}
        <Pressable
          onPress={() => {}}
          className="absolute bottom-6 right-5 flex-row items-center bg-[#d99b26] rounded-full px-5 py-4 shadow-lg"
          style={{ shadowColor: '#d99b26', shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 6 }}
        >
          <FontAwesome5 name="exclamation-circle" size={18} color="#ffffff" />
          <Text className="text-white font-bold text-sm ml-2">Reportar incidente</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
