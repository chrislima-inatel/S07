/**
 * Page Object — Página de Caixa de Diálogo (Dialog Box)
 * URL: https://www.globalsqa.com/demo-site/dialog-box/
 *
 * O site usa jQuery UI Dialog para exibir modais.
 * O diálogo é um componente HTML (não um alerta nativo do browser).
 */
class DialogoPage {
  // ===========================================================================
  // SELETORES (Getters)
  // ===========================================================================

  /** Botão que abre o diálogo modal */
  get botaoAbrirDialogo() {
    return cy.get('#dialog-opener, button').filter(':contains("Open Dialog"), :contains("Try it")').first()
  }

  /** Contêiner do diálogo modal (jQuery UI) */
  get dialogo() {
    return cy.get('.ui-dialog')
  }

  /** Área de conteúdo do diálogo */
  get conteudoDialogo() {
    return cy.get('.ui-dialog-content')
  }

  /** Botão X de fechar no cabeçalho do diálogo */
  get botaoFecharX() {
    return cy.get('.ui-dialog-titlebar-close')
  }

  /** Botão "OK" ou "Close" no rodapé do diálogo */
  get botaoOkDialogo() {
    return cy.get('.ui-dialog-buttonset button').first()
  }

  /** Sobreposição (overlay) de fundo do diálogo */
  get overlay() {
    return cy.get('.ui-widget-overlay')
  }

  /** Título do diálogo na barra de título */
  get tituloDialogo() {
    return cy.get('.ui-dialog-title')
  }

  // ===========================================================================
  // AÇÕES
  // ===========================================================================

  /** Acessa a página de Caixa de Diálogo */
  acessar() {
    cy.acessarPagina('/demo-site/dialog-box/')
  }

  /** Clica no botão que abre o diálogo */
  abrirDialogo() {
    // Tenta o seletor genérico de botão na área de conteúdo do post
    cy.get('.entry-content button, #dialog-link, a[href="#"]:contains("Open")').first().click()
  }

  /** Fecha o diálogo pelo botão X no cabeçalho */
  fecharDialogoPorX() {
    this.botaoFecharX.click()
  }

  /** Fecha o diálogo pelo botão OK/Close no rodapé */
  fecharDialogoPorBotao() {
    this.botaoOkDialogo.click()
  }

  // ===========================================================================
  // VERIFICAÇÕES
  // ===========================================================================

  /** Verifica se o diálogo está visível */
  verificarDialogoVisivel() {
    this.dialogo.should('be.visible')
  }

  /** Verifica se o diálogo está oculto/fechado */
  verificarDialogoOculto() {
    this.dialogo.should('not.exist')
  }

  /** Verifica se o overlay está visível */
  verificarOverlayVisivel() {
    this.overlay.should('be.visible')
  }

  /**
   * Verifica se o conteúdo do diálogo contém o texto informado
   * @param {string} texto - Texto esperado dentro do diálogo
   */
  verificarConteudo(texto) {
    this.conteudoDialogo.should('contain.text', texto)
  }
}

export default new DialogoPage()
