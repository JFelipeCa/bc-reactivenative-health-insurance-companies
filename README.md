# Cobertura de Salud Colombia

Aplicación educativa con Expo y React Native para explorar planes y coberturas del dominio de seguros médicos en Colombia. Los nombres, precios y copagos son ilustrativos; no representan una aseguradora real.

## Requisitos

- Node.js 22.13 o superior y pnpm 11.
- Expo Go para probar las pantallas con caché en memoria.
- Un development build de iOS o Android para persistir la caché con MMKV.

## Instalaci�n y ejecuci�n

```bash
pnpm install --frozen-lockfile
pnpm start
```

Comandos adicionales: `pnpm android`, `pnpm ios`, `pnpm web` y `pnpm typecheck`.

## Configuración opcional

Copia `.env.example` a `.env` para conectar un backend de práctica. `EXPO_PUBLIC_API_URL` debe apuntar a un servidor que exponga `/auth/login`, `/auth/me`, `/auth/refresh`, `/coverages` y `PUT /coverages/:id/favorite`. Sin esa URL, la app utiliza un catálogo local de ejemplo y DummyJSON para el ejercicio de autenticación.

Para habilitar OAuth con Google, configura `EXPO_PUBLIC_OAUTH_CLIENT_ID` y registra el URI de redirección que genera el scheme `healthcoveragecolombia`. No agregues secretos de cliente al código de la aplicación.

## Estructura

```text
src/
├── api/          # cliente Axios, auth, cobertura y almacenamiento
├── components/   # controles reutilizables
├── context/      # proveedores globales
├── hooks/        # consultas, mutaciones y autenticación
├── navigation/   # stacks, tabs y rutas tipadas
├── screens/      # pantallas por flujo
├── theme/        # colores compartidos
├── types/        # tipos del dominio y navegación
└── store.ts      # preferencias de cliente con Zustand
```

Consulta [la guía de estructura](docs/ESTRUCTURA.md) y [las entregas semanales](docs/ENTREGAS_SEMANALES.md).

## Alcance de la demostración

El catálogo y los copagos son datos ficticios. El acceso de prueba utiliza el servicio público DummyJSON, y el formulario de afiliación solo valida los campos: no envía solicitudes. No ingreses datos personales reales. OAuth requiere un cliente registrado; el backend de coberturas es opcional y se configura por variable de entorno.

## Instalación y ejecución

Desde la carpeta raíz, ejecuta estos comandos en PowerShell, Git Bash o la terminal de VS Code:

```powershell
git switch main
pnpm install --frozen-lockfile
pnpm start -- --clear
```

Espera el código QR de Expo y ábrelo con Expo Go. Mantén la terminal abierta mientras usas la aplicación; para detenerla, presiona Ctrl+C. Si vuelves a iniciar Expo o cambias de rama, vuelve a ejecutar pnpm start -- --clear para descartar la caché anterior.

Para las instrucciones de las nueve semanas, consulta [la guía de inicio](docs/INICIO_POR_SEMANA.md).
