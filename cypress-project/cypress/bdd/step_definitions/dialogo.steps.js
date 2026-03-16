/**
 * Step Definitions — Caixa de Diálogo Modal
 * Feature: cypress/bdd/features/dialogo/dialogo.feature
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import DialogoPage from '../../pages/DialogoPage'

// =============================================================================
// QUANDO — Ações
// =============================================================================

When('abro o diálogo', () => {
  DialogoPage.abrirDialogo()
})

When('fecho o diálogo pelo botão X', () => {
  DialogoPage.fecharDialogoPorX()
})

When('fecho o diálogo pelo botão OK', () => {
  DialogoPage.fecharDialogoPorBotao()
})

// =============================================================================
// ENTÃO — Verificações
// =============================================================================

Then('o diálogo deve estar visível', () => {
  DialogoPage.verificarDialogoVisivel()
})

Then('o diálogo não deve estar visível', () => {
  DialogoPage.verificarDialogoOculto()
})

Then('o overlay de fundo deve estar presente', () => {
  DialogoPage.verificarOverlayPresente()
})

Then('o diálogo deve conter o texto {string}', (texto) => {
  DialogoPage.verificarConteudo(texto)
})
