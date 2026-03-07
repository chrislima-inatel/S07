/**
 * Testes sem BDD — Menu Suspenso (Dropdown)
 * URL: https://www.globalsqa.com/demo-site/select-dropdown-menu/
 *
 * Abordagem: Page Object Model (POM)
 *
 * A página contém um elemento <select> HTML nativo com ~250 países.
 * O Cypress interage com selects usando cy.select().
 */
import DropdownPage from '../../pages/DropdownPage'

describe('Menu Suspenso de Países', () => {
  beforeEach(() => {
    DropdownPage.acessar()
  })

  // ---------------------------------------------------------------------------
  context('Carregamento inicial', () => {
    it('deve exibir o dropdown na página', () => {
      DropdownPage.seletorPais.should('be.visible')
    })

    it('deve ter mais de 200 países disponíveis', () => {
      // O select tem ~250 países + 1 opção vazia
      DropdownPage.seletorPais.find('option').should('have.length.greaterThan', 200)
    })
  })

  // ---------------------------------------------------------------------------
  context('Seleção de países', () => {
    it('deve selecionar o Brasil no dropdown', () => {
      DropdownPage.selecionarPais('Brazil')
      DropdownPage.verificarPaisSelecionado('Brazil')
    })

    it('deve selecionar a Argentina no dropdown', () => {
      DropdownPage.selecionarPais('Argentina')
      DropdownPage.verificarPaisSelecionado('Argentina')
    })

    it('deve selecionar Portugal no dropdown', () => {
      DropdownPage.selecionarPais('Portugal')
      DropdownPage.verificarPaisSelecionado('Portugal')
    })

    it('deve permitir trocar de país selecionado', () => {
      // Seleciona o primeiro país
      DropdownPage.selecionarPais('Brazil')
      DropdownPage.verificarPaisSelecionado('Brazil')

      // Troca para outro país
      DropdownPage.selecionarPais('Argentina')
      DropdownPage.verificarPaisSelecionado('Argentina')
    })
  })

  // ---------------------------------------------------------------------------
  context('Verificação de opções disponíveis', () => {
    it('deve conter o Brasil nas opções', () => {
      DropdownPage.verificarPaisExisteNasOpcoes('Brazil')
    })

    it('deve conter os EUA nas opções', () => {
      DropdownPage.verificarPaisExisteNasOpcoes('United States')
    })

    it('deve conter Portugal nas opções', () => {
      DropdownPage.verificarPaisExisteNasOpcoes('Portugal')
    })
  })

  // ---------------------------------------------------------------------------
  context('Comportamento do elemento select', () => {
    it('deve ser um elemento select HTML válido', () => {
      DropdownPage.seletorPais.should('have.prop', 'tagName', 'SELECT')
    })

    it('deve manter a seleção após a interação', () => {
      DropdownPage.selecionarPais('Brazil')
      // Rola a página e verifica que a seleção persiste
      cy.scrollTo('bottom')
      cy.scrollTo('top')
      DropdownPage.verificarPaisSelecionado('Brazil')
    })
  })
})
