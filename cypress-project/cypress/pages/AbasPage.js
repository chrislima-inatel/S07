/**
 * Page Object — Página de Abas (Tabs)
 * URL: https://www.globalsqa.com/demo-site/tabs/
 *
 * Encapsula os seletores e ações da página de abas do jQuery UI.
 * Padrão: Page Object Model (POM)
 */
class AbasPage {
  // ===========================================================================
  // SELETORES (Getters)
  // ===========================================================================

  /** Retorna todos os itens de aba do menu de navegação */
  get itensDeAba() {
    return cy.get('#tabs .ui-tabs-nav li')
  }

  /** Retorna os links clicáveis das abas */
  get linksDeAba() {
    return cy.get('#tabs .ui-tabs-nav li a')
  }

  /** Retorna todos os painéis de conteúdo das abas */
  get paineisDeConteudo() {
    return cy.get('#tabs .ui-tabs-panel')
  }

  /** Retorna o painel de conteúdo atualmente visível */
  get painelAtivo() {
    return cy.get('#tabs .ui-tabs-panel:visible')
  }

  // ===========================================================================
  // AÇÕES
  // ===========================================================================

  /** Acessa a página de Abas */
  acessar() {
    cy.acessarPagina('/demo-site/tabs/')
  }

  /**
   * Clica em uma aba pelo índice (0 = primeira aba)
   * @param {number} indice - Índice da aba (começa em 0)
   */
  clicarAba(indice) {
    this.linksDeAba.eq(indice).click()
  }

  /**
   * Clica em uma aba pelo texto do título
   * @param {string} titulo - Texto do título da aba
   */
  clicarAbaPorTitulo(titulo) {
    this.linksDeAba.contains(titulo).click()
  }

  // ===========================================================================
  // VERIFICAÇÕES
  // ===========================================================================

  /**
   * Verifica se a aba no índice informado está ativa (selecionada)
   * @param {number} indice - Índice da aba (começa em 0)
   */
  verificarAbaAtiva(indice) {
    this.itensDeAba.eq(indice).should('have.class', 'ui-tabs-active')
  }

  /**
   * Verifica se o painel de conteúdo ativo contém o texto informado
   * @param {string} texto - Texto esperado no painel ativo
   */
  verificarConteudoVisivel(texto) {
    this.painelAtivo.should('contain.text', texto)
  }

  /**
   * Verifica se o painel de conteúdo no índice está oculto
   * @param {number} indice - Índice do painel (começa em 0)
   */
  verificarPainelOculto(indice) {
    this.paineisDeConteudo.eq(indice).should('not.be.visible')
  }
}

// Exporta uma instância única (Singleton) para uso nos testes
export default new AbasPage()
