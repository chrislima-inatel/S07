/**
 * Testes sem BDD — Caixa de Diálogo (Modal jQuery UI)
 * URL: https://www.globalsqa.com/demoSite/practice/dialog/modal-message.html
 *
 * A URL /demo-site/dialog-box/ foi renomeada para /demo-site/dialog-boxes/ e
 * passou a usar iframes. O componente jQuery UI Dialog está acessível diretamente.
 *
 * Comportamento da página:
 *  - O diálogo abre AUTOMATICAMENTE ao carregar a página (autoOpen: true)
 *  - É um modal com overlay de fundo
 *  - Possui botão "Ok" no rodapé para fechar
 *  - Possui botão "X" no cabeçalho para fechar
 *
 * Estrutura após inicialização do jQuery UI:
 *  - .ui-dialog             → contêiner do diálogo
 *  - .ui-dialog-content     → área de conteúdo
 *  - .ui-dialog-titlebar    → barra de título
 *  - .ui-dialog-titlebar-close → botão X de fechar
 *  - .ui-dialog-buttonset   → área com os botões de ação
 *  - .ui-widget-overlay     → overlay de fundo do modal
 */
describe('Caixa de Diálogo (Modal)', () => {
  beforeEach(() => {
    cy.visit('/demoSite/practice/dialog/modal-message.html')
    // O diálogo abre automaticamente — aguarda ele aparecer
    cy.get('.ui-dialog').should('be.visible')
  })

  // ---------------------------------------------------------------------------
  context('Estado inicial', () => {
    it('deve abrir o diálogo automaticamente ao carregar a página', () => {
      cy.get('.ui-dialog').should('be.visible')
    })

    it('deve exibir o overlay de fundo do modal', () => {
      // O overlay tem position:fixed e está atrás do diálogo (z-index inferior).
      // Cypress pode considerá-lo "coberto" pelo conteúdo do diálogo,
      // por isso verificamos a existência em vez da visibilidade.
      cy.get('.ui-widget-overlay').should('exist')
    })

    it('deve exibir conteúdo dentro do diálogo', () => {
      cy.get('.ui-dialog-content').should('not.be.empty')
    })

    it('deve exibir o título na barra do diálogo', () => {
      cy.get('.ui-dialog-title').should('not.be.empty')
    })
  })

  // ---------------------------------------------------------------------------
  context('Fechando o diálogo', () => {
    it('deve fechar o diálogo ao clicar no botão Ok', () => {
      cy.get('.ui-dialog-buttonset button').first().click()
      // jQuery UI anima o fechamento e mantém o elemento no DOM com display:none
      cy.get('.ui-dialog').should('not.be.visible')
    })

    it('deve remover o overlay ao fechar o diálogo pelo botão Ok', () => {
      cy.get('.ui-dialog-buttonset button').first().click()
      // jQuery UI remove o overlay do DOM ao fechar (não apenas oculta)
      cy.get('.ui-widget-overlay').should('not.exist')
    })

    it('deve fechar o diálogo ao clicar no botão X', () => {
      cy.get('.ui-dialog-titlebar-close').click()
      cy.get('.ui-dialog').should('not.be.visible')
    })
  })
})
