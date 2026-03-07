/**
 * Comandos customizados do Cypress
 *
 * Comandos reutilizáveis que estendem o Cypress com funcionalidades
 * específicas para este projeto. São usados tanto nos testes sem BDD
 * quanto nos step definitions do BDD.
 *
 * Uso: cy.nomeDoComando()
 */

// =============================================================================
// NAVEGAÇÃO
// =============================================================================

/**
 * Acessa uma página do site GlobalSQA a partir do caminho relativo.
 *
 * @param {string} caminho - Caminho relativo, ex: '/demo-site/alertbox/'
 *
 * @example
 * cy.acessarPagina('/demo-site/alertbox/')
 */
Cypress.Commands.add('acessarPagina', (caminho) => {
  cy.visit(caminho)
  // Aguarda o carregamento completo da página
  cy.get('body').should('be.visible')
})

// =============================================================================
// IFRAME
// =============================================================================

/**
 * Acessa elementos dentro de um iframe e executa ações neles.
 * O Cypress não suporta iframes nativamente — este comando resolve isso.
 *
 * @param {string} seletorIframe - Seletor CSS do elemento <iframe>
 * @returns Cypress chainable com o body do iframe
 *
 * @example
 * cy.acessarIframe('#meuIframe').find('input').type('texto')
 */
Cypress.Commands.add('acessarIframe', (seletorIframe) => {
  return cy
    .get(seletorIframe)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
})

// =============================================================================
// DATEPICKER
// =============================================================================

/**
 * Navega o calendário do DatePicker até o mês/ano desejado e seleciona o dia.
 *
 * @param {string} mesAlvo  - Nome do mês em inglês, ex: 'March'
 * @param {string} anoAlvo  - Ano com 4 dígitos, ex: '2025'
 * @param {string} diaAlvo  - Número do dia, ex: '15'
 *
 * @example
 * cy.selecionarData('March', '2025', '15')
 */
Cypress.Commands.add('selecionarData', (mesAlvo, anoAlvo, diaAlvo) => {
  // Função auxiliar para obter o cabeçalho atual do calendário
  const obterCabecalho = () =>
    cy.get('.ui-datepicker-title').invoke('text')

  // Navega até o mês/ano correto
  const navegarAteData = () => {
    obterCabecalho().then((cabecalho) => {
      const cabecalhoAlvo = `${mesAlvo} ${anoAlvo}`
      if (!cabecalho.includes(cabecalhoAlvo)) {
        // Clica no botão "próximo mês" e tenta novamente
        cy.get('.ui-datepicker-next').click()
        navegarAteData()
      }
    })
  }

  navegarAteData()

  // Seleciona o dia desejado
  cy.get('.ui-datepicker-calendar td').not('.ui-datepicker-unselectable').within(() => {
    cy.contains('a', diaAlvo).click()
  })
})

// =============================================================================
// ALERTAS / DIÁLOGOS JAVASCRIPT
// =============================================================================

/**
 * Configura o Cypress para aceitar (OK) a próxima caixa de confirmação JavaScript.
 * Deve ser chamado ANTES da ação que dispara o confirm().
 *
 * @example
 * cy.aceitarConfirmacao()
 * cy.get('button').click()
 */
Cypress.Commands.add('aceitarConfirmacao', () => {
  cy.on('window:confirm', () => true)
})

/**
 * Configura o Cypress para cancelar a próxima caixa de confirmação JavaScript.
 * Deve ser chamado ANTES da ação que dispara o confirm().
 *
 * @example
 * cy.cancelarConfirmacao()
 * cy.get('button').click()
 */
Cypress.Commands.add('cancelarConfirmacao', () => {
  cy.on('window:confirm', () => false)
})

/**
 * Configura o Cypress para inserir um texto na próxima caixa de prompt JavaScript.
 * Deve ser chamado ANTES da ação que dispara o prompt().
 *
 * @param {string} texto - Texto a ser inserido no prompt
 *
 * @example
 * cy.responderPrompt('João Silva')
 * cy.get('button').click()
 */
Cypress.Commands.add('responderPrompt', (texto) => {
  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns(texto)
  })
})
