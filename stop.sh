#!/usr/bin/env sh
set -eu

PORT="${EXPO_PORT:-8081}"

stop_unix() {
  if ! command -v lsof >/dev/null 2>&1; then
    echo "No encontré lsof. Detén Expo con Ctrl+C en la terminal donde está ejecutándose." >&2
    exit 1
  fi

  PIDS="$(lsof -ti tcp:"$PORT" -sTCP:LISTEN 2>/dev/null || true)"
  if [ -z "$PIDS" ]; then
    echo "No hay ningún proceso escuchando en el puerto $PORT."
    return
  fi

  STOPPED=0
  for PID in $PIDS; do
    COMMAND="$(ps -p "$PID" -o args= 2>/dev/null || true)"
    if printf '%s' "$COMMAND" | grep -Eiq 'expo|metro'; then
      kill "$PID"
      echo "Expo/Metro detenido (PID $PID, puerto $PORT)."
      STOPPED=1
    fi
  done

  if [ "$STOPPED" -eq 0 ]; then
    echo "El puerto $PORT está ocupado, pero no por un proceso Expo/Metro; no lo detuve." >&2
    exit 1
  fi
}

case "$(uname -s)" in
  MINGW*|MSYS*|CYGWIN*)
    if ! command -v powershell.exe >/dev/null 2>&1; then
      echo "No encontré PowerShell. Detén Expo con Ctrl+C en la terminal donde está ejecutándose." >&2
      exit 1
    fi
    powershell.exe -NoProfile -Command "\$port = $PORT; \$ids = Get-NetTCPConnection -LocalPort \$port -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; foreach (\$processId in \$ids) { \$proc = Get-CimInstance Win32_Process -Filter ('ProcessId = ' + \$processId); if (\$proc.CommandLine -match 'expo|metro') { Stop-Process -Id \$processId -Force; Write-Output ('Expo/Metro detenido (PID ' + \$processId + ', puerto ' + \$port + ').') } }"
    ;;
  *)
    stop_unix
    ;;
esac