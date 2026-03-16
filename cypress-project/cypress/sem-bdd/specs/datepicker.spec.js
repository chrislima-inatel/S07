/**
 * Testes sem BDD — Seletor de Data (DatePicker)
 * URL: https://www.globalsqa.com/demoSite/practice/datepicker/default.html
 *
 * A página /demo-site/datepicker/ passou a usar iframes para o conteúdo.
 * O componente jQuery UI DatePicker está disponível diretamente na URL de prática.
 *
 * Estrutura da página:
 *  - #datepicker             → campo de input que abre o calendário ao clicar
 *  - #ui-datepicker-div      → contêiner flutuante do calendário
 *  - .ui-datepicker-title    → cabeçalho com mês e ano
 *  - .ui-datepicker-prev     → botão para ir ao mês anterior
 *  - .ui-datepicker-next     → botão para ir ao próximo mês
 *  - .ui-datepicker-calendar → tabela de dias
 */
describe('Seletor de Data (DatePicker)', () => {
  beforeEach(() => {
    cy.visit('/demoSite/practice/datepicker/default.html')
    cy.get('#datepicker').should('exist')
  })

  // ---------------------------------------------------------------------------
  context('Abertura do calendário', () => {
    it('deve abrir o calendário ao clicar no campo de input', () => {
      cy.get('#datepicker').click()
      cy.get('#ui-datepicker-div').should('be.visible')
    })

    it('deve fechar o calendário ao selecionar uma data', () => {
      cy.get('#datepicker').click()
      cy.get('.ui-datepicker-calendar td:not(.ui-datepicker-unselectable) a').first().click()
      cy.get('#ui-datepicker-div').should('not.be.visible')
    })

    it('deve preencher o campo com a data selecionada', () => {
      cy.get('#datepicker').click()
      cy.get('.ui-datepicker-calendar td:not(.ui-datepicker-unselectable) a')
        .contains('15')
        .click()
      cy.get('#datepicker').should('not.have.value', '')
    })
  })

  // ---------------------------------------------------------------------------
  context('Navegação pelo calendário', () => {
    beforeEach(() => {
      cy.get('#datepicker').click()
      cy.get('#ui-datepicker-div').should('be.visible')
    })

    it('deve navegar para o próximo mês ao clicar no botão de avançar', () => {
      cy.get('.ui-datepicker-title').invoke('text').then((cabecalhoAtual) => {
        cy.get('.ui-datepicker-next').click()
        cy.get('.ui-datepicker-title').invoke('text').should('not.equal', cabecalhoAtual)
      })
    })

    it('deve navegar para o mês anterior ao clicar no botão de voltar', () => {
      cy.get('.ui-datepicker-title').invoke('text').then((cabecalhoAtual) => {
        cy.get('.ui-datepicker-prev').click()
        cy.get('.ui-datepicker-title').invoke('text').should('not.equal', cabecalhoAtual)
      })
    })

    it('deve exibir dias disponíveis para seleção no calendário', () => {
      cy.get('.ui-datepicker-calendar td:not(.ui-datepicker-unselectable) a')
        .should('have.length.greaterThan', 0)
    })
  })
})
