#!/bin/bash

set -e

echo "=========================================="
echo "  Pipeline S07 — Iniciando Cypress Runner"
echo "=========================================="

echo "[INFO] Iniciando Xvfb (display virtual) na tela :99..."
Xvfb :99 -ac -screen 0 1280x720x24 &
XVFB_PID=$!

sleep 2

if kill -0 $XVFB_PID 2>/dev/null; then
    echo "[OK] Xvfb iniciado (PID: $XVFB_PID)"
else
    echo "[ERRO] Falha ao iniciar o Xvfb"
    exit 1
fi

export DISPLAY=:99

echo "[INFO] Container Cypress pronto. Aguardando comandos do Jenkins..."
echo "       Use: docker exec cypress-runner npx cypress run ..."

tail -f /dev/null
