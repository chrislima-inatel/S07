pipeline {

    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
        timestamps()
        ansiColor('xterm')
        disableConcurrentBuilds()
    }

    environment {
        GMAIL_USER         = credentials('gmail-user')
        GMAIL_PASS         = credentials('gmail-pass')
        DESTINATARIO_EMAIL = credentials('destinatario-email')
        NOME_PIPELINE      = 'S07 — Testes Automatizados'
        RELATORIO_DIR      = '/relatorios'
        RELATORIO_URL      = 'http://localhost:8081'
    }

    stages {

        stage('🚀 Preparação') {
            steps {
                script {
                    echo "=============================================="
                    echo "  ${NOME_PIPELINE}"
                    echo "  Build: #${BUILD_NUMBER}"
                    echo "  Branch: ${GIT_BRANCH ?: 'local'}"
                    echo "=============================================="
                }
                sh '''
                    echo "=== Versões das Ferramentas ==="
                    echo "Node.js: $(node --version)"
                    echo "npm:     $(npm --version)"
                    echo "Docker:  $(docker --version)"
                    echo ""
                    echo "=== Containers Ativos ==="
                    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
                    echo ""
                    echo "=== Verificando containers do pipeline ==="
                    docker inspect cypress-runner --format "Cypress: {{.State.Status}}" 2>/dev/null || echo "AVISO: cypress-runner não encontrado"
                    docker inspect newman-runner  --format "Newman:  {{.State.Status}}" 2>/dev/null || echo "AVISO: newman-runner não encontrado"
                '''
                sh '''
                    rm -f ${RELATORIO_DIR}/*.html ${RELATORIO_DIR}/*.json 2>/dev/null || true
                    mkdir -p ${RELATORIO_DIR}
                    echo "Diretório de relatórios pronto: ${RELATORIO_DIR}"
                '''
            }
        }

        stage('📦 Instalação') {
            parallel {

                stage('Cypress — npm ci') {
                    steps {
                        echo "Instalando dependências do Cypress..."
                        sh 'docker exec cypress-runner npm ci --prefer-offline'
                        echo "✅ Dependências do Cypress instaladas"
                    }
                }

                stage('Newman — npm ci') {
                    steps {
                        echo "Instalando dependências do Newman..."
                        sh 'docker exec newman-runner npm ci --prefer-offline'
                        echo "✅ Dependências do Newman instaladas"
                    }
                }

            }
        }

        stage('🧪 Testes') {
            parallel {

                stage('UI — Cypress sem BDD') {
                    steps {
                        echo "Iniciando testes Cypress (Page Object Model)..."
                        sh '''
                            docker exec cypress-runner \
                                npx cypress run \
                                --spec "cypress/sem-bdd/**/*.spec.js" \
                                --reporter json \
                                --reporter-options "output=${RELATORIO_DIR}/cypress-sem-bdd-results.json" \
                                2>&1 | tee ${RELATORIO_DIR}/cypress-sem-bdd.log
                        '''
                    }
                    post {
                        always {
                            sh '''
                                docker exec cypress-runner sh -c \
                                    "cp -r /app/cypress/screenshots/* /relatorios/ 2>/dev/null || true"
                            '''
                        }
                        success { echo "✅ Cypress sem BDD: TODOS OS TESTES PASSARAM" }
                        failure { echo "❌ Cypress sem BDD: FALHAS DETECTADAS — verifique os screenshots" }
                    }
                }

                stage('UI — Cypress BDD') {
                    steps {
                        echo "Iniciando testes Cypress (BDD/Gherkin)..."
                        sh '''
                            docker exec cypress-runner \
                                npx cypress run \
                                --config-file cypress.bdd.config.js \
                                2>&1 | tee ${RELATORIO_DIR}/cypress-bdd.log
                        '''
                    }
                    post {
                        always {
                            sh '''
                                docker exec cypress-runner sh -c \
                                    "cp -r /app/cypress/screenshots/* /relatorios/ 2>/dev/null || true"
                            '''
                        }
                        success { echo "✅ Cypress BDD: TODOS OS CENÁRIOS PASSARAM" }
                        failure { echo "❌ Cypress BDD: CENÁRIOS COM FALHA — verifique os screenshots" }
                    }
                }

                stage('API — Newman') {
                    steps {
                        echo "Iniciando testes de API com Newman..."
                        sh '''
                            docker exec newman-runner \
                                npx newman run \
                                    collections/pokeapi.collection.json \
                                    -e environments/pokeapi.environment.json \
                                    --reporters cli,htmlextra \
                                    --reporter-htmlextra-export /relatorios/api-report.html \
                                    --reporter-htmlextra-title "Relatório PokéAPI — S07" \
                                    --reporter-htmlextra-browserTitle "S07 API Tests" \
                                    --reporter-htmlextra-showEnvironmentData \
                                2>&1 | tee ${RELATORIO_DIR}/newman.log
                        '''
                    }
                    post {
                        success { echo "✅ API: TODAS AS REQUISIÇÕES PASSARAM" }
                        failure { echo "❌ API: FALHAS NAS REQUISIÇÕES — verifique o relatório HTML" }
                    }
                }

            }
        }

        stage('📊 Relatórios') {
            steps {
                echo "Publicando relatórios..."
                sh '''
                    cat > ${RELATORIO_DIR}/index.html <<HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatórios — Pipeline S07</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #2c3e50; }
        .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin: 12px 0; }
        .card a { font-size: 1.1em; color: #3498db; text-decoration: none; font-weight: bold; }
        .card a:hover { text-decoration: underline; }
        .meta { color: #666; font-size: 0.9em; margin-top: 6px; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; }
        .ui { background: #d5f5e3; color: #1e8449; }
        .api { background: #d6eaf8; color: #1a5276; }
    </style>
</head>
<body>
    <h1>📊 Relatórios do Pipeline S07</h1>
    <p>Build <strong>#${BUILD_NUMBER}</strong> — ${BUILD_TIMESTAMP:-$(date '+%d/%m/%Y %H:%M')}</p>

    <div class="card">
        <a href="api-report.html">Relatório API — Newman/Postman (PokéAPI)</a>
        <span class="badge api">API</span>
        <div class="meta">Testes de API: GET /pokemon, validações de status e corpo</div>
    </div>

    <div class="card">
        <a href="cypress-sem-bdd.log">Log — Cypress sem BDD (Page Object Model)</a>
        <span class="badge ui">UI</span>
        <div class="meta">7 specs: Abas, Acordeão, Alertas, DatePicker, Diálogo, Dropdown, iFrame</div>
    </div>

    <div class="card">
        <a href="cypress-bdd.log">Log — Cypress BDD (Gherkin/Cucumber)</a>
        <span class="badge ui">UI</span>
        <div class="meta">7 features escritas em português com cenários Gherkin</div>
    </div>

    <hr>
    <p><a href="${JENKINS_URL}/job/${JOB_NAME}/${BUILD_NUMBER}/">Ver build no Jenkins</a></p>
</body>
</html>
HTML
                    echo "✅ index.html gerado em ${RELATORIO_DIR}"
                    ls -lh ${RELATORIO_DIR}/
                '''

                sh '''
                    mkdir -p ${WORKSPACE}/relatorios-build
                    cp -r ${RELATORIO_DIR}/* ${WORKSPACE}/relatorios-build/ 2>/dev/null || true
                '''

                archiveArtifacts artifacts: 'relatorios-build/**', allowEmptyArchive: true

                echo "📊 Relatórios disponíveis em: ${RELATORIO_URL}"
                echo "📋 Relatório API: ${RELATORIO_URL}/api-report.html"
            }
        }

    }

    post {

        success {
            echo "🎉 Pipeline concluído com SUCESSO!"
            sh '''
                bash /workspace/pipeline_docker/scripts/notificacao/enviar-email.sh \
                    "sucesso" \
                    "${BUILD_URL}" \
                    "${DESTINATARIO_EMAIL}"
            '''
        }

        failure {
            echo "💔 Pipeline FALHOU. Verificar logs acima."
            sh '''
                bash /workspace/pipeline_docker/scripts/notificacao/enviar-email.sh \
                    "falha" \
                    "${BUILD_URL}" \
                    "${DESTINATARIO_EMAIL}"
            '''
        }

        unstable {
            echo "⚠️  Pipeline INSTÁVEL — alguns testes falharam."
            sh '''
                bash /workspace/pipeline_docker/scripts/notificacao/enviar-email.sh \
                    "falha" \
                    "${BUILD_URL}" \
                    "${DESTINATARIO_EMAIL}"
            '''
        }

        always {
            echo "=== Sumário de Execução ==="
            echo "Pipeline : ${NOME_PIPELINE}"
            echo "Build    : #${BUILD_NUMBER}"
            echo "Resultado: ${currentBuild.currentResult}"
            echo "Duração  : ${currentBuild.durationString}"
            echo "Relatórios: ${RELATORIO_URL}"
            echo "==========================="
        }

    }

}
