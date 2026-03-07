/**
 * Testes sem BDD — Seletor de Data (DatePicker)
 * URL: https://www.globalsqa.com/demo-site/datepicker/
 *
 * Abordagem: Page Object Model (POM)
 *
 * A página tem 3 DatePickers jQuery UI:
 * - Picker 1: Clique no input abre o calendário
 * - Picker 2: Clique no ícone de calendário abre o picker
 * - Picker 3: Calendário inline (sempre visível)
 */
import DatePickerPage from '../../pages/DatePickerPage'

describe('Seletor de Data (DatePicker)', () => {
  beforeEach(() => {
    DatePickerPage.acessar()
  })

  // ---------------------------------------------------------------------------
  context('DatePicker 1 — Abertura pelo input', () => {
    it('deve abrir o calendário ao clicar no campo de input', () => {
      DatePickerPage.abrirPicker1()
      DatePickerPage.verificarCalendarioVisivel()
    })

    it('deve fechar o calendário ao selecionar uma data', () => {
      DatePickerPage.abrirPicker1()
      // Seleciona qualquer dia disponível
      cy.get('.ui-datepicker-calendar td:not(.ui-datepicker-unselectable) a').first().click()
      DatePickerPage.verificarCalendarioOculto()
    })

    it('deve preencher o campo com a data selecionada', () => {
      DatePickerPage.abrirPicker1()

      // Captura o mês e ano atual exibido no calendário
      cy.get('.ui-datepicker-title').invoke('text').then((cabecalho) => {
        // Seleciona o dia 15
        cy.get('.ui-datepicker-calendar td:not(.ui-datepicker-unselectable) a')
          .contains('15')
          .click()

        // Verifica que o campo foi preenchido
        DatePickerPage.campoPicker1.should('not.have.value', '')
      })
    })
  })

  // ---------------------------------------------------------------------------
  context('DatePicker 1 — Navegação pelo calendário', () => {
    beforeEach(() => {
      DatePickerPage.abrirPicker1()
    })

    it('deve navegar para o próximo mês ao clicar no botão de avançar', () => {
      // Captura o cabeçalho atual
      cy.get('.ui-datepicker-title').invoke('text').then((cabecalhoAtual) => {
        // Clica em próximo mês
        DatePickerPage.botaoProximoMes.click()

        // Verifica que o cabeçalho mudou
        cy.get('.ui-datepicker-title').invoke('text').should('not.equal', cabecalhoAtual)
      })
    })

    it('deve navegar para o mês anterior ao clicar no botão de voltar', () => {
      cy.get('.ui-datepicker-title').invoke('text').then((cabecalhoAtual) => {
        DatePickerPage.botaoMesAnterior.click()
        cy.get('.ui-datepicker-title').invoke('text').should('not.equal', cabecalhoAtual)
      })
    })
  })

  // ---------------------------------------------------------------------------
  context('DatePicker 2 — Abertura pelo ícone', () => {
    it('deve abrir o calendário ao clicar no ícone de calendário', () => {
      DatePickerPage.abrirPicker2PorIcone()
      DatePickerPage.verificarCalendarioVisivel()
    })
  })

  // ---------------------------------------------------------------------------
  context('DatePicker 3 — Calendário inline', () => {
    it('deve exibir o calendário inline sem necessidade de clique', () => {
      DatePickerPage.calendarioInline.should('be.visible')
    })

    it('deve permitir selecionar um dia no calendário inline', () => {
      // Seleciona o dia 10 no calendário inline
      DatePickerPage.selecionarDiaInline('10')
      // Verifica que o dia foi marcado como selecionado
      cy.get('#datepicker3 .ui-datepicker-current-day').should('exist')
    })
  })
})
