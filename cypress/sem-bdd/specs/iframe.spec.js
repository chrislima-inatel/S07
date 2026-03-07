/**
 * Testes sem BDD — iFrame
 * URL: https://www.globalsqa.com/demo-site/iframe/
 *
 * Abordagem: Page Object Model (POM)
 *
 * CONCEITO IMPORTANTE — Como o Cypress lida com iFrames:
 * O Cypress não suporta iframes nativamente pois eles possuem seu próprio
 * documento (contentDocument). Para acessar elementos dentro de um iframe,
 * precisamos obter o body do contentDocument e envolvê-lo com cy.wrap().
 *
 * Usamos o comando customizado cy.acessarIframe() definido em commands.js.
 */
import IframePage from '../../pages/IframePage'

describe('Página de iFrame', () => {
  beforeEach(() => {
    IframePage.acessar()
  })

  // ---------------------------------------------------------------------------
  context('Verificação do iframe na página principal', () => {
    it('deve exibir o iframe na página', () => {
      IframePage.verificarIframeVisivel()
    })

    it('deve ter o iframe com atributo src definido', () => {
      IframePage.iframe.should('have.attr', 'src')
    })

    it('deve ter dimensões válidas (largura e altura)', () => {
      IframePage.iframe.then(($iframe) => {
        expect($iframe.width()).to.be.greaterThan(0)
        expect($iframe.height()).to.be.greaterThan(0)
      })
    })
  })

  // ---------------------------------------------------------------------------
  context('Acesso ao conteúdo dentro do iframe', () => {
    it('deve acessar o body do iframe sem erros', () => {
      cy.acessarIframe('iframe').should('exist')
    })

    it('deve ter conteúdo carregado dentro do iframe', () => {
      cy.acessarIframe('iframe').should('not.be.empty')
    })

    it('deve encontrar elementos HTML dentro do iframe', () => {
      // Verifica que há pelo menos um elemento de bloco dentro do iframe
      cy.acessarIframe('iframe').find('p, div, h1, h2, h3, span').should('exist')
    })
  })

  // ---------------------------------------------------------------------------
  context('Interação com elementos no iframe', () => {
    it('deve conseguir ler o texto dentro do iframe', () => {
      cy.acessarIframe('iframe').invoke('text').should('not.be.empty')
    })

    it('deve conseguir interagir com links dentro do iframe (se existirem)', () => {
      cy.acessarIframe('iframe').then(($body) => {
        const links = $body.find('a')
        if (links.length > 0) {
          cy.wrap(links.first()).should('be.visible')
        } else {
          // Sem links — apenas verifica que o iframe está acessível
          cy.wrap($body).should('exist')
        }
      })
    })
  })
})
