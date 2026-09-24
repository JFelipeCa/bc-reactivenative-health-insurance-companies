# Entregas por semana

Las ramas `week-1` a `week-9` conservan su progresión. Esta tabla registra lo que muestra la versión final y sus dependencias externas para que la documentación no dé por integrada una función que requiere configuración.

| Rama | Objetivo | Implementación y alcance |
| --- | --- | --- |
| `week-1` | Componentes base y Flexbox | Inicio con tarjetas de planes y estilos con `StyleSheet`. |
| `week-2` | Listas, inputs y estilos | Diez coberturas, `FlatList`, búsqueda en tiempo real, refresco y estados de lista. |
| `week-3` | React Navigation | Dos tabs, stack de detalle y paso de parámetros tipados. |
| `week-4` | Estado global Zustand | Plan y favoritos compartidos, persistidos con AsyncStorage. |
| `week-5` | Networking y TanStack Query | Axios, `useQuery`, estados de carga/error/vacío y mutación de favoritos con invalidación. Con `EXPO_PUBLIC_API_URL` vacío se usa el catálogo local; el servicio de cobertura real debe proporcionarlo el aprendiz. |
| `week-6` | Formularios y validación | React Hook Form, `Controller` y Zod validan nombre, correo, teléfono e identificador. Solo se incluye el alta local; el servidor de afiliación y la edición de perfil no están configurados. |
| `week-7` | Persistencia local | AsyncStorage guarda preferencias; MMKV guarda caché de coberturas; SecureStore guarda tokens. En Expo Go, la caché cae a memoria; la persistencia MMKV requiere un development build. |
| `week-8` | Autenticación | Login de prueba, `/auth/me`, interceptor de Axios, renovación con refresh token, logout y OAuth Authorization Code + PKCE. OAuth requiere cliente y URI registrados. |
| `week-9` | Animaciones | Entrada con timing y spring, rotación interpolada, `LayoutAnimation`, feedback al tocar y progreso animado del formulario. |

## Límites de los servicios

- DummyJSON se usa solo para practicar el flujo de tokens; no autentica afiliados de una aseguradora.
- Para cobertura remota, configura un backend que implemente las rutas indicadas en el README. El proyecto no crea ese backend.
- Los formularios no envían información personal. No uses datos reales en la aplicación.
- OAuth no se puede completar hasta registrar un cliente con el proveedor y autorizar el URI de redirección.
