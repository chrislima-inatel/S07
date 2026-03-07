/**
 * Step Definitions — Abas (Tabs)
 * Feature: cypress/bdd/features/abas/abas.feature
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import AbasPage from '../../pages/AbasPage'

// =============================================================================
// QUANDO — Ações
// =============================================================================

When('clico na aba de índice {int}', (indice) => {
  AbasPage.clicarAba(indice)
})

// =============================================================================
// ENTÃO — Verificações
// =============================================================================

Then('a primeira aba deve estar ativa', () => {
  AbasPage.verificarAbaAtiva(0)
})

Then('a aba de índice {int} deve estar ativa', (indice) => {
  AbasPage.verificarAbaAtiva(indice)
})

Then('o painel de índice {int} deve estar oculto', (indice) => {
  AbasPage.verificarPainelOculto(indice)
})

Then('o painel ativo deve estar visível', () => {
  AbasPage.painelAtivo.should('be.visible')
})

Then('deve haver {int} abas disponíveis', (quantidade) => {
  AbasPage.itensDeAba.should('have.length', quantidade)
})
