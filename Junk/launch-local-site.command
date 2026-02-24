#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Download it from: https://nodejs.org/"
  read -r -p "Press Enter to close..."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not available. Reinstall Node.js from: https://nodejs.org/"
  read -r -p "Press Enter to close..."
  exit 1
fi

echo "Starting Musifer local site..."
echo "Open http://127.0.0.1:8080 in your browser."
echo "Press Ctrl+C in this window to stop the server."
echo

npm start
