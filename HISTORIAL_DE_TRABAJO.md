# 📜 Historial de Trabajo — App "Seguridad Ciudadana"

> Registro cronológico de todo lo construido en el proyecto de tesis:
> **"Sistema de predicción delictiva para Masaya, Nicaragua"** (app móvil + backend propio).
>
> Cómo usar este documento: cada nueva sesión de trabajo se agrega como una sección
> al final de [Sesiones](#-sesiones-de-desarrollo). Las [Decisiones de arquitectura](#-decisiones-de-arquitectura)
> y los [Estados](#-estado-del-proyecto) se mantienen actualizados en cada sesión.

---

## 📋 Índice

- [Visión general](#-visión-general)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Sesiones de desarrollo](#-sesiones-de-desarrollo)
- [Decisiones de arquitectura](#-decisiones-de-arquitectura)
- [Convenciones de diseño](#-convenciones-de-diseño-de-la-app)
- [Estado del proyecto](#-estado-del-proyecto)

---

## 🎯 Visión general

Aplicación móvil (Expo / React Native) que muestra un **mapa de zonas de riesgo delictivo
en Masaya** (centro geográfico `11.9744, -86.0942`, radio de estudio de **5 km** según
`Protocolo de tesis.md`), con reports de incidentes, comunidades y autenticación
(incluido modo invitado). El backend es un **API Express propio** con Prisma,
corriendo en el puerto **4000**.

## 🛠 Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| App | Expo (SDK) | 58.0.0 |
| Runtime móvil | React Native | 0.88.0 |
| Ruteo | expo-router | ~58.0.10 |
| Estilos | NativeWind (Tailwind) + StyleSheet nativo | 4.2.7 / 3.4.x |
| Mapa nativo | react-native-maps | 1.29.11 |
| SVG | react-native-svg | 15.16.0 |
| Ubicación | expo-location | ~58.0.20 |
| Degradados | expo-linear-gradient | ~58.0.2 |
| Almacenamiento seguro | expo-secure-store | ~58.0.1 |
| Tipado | TypeScript `strict` + `experiments.typedRoutes` | 5.8.3 |
| Backend | Express 5 + Prisma 7 + bcryptjs + jsonwebtoken | — |
| Email | resend (envío de instrucciones/OTP) | ^6.20.0 |

## 📁 Estructura del proyecto

```
Repo_tesis/
├── app/                        # Rutas (expo-router)
│   ├── _layout.tsx             # Stack raíz
│   ├── +html.tsx               # HTML wrapper web
│   ├── index.tsx               # Landing/bienvenida (hero con logo)
│   ├── login.tsx               # Login
│   ├── registro.tsx            # Registro
│   ├── recuperar.tsx           # Recuperar contraseña (2 pasos)
│   ├── GuestLogin.tsx          # Modo invitado
│   ├── perfil.tsx              # Perfil (avatar = logo jpeg)
│   ├── privacidad.tsx          # Política de privacidad
│   └── (tabs)/                 # Navegación principal por tabs
│       ├── _layout.tsx         # Tab bar flotante estilo iPhone
│       ├── index.tsx           # 🗺 Mapa de Masaya (pantalla principal)
│       ├── reportes.tsx        # Reportes
│       └── comunidades.tsx     # Comunidades
├── components/
│   ├── AppHeader.tsx           # Header compartido (perfil izq, logo+nombre centro)
│   ├── BrandLogo.tsx           # ⭐ Logo de marca: variantes png/svg/jpeg recortadas en círculo
│   ├── logoSvg.ts              # SVG autogenerado desde LOGO.svg (no editar a mano)
│   ├── MapaNativo.tsx          # Mapa real (react-native-maps), solo nativo
│   ├── MapaPlaceholder.tsx     # Mapa web (reemplazo en web)
│   ├── ReportarIncidenteFab.tsx# FAB ámbar flotante
│   └── ...                     # Themed, StyledText, ExternalLink, etc. (plantilla)
├── services/                   # authService, api.ts (apiFetch), etc.
├── constants/                  # Constantes de plantilla
├── backend-seguridad/          # API Express + Prisma (puerto 4000)
│   └── src/
│       ├── index.ts            # Bootstrap express + CORS
│       ├── routes/             # /auth, /geodata, /health
│       ├── controllers/        # Lógica de auth y geodata
│       ├── services/           # Email (resend), JWT, etc.
│       ├── middlewares/
│       └── lib/
├── assets/images/              # LOGO.png / LOGO.svg / LOGO.jpeg (2048×2048)
├── Protocolo de tesis.md       # Documento base de la investigación
└── HISTORIAL_DE_TRABAJO.md     # ← este archivo
```

---

## 🗓 Sesiones de desarrollo

> Cada sesión resume: qué se construyó, qué se corrigió y qué quedó pendiente.

### Sesión 1 — Fundamentos de auth y navegación principal

**Commits base del repo** (ver `git log`):

- Implementación completa del flujo de autenticación backend:
  - `POST /auth/register` — registro de usuarios.
  - `POST /auth/login` — login por **username o email** + JWT con rol en el payload.
  - `POST /auth/forgot-password` — envío de instrucciones/OTP vía email (resend).
  - `POST /auth/reset-password` / `POST /auth/change-password` — con validaciones.
- Pantallas frontend: `login` (con toggle de visibilidad de contraseña), `registro`,
  `recuperar` (estado 1: formulario → estado 2: confirmación de correo enviado).
- Integración `Backend-Integration` (PR #3) y mejoras de reset/forgot (PR #5).
- Navegación `(tabs)`: `Mapa`, `Reportes`, `Comunidades` con `AppHeader` compartido.
- Pantalla de perfil con lista de opciones (editar perfil, notificaciones, privacidad, etc.)

---

### Sesión 2 — Modo invitado

- Componente `GuestLoginButton` + pantalla `app/GuestLogin.tsx`.
- Backend: `POST /auth/guest-login` — crea usuario con rol **`guest`** si no existe
  (validación de duplicados → `409`), password hash **aleatorio** (columna NOT NULL)
  y respeta el `username` enviado en el body.
- Fix clave en frontend: la pantalla de login ahora compara
  `userData.role === 'guest'` (antes comparaba el objeto contra el string → nunca entraba).
- `services/authService.ts → loginGuest` envía `{ username }` en el body.

---

### Sesión 3 — Modernización iOS + migración SDK 53 → 58

- Migración completa del proyecto **Expo SDK 53 → SDK 58**
  (expo `58.0.23`, RN `0.88.0`, expo-router `58.0.30`, react `19.3`).
- Adaptación al Strict TS nuevo de RN 0.88: `Themed`, `useColorScheme`,
  `ExternalLink`, `TabIcon` (uso de `ColorValue`).
- Estilo renovado tipo **iPhone/iOS** en todas las pantallas de auth:
  - Tarjetas blancas redondeadas, campos `#F2F2F7` con iconos grises.
  - Botones principales con gradiente ámbar `['#E8B33A', '#d99b26']`, texto oscuro `#1E1E1E`.
  - Tipografía extrabold `tracking-tight`, textos de apoyo `text-[15px]`.
- Degradado de fondo de la app: crema `#FFF5C3` → blanco.
- UX de teclado: `KeyboardAvoidingView` (padding en iOS) + `ScrollView`
  `keyboardShouldPersistTaps="handled"` y Android `softwareKeyboardLayoutMode: "resize"`
  en `app.json` → ningún input queda tapado.
- `web.output: "static"` en `app.json` para mantener compatibilidad con `+html.tsx`
  (SDK 58 cambió el default a server rendering).
- App renombrada: `name: "Seguridad Ciudadana"`, `slug/scheme: "seguridad-ciudadana"`.

---

### Sesión 4 — Mapa central de la app

- **`app/(tabs)/index.tsx`** = pantalla principal con mapa:
  - Header flotante con degradado crema `#FFF5C3` → transparente (igual al del login).
  - Barra de búsqueda + leyenda de zonas de riesgo.
  - Zonas de riesgo semilla (polígono con radio de demostración) + `expo-location`
    para ubicar al usuario con botón **crosshairs** personalizado.
- **`components/MapaNativo.tsx`**: mapa real con `react-native-maps`, centrado en
  Masaya, con radios de riesgo. Cargado con `require()` **condicional** dentro de
  `renderMapa()` para que **web nunca lo evalúe** (evita el error
  `codegenNativeComponent` de componentes solo nativos).
- **`components/MapaPlaceholder.tsx`**: export web (`MASAYA_CENTER`, `RADIO_5KM`).
- FAB "Reportar incidente" sobre el mapa (aún sin acción → ver Sesión 7).

---

### Sesión 5 — Sesión en paralelo (frontend + backend)

- Instalada la dependencia **`concurrently`** y creado el script orquestador:

  ```json
  "dev:backend": "npm --prefix backend-seguridad run dev",
  "dev": "concurrently -n api,front -c bgRed,bgGreen \"npm run dev:backend\" \"expo start\""
  ```

- **Un solo comando**: `npm run dev` levanta backend (`tsx watch`, `[api]` en rojo)
  y Metro (`[front]` en verde) a la vez; con `Ctrl+C` se liberan los puertos
  **4000 y 8081** sin procesos huérfanos (verificado en vivo).

---

### Sesión 6 — El logo en toda la app 🎨

**Arte**: `assets/images/LOGO.{png,svg,jpeg}` (brújula/escudo con el mapa de
Nicaragua 🇳🇮, 2048×2048, fondo blanco opaco, SVG con fill `#FDD704`).

**Regla de uso acordada**:
| Variante | Uso |
|---|---|
| **png** | Espacios **GRANDES** (hero, tarjetas de auth, splash) |
| **svg** | Espacios **CHICOS** (headers, cualquier tamaño escala perfecto) |
| **jpeg** | ⭐ Ocasiones **ESPECIALES** → asignada: **avatar del perfil** |

**Construido**:
- `npx expo install react-native-svg`.
- `components/BrandLogo.tsx`: componente único con prop `variant` y recorte
  **circular automático** (`overflow: hidden`, `borderRadius: size/2`) para que el
  fondo cuadrado del archivo no se note.
- `components/logoSvg.ts`: SVG completo embutido como string (`LOGO_SVG`),
  autogenerado desde `LOGO.svg` (~1269 KB) y consumido con `SvgXml`.

**Integrado en**:
| Pantalla | Grande | Chico |
|---|---|---|
| `app/index.tsx` | png 236 (hero círculo crema `#FFF5C3` w-64) | svg 34 (header) |
| `app/login.tsx` | png 72 (tarjeta) | svg 34 (header) |
| `app/registro.tsx` | png 72 (tarjeta "Crear cuenta") | svg 34 |
| `app/recuperar.tsx` | png 72 (tarjeta formulario) | svg 34 |
| `app/GuestLogin.tsx` | png 72 (tarjeta "Modo invitado") | svg 34 |
| `app/perfil.tsx` | — | **jpeg 88** (avatar con aro dorado 4px) ⭐ |
| `components/AppHeader.tsx` | — | svg 34 (logo + "Seguridad Ciudadana") |

- Los iconos FA de bloque oscuro (`shield-alt`, `user-plus`, `lock`, `user-secret`,
  `user`) fueron reemplazados por el logo real en las tarjetas de auth.
- En el estado de éxito de `recuperar.tsx` se conservó el ✅ verde (comunica resultado).
- **Eliminado** `components/Logo.tsx` (quedó sin referencias).

---

### Sesión 7 — Tab bar flotante y FAB "Reportar incidente"

- **Tab bar flotante estilo iPhone** (`app/(tabs)/_layout.tsx`), construida con el
  renderizador **default** de expo-router + `tabBarStyle` (decisión clave: las versiones
  con tab bar custom terminaron en bugs de layout dos veces — ver
  [Decisiones](#-decisiones-de-arquitectura)).
- **`components/ReportarIncidenteFab.tsx`**: componente aparte, reutilizable:
  - Gradiente de marca `['#E8B33A', '#d99b26']`, icono ⚠ y texto "Reportar incidente".
  - Posición: esquina **inferior derecha** (`right: 16`), anclado un poco por encima
    de la tab bar:
    `bottom = TAB_BAR_BOTTOM (10 iOS / 6 Android) + TAB_BAR_H (64) + 8`.
  - Feedback táctil (escala `0.98` + opacidad) y `elevation: 8`.
  - `onPress` aún no conectado (flujo de reporte pendiente).
  - ⚠️ Las constantes `TAB_BAR_H`/`TAB_BAR_BOTTOM` están **duplicadas** entre
    `_layout.tsx` y el FAB — cambiarlas en ambos archivos.

---

### Sesión 8 — Navegación fluida: skeletons + congelado de pantallas ⚡

> Nota: el primer intento de esta sesión (overlay global con spinner + navegación
> diferida un frame) se **descartó** porque el retraso de un frame se sentía como
> "app pegada". Se rehízo con este enfoque final, trabajando por partes.

**Problema**: al cambiar entre pantallas la app parecía congelada, sin señal visual
de carga, y las pantallas inactivas seguían trabajando en segundo plano.

**1. Feedback de carga por pantalla (sin overlay global, sin retrasos)**
- **`components/LoadingSpinner.tsx`**: anillo giratorio ámbar con `Animated` +
  `useNativeDriver` (gira en hilo nativo). Se usa **solo en el mapa**.
- **`components/ScreenSkeleton.tsx`**: skeleton con pulso suave (opacidad animada
  nativa), `pointerEvents="none"`. Variantes:
  - `'map'`: calles tenues + barra de búsqueda simulada + spinner "Cargando mapa…".
  - `'list'`: tarjetas apiladas (sin spinner).
  - `'profile'`: avatar + nombre + filas de opciones (sin spinner).
- **`hooks/useScreenSkeleton.ts`**: devuelve `true` durante el primer montaje de la
  pantalla y se apaga tras un mínimo de 220 ms (evita el parpadeo de 1 frame).
  - `reportes.tsx` y `comunidades.tsx` → skeleton `'list'`.
  - `perfil.tsx` → skeleton `'profile'`.
  - `app/(tabs)/index.tsx` → skeleton `'map'` hasta que `MapView` dispara
    `onMapReady` (nueva prop propagada en `MapaNativo.tsx`).

**2. Congelación de pantallas inactivas**
- `app/_layout.tsx`: `enableFreeze(true)` de `react-native-screens` (una vez, antes
  de montar el navegador) + `freezeOnBlur: true` en el `Stack`.
- `app/(tabs)/_layout.tsx`: `freezeOnBlur: true` → la pantalla inactiva no re-renderiza
  ni ejecuta frames (el mapa de Google deja de trabajar al cambiar de tab).

**3. Montaje diferido de tabs**
- `app/(tabs)/_layout.tsx`: `lazy: true` → cada tab se monta la primera vez que se
  visita; al arrancar solo carga el mapa.

**Descartado en esta sesión**: `components/NavigationFeedback.tsx` (overlay global),
el `tabBarButton` personalizado y el retraso con `requestAnimationFrame`.

**Verificado**: `tsc` limpio + exports web y android OK.

---

### Sesión 9 — Mapa delimitado por polígono (centro: Parque Central) 🗺

**Punto principal**: **Parque Central de Masaya** — `11.9737616, -86.0959396`
(Google Places). El área de operación es el **polígono real del sector urbano de
Masaya**, no un rectángulo.

**Fuente del polígono**:
- OpenStreetMap, relation **21847517** (`boundary=administrative`, `admin_level=10`,
  `place=city`, "Masaya").
- Descargado con Nominatim (`polygon_geojson=1`) y simplificado con
  **Douglas-Peucker** (tolerancia 0.00035° ≈ 40 m) → **361 puntos**.
- Autogenerado en `constants/masayaPolygon.ts` (© OpenStreetMap contributors, ODbL).
  No editar a mano.
- Se eligió el sector urbano (admin 10) porque encuadra el radio de estudio de 5 km.
  Si se quisiera todo el municipio (admin 6), el polígono se cambia en un solo archivo.

**`constants/masaya.ts` (fuente única de verdad)**:
- `PARQUE_CENTRAL_MASAYA` / `MASAYA_CENTER`, `RADIO_5KM`, `MASAYA_POLIGONO`.
- `MASAYA_BOUNDS` = bbox calculado del polígono (solo para límites de zoom y
  mapeo del placeholder; la validez real es el polígono).
- **`estaDentroDeMasaya()`**: *point-in-polygon* por ray casting.
- **`clampToMasaya()`**: si el punto está fuera, calcula el punto más cercano sobre
  el borde y lo empuja ~165 m hacia el centroide (verificado: interior).

**Delimitación efectiva** (`components/MapaNativo.tsx`):
- **Recorte por polígono** en cada `onRegionChangeComplete`: si el centro del mapa
  queda fuera del polígono, `clampToMasaya()` lo devuelve adentro y
  `animateToRegion(…, 250)` suaviza el rebote.
- **Zoom acotado**: se limita el delta para que el bbox del polígono quepa en la
  vista (`minZoomLevel 13.5`, `maxZoomLevel 18`).
- **Máscara**: `Polygon` exterior con `holes={[polígono]}` → solo el interior del
  sector urbano queda visible; el resto se oscurece con borde ámbar.
- **Pin del Parque Central** ("Centro del área de operación") y círculo de 5 km.

**Web** (`components/MapaPlaceholder.tsx`):
- `react-native-svg` dibuja el **polígono real** y una `Mask` que oscurece todo
  lo que está fuera; el pin del Parque Central se posiciona por conversión
  geo→píxel con `onLayout` (no con porcentajes fijos).

**Otros**:
- `app/(tabs)/index.tsx`: región inicial 0.04° centrada en el parque; el botón de
  geolocalización usa `clampToMasaya()` si el usuario está fuera del polígono.

**Verificado**: `tsc` limpio; point-in-polygon probado (Parque Central = dentro,
Managua/Granada/Nindirí = fuera); exports web y android OK.

### Sesión 10 — Diagnóstico del error `Cannot read property 'ErrorBoundary' of undefined` 🩺

**Síntoma**: al abrir la app en nativo, Expo Router lanzaba
`TypeError: Cannot read property 'ErrorBoundary' of undefined` con un code frame
en `react.development.js` (`useMemo`).

**Diagnóstico**:
- Ese mensaje **no es la causa raíz**: es el error secundario que lanza
  `fromImport()` de `expo-router/build/useScreens.js` cuando un módulo de ruta se
  evalúa como `undefined` (su código hace destructuring de `ErrorBoundary`).
  En otras palabras: *una ruta falló al cargar* y Expo Router lo enmascaró.
- El proyecto venía de la migración a SDK 58 y **solo se había verificado con
  `tsc` y exports**, nunca en dispositivo. `expo install --check` detectó que el
  JS nativo estaba por detrás de Expo Go:
  - `react-native` 0.88.0 → **0.88.1**
  - `react-native-screens` 4.28.0 → **~4.30.1**
  - `react-native-safe-area-context` 5.9.1 → **~5.11.1**
  - `react-native-reanimated` 4.7.0 → **4.7.1**
  - `typescript` 5.8.3 → **~6.0.3**
- Además, `app/(tabs)/index.tsx` importaba **estáticamente** el placeholder web,
  lo que hacía que `react-native-svg` se evaluara también en nativo (código que
  solo se usa en web).

**Correcciones**:
- `npx expo install --fix` → dependencias nativas alineadas con Expo SDK 58
  (`expo install --check` ahora responde "Dependencies are up to date").
- `app/(tabs)/index.tsx`: `MapaPlaceholder` ahora se carga con
  `require()` **solo en la rama web** (igual que `MapaNativo` solo en nativo),
  de modo que `react-native-svg` no se evalúa en el arranque nativo.

**Verificado**: `tsc` limpio (con TS 6) + exports web y android OK.

---

## 🧭 Decisiones de arquitectura

Log de decisiones importantes con su contexto, para no repetir dolor:

|#| Fecha | Decisión | Por qué |
|---|---|---|---|
| 1 | — | Backend con typo `updateAt` → **`updatedAt`** | Corregido en `guestLogin`, `resetPassword`, `changePassword`. |
| 2 | — | `guestLogin` usa el `username` del body + password hash aleatorio | La columna es NOT NULL; el invitado no elige contraseña. |
| 3 | — | Login compara `userData.role === 'guest'` | El objeto userData nunca fue un string. |
| 4 | — | `react-native-maps` cargado con `require()` condicional | JSX directo rompe web (`codegenNativeComponent`). |
| 5 | — | `web.output: "static"` | Compatibilidad con `+html.tsx` (SDK 58 cambió default). |
| 6 | — | `components/Logo.tsx` ≡ eliminado — usar **`BrandLogo`** | Fuente única de verdad para el logo. |
| 7 | — | **NO usar tab bar custom** (`tabBar={(props)=>...}`) | Falló 2 veces (tabs apiladas a un lado); el default + `tabBarStyle` es estable. No revertir esta decisión sin causa nueva investigada con evidencia. |
| 8 | — | Constantes `TAB_BAR_H = 64`, `TAB_BAR_BOTTOM = 10/6` | Mantener sincronizadas en `_layout.tsx` **y** `ReportarIncidenteFab.tsx`. |
| 9 | — | Un solo comando `npm run dev` | Backend + Metro en paralelo, sin atrasos de dev/testeo. |
| 10 | 2026-11-09 | Skeleton por pantalla (`useScreenSkeleton`) en lugar de overlay global con spinner | El overlay + retraso de un frame se sentía como app congelada. El skeleton respeta el layout, no retrasa la navegación y el spinner queda solo para el mapa (el único con carga real). |
| 11 | 2026-11-09 | `enableFreeze` + `freezeOnBlur` + `lazy` en tabs | Las pantallas inactivas no deben seguir re-renderizando ni ejecutando frames (mapa de Google incluido); los tabs cargan hasta su primera visita. |
| 12 | 2026-11-09 | Centro del área de operación = **Parque Central de Masaya** y constantes en `constants/masaya.ts` | Punto principal definido por el usuario; una sola fuente de verdad evita que mapa nativo y placeholder web se desincronicen. |
| 13 | 2026-11-09 | Delimitación por **polígono real** (OSM) con point-in-polygon, no por rectángulo | El usuario pidió "punto en polígonos". El sector urbano (admin 10, 361 pts simplificados) encuadra el radio de 5 km; el polígono se puede cambiar por el del municipio completo (admin 6) sin tocar el resto del código. |
| 14 | 2026-11-09 | Versiones nativas **siempre alineadas con Expo SDK** (`expo install --fix`) y módulos de plataforma con `require()` condicional | `ErrorBoundary of undefined` era un error secundario de Expo Router por una ruta que no cargaba; el JS nativo iba por detrás de Expo Go. Verificar en dispositivo, no solo con `tsc`/exports. |

## 🎨 Convenciones de diseño de la app

Referencia rápida de look & feel (útil para nuevas pantallas):

- **Degradado de fondo**: crema `#FFF5C3` → blanco (también en headers → transparente).
- **Gradiente de marca (botones/FAB)**: `['#E8B33A', '#d99b26']`, contenido `#1E1E1E`.
- **Acentos ámbar**: `#d99b26` (links/labels activos), `#F5D547` (brillo/bordes), `#b5821f` (texto sobre dorado).
- **Campos estilo iOS**: fondo `#F2F2F7`, `rounded-2xl`, icono `#8E8E93`, `text-[15px]`.
- **Botones**: `h-[52px]`, `rounded-2xl`, texto `font-bold tracking-wide`.
- **Tab bar flotante**: blanca `0.95` opacidad, `borderRadius 20`, pastilla del tab activo `rgba(245,213,71,0.4)` con glow.
- **Tipografía**: títulos `28px font-extrabold tracking-tight`, cuerpo `text-[15px]`.

## 📌 Estado del proyecto

### ✅ Completado
- [x] Autenticación completa (login, registro, recuperar/reset/change password, JWT con rol).
- [x] Modo invitado (backend + frontend).
- [x] Migración SDK 53 → 58 con TS strict limpio.
- [x] Rediseño iOS de todas las pantallas de auth + landing + perfil.
- [x] Mapa nativo de Masaya (5 km) + placeholder web + zonas de riesgo semilla.
- [x] Tab bar flotante estable (default renderer) + FAB "Reportar incidente" como componente.
- [x] `npm run dev` (frontend + backend simultáneos).
- [x] Logo integrado en todas las vistas (BrandLogo png/svg/jpeg).

### 🔲 Pendiente
- [ ] **Conectar el FAB** "Reportar incidente" al flujo real (`POST /incidentes/reportar`).
- [ ] Verificar en dispositivo la delimitación por polígono (rebote en bordes, pin del parque y zoom mínimo).
- [ ] Icono y splash de la app con el logo nuevo (`app.json` → `icon` / plugin splash; fondo crema `#FFF5C3`).
- [ ] Screens funcionales de `reportes.tsx` y `comunidades.tsx` (hoy son maquetas).
- [ ] Persistencia de sesión guest/usuario en `expo-secure-store` (revisar flujo de logout).
- [ ] Datos reales de incidentes en el mapa (conectar `/geodata/incidentes` con datos de la DB).

### 🧰 Verificaciones automáticas del proyecto
```bash
npx tsc --noEmit                   # Tipado strict → debe pasar limpio
npx expo export --platform web     # Bundle web → "Exported: dist"
npx expo export --platform android # Bundle android → "Exported: dist"
npm run dev                        # API [4000] + Metro [8081] juntos
curl http://localhost:4000/health  # Sanity check del backend
```

---

*Última actualización: 6 de noviembre de 2026 — Sesión 7.*
