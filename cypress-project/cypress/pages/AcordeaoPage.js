/**
 * Page Object — Página de Acordeão (Accordion)
 * URL: https://www.globalsqa.com/demoSite/practice/accordion/collapsible.html
 *
 * A URL /demo-site/accordion-and-tabs/ passou a usar iframes para o acordeão.
 * O componente jQuery UI Accordion está acessível diretamente na página de prática.
 *
 * Os seletores de abas (.resp-tabs-list, .resp-tab-content) são mantidos
 * para compatibilidade mas não são usados nos testes de acordeão.
 */
class AcordeaoPage {
  // ===========================================================================
  // SELETORES — Acordeão
  // ===========================================================================

  /** Cabeçalhos clicáveis do acordeão */
  get cabecalhosAcordeao() {
    return cy.get('#accordion h3')
  }

  /** Painéis de conteúdo do acordeão */
  get paineisAcordeao() {
    return cy.get('#accordion .ui-accordion-content')
  }

  /** Painel de conteúdo do acordeão atualmente aberto */
  get painelAcordeaoAberto() {
    return cy.get('#accordion .ui-accordion-content:visible')
  }

  // ===========================================================================
  // SELETORES — Abas (segundo componente da página)
  // ===========================================================================

  /** Links de aba do componente de tabs (easyResponsiveTabs — o próprio li é clicável) */
  get linksDeAba() {
    return cy.get('.resp-tabs-list li')
  }

  /** Painéis de conteúdo das abas */
  get paineisDeAba() {
    return cy.get('.resp-tab-content')
  }

  /** Painel de aba atualmente ativo */
  get painelDeAbaAtivo() {
    return cy.get('.resp-tab-content.resp-tab-content-active')
  }

  // ===========================================================================
  // AÇÕES — Acordeão
  // ===========================================================================

  /** Acessa a página de Acordeão */
  acessar() {
    cy.acessarPagina('/demoSite/practice/accordion/collapsible.html')
  }

  /**
   * Clica no cabeçalho do acordeão pelo índice (0 = primeira seção)
   * @param {number} indice - Índice do cabeçalho (começa em 0)
   */
  clicarCabecalhoAcordeao(indice) {
    this.cabecalhosAcordeao.eq(indice).click()
  }

  /**
   * Clica no cabeçalho do acordeão que contém o texto informado
   * @param {string} texto - Texto (ou parte) do cabeçalho
   */
  clicarCabecalhoPorTexto(texto) {
    this.cabecalhosAcordeao.contains(texto).click()
  }

  // ===========================================================================
  // AÇÕES — Abas
  // ===========================================================================

  /**
   * Clica em uma aba pelo índice
   * @param {number} indice - Índice da aba (começa em 0)
   */
  clicarAba(indice) {
    this.linksDeAba.eq(indice).click()
  }

  // ===========================================================================
  // VERIFICAÇÕES — Acordeão
  // ===========================================================================

  /**
   * Verifica se o painel do acordeão no índice informado está aberto (visível)
   * @param {number} indice - Índice do painel (começa em 0)
   */
  verificarPainelAberto(indice) {
    this.paineisAcordeao.eq(indice).should('be.visible')
  }

  /**
   * Verifica se o painel do acordeão no índice informado está fechado (oculto)
   * @param {number} indice - Índice do painel (começa em 0)
   */
  verificarPainelFechado(indice) {
    this.paineisAcordeao.eq(indice).should('not.be.visible')
  }

  /**
   * Verifica se o painel aberto contém o texto informado
   * @param {string} texto - Texto esperado no painel aberto
   */
  verificarConteudoPainelAberto(texto) {
    this.painelAcordeaoAberto.should('contain.text', texto)
  }

  // ===========================================================================
  // VERIFICAÇÕES — Abas
  // ===========================================================================

  /**
   * Verifica se o painel de aba ativo contém o texto informado
   * @param {string} texto - Texto esperado no painel ativo
   */
  verificarConteudoAbaAtiva(texto) {
    this.painelDeAbaAtivo.should('contain.text', texto)
  }
}

export default new AcordeaoPage()
