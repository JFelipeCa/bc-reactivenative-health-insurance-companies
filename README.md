# Health Coverage Colombia

Educational Expo and React Native project for the health coverage domain in Colombia. Sample plans and copayments are illustrative and do not represent a specific insurer.

## Week 5: Networking and TanStack Query

This branch demonstrates a configurable /coverages endpoint, query states, and refresh. Without a backend URL, it uses a curated local health-coverage catalog.

## Source layout

Application code lives under src/: screens, navigation, API, components, state, theme, hooks, and domain types are grouped by responsibility. Some folders are scaffolds for later weekly lessons.

## Run

Desde la carpeta raíz, ejecuta estos comandos en PowerShell, Git Bash o la terminal de VS Code:

```powershell
git switch week-5
pnpm install --frozen-lockfile
pnpm start -- --clear
```

Espera el código QR de Expo y ábrelo con Expo Go. Mantén la terminal abierta mientras usas la aplicación; para detenerla, presiona Ctrl+C. Si vuelves a iniciar Expo o cambias de rama, vuelve a ejecutar pnpm start -- --clear para descartar la caché anterior.

Para las instrucciones de las nueve semanas, consulta [la guía de inicio](docs/INICIO_POR_SEMANA.md).
zen-lockfile
pnpm start
pnpm typecheck

See [the weekly criteria](docs/ENTREGAS_SEMANALES.md) and [the source layout](docs/ESTRUCTURA.md).
