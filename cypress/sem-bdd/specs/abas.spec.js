/**
 * Testes sem BDD — Página de Abas (Tabs)
 * URL: https://www.globalsqa.com/demo-site/tabs/
 *
 * Abordagem: Page Object Model (POM)
 * Os testes verificam o comportamento das abas jQuery UI:
 * - Aba padrão selecionada ao carregar a página
 * - Troca de aba ao clicar
 * - Conteúdo correspondente exibido/oculto
 */
import AbasPage from '../../pages/AbasPage'

describe('Página de Abas', () => {
  // Executa antes de cada teste: acessa a página
  beforeEach(() => {
    AbasPage.acessar()
  })

  // ---------------------------------------------------------------------------
  context('Carregamento inicial', () => {
    it('deve exibir a primeira aba ativa por padrão', () => {
      AbasPage.verificarAbaAtiva(0)
    })

    it('deve exibir o conteúdo da primeira aba por padrão', () => {
      AbasPage.painelAtivo.should('be.visible')
    })

    it('deve ter exatamente 3 abas disponíveis', () => {
      AbasPage.itensDeAba.should('have.length', 3)
    })
  })

  // ---------------------------------------------------------------------------
  context('Navegação entre abas', () => {
    it('deve ativar a segunda aba ao clicar nela', () => {
      AbasPage.clicarAba(1)
      AbasPage.verificarAbaAtiva(1)
    })

    it('deve ativar a terceira aba ao clicar nela', () => {
      AbasPage.clicarAba(2)
      AbasPage.verificarAbaAtiva(2)
    })

    it('deve voltar para a primeira aba ao clicar nela', () => {
      // Navega para a terceira aba primeiro
      AbasPage.clicarAba(2)
      // Volta para a primeira
      AbasPage.clicarAba(0)
      AbasPage.verificarAbaAtiva(0)
    })
  })

  // ---------------------------------------------------------------------------
  context('Conteúdo das abas', () => {
    it('deve ocultar o conteúdo das abas inativas ao trocar de aba', () => {
      // Clica na segunda aba
      AbasPage.clicarAba(1)
      // O painel da primeira aba (índice 0) deve estar oculto
      AbasPage.verificarPainelOculto(0)
    })

    it('deve exibir conteúdo diferente em cada aba', () => {
      let textoPrimeiraAba = ''

      // Captura o texto da primeira aba
      AbasPage.painelAtivo.invoke('text').then((texto) => {
        textoPrimeiraAba = texto
      })

      // Clica na segunda aba
      AbasPage.clicarAba(1)

      // Verifica que o conteúdo é diferente
      AbasPage.painelAtivo.invoke('text').should((textoSegundaAba) => {
        expect(textoSegundaAba).not.to.equal(textoPrimeiraAba)
      })
    })
  })
})
