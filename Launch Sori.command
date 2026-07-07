#!/bin/zsh

cd "$(dirname "$0")" || exit 1

if curl --silent --fail "http://localhost:5173" >/dev/null 2>&1; then
  open "http://localhost:5173"
  exit 0
fi

if [ ! -d node_modules ]; then
  echo "Installing Sori dependencies for the first launch…"
  npm install || exit 1
fi

echo "Starting Sori…"
echo "Keep this window open while you use the app. Press Control-C to stop it."

(sleep 1; open "http://localhost:5173") &
npm run dev -- --port 5173 --strictPort
