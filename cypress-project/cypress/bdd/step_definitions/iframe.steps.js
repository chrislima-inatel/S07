/**
 * Step Definitions — iFrame
 * Feature: cypress/bdd/features/iframe/iframe.feature
 */
import { Then } from '@badeball/cypress-cucumber-preprocessor'
import IframePage from '../../pages/IframePage'

// =============================================================================
// ENTÃO — Verificações
// =============================================================================

Then('o iframe deve estar visível na página', () => {
  IframePage.verificarIframeVisivel()
})

Then('o iframe deve ter o atributo {string} definido', (atributo) => {
  IframePage.iframe.should('have.attr', atributo)
})

Then('o conteúdo do iframe não deve estar vazio', () => {
  cy.acessarIframe('iframe[name="globalSqa"]').should('not.be.empty')
})

Then('deve ser possível encontrar elementos HTML dentro do iframe', () => {
  cy.acessarIframe('iframe[name="globalSqa"]').find('p, div, h1, h2, h3, span').should('exist')
})

Then('o texto dentro do iframe não deve estar vazio', () => {
  cy.acessarIframe('iframe[name="globalSqa"]').invoke('text').should('not.be.empty')
})
