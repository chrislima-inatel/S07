/**
 * Step Definitions Compartilhados
 *
 * Passos (steps) reutilizáveis em múltiplas features.
 * Contém principalmente os steps "Dado que acesso a página de X"
 * que são usados no Contexto de cada feature.
 */
import { Given } from '@badeball/cypress-cucumber-preprocessor'

// =============================================================================
// DADO — Navegação para páginas
// =============================================================================

Given('que acesso a página de Abas', () => {
  cy.acessarPagina('/demo-site/tabs/')
})

Given('que acesso a página de Caixas de Alerta', () => {
  cy.acessarPagina('/demo-site/alertbox/')
})

Given('que acesso a página de Caixa de Diálogo', () => {
  cy.acessarPagina('/demo-site/dialog-box/')
})

Given('que acesso a página de Seletor de Data', () => {
  cy.acessarPagina('/demo-site/datepicker/')
})

Given('que acesso a página de Menu Suspenso', () => {
  cy.acessarPagina('/demo-site/select-dropdown-menu/')
})

Given('que acesso a página de iFrame', () => {
  cy.acessarPagina('/demo-site/iframe/')
})

Given('que acesso a página de Acordeão e Abas', () => {
  cy.acessarPagina('/demo-site/accordion-and-tabs/')
})
