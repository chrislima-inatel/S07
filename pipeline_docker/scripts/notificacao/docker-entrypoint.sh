#!/bin/bash

set -e

echo "=========================================="
echo "  Pipeline S07 — Iniciando Jenkins"
echo "=========================================="

if [[ -n "${GMAIL_USER:-}" && -n "${GMAIL_PASS:-}" ]]; then
    echo "[INFO] Configurando msmtp com credenciais Gmail..."
    sed "s|GMAIL_USER_PLACEHOLDER|${GMAIL_USER}|g; \
         s|GMAIL_PASS_PLACEHOLDER|${GMAIL_PASS}|g" \
        /etc/msmtprc.template > /etc/msmtprc
    chmod 600 /etc/msmtprc
    echo "[OK] msmtp configurado para ${GMAIL_USER}"
else
    echo "[AVISO] GMAIL_USER ou GMAIL_PASS não definidos."
    echo "        Notificações por e-mail estarão desabilitadas."
fi

if [[ -S /var/run/docker.sock ]]; then
    chmod 666 /var/run/docker.sock
    echo "[OK] Permissão do Docker socket ajustada."
fi

echo "[INFO] Iniciando Jenkins..."
exec /usr/bin/tini -- /usr/local/bin/jenkins.sh "$@"
