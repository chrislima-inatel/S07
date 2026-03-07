/**
 * Page Object — Página de Caixas de Alerta (Alert Box)
 * URL: https://www.globalsqa.com/demo-site/alertbox/
 *
 * O site usa Bootstrap tabs para separar os três tipos de alerta:
 * 1. Alert (alerta simples)
 * 2. Confirm (confirmação com OK/Cancelar)
 * 3. Prompt (caixa com entrada de texto)
 */
class AlertasPage {
  // ===========================================================================
  // SELETORES (Getters)
  // ===========================================================================

  /** Links das abas de tipo de alerta (Alert / Confirm / Prompt) */
  get linksDeAba() {
    return cy.get('.nav-tabs .nav-link')
  }

  /** Botão "Try it" dentro da aba ativa */
  get botaoTentar() {
    return cy.get('.tab-pane.active').find('button').first()
  }

  /** Elemento que exibe o resultado da confirmação (#demo) */
  get elementoResultadoConfirmacao() {
    return cy.get('#demo')
  }

  /** Elemento que exibe o resultado do prompt (#demo1) */
  get elementoResultadoPrompt() {
    return cy.get('#demo1')
  }

  // ===========================================================================
  // AÇÕES
  // ===========================================================================

  /** Acessa a página de Alertas */
  acessar() {
    cy.acessarPagina('/demo-site/alertbox/')
  }

  /**
   * Clica em uma das abas de tipo de alerta
   * @param {number} indice - 0 = Alert, 1 = Confirm, 2 = Prompt
   */
  clicarAba(indice) {
    this.linksDeAba.eq(indice).click()
  }

  /** Clica no botão "Try it" da aba ativa */
  clicarTentar() {
    this.botaoTentar.click()
  }

  /**
   * Clica em "Try it" e trata o alert simples (dismiss automático pelo Cypress)
   * @param {Function} callback - Função que recebe o texto do alerta
   */
  clicarTentarECapturarAlerta(callback) {
    cy.on('window:alert', callback)
    this.clicarTentar()
  }

  /** Clica em "Try it" e aceita a caixa de confirmação */
  clicarTentarEAceitar() {
    cy.on('window:confirm', () => true)
    this.clicarTentar()
  }

  /** Clica em "Try it" e cancela a caixa de confirmação */
  clicarTentarECancelar() {
    cy.on('window:confirm', () => false)
    this.clicarTentar()
  }

  /**
   * Clica em "Try it" e responde ao prompt com o texto informado
   * @param {string} texto - Texto a ser digitado no prompt
   */
  clicarTentarEResponderPrompt(texto) {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(texto)
    })
    this.clicarTentar()
  }

  // ===========================================================================
  // VERIFICAÇÕES
  // ===========================================================================

  /**
   * Verifica o texto exibido após interagir com a confirmação
   * @param {string} mensagem - Mensagem esperada no elemento de resultado
   */
  verificarResultadoConfirmacao(mensagem) {
    this.elementoResultadoConfirmacao.should('contain.text', mensagem)
  }

  /**
   * Verifica o texto exibido após interagir com o prompt
   * @param {string} mensagem - Mensagem esperada no elemento de resultado
   */
  verificarResultadoPrompt(mensagem) {
    this.elementoResultadoPrompt.should('contain.text', mensagem)
  }
}

export default new AlertasPage()
