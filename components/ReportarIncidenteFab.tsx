import React from 'react';
import { Platform, Text, Pressable, View, StyleSheet } from 'react-native';

const TAB_BAR_HEIGHT = 64;
const TAB_BAR_BOTTOM = Platform.OS === 'ios' ? 10 : 6;
const EXTRA_SPACING = 12;

const TOTAL_BOTTOM_OFFSET = TAB_BAR_BOTTOM + TAB_BAR_HEIGHT + EXTRA_SPACING;

interface ReportarIncidenteFabProps {
  onPress?: () => void;
}

export default function ReportarIncidenteFab({ onPress }: ReportarIncidenteFabProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Reportar incidente"
        onPress={onPress}
        style={({ pressed }) => [
          styles.shadowContainer,
          pressed && { opacity: 0.88, transform: [{ scale: 0.96 }] },
        ]}
      >
        {/* Este View asegura el background amarillo y las esquinas redondeadas */}
        <View style={styles.buttonContent}>
          <Text style={styles.text}>
            REPORTAR{'\n'}INCIDENTE
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    bottom: TOTAL_BOTTOM_OFFSET,
    zIndex: 50,
  },
  shadowContainer: {
    borderRadius: 22,
    backgroundColor: '#FACC15', // Proyecta la sombra correctamente
    // Sombras nativas
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  buttonContent: {
    backgroundColor: '#FACC15', // Amarillo idéntico al de la imagen
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1.2,
    lineHeight: 20,
  },
});