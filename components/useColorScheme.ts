import { useColorScheme as useColorSchemeCore } from 'react-native';

type PrimaryColorScheme = 'light' | 'dark';

export const useColorScheme = (): PrimaryColorScheme | null | undefined => {
  const coreScheme = useColorSchemeCore();
  // La API estricta de RN ya no expone 'unspecified'; se normaliza igual por compatibilidad.
  return (coreScheme as string | null) === 'unspecified'
    ? 'light'
    : (coreScheme as PrimaryColorScheme);
};
