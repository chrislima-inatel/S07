/**
 * Testes sem BDD — Navegação por Abas
 * URL: https://www.globalsqa.com/demo-site/accordion-and-tabs/
 *
 * A página /demo-site/tabs/ foi removida do servidor.
 * O widget de abas responsivo (.newtabs / easyResponsiveTabs) está disponível
 * na página de Accordion & Tabs, onde organiza conteúdo em painéis.
 *
 * Estrutura do widget após o JavaScript inicializar:
 *  - .resp-tabs-list > li.resp-tab-item   → itens de aba (navegação)
 *  - li.resp-tab-active                   → aba ativa
 *  - .resp-tab-content                    → painel de conteúdo
 *  - .resp-tab-content-active             → painel ativo (visível)
 */
describe('Navegação por Abas', () => {
  beforeEach(() => {
    cy.visit('/demo-site/accordion-and-tabs/')
    // Aguarda o plugin de abas inicializar e renderizar os itens
    cy.get('.resp-tab-item').should('exist')
  })

  // ---------------------------------------------------------------------------
  context('Carregamento inicial', () => {
    it('deve exibir pelo menos 2 abas de navegação', () => {
      cy.get('.resp-tabs-list li').should('have.length.at.least', 2)
    })

    it('deve ter a primeira aba ativa por padrão', () => {
      cy.get('.resp-tabs-list li').first().should('have.class', 'resp-tab-active')
    })

    it('deve exibir conteúdo na aba ativa', () => {
      cy.get('.resp-tab-content-active').should('be.visible')
    })
  })

  // ---------------------------------------------------------------------------
  context('Navegação entre abas', () => {
    it('deve ativar a segunda aba ao clicar nela', () => {
      cy.get('.resp-tabs-list li').eq(1).click()
      cy.get('.resp-tabs-list li').eq(1).should('have.class', 'resp-tab-active')
    })

    it('deve ativar a terceira aba ao clicar nela', () => {
      cy.get('.resp-tabs-list li').eq(2).click()
      cy.get('.resp-tabs-list li').eq(2).should('have.class', 'resp-tab-active')
    })

    it('deve voltar para a primeira aba ao clicar nela', () => {
      cy.get('.resp-tabs-list li').eq(1).click()
      cy.get('.resp-tabs-list li').first().click()
      cy.get('.resp-tabs-list li').first().should('have.class', 'resp-tab-active')
    })
  })

  // ---------------------------------------------------------------------------
  context('Conteúdo das abas', () => {
    it('deve ocultar o conteúdo da aba anterior ao trocar de aba', () => {
      // A primeira aba está ativa - seu conteúdo deve estar visível
      cy.get('.resp-tab-content').first().should('be.visible')

      // Clica na segunda aba
      cy.get('.resp-tabs-list li').eq(1).click()

      // O conteúdo da primeira aba deve ficar oculto
      cy.get('.resp-tab-content').first().should('not.be.visible')
    })

    it('deve exibir conteúdo diferente ao trocar de aba', () => {
      cy.get('.resp-tab-content-active').invoke('text').then((textoAba1) => {
        cy.get('.resp-tabs-list li').eq(1).click()
        cy.get('.resp-tab-content-active').invoke('text').should('not.equal', textoAba1)
      })
    })
  })
})
