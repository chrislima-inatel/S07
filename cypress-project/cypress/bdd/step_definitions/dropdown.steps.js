/**
 * Step Definitions — Menu Suspenso de Países
 * Feature: cypress/bdd/features/dropdown/dropdown.feature
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import DropdownPage from '../../pages/DropdownPage'

// =============================================================================
// QUANDO — Ações
// =============================================================================

When('seleciono o país {string}', (pais) => {
  DropdownPage.selecionarPais(pais)
})

// =============================================================================
// ENTÃO — Verificações
// =============================================================================

Then('o dropdown de países deve estar visível', () => {
  DropdownPage.seletorPais.should('be.visible')
})

Then('o dropdown deve ter mais de {int} opções', (quantidade) => {
  DropdownPage.seletorPais.find('option').should('have.length.greaterThan', quantidade)
})

Then('o país selecionado deve ser {string}', (pais) => {
  DropdownPage.verificarPaisSelecionado(pais)
})

Then('o dropdown deve conter o país {string}', (pais) => {
  DropdownPage.verificarPaisExisteNasOpcoes(pais)
})
