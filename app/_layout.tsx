import '../global.css';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
// Congela pantallas fuera de foco (react-native-screens): la pantalla inactiva
// deja de re-renderizar y de ejecutar frames → navegación más fluida.
import { enableFreeze } from 'react-native-screens';

// Debe ejecutarse una sola vez, antes de montar el navegador
enableFreeze(true);

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [loaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, fontError]);

  if (!loaded && !fontError) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false, freezeOnBlur: true }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true }} />
    </Stack>
  );
}