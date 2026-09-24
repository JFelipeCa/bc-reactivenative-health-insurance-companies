# Guía para iniciar cada semana

Esta aplicación se ejecuta con Expo. Sigue estos pasos desde una terminal abierta en la carpeta raíz del repositorio. Los comandos sirven en PowerShell, Git Bash y la terminal de VS Code.

## Antes de iniciar

- Instala Node.js 22.13 o posterior y pnpm 11.
- Asegúrate de que los cambios locales estén guardados antes de cambiar de rama.
- Detén un servidor Expo que ya esté abierto con `Ctrl+C` antes de cambiar de semana.

## Comandos

Primero selecciona la rama de la semana que deseas mostrar. Después instala las dependencias de esa rama y arranca Expo borrando la caché de Metro:

```powershell
git switch week-1
pnpm install --frozen-lockfile
pnpm start -- --clear
```

En el primer comando, cambia `week-1` por la rama que quieras usar según la tabla. Ejecuta `pnpm install --frozen-lockfile` cada vez que cambies de rama, porque las dependencias pueden variar entre semanas. Mantén abierta la terminal donde corre Expo.

## Elegir una semana

| Entrega | Rama que debes seleccionar |
| --- | --- |
| Semana 1 | `week-1` |
| Semana 2 | `week-2` |
| Semana 3 | `week-3` |
| Semana 4 | `week-4` |
| Semana 5 | `week-5` |
| Semana 6 | `week-6` |
| Semana 7 | `week-7` |
| Semana 8 | `week-8` |
| Semana 9 | `week-9` |
| Versión integrada | `main` |

Por ejemplo, para iniciar la semana 4, ejecuta `git switch week-4` y luego los mismos comandos de instalación y arranque indicados arriba.

## Abrir y cerrar la aplicación

- Espera a que Expo muestre el código QR y ábrelo con Expo Go en el teléfono.
- Para usar un emulador Android configurado, presiona `a` en la terminal de Expo.
- Para detener el servidor, vuelve a esa terminal y presiona `Ctrl+C`.
- Al cambiar de semana, detén Expo, cambia de rama, instala sus dependencias y vuelve a iniciar con `pnpm start -- --clear`.

Usa estos comandos directamente en la terminal. No necesitas `sh start.sh`; así se evita depender de Git Bash o de permisos de ejecución de scripts.