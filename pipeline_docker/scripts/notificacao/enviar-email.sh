#!/bin/bash

set -euo pipefail

STATUS="${1:-}"
BUILD_URL="${2:-}"
DESTINATARIO="${3:-}"

if [[ -z "$STATUS" || -z "$BUILD_URL" || -z "$DESTINATARIO" ]]; then
    echo "[ERRO] Uso: $0 <sucesso|falha> <build_url> <destinatario>"
    echo "       Exemplo: $0 sucesso http://localhost:8080/job/s07/1/ aluno@email.com"
    exit 1
fi

if [[ "$STATUS" != "sucesso" && "$STATUS" != "falha" ]]; then
    echo "[ERRO] Status deve ser 'sucesso' ou 'falha'. Recebido: '$STATUS'"
    exit 1
fi

TIMESTAMP=$(date '+%d/%m/%Y às %H:%M:%S')
RELATORIO_URL="http://localhost:8081"
JOB_NAME="${JOB_NAME:-Pipeline S07}"
BUILD_NUMBER="${BUILD_NUMBER:-N/A}"

if [[ "$STATUS" == "sucesso" ]]; then
    EMOJI="✅"
    ASSUNTO="[SUCESSO] Pipeline S07 — Build #${BUILD_NUMBER} passou!"
    MENSAGEM_PRINCIPAL="Todos os testes passaram com sucesso."
    DETALHES="O pipeline executou os testes de UI (Cypress) e os testes de API (Newman) sem nenhuma falha."
else
    EMOJI="❌"
    ASSUNTO="[FALHA] Pipeline S07 — Build #${BUILD_NUMBER} falhou!"
    MENSAGEM_PRINCIPAL="Um ou mais testes falharam durante a execução."
    DETALHES="Verifique os relatórios e logs do Jenkins para identificar o problema."
fi

CORPO_EMAIL=$(cat <<EOF
From: Pipeline S07 <${GMAIL_USER}>
To: ${DESTINATARIO}
Subject: ${ASSUNTO}
Content-Type: text/plain; charset=UTF-8
MIME-Version: 1.0

${EMOJI} RESULTADO DO PIPELINE — ${JOB_NAME}
================================================

Status    : $(echo "$STATUS" | tr '[:lower:]' '[:upper:]')
Build     : #${BUILD_NUMBER}
Data/Hora : ${TIMESTAMP}

${MENSAGEM_PRINCIPAL}
${DETALHES}

LINKS ÚTEIS
-----------
📋 Ver build no Jenkins   : ${BUILD_URL}
📊 Ver relatórios HTML    : ${RELATORIO_URL}
📊 Relatório API (Newman) : ${RELATORIO_URL}/api-report.html

TESTES EXECUTADOS
-----------------
• Cypress - Sem BDD (Page Object Model)
• Cypress - BDD (Gherkin/Cucumber)
• API - Newman/Postman (PokéAPI)

--
Mensagem automática gerada pelo pipeline de CI/CD
Inatel — Qualidade e Configuração de Software (S07)
EOF
)

echo "[INFO] Enviando e-mail de '${STATUS}' para '${DESTINATARIO}'..."

if echo "$CORPO_EMAIL" | msmtp -a default "$DESTINATARIO"; then
    echo "[OK] E-mail enviado com sucesso para ${DESTINATARIO}"
    exit 0
else
    echo "[AVISO] Falha ao enviar e-mail. Verifique as credenciais do Gmail."
    echo "        O pipeline continuará normalmente."
    exit 0
fi
