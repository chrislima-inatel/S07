/**
 * Testes sem BDD — Página de Caixas de Alerta (Alert Box)
 * URL: https://www.globalsqa.com/demo-site/alertbox/
 *
 * Abordagem: Page Object Model (POM)
 *
 * CONCEITO IMPORTANTE — Tratamento de alertas no Cypress:
 * O Cypress automaticamente aceita (dismiss) alertas nativos do browser.
 * Para capturar o texto do alerta, usamos cy.on('window:alert', callback).
 * Para controlar confirm (OK/Cancel), usamos cy.on('window:confirm', () => bool).
 * Para responder ao prompt, usamos cy.stub(win, 'prompt').returns(valor).
 */
import AlertasPage from '../../pages/AlertasPage'

describe('Caixas de Alerta JavaScript', () => {
  beforeEach(() => {
    AlertasPage.acessar()
  })

  // ---------------------------------------------------------------------------
  context('Alerta Simples (Alert)', () => {
    it('deve exibir uma caixa de alerta com a mensagem correta', () => {
      // Configura o listener ANTES de disparar a ação
      cy.on('window:alert', (mensagem) => {
        // Verifica que a mensagem do alerta é a esperada
        expect(mensagem).to.include('I am an alert box!')
      })

      // Aba 0 = Alert (já é a padrão, mas garantimos)
      AlertasPage.clicarAba(0)
      AlertasPage.clicarTentar()
    })
  })

  // ---------------------------------------------------------------------------
  context('Caixa de Confirmação (Confirm)', () => {
    beforeEach(() => {
      // Navega para a aba de Confirmação
      AlertasPage.clicarAba(1)
    })

    it('deve exibir "You pressed OK!" ao aceitar a confirmação', () => {
      AlertasPage.clicarTentarEAceitar()
      AlertasPage.verificarResultadoConfirmacao('You pressed OK!')
    })

    it('deve exibir "You pressed Cancel!" ao cancelar a confirmação', () => {
      AlertasPage.clicarTentarECancelar()
      AlertasPage.verificarResultadoConfirmacao('You pressed Cancel!')
    })
  })

  // ---------------------------------------------------------------------------
  context('Caixa de Prompt (Prompt)', () => {
    beforeEach(() => {
      // Navega para a aba de Prompt
      AlertasPage.clicarAba(2)
    })

    it('deve saudar o usuário com o nome informado no prompt', () => {
      const nome = 'João'
      AlertasPage.clicarTentarEResponderPrompt(nome)
      // Verifica que o elemento de resultado exibe a saudação com o nome
      AlertasPage.verificarResultadoPrompt(`Hello ${nome}`)
    })

    it('deve exibir saudação ao usar o valor padrão do prompt', () => {
      AlertasPage.clicarTentarEResponderPrompt('Harry Potter')
      AlertasPage.verificarResultadoPrompt('Hello Harry Potter')
    })
  })
})
