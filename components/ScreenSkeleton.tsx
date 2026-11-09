import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import LoadingSpinner from './LoadingSpinner';

interface ScreenSkeletonProps {
  /**
   * - 'map': pantalla completa para el mapa (calles tenues + spinner).
   * - 'list': tarjetas apiladas (reportes/comunidades).
   * - 'profile': avatar + opciones (perfil).
   */
  variant?: 'map' | 'list' | 'profile';
  /** Texto bajo el spinner (solo si showSpinner). */
  label?: string;
  /** El spinner solo se usa en el mapa; las listas/perfil usan solo skeleton. */
  showSpinner?: boolean;
}

/**
 * Skeleton de carga con pulso suave (opacidad animada en el hilo nativo).
 * Se muestra ENCIMA del contenido mientras la pantalla termina de cargar,
 * para que la app nunca parezca congelada.
 */
export default function ScreenSkeleton({
  variant = 'list',
  label = 'Cargando…',
  showSpinner,
}: ScreenSkeletonProps) {
  const pulse = useRef(new Animated.Value(0.45)).current;
  const conSpinner = showSpinner ?? variant === 'map';

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.45,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]} pointerEvents="none">
      {variant === 'map' && <MapSkeleton pulse={pulse} />}
      {variant === 'list' && <ListSkeleton pulse={pulse} />}
      {variant === 'profile' && <ProfileSkeleton pulse={pulse} />}

      {/* Spinner + texto (solo mapa) */}
      {conSpinner && (
        <View style={styles.center}>
          <View style={styles.spinnerCard}>
            <LoadingSpinner size={26} />
            <Text style={styles.spinnerText}>{label}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

function MapSkeleton({ pulse }: { pulse: Animated.Value }) {
  return (
    <>
      {/* Fondo tipo mapa despejado */}
      <View style={styles.mapBg} />

      {/* Calles tenues */}
      {[18, 44, 68, 86].map((t) => (
        <Animated.View
          key={`h-${t}`}
          style={[styles.mapStreetH, { top: `${t}%`, opacity: pulse }]}
        />
      ))}
      {[22, 48, 74].map((l) => (
        <Animated.View
          key={`v-${l}`}
          style={[styles.mapStreetV, { left: `${l}%`, opacity: pulse }]}
        />
      ))}

      {/* Simulación de la barra de búsqueda superior */}
      <Animated.View style={[styles.searchBarSkeleton, { opacity: pulse }]} />
    </>
  );
}

function ListSkeleton({ pulse }: { pulse: Animated.Value }) {
  return (
    <View style={styles.listWrap}>
      {[0, 1, 2, 3].map((i) => (
        <Animated.View key={i} style={[styles.card, { opacity: pulse }]}>
          <View style={styles.cardIcon} />
          <View style={styles.cardLines}>
            <View style={styles.cardLineLong} />
            <View style={styles.cardLineShort} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

function ProfileSkeleton({ pulse }: { pulse: Animated.Value }) {
  return (
    <View style={styles.profileWrap}>
      <Animated.View style={[styles.avatar, { opacity: pulse }]} />
      <Animated.View style={[styles.profileName, { opacity: pulse }]} />
      <Animated.View style={[styles.profileEmail, { opacity: pulse }]} />

      <View style={styles.profileOptions}>
        {[0, 1, 2, 3].map((i) => (
          <Animated.View key={i} style={[styles.profileRow, { opacity: pulse }]}>
            <View style={styles.profileRowIcon} />
            <View style={styles.profileRowLine} />
            <View style={styles.profileRowChevron} />
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F9FB',
    zIndex: 40,
    elevation: 40,
  },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#0f172a',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  spinnerText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  /* --- Variante mapa --- */
  mapBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E8EEF2',
  },
  mapStreetH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 7,
    backgroundColor: '#FFFFFF',
  },
  mapStreetV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 7,
    backgroundColor: '#FFFFFF',
  },
  searchBarSkeleton: {
    position: 'absolute',
    top: 96,
    left: 20,
    right: 20,
    height: 48,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  /* --- Variante lista --- */
  listWrap: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EDF2F7',
  },
  cardLines: {
    flex: 1,
    marginLeft: 12,
    gap: 8,
  },
  cardLineLong: {
    width: '70%',
    height: 13,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  cardLineShort: {
    width: '45%',
    height: 11,
    borderRadius: 6,
    backgroundColor: '#EDF2F7',
  },
  /* --- Variante perfil --- */
  profileWrap: {
    paddingHorizontal: 20,
    paddingTop: 96,
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E2E8F0',
  },
  profileName: {
    width: 130,
    height: 18,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
    marginTop: 18,
  },
  profileEmail: {
    width: 180,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EDF2F7',
    marginTop: 10,
  },
  profileOptions: {
    width: '100%',
    marginTop: 32,
    gap: 12,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  profileRowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EDF2F7',
  },
  profileRowLine: {
    flex: 1,
    height: 13,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
    marginLeft: 12,
  },
  profileRowChevron: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EDF2F7',
    marginLeft: 12,
  },
});
