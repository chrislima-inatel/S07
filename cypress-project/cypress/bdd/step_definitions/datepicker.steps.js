/**
 * Step Definitions — Seletor de Data (DatePicker)
 * Feature: cypress/bdd/features/datepicker/datepicker.feature
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import DatePickerPage from '../../pages/DatePickerPage'

// Variável para armazenar o mês capturado entre steps
let cabecalhoAnterior = ''

// =============================================================================
// QUANDO — Ações
// =============================================================================

When('clico no campo do primeiro DatePicker', () => {
  DatePickerPage.abrirPicker1()
})

When('seleciono o primeiro dia disponível no calendário', () => {
  cy.get('.ui-datepicker-calendar td:not(.ui-datepicker-unselectable) a').first().click()
})

When('anoto o mês atual do calendário', () => {
  cy.get('.ui-datepicker-title').invoke('text').then((texto) => {
    cabecalhoAnterior = texto
  })
})

When('clico no botão de próximo mês', () => {
  DatePickerPage.botaoProximoMes.click()
})

When('seleciono o dia {string} no calendário inline', (dia) => {
  DatePickerPage.selecionarDiaInline(dia)
})

// =============================================================================
// ENTÃO — Verificações
// =============================================================================

Then('o calendário deve estar visível', () => {
  DatePickerPage.verificarCalendarioVisivel()
})

Then('o calendário deve estar oculto', () => {
  DatePickerPage.verificarCalendarioOculto()
})

Then('o cabeçalho do calendário deve ter mudado', () => {
  cy.get('.ui-datepicker-title').invoke('text').should('not.equal', cabecalhoAnterior)
})

Then('o calendário inline deve estar visível', () => {
  DatePickerPage.calendarioInline.should('be.visible')
})

Then('o dia selecionado deve estar marcado no calendário inline', () => {
  cy.get('#datepicker3 .ui-datepicker-current-day').should('exist')
})

Then('o campo do primeiro DatePicker deve estar preenchido', () => {
  DatePickerPage.campoPicker1.should('not.have.value', '')
})
