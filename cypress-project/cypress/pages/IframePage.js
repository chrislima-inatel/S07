/**
 * Page Object — Página de iFrame
 * URL: https://www.globalsqa.com/demo-site/frames-and-windows/
 *
 * A URL /demo-site/iframe/ foi renomeada para /demo-site/frames-and-windows/.
 * O iframe fica dentro da 3ª aba ("iFrame") e usa lazy loading (atributo data-src).
 *
 * Pré-requisito (tratado no compartilhado.steps.js):
 *  1. Clicar na aba "iFrame" para torná-la visível
 *  2. Definir iframe.src = data-src para disparar o carregamento do conteúdo
 *
 * O Cypress não suporta iframes nativamente — usa o comando customizado
 * `cy.acessarIframe()` definido em commands.js.
 */
class IframePage {
  // ===========================================================================
  // SELETORES — Página principal
  // ===========================================================================

  /** Elemento <iframe> identificado pelo atributo name="globalSqa" */
  get iframe() {
    return cy.get('iframe[name="globalSqa"]')
  }

  /** Alias de iframe — mantido para compatibilidade */
  get iframePorId() {
    return cy.get('iframe[name="globalSqa"]')
  }

  // ===========================================================================
  // AÇÕES
  // ===========================================================================

  /** Acessa a página de iFrame */
  acessar() {
    cy.acessarPagina('/demo-site/frames-and-windows/')
  }

  /**
   * Retorna o body do iframe para interação.
   * Use dentro de um .then() para encadear ações.
   *
   * @example
   * iframePage.acessarConteudoDoIframe().find('input').type('Olá')
   */
  acessarConteudoDoIframe() {
    return cy.acessarIframe('iframe[name="globalSqa"]')
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
    cy.acessarIframe('iframe[name="globalSqa"]').should('contain.text', texto)
  }

  /**
   * Verifica se um elemento existe dentro do iframe
   * @param {string} seletor - Seletor CSS do elemento dentro do iframe
   */
  verificarElementoNoIframe(seletor) {
    cy.acessarIframe('iframe[name="globalSqa"]').find(seletor).should('exist')
  }
}

export default new IframePage()
