/**
 * Page Object — Página de Acordeão e Abas (Accordion & Tabs)
 * URL: https://www.globalsqa.com/demo-site/accordion-and-tabs/
 *
 * A página contém dois componentes jQuery UI:
 * 1. Acordeão: seções expansíveis e recolhíveis
 * 2. Abas: conteúdo alternado por abas (similar à página /tabs/)
 */
class AcordeaoPage {
  // ===========================================================================
  // SELETORES — Acordeão
  // ===========================================================================

  /** Cabeçalhos clicáveis do acordeão */
  get cabecalhosAcordeao() {
    return cy.get('#accordion h3.ui-accordion-header')
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

  /** Links de aba do componente de tabs */
  get linksDeAba() {
    return cy.get('#tabs2 .ui-tabs-nav li a, #tabs .ui-tabs-nav li a')
  }

  /** Painéis de conteúdo das abas */
  get paineisDeAba() {
    return cy.get('[id^="tabs"] .ui-tabs-panel')
  }

  /** Painel de aba atualmente visível */
  get painelDeAbaAtivo() {
    return cy.get('[id^="tabs"] .ui-tabs-panel:visible')
  }

  // ===========================================================================
  // AÇÕES — Acordeão
  // ===========================================================================

  /** Acessa a página de Acordeão e Abas */
  acessar() {
    cy.acessarPagina('/demo-site/accordion-and-tabs/')
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
