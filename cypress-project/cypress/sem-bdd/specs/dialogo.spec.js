/**
 * Testes sem BDD — Página de Caixa de Diálogo (Dialog Box)
 * URL: https://www.globalsqa.com/demo-site/dialog-box/
 *
 * Abordagem: Page Object Model (POM)
 *
 * CONCEITO IMPORTANTE — Modais vs Alertas nativos:
 * Diferentemente de alert()/confirm(), o Dialog Box é um componente
 * HTML renderizado na própria página com jQuery UI Dialog.
 * Podemos inspecionar e interagir com ele diretamente pelo DOM.
 */
import DialogoPage from '../../pages/DialogoPage'

describe('Caixa de Diálogo (Modal)', () => {
  beforeEach(() => {
    DialogoPage.acessar()
  })

  // ---------------------------------------------------------------------------
  context('Estado inicial', () => {
    it('deve carregar a página sem o diálogo aberto', () => {
      // O diálogo não deve existir no DOM inicialmente
      cy.get('.ui-dialog').should('not.exist')
    })
  })

  // ---------------------------------------------------------------------------
  context('Abrindo o diálogo', () => {
    it('deve abrir o diálogo ao clicar no botão', () => {
      DialogoPage.abrirDialogo()
      DialogoPage.verificarDialogoVisivel()
    })

    it('deve exibir o overlay de fundo ao abrir o diálogo', () => {
      DialogoPage.abrirDialogo()
      DialogoPage.verificarOverlayVisivel()
    })

    it('deve exibir conteúdo dentro do diálogo', () => {
      DialogoPage.abrirDialogo()
      DialogoPage.conteudoDialogo.should('not.be.empty')
    })
  })

  // ---------------------------------------------------------------------------
  context('Fechando o diálogo', () => {
    beforeEach(() => {
      // Abre o diálogo antes de cada teste deste contexto
      DialogoPage.abrirDialogo()
      DialogoPage.verificarDialogoVisivel()
    })

    it('deve fechar o diálogo ao clicar no botão X', () => {
      DialogoPage.fecharDialogoPorX()
      DialogoPage.verificarDialogoOculto()
    })

    it('deve fechar o diálogo ao clicar no botão OK/Close', () => {
      DialogoPage.fecharDialogoPorBotao()
      DialogoPage.verificarDialogoOculto()
    })
  })

  // ---------------------------------------------------------------------------
  context('Ciclos de abertura e fechamento', () => {
    it('deve permitir abrir e fechar o diálogo múltiplas vezes', () => {
      // Primeiro ciclo
      DialogoPage.abrirDialogo()
      DialogoPage.verificarDialogoVisivel()
      DialogoPage.fecharDialogoPorX()
      DialogoPage.verificarDialogoOculto()

      // Segundo ciclo
      DialogoPage.abrirDialogo()
      DialogoPage.verificarDialogoVisivel()
      DialogoPage.fecharDialogoPorBotao()
      DialogoPage.verificarDialogoOculto()
    })
  })
})
