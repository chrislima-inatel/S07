/**
 * Page Object — Página de iFrame
 * URL: https://www.globalsqa.com/demo-site/iframe/
 *
 * A página contém um iframe incorporado.
 * O Cypress não suporta iframes nativamente, por isso usamos o
 * comando customizado `cy.acessarIframe()` definido em commands.js.
 *
 * CONCEITO IMPORTANTE:
 * Para interagir com elementos dentro de um iframe, é necessário
 * "entrar" no contexto do documento do iframe antes de buscar elementos.
 */
class IframePage {
  // ===========================================================================
  // SELETORES — Página principal
  // ===========================================================================

  /** Elemento <iframe> na página principal */
  get iframe() {
    return cy.get('iframe').first()
  }

  /** Elemento <iframe> por ID específico (se existir) */
  get iframePorId() {
    return cy.get('#iFrame, iframe[name="iFrame"], iframe').first()
  }

  // ===========================================================================
  // AÇÕES
  // ===========================================================================

  /** Acessa a página de iFrame */
  acessar() {
    cy.acessarPagina('/demo-site/iframe/')
  }

  /**
   * Retorna o body do iframe para interação.
   * Use dentro de um .then() para encadear ações.
   *
   * @example
   * iframePage.acessarConteudoDoIframe().find('input').type('Olá')
   */
  acessarConteudoDoIframe() {
    return cy.acessarIframe('iframe').first()
  }

  // ===========================================================================
  // VERIFICAÇÕES
  // ===========================================================================

  /** Verifica se o iframe está presente e visível na página */
  verificarIframeVisivel() {
    this.iframe.should('be.visible')
  }

  /**
   * Verifica se o iframe existe no DOM (mesmo que não esteja visível)
   */
  verificarIframeExiste() {
    this.iframe.should('exist')
  }

  /**
   * Verifica se o conteúdo dentro do iframe contém o texto esperado
   * @param {string} texto - Texto esperado dentro do iframe
   */
  verificarTextoNoIframe(texto) {
    cy.acessarIframe('iframe').should('contain.text', texto)
  }

  /**
   * Verifica se um elemento existe dentro do iframe
   * @param {string} seletor - Seletor CSS do elemento dentro do iframe
   */
  verificarElementoNoIframe(seletor) {
    cy.acessarIframe('iframe').find(seletor).should('exist')
  }
}

export default new IframePage()
