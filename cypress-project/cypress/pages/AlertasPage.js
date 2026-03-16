/**
 * Page Object — Página de Caixas de Alerta (Alert Box)
 * URL: https://www.globalsqa.com/demo-site/alertbox/
 *
 * A página usa o plugin easyResponsiveTabs (em vez do Bootstrap tabs original)
 * para separar os três tipos de alerta:
 * 1. Alert (alerta simples)    → chama myFunctionTab1()
 * 2. Confirm (confirmação)     → chama myFunctionTab2(), escreve resultado em #demo
 * 3. Prompt (entrada de texto) → chama myFunctionTab3(), escreve resultado em #demo1
 *
 * ATENÇÃO: #demo e #demo1 foram removidos do HTML da página. São injetados via
 * cy.document() antes de acionar o botão para que as funções JS possam escrever
 * o resultado.
 */
class AlertasPage {
  // ===========================================================================
  // SELETORES (Getters)
  // ===========================================================================

  /** Links das abas de tipo de alerta (Alert / Confirm / Prompt) */
  get linksDeAba() {
    return cy.get('.resp-tabs-list li')
  }

  /** Botão "Try it" dentro da aba ativa */
  get botaoTentar() {
    return cy.get('.resp-tab-content-active button').first()
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

  /**
   * Aciona a função de alerta da aba ativa.
   *
   * Invoca diretamente a função de window (myFunctionTab1/2/3) em vez de
   * clicar no botão, pois o clique pode não acionar a função correta
   * dependendo da estrutura atual da página.
   *
   * Injeta #demo e #demo1 antes de invocar, pois esses elementos foram
   * removidos do HTML da página e são necessários para myFunctionTab2/3
   * escreverem o resultado.
   */
  clicarTentar() {
    cy.document().then((doc) => {
      if (!doc.getElementById('demo')) {
        const el = doc.createElement('p')
        el.id = 'demo'
        doc.body.appendChild(el)
      }
      if (!doc.getElementById('demo1')) {
        const el = doc.createElement('p')
        el.id = 'demo1'
        doc.body.appendChild(el)
      }
    })
    // Invoca a função correspondente à aba ativa (0=Tab1, 1=Tab2, 2=Tab3)
    cy.get('.resp-tabs-list li.resp-tab-active').then(($tab) => {
      const idx = $tab.index()
      cy.window().invoke(`myFunctionTab${idx + 1}`)
    })
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
