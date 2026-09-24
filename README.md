# Cobertura de Salud Colombia

Aplicación educativa en React Native y Expo para explorar planes y coberturas de salud en Colombia. Los nombres, precios y copagos son datos ilustrativos: el proyecto no representa ni recomienda una aseguradora real.

## Requisitos

- Node.js compatible con Expo SDK 57 (Node 22.13 o superior).
- pnpm 11.
- Expo Go para las semanas 1 a 6 y 9. Las prácticas con MMKV y algunos flujos nativos de OAuth requieren un development build.

## Instalación y ejecución

```bash
pnpm install --frozen-lockfile
pnpm start
```

También puedes usar `pnpm android`, `pnpm ios`, `pnpm web` y `pnpm typecheck`.

## Estructura

```text
src/
├── api/          # acceso remoto y catálogo de demostración
├── components/   # tarjetas y controles reutilizables
├── context/      # proveedores globales de la aplicación
├── hooks/        # lógica reutilizable y consultas
├── navigation/   # stacks, tabs y rutas tipadas
├── screens/      # pantallas por flujo
├── theme/        # colores y estilos compartidos
├── types/        # modelos del dominio y parámetros de navegación
└── store.ts      # estado global del dominio
```

## Entregas semanales

Cada rama `week-N` corresponde al incremento de esa semana y contiene su objetivo, práctica y aplicación al dominio. La implementación final se encuentra en `week-9`; `main` integra esa versión y esta guía.

| Rama | Enfoque |
| --- | --- |
| `week-1` | Componentes base, Flexbox y tarjetas de planes |
| `week-2` | Listas, búsqueda, separadores y actualización |
| `week-3` | Stack, tabs, detalle y rutas tipadas |
| `week-4` | Zustand, selectores y estado de planes/favoritos |
| `week-5` | Networking, TanStack Query y mutaciones |
| `week-6` | Formularios y validación |
| `week-7` | Preferencias y almacenamiento local/seguro |
| `week-8` | Sesión y autenticación |
| `week-9` | Animaciones y feedback visual |

Consulta [la guía de estructura](docs/ESTRUCTURA.md) y [los criterios semanales](docs/ENTREGAS_SEMANALES.md).

## Alcance de la demostración

El catálogo y los precios son ejemplos para aprender React Native. Los formularios se validan en el dispositivo y no envían solicitudes. El acceso actual es un flujo de demostración y no autentica usuarios contra un proveedor real. No introduzcas datos personales reales.
