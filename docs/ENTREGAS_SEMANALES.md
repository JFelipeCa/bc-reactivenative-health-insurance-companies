# Criterios de entrega por semana

Las ramas semanales documentan una progresión; cada README debe describir solo el incremento que esa rama demuestra y señalar las limitaciones que aún conserva.

| Rama | Criterios que debe demostrar |
| --- | --- |
| `week-1` | Expo ejecutable; `View`, `Text`, `Image`, `ScrollView`, `Pressable` y `TouchableOpacity`; Flexbox; `StyleSheet.create`; al menos tres tarjetas de planes/coberturas. |
| `week-2` | `FlatList` con al menos diez elementos, separadores, pull-to-refresh y búsqueda en tiempo real con `TextInput`. |
| `week-3` | Stack y tabs anidados; dos tabs y detalle; paso de parámetros; rutas tipadas. |
| `week-4` | Store Zustand tipado, acciones y selectores; estado compartido de plan/favoritos; persistencia AsyncStorage. |
| `week-5` | `useQuery`, estados loading/error/vacío, `useMutation` e invalidación de caché; tipos para la capa API; el estado del servidor no se guarda en Zustand. |
| `week-6` | Formularios de creación/edición con `Controller`, React Hook Form y Zod; errores por campo y estados de carga. |
| `week-7` | Preferencias/caché sin conexión; AsyncStorage, MMKV y SecureStore aplicados a tipos de datos distintos; declarar cuándo hace falta development build. |
| `week-8` | Stack protegido; JWT de un proveedor de demostración, SecureStore, `/auth/me`, logout/renovación e interceptor; OAuth PKCE documentado/configurado con credenciales externas. |
| `week-9` | Tres animaciones distintas, `Animated.timing`, `Animated.spring`, interpolación, `LayoutAnimation`, entrada/salida, progreso y feedback táctil. |

No se deben marcar como completas integraciones que dependan de un backend, cliente OAuth o build nativo si esos recursos no están configurados. En esta aplicación no se solicitan datos personales reales.
