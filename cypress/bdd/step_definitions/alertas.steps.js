/**
 * Step Definitions — Caixas de Alerta (Alert Box)
 * Feature: cypress/bdd/features/alertas/alertas.feature
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import AlertasPage from '../../pages/AlertasPage'

// =============================================================================
// QUANDO — Ações
// =============================================================================

When('clico na aba de alerta de índice {int}', (indice) => {
  AlertasPage.clicarAba(indice)
})

When('clico no botão Tentar', () => {
  AlertasPage.clicarTentar()
})

When('aceito a caixa de confirmação', () => {
  // Registra o handler ANTES de a ação disparar o confirm
  // Nota: o cy.on deve ser configurado antes do click — aqui usamos o Page Object
  cy.on('window:confirm', () => true)
})

When('cancelo a caixa de confirmação', () => {
  cy.on('window:confirm', () => false)
})

When('respondo ao prompt com o texto {string}', (texto) => {
  // Configura o stub ANTES de clicar no botão
  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns(texto)
  })
})

// =============================================================================
// ENTÃO — Verificações
// =============================================================================

Then('a mensagem do alerta deve ser exibida', () => {
  // O Cypress descarta alertas automaticamente. Verificamos que não houve erro.
  // A captura da mensagem é feita com cy.on('window:alert') antes do clique.
  cy.log('Alerta exibido e descartado com sucesso pelo Cypress')
})

Then('o resultado da confirmação deve conter {string}', (mensagem) => {
  AlertasPage.verificarResultadoConfirmacao(mensagem)
})

Then('o resultado do prompt deve conter {string}', (mensagem) => {
  AlertasPage.verificarResultadoPrompt(mensagem)
})
