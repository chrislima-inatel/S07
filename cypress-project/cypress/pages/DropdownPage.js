/**
 * Page Object — Página de Menu Suspenso (Select Dropdown)
 * URL: https://www.globalsqa.com/demo-site/select-dropdown-menu/
 *
 * A página contém um elemento <select> HTML padrão com ~125 países.
 * O Cypress interage com ele usando cy.select() nativamente.
 *
 * Seletor atualizado: id="country" foi removido do <select>.
 * Usar cy.get('select') para localizar o elemento.
 */
class DropdownPage {
  // ===========================================================================
  // SELETORES (Getters)
  // ===========================================================================

  /** Elemento <select> de países (id="country" foi removido do HTML) */
  get seletorPais() {
    return cy.get('select')
  }

  /** Label associada ao dropdown */
  get labelDropdown() {
    return cy.get('label[for="country"]')
  }

  // ===========================================================================
  // AÇÕES
  // ===========================================================================

  /** Acessa a página de Menu Suspenso */
  acessar() {
    cy.acessarPagina('/demo-site/select-dropdown-menu/')
  }

  /**
   * Seleciona um país pelo texto visível no dropdown
   * @param {string} pais - Nome do país exatamente como exibido, ex: 'Brazil'
   */
  selecionarPais(pais) {
    this.seletorPais.select(pais)
  }

  /**
   * Seleciona uma opção pelo valor (atributo value)
   * @param {string} valor - Valor do atributo value da opção
   */
  selecionarPorValor(valor) {
    this.seletorPais.select(valor)
  }

  // ===========================================================================
  // VERIFICAÇÕES
  // ===========================================================================

  /**
   * Verifica se o país selecionado é o esperado
   * @param {string} pais - Nome do país esperado
   */
  verificarPaisSelecionado(pais) {
    this.seletorPais.find('option:selected').should('have.text', pais)
  }

  /**
   * Verifica a quantidade total de opções disponíveis no dropdown
   * @param {number} quantidade - Número esperado de opções (incluindo opção vazia)
   */
  verificarQuantidadeDeOpcoes(quantidade) {
    this.seletorPais.find('option').should('have.length', quantidade)
  }

  /**
   * Verifica se o dropdown contém um país específico nas opções
   * @param {string} pais - Nome do país a verificar
   */
  verificarPaisExisteNasOpcoes(pais) {
    this.seletorPais.contains('option', pais).should('exist')
  }

  /** Verifica se nenhuma opção está selecionada (valor vazio) */
  verificarSemSelecao() {
    this.seletorPais.should('have.value', '')
  }
}

export default new DropdownPage()
