/**
 * Step Definitions — Acordeão e Abas
 * Feature: cypress/bdd/features/acordeao/acordeao.feature
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import AcordeaoPage from '../../pages/AcordeaoPage'

// Variável para capturar o texto inicial da aba ativa
let textoAbaInicial = ''

// =============================================================================
// QUANDO — Ações
// =============================================================================

When('clico no cabeçalho de acordeão de índice {int}', (indice) => {
  AcordeaoPage.clicarCabecalhoAcordeao(indice)
})

When('clico na aba de índice {int} do componente de abas', (indice) => {
  // Captura o texto atual antes de clicar
  AcordeaoPage.painelDeAbaAtivo.invoke('text').then((texto) => {
    textoAbaInicial = texto
  })
  AcordeaoPage.clicarAba(indice)
})

// =============================================================================
// ENTÃO — Verificações (Acordeão)
// =============================================================================

Then('o acordeão deve ter pelo menos {int} seções', (quantidade) => {
  AcordeaoPage.cabecalhosAcordeao.should('have.length.at.least', quantidade)
})

Then('a seção de acordeão de índice {int} deve estar aberta', (indice) => {
  AcordeaoPage.verificarPainelAberto(indice)
})

Then('a seção de acordeão de índice {int} deve estar fechada', (indice) => {
  AcordeaoPage.verificarPainelFechado(indice)
})

Then('a seção aberta do acordeão deve ter conteúdo', () => {
  AcordeaoPage.painelAcordeaoAberto.should('not.be.empty')
})

// =============================================================================
// ENTÃO — Verificações (Abas)
// =============================================================================

Then('o conteúdo da aba ativa deve ter mudado', () => {
  AcordeaoPage.painelDeAbaAtivo.invoke('text').should('not.equal', textoAbaInicial)
})
