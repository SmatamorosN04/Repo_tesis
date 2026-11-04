# 🛡️ Seguridad Ciudadana / Alerta Ciudadana

Aplicación móvil enfocada en la seguridad comunitaria y prevención del delito, desarrollada con **React Native**, **Expo SDK 58**, **Expo Router** y **NativeWind (Tailwind CSS)**.

---

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu equipo:

1. **Node.js**: Versión `18.x` o superior (se recomienda versión LTS).  
   Puedes verificar tu versión actual con:
   ```bash
   node -v
   ```
2. **Package Manager**: `npm` (incluido con Node.js) o alternativamente `yarn` / `pnpm`.
3. **Dispositivo o Emulador para pruebas**:
   - **Dispositivo Físico (Recomendado para pruebas rápidas)**: Descarga la aplicación **Expo Go** desde [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android) o [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS).
   - **Emulador Android**: Requiere [Android Studio](https://developer.android.com/studio) con un dispositivo AVD configurado.
   - **Simulador iOS**: Requiere macOS y [Xcode](https://developer.apple.com/xcode/).

---

## 📦 Instalación de Dependencias

1. **Clona el repositorio** en tu equipo local:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd Repo_tesis
   ```

2. **Instala las dependencias del proyecto**:
   ```bash
   npm install
   ```

---

## 📱 Ejecución del Proyecto

### 1. Iniciar el servidor de desarrollo (Expo CLI)

Ejecuta el siguiente comando para iniciar el empaquetador Metro de Expo:

```bash
npm start
# o bien
npx expo start
```

Al iniciar el servidor, verás un **código QR** en la consola y las opciones del menú interactivo.

### 2. Abrir en un dispositivo o emulador

- **Dispositivo Físico**:
  - Abre la app **Expo Go** en tu teléfono.
  - En Android: Escanea el código QR de la consola desde la app Expo Go.
  - En iOS: Escanea el código QR usando la cámara nativa del iPhone y abre la notificación.
- **Android Emulator**:
  - Presiona la tecla `a` en la consola interactiva de Expo (o ejecuta `npm run android`).
- **iOS Simulator** *(solo macOS)*:
  - Presiona la tecla `i` en la consola interactiva de Expo (o ejecuta `npm run ios`).
- **Navegador Web**:
  - Presiona la tecla `w` en la consola (o ejecuta `npm run web`).

---

## 🛠️ Tecnologías Principales

- **[Expo (SDK 58)](https://expo.dev/)**: Plataforma y framework para React Native.
- **[React Native (0.88)](https://reactnative.dev/)**: Framework para crear aplicaciones nativas.
- **[Expo Router](https://docs.expo.dev/router/introduction/)**: Sistema de enrutamiento y navegación basado en la estructura de archivos.
- **[NativeWind v4](https://www.nativewind.dev/)**: Sistema de diseño basado en **Tailwind CSS** para React Native.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para JavaScript.

---

## 📁 Estructura del Proyecto

```text
Repo_tesis/
├── app/                  # Rutas y pantallas de la aplicación (Expo Router)
│   ├── (tabs)/           # Navegación basada en pestañas
│   ├── index.tsx         # Pantalla de bienvenida / Login
│   ├── privacidad.tsx    # Pantalla de aviso de privacidad
│   └── _layout.tsx       # Layout raíz de la app
├── assets/               # Recursos estáticos (imágenes, fuentes, iconos)
├── components/           # Componentes UI reutilizables
├── constants/            # Constantes globales (colores, temas)
├── global.css            # Estilos globales de Tailwind CSS
├── tailwind.config.js    # Configuración de Tailwind CSS / NativeWind
├── metro.config.js       # Configuración del empaquetador Metro
└── tsconfig.json         # Configuración de TypeScript
```

---

## 🔧 Scripts Disponibles

En el archivo `package.json` encontrarás los siguientes comandos principales:

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia el servidor de desarrollo de Expo. |
| `npm run android` | Inicia el servidor e intenta abrir la app en un emulador/dispositivo Android. |
| `npm run ios` | Inicia el servidor e intenta abrir la app en un simulador iOS. |
| `npm run web` | Inicia la app en modo web en tu navegador predeterminado. |

---

## ❓ Solución de Problemas Frecuentes

### 1. Error de caché en Expo / NativeWind
Si realizas cambios en los estilos de Tailwind o en la configuración y no los ves reflejados, limpia la caché de Metro:
```bash
npx expo start -c
```

### 2. Incompatibilidad de paquetes o `node_modules` corrompidos
Si obtienes errores de resolución de dependencias al ejecutar o instalar, reinstala los paquetes limpiando la carpeta:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 Licencia

Este proyecto está bajo la licencia **0BSD**. Consulta el archivo [LICENSE](file:///home/sergiomatamoros/Repositorios/Repo_tesis/LICENSE) para obtener más detalles.
