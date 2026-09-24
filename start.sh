#!/usr/bin/env sh
set -eu

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Error: pnpm no está instalado. Instálalo antes de iniciar Expo." >&2
  exit 1
fi

pnpm start