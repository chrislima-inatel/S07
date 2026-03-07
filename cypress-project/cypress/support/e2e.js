/**
 * Arquivo de suporte global do Cypress
 * Este arquivo é carregado automaticamente antes de cada teste.
 *
 * Aqui configuramos comportamentos globais e importamos os comandos customizados.
 */

// Importa os comandos customizados definidos em commands.js
import './commands'

/**
 * Suprime erros não capturados do site que não são relevantes para os testes.
 * O site GlobalSQA possui alguns erros de JS de terceiros que não afetam a
 * funcionalidade testada. Retornar 'false' impede que o Cypress falhe o teste
 * por causa desses erros externos.
 */
Cypress.on('uncaught:exception', (erro, runnable) => {
  // Retorna false para impedir que o Cypress falhe o teste
  return false
})

/**
 * Configuração global para todos os testes:
 * - Define o idioma padrão como Português do Brasil
 */
beforeEach(() => {
  // Permite que o Cypress interaja com elementos dentro de iframes
  // (necessário para a página de iFrame)
  cy.log('🚀 Iniciando teste...')
})
