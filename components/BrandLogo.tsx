import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { LOGO_SVG } from './logoSvg';

/**
 * Variantes del logo de la aplicación:
 * - 'png'  → espacios GRANDES (hero, tarjetas de bienvenida): máxima nitidez.
 * - 'svg'  → espacios CHICOS (headers, miniaturas): escala perfecto.
 * - 'jpeg' → ocasiones ESPECIALES (avatar de perfil): versión "fotográfica".
 */
export type BrandLogoVariant = 'png' | 'svg' | 'jpeg';

interface BrandLogoProps {
  /** Tamaño (ancho/alto, el logo es cuadrado). */
  size?: number;
  /** Variante a usar según el espacio. */
  variant?: BrandLogoVariant;
}

const PNG_SOURCE = require('../assets/images/LOGO.png');
const JPEG_SOURCE = require('../assets/images/LOGO.jpeg');

/**
 * Logo de marca siempre recortado en círculo (el arte es circular, así el
 * fondo cuadrado del archivo no se nota y se integra en cualquier pantalla).
 */
export default function BrandLogo({ size = 40, variant = 'svg' }: BrandLogoProps) {
  return (
    <View
      style={[
        styles.disc,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {variant === 'svg' ? (
        <SvgXml xml={LOGO_SVG} width={size} height={size} />
      ) : (
        <Image
          source={variant === 'jpeg' ? JPEG_SOURCE : PNG_SOURCE}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  disc: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
