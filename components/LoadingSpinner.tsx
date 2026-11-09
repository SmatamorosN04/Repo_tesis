import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

interface LoadingSpinnerProps {
  /** Diámetro del spinner en px. */
  size?: number;
  /** Color del arco visible (por defecto el ámbar de la app). */
  color?: string;
  /** Grosor del anillo. */
  thickness?: number;
}

/**
 * Spinner de marca (anillo girando) con gradiente de color ámbar de la app.
 * Usa Animated con useNativeDriver → gira en el hilo nativo, no bloquea JS.
 */
export default function LoadingSpinner({
  size = 24,
  color = '#d99b26',
  thickness = 3,
}: LoadingSpinnerProps) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: thickness,
          borderColor: 'rgba(217,155,38,0.22)',
          borderTopColor: color,
          borderRightColor: color,
          transform: [{ rotate }],
        }}
      />
    </View>
  );
}
