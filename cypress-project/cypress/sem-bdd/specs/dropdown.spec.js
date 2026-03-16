/**
 * Testes sem BDD — Menu Suspenso (Dropdown)
 * URL: https://www.globalsqa.com/demo-site/select-dropdown-menu/
 *
 * O elemento <select> não possui mais o atributo id="country".
 * A lista foi reduzida de ~250 para ~125 países.
 * Países confirmados: Brazil (BRA), Argentina (ARG), France (FRA).
 *
 * O Cypress interage com selects usando cy.select() — por texto visível ou valor.
 */
describe('Menu Suspenso de Países', () => {
  beforeEach(() => {
    cy.visit('/demo-site/select-dropdown-menu/')
    cy.get('select').should('be.visible')
  })

  // ---------------------------------------------------------------------------
  context('Carregamento inicial', () => {
    it('deve exibir o dropdown na página', () => {
      cy.get('select').should('be.visible')
    })

    it('deve ter mais de 100 países disponíveis', () => {
      cy.get('select option').should('have.length.greaterThan', 100)
    })

    it('deve ser um elemento select HTML válido', () => {
      cy.get('select').should('have.prop', 'tagName', 'SELECT')
    })
  })

  // ---------------------------------------------------------------------------
  context('Seleção de países', () => {
    it('deve selecionar o Brasil no dropdown', () => {
      cy.get('select').select('Brazil')
      cy.get('select option:selected').should('have.text', 'Brazil')
    })

    it('deve selecionar a Argentina no dropdown', () => {
      cy.get('select').select('Argentina')
      cy.get('select option:selected').should('have.text', 'Argentina')
    })

    it('deve selecionar a França no dropdown', () => {
      cy.get('select').select('France')
      cy.get('select option:selected').should('have.text', 'France')
    })

    it('deve permitir trocar de país selecionado', () => {
      cy.get('select').select('Brazil')
      cy.get('select option:selected').should('have.text', 'Brazil')

      cy.get('select').select('Argentina')
      cy.get('select option:selected').should('have.text', 'Argentina')
    })
  })

  // ---------------------------------------------------------------------------
  context('Verificação de opções disponíveis', () => {
    it('deve conter o Brasil nas opções (por valor)', () => {
      cy.get('select option[value="BRA"]').should('exist')
    })

    it('deve conter a Argentina nas opções (por valor)', () => {
      cy.get('select option[value="ARG"]').should('exist')
    })

    it('deve manter a seleção após rolar a página', () => {
      cy.get('select').select('Brazil')
      cy.scrollTo('bottom')
      cy.scrollTo('top')
      cy.get('select option:selected').should('have.text', 'Brazil')
    })
  })
})
