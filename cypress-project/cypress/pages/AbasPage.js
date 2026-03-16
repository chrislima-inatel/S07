/**
 * Page Object — Página de Abas (Tabs)
 * URL: https://www.globalsqa.com/demo-site/accordion-and-tabs/
 *
 * A URL /demo-site/tabs/ foi removida. As abas agora fazem parte da página
 * /demo-site/accordion-and-tabs/ e usam o plugin easyResponsiveTabs
 * (em vez do jQuery UI Tabs original).
 *
 * Seletores atualizados:
 *  - Itens de aba:  .resp-tabs-list li                        (era: #tabs .ui-tabs-nav li)
 *  - Aba ativa:     classe resp-tab-active                    (era: ui-tabs-active)
 *  - Painéis:       .resp-tab-content                         (era: #tabs .ui-tabs-panel)
 *  - Painel ativo:  .resp-tab-content.resp-tab-content-active (era: #tabs .ui-tabs-panel:visible)
 */
class AbasPage {
  // ===========================================================================
  // SELETORES (Getters)
  // ===========================================================================

  /** Retorna todos os itens de aba do menu de navegação */
  get itensDeAba() {
    return cy.get('.resp-tabs-list li')
  }

  /** Retorna os itens clicáveis das abas (o próprio li é clicável no easyResponsiveTabs) */
  get linksDeAba() {
    return cy.get('.resp-tabs-list li')
  }

  /** Retorna todos os painéis de conteúdo das abas */
  get paineisDeConteudo() {
    return cy.get('.resp-tab-content')
  }

  /** Retorna o painel de conteúdo atualmente ativo */
  get painelAtivo() {
    return cy.get('.resp-tab-content.resp-tab-content-active')
  }

  // ===========================================================================
  // AÇÕES
  // ===========================================================================

  /** Acessa a página de Abas */
  acessar() {
    cy.acessarPagina('/demo-site/accordion-and-tabs/')
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
    this.itensDeAba.eq(indice).should('have.class', 'resp-tab-active')
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
