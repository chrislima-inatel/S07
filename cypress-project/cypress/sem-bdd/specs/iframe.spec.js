/**
 * Testes sem BDD — iFrame
 * URL: https://www.globalsqa.com/demo-site/frames-and-windows/
 *
 * A URL /demo-site/iframe/ foi renomeada para /demo-site/frames-and-windows/.
 * A página usa o widget .newtabs com 3 abas:
 *  - "Open New Tab"     → link que abre nova aba
 *  - "Open New Window"  → link que abre nova janela
 *  - "iFrame"           → contém o iframe (3ª aba — precisa de clique para ativar)
 *
 * O iframe é carregado via lazy loading (data-src). O src real é carregado
 * após o elemento entrar no viewport, quando a aba "iFrame" estiver ativa.
 *
 * NOTA: O conteúdo interno do iframe não pode ser acessado via contentDocument
 * enquanto o lazy loading não tiver completado.
 */
describe('Página de iFrame', () => {
  beforeEach(() => {
    cy.visit('/demo-site/frames-and-windows/')
    // Aguarda o plugin de abas inicializar
    cy.get('.resp-tab-item').should('exist')
  })

  // ---------------------------------------------------------------------------
  context('Estrutura de abas da página', () => {
    it('deve exibir 3 abas de navegação', () => {
      cy.get('.resp-tabs-list li').should('have.length', 3)
    })

    it('deve ter a aba "iFrame" disponível', () => {
      cy.get('.resp-tabs-list li').contains('iFrame').should('exist')
    })
  })

  // ---------------------------------------------------------------------------
  context('Verificação do iframe', () => {
    beforeEach(() => {
      // O iframe está na 3ª aba — precisamos ativá-la primeiro
      cy.get('.resp-tabs-list li').contains('iFrame').click()
      cy.get('.resp-tab-content-active').should('be.visible')
    })

    it('deve exibir o iframe na aba ativa', () => {
      cy.get('iframe[name="globalSqa"]').should('exist')
    })

    it('deve ter o iframe com atributo data-src definido', () => {
      cy.get('iframe[name="globalSqa"]').should('have.attr', 'data-src')
    })

    it('deve ter o iframe com dimensões válidas', () => {
      cy.get('iframe[name="globalSqa"]').then(($iframe) => {
        expect($iframe.attr('width')).to.exist
        expect($iframe.attr('height')).to.exist
      })
    })

    it('deve ter o iframe visível após ativar a aba', () => {
      cy.get('iframe[name="globalSqa"]').should('be.visible')
    })
  })

  // ---------------------------------------------------------------------------
  context('Acesso ao conteúdo do iframe', () => {
    beforeEach(() => {
      // Ativa a aba do iframe e aguarda o carregamento
      cy.get('.resp-tabs-list li').contains('iFrame').click()
      cy.get('iframe[name="globalSqa"]').should('be.visible')
      // Garante que o lazy load dispara atualizando o src via JS
      cy.get('iframe[name="globalSqa"]').then(($iframe) => {
        const dataSrc = $iframe.attr('data-src')
        if (dataSrc) {
          $iframe[0].src = dataSrc
        }
      })
    })

    it('deve acessar o body do iframe após carregar', () => {
      cy.get('iframe[name="globalSqa"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
    })

    it('deve encontrar elementos HTML dentro do iframe', () => {
      cy.get('iframe[name="globalSqa"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('div, p, h1, h2, h3, span, a')
        .should('exist')
    })
  })
})
