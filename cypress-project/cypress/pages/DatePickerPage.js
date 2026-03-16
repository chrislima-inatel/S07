/**
 * Page Object — Página de Seletor de Data (DatePicker)
 * URL: https://www.globalsqa.com/demoSite/practice/datepicker/default.html
 *
 * A URL /demo-site/datepicker/ passou a usar iframes.
 * O componente jQuery UI DatePicker está acessível diretamente na página de prática.
 *
 * A página de prática possui apenas o DatePicker 1 (#datepicker).
 * DatePicker 2 e o calendário inline (#datepicker3) não estão disponíveis nesta URL.
 */
class DatePickerPage {
  // ===========================================================================
  // SELETORES — DatePicker 1 (via input)
  // ===========================================================================

  /** Campo de entrada do primeiro DatePicker */
  get campoPicker1() {
    return cy.get('#datepicker')
  }

  // ===========================================================================
  // SELETORES — DatePicker 2 (via ícone)
  // ===========================================================================

  /** Campo de entrada do segundo DatePicker */
  get campoPicker2() {
    return cy.get('#datepicker2')
  }

  /** Botão/ícone que abre o segundo DatePicker */
  get iconePicker2() {
    return cy.get('#ui-datepicker-div').prev('img'), cy.get('img.ui-datepicker-trigger').first()
  }

  // ===========================================================================
  // SELETORES — Calendário flutuante (compartilhado pelos pickers 1 e 2)
  // ===========================================================================

  /** Contêiner do calendário flutuante */
  get calendario() {
    return cy.get('#ui-datepicker-div')
  }

  /** Cabeçalho do calendário (mês + ano) */
  get cabecalhoCalendario() {
    return cy.get('.ui-datepicker-title')
  }

  /** Botão para ir ao mês anterior */
  get botaoMesAnterior() {
    return cy.get('.ui-datepicker-prev')
  }

  /** Botão para ir ao próximo mês */
  get botaoProximoMes() {
    return cy.get('.ui-datepicker-next')
  }

  /** Células de dias disponíveis para seleção */
  get diasDisponiveis() {
    return cy.get('.ui-datepicker-calendar td:not(.ui-datepicker-unselectable) a')
  }

  // ===========================================================================
  // SELETORES — DatePicker 3 (inline, sempre visível)
  // ===========================================================================

  /** Calendário inline (sempre exibido na página) */
  get calendarioInline() {
    return cy.get('#datepicker3')
  }

  /** Dias disponíveis no calendário inline */
  get diasDisponiveisInline() {
    return cy.get('#datepicker3 td:not(.ui-datepicker-unselectable) a')
  }

  // ===========================================================================
  // AÇÕES
  // ===========================================================================

  /** Acessa a página de Seletor de Data */
  acessar() {
    cy.acessarPagina('/demoSite/practice/datepicker/default.html')
  }

  /** Abre o primeiro DatePicker clicando no campo de input */
  abrirPicker1() {
    this.campoPicker1.click()
    this.calendario.should('be.visible')
  }

  /** Abre o segundo DatePicker clicando no ícone */
  abrirPicker2PorIcone() {
    cy.get('img.ui-datepicker-trigger').first().click()
    this.calendario.should('be.visible')
  }

  /**
   * Seleciona uma data no calendário flutuante (picker 1 ou 2)
   * @param {string} mesAlvo  - Nome do mês em inglês, ex: 'March'
   * @param {string} anoAlvo  - Ano com 4 dígitos, ex: '2025'
   * @param {string} diaAlvo  - Número do dia, ex: '15'
   */
  selecionarData(mesAlvo, anoAlvo, diaAlvo) {
    cy.selecionarData(mesAlvo, anoAlvo, diaAlvo)
  }

  /**
   * Seleciona um dia no calendário inline pelo número
   * @param {string} dia - Número do dia, ex: '10'
   */
  selecionarDiaInline(dia) {
    cy.get('#datepicker3 td:not(.ui-datepicker-unselectable) a').contains(dia).click()
  }

  // ===========================================================================
  // VERIFICAÇÕES
  // ===========================================================================

  /**
   * Verifica se o campo do picker 1 contém a data selecionada
   * @param {string} dataFormatada - Data no formato MM/DD/YYYY
   */
  verificarDataSelecionadaPicker1(dataFormatada) {
    this.campoPicker1.should('have.value', dataFormatada)
  }

  /**
   * Verifica se o campo do picker 2 contém a data selecionada
   * @param {string} dataFormatada - Data no formato MM/DD/YYYY
   */
  verificarDataSelecionadaPicker2(dataFormatada) {
    this.campoPicker2.should('have.value', dataFormatada)
  }

  /** Verifica se o calendário está visível */
  verificarCalendarioVisivel() {
    this.calendario.should('be.visible')
  }

  /** Verifica se o calendário está oculto */
  verificarCalendarioOculto() {
    this.calendario.should('not.be.visible')
  }

  /**
   * Verifica se o cabeçalho do calendário exibe o mês e ano corretos
   * @param {string} mes - Nome do mês em inglês
   * @param {string} ano - Ano com 4 dígitos
   */
  verificarMesAnoNoCalendario(mes, ano) {
    this.cabecalhoCalendario.should('contain.text', mes).and('contain.text', ano)
  }
}

export default new DatePickerPage()
