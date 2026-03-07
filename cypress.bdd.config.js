const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')

/**
 * Configuração do Cypress — Abordagem BDD (Gherkin/Cucumber)
 * Executa os testes escritos em linguagem Gherkin com step definitions
 */
module.exports = defineConfig({
  e2e: {
    // URL base do site testado
    baseUrl: 'https://www.globalsqa.com',

    // Padrão dos arquivos de feature (BDD)
    specPattern: 'cypress/bdd/features/**/*.feature',

    // Arquivo de suporte
    supportFile: 'cypress/support/e2e.js',

    // Pasta dos fixtures
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
      runMode: 1,
      openMode: 0,
    },

    /**
     * setupNodeEvents: registra o plugin do Cucumber para processar
     * arquivos .feature e compilar os step definitions com esbuild
     */
    async setupNodeEvents(on, config) {
      // Registra o plugin do Cucumber (obrigatório para BDD)
      await addCucumberPreprocessorPlugin(on, config)

      // Configura o bundler (esbuild) para compilar os step definitions
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )

      return config
    },
  },
})
