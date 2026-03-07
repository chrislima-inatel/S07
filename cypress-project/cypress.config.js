const { defineConfig } = require('cypress')

/**
 * Configuração principal do Cypress — Abordagem SEM BDD
 * Executa os testes tradicionais com Page Object Model
 */
module.exports = defineConfig({
  e2e: {
    // URL base do site testado
    baseUrl: 'https://www.globalsqa.com',

    // Padrão dos arquivos de teste (sem BDD)
    specPattern: 'cypress/sem-bdd/**/*.spec.js',

    // Arquivo de suporte
    supportFile: 'cypress/support/e2e.js',

    // Pasta dos Page Objects e fixtures
    fixturesFolder: 'cypress/fixtures',

    // Configurações de viewport
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeouts (em milissegundos)
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,

    // Configurações de vídeo e capturas de tela
    video: false,
    screenshotOnRunFailure: true,

    // Número de tentativas em caso de falha
    retries: {
      runMode: 1,   // 1 tentativa no modo headless (CI)
      openMode: 0,  // 0 tentativas no modo interativo
    },
  },
})
