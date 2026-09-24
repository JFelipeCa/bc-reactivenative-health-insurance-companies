# Organización del código

La interfaz vive dentro de `src/screens`; `App.tsx` solo monta los proveedores, la navegación y la barra de estado.

| Carpeta | Responsabilidad |
| --- | --- |
| `api` | Funciones de datos y adaptadores. Las pantallas no hacen `fetch` directamente. |
| `components` | Piezas de interfaz reutilizables y sin lógica de navegación. |
| `context` | Proveedores que envuelven la aplicación, como TanStack Query. |
| `hooks` | Consultas y lógica reutilizable que conecta datos y pantallas. |
| `navigation` | Navegadores y configuración de rutas tipadas. |
| `screens` | Pantallas completas y sus flujos de presentación. |
| `theme` | Colores y tokens compartidos. |
| `types` | Modelos del dominio y parámetros de rutas. |

El estado de cliente (plan elegido y coberturas favoritas) se gestiona en Zustand. Los datos de servidor pertenecen a TanStack Query. Los precios y copagos del catálogo son ficticios y se identifican como referencias académicas.
