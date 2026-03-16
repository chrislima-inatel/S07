/**
 * Step Definitions Compartilhados
 *
 * Passos (steps) reutilizáveis em múltiplas features.
 * Contém principalmente os steps "Dado que acesso a página de X"
 * que são usados no Contexto de cada feature.
 *
 * URLs atualizadas após reestruturação do site GlobalSQA:
 *  - /demo-site/tabs/           → removido → conteúdo em /demo-site/accordion-and-tabs/
 *  - /demo-site/dialog-box/     → removido → conteúdo em /demoSite/practice/dialog/modal-message.html
 *  - /demo-site/datepicker/     → usa iframe → acesso direto em /demoSite/practice/datepicker/default.html
 *  - /demo-site/iframe/         → renomeado para /demo-site/frames-and-windows/
 */
import { Given } from '@badeball/cypress-cucumber-preprocessor'

// =============================================================================
// DADO — Navegação para páginas
// =============================================================================

Given('que acesso a página de Abas', () => {
  // A página de tabs independente foi removida.
  // As abas agora estão em /demo-site/accordion-and-tabs/ usando o plugin easyResponsiveTabs.
  cy.acessarPagina('/demo-site/accordion-and-tabs/')
  cy.get('.resp-tab-item').should('exist')
})

Given('que acesso a página de Caixas de Alerta', () => {
  cy.acessarPagina('/demo-site/alertbox/')
  cy.get('.resp-tab-item').should('exist')
})

Given('que acesso a página de Caixa de Diálogo', () => {
  // A URL /demo-site/dialog-box/ foi removida.
  // O componente jQuery UI Dialog está acessível diretamente na página de prática.
  // O diálogo abre AUTOMATICAMENTE ao carregar a página (autoOpen: true).
  cy.acessarPagina('/demoSite/practice/dialog/modal-message.html')
  cy.get('.ui-dialog').should('be.visible')
})

Given('que acesso a página de Seletor de Data', () => {
  // A URL /demo-site/datepicker/ passou a usar iframes.
  // O componente jQuery UI DatePicker está acessível diretamente na página de prática.
  cy.acessarPagina('/demoSite/practice/datepicker/default.html')
  cy.get('#datepicker').should('exist')
})

Given('que acesso a página de Menu Suspenso', () => {
  cy.acessarPagina('/demo-site/select-dropdown-menu/')
})

Given('que acesso a página de iFrame', () => {
  // A URL /demo-site/iframe/ foi renomeada para /demo-site/frames-and-windows/.
  // O iframe está na 3ª aba ("iFrame") e usa lazy loading (data-src).
  // É necessário clicar na aba e carregar o src manualmente.
  cy.acessarPagina('/demo-site/frames-and-windows/')
  cy.get('.resp-tabs-list li').contains('iFrame').click()
  cy.get('iframe[name="globalSqa"]').should('be.visible')
  cy.get('iframe[name="globalSqa"]').then(($iframe) => {
    const dataSrc = $iframe.attr('data-src')
    if (dataSrc) {
      $iframe[0].src = dataSrc
    }
  })
})

Given('que acesso a página de Acordeão e Abas', () => {
  // A página /demo-site/accordion-and-tabs/ passou a usar iframes para o acordeão.
  // O componente jQuery UI Accordion está acessível diretamente na página de prática.
  cy.acessarPagina('/demoSite/practice/accordion/collapsible.html')
  cy.get('#accordion.ui-accordion').should('exist')
})
