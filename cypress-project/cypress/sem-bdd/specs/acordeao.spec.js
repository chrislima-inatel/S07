/**
 * Testes sem BDD — Acordeão jQuery UI
 * URL: https://www.globalsqa.com/demoSite/practice/accordion/collapsible.html
 *
 * A página /demo-site/accordion-and-tabs/ passou a usar iframes para o conteúdo.
 * O componente jQuery UI Accordion está disponível diretamente na URL de prática.
 *
 * Estrutura do accordion após a inicialização do jQuery UI:
 *  - #accordion                      → contêiner principal
 *  - #accordion h3                   → cabeçalhos clicáveis (.ui-accordion-header)
 *  - #accordion > div                → painéis de conteúdo (.ui-accordion-content)
 *  - .ui-accordion-header-active     → cabeçalho da seção ativa
 *  - .ui-accordion-content-active    → painel visível da seção ativa
 *
 * Opção collapsible: true — permite fechar todas as seções.
 */
describe('Acordeão jQuery UI', () => {
  beforeEach(() => {
    cy.visit('/demoSite/practice/accordion/collapsible.html')
    // Aguarda o jQuery UI inicializar o accordion
    cy.get('#accordion.ui-accordion').should('exist')
  })

  // ---------------------------------------------------------------------------
  context('Carregamento inicial', () => {
    it('deve ter pelo menos 3 seções de acordeão', () => {
      cy.get('#accordion h3').should('have.length.at.least', 3)
    })

    it('deve ter a primeira seção expandida por padrão', () => {
      cy.get('#accordion .ui-accordion-content').first().should('be.visible')
    })

    it('deve ter seções recolhidas além da primeira', () => {
      cy.get('#accordion .ui-accordion-content').eq(1).should('not.be.visible')
    })
  })

  // ---------------------------------------------------------------------------
  context('Expandir e recolher seções', () => {
    it('deve expandir a segunda seção ao clicar no cabeçalho', () => {
      cy.get('#accordion h3').eq(1).click()
      cy.get('#accordion .ui-accordion-content').eq(1).should('be.visible')
    })

    it('deve recolher a primeira seção ao expandir a segunda', () => {
      cy.get('#accordion h3').eq(1).click()
      cy.get('#accordion .ui-accordion-content').first().should('not.be.visible')
    })

    it('deve expandir a terceira seção ao clicar', () => {
      cy.get('#accordion h3').eq(2).click()
      cy.get('#accordion .ui-accordion-content').eq(2).should('be.visible')
    })

    it('deve fechar a seção ativa ao clicar nela novamente (collapsible)', () => {
      // A primeira seção começa aberta; clicar nela deve fechá-la
      cy.get('#accordion h3').first().click()
      cy.get('#accordion .ui-accordion-content').first().should('not.be.visible')
    })
  })

  // ---------------------------------------------------------------------------
  context('Conteúdo das seções', () => {
    it('deve exibir conteúdo no painel expandido', () => {
      cy.get('#accordion h3').eq(1).click()
      cy.get('#accordion .ui-accordion-content').eq(1).should('not.be.empty')
    })

    it('deve navegar por todas as seções do acordeão', () => {
      cy.get('#accordion h3').each(($h3, index) => {
        cy.wrap($h3).click()
        cy.get('#accordion .ui-accordion-content').eq(index).should('be.visible')
      })
    })
  })
})
