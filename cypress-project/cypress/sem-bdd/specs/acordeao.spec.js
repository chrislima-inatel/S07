/**
 * Testes sem BDD — Acordeão e Abas (Accordion & Tabs)
 * URL: https://www.globalsqa.com/demo-site/accordion-and-tabs/
 *
 * Abordagem: Page Object Model (POM)
 *
 * A página contém dois componentes jQuery UI:
 * 1. Acordeão: seções que expandem/recolhem ao clicar no cabeçalho
 * 2. Abas: alternância de conteúdo por clique na aba
 */
import AcordeaoPage from '../../pages/AcordeaoPage'

describe('Acordeão e Abas', () => {
  beforeEach(() => {
    AcordeaoPage.acessar()
  })

  // ---------------------------------------------------------------------------
  context('Acordeão — Carregamento inicial', () => {
    it('deve ter pelo menos 2 seções de acordeão', () => {
      AcordeaoPage.cabecalhosAcordeao.should('have.length.at.least', 2)
    })

    it('deve ter a primeira seção expandida por padrão', () => {
      // O jQuery UI Accordion abre a primeira seção por padrão
      AcordeaoPage.verificarPainelAberto(0)
    })
  })

  // ---------------------------------------------------------------------------
  context('Acordeão — Expandir e recolher seções', () => {
    it('deve expandir a segunda seção ao clicar no seu cabeçalho', () => {
      AcordeaoPage.clicarCabecalhoAcordeao(1)
      AcordeaoPage.verificarPainelAberto(1)
    })

    it('deve recolher a primeira seção ao expandir a segunda', () => {
      // O acordeão padrão do jQuery UI permite apenas 1 seção aberta por vez
      AcordeaoPage.clicarCabecalhoAcordeao(1)
      AcordeaoPage.verificarPainelFechado(0)
    })

    it('deve exibir conteúdo no painel expandido', () => {
      AcordeaoPage.clicarCabecalhoAcordeao(1)
      AcordeaoPage.painelAcordeaoAberto.should('not.be.empty')
    })
  })

  // ---------------------------------------------------------------------------
  context('Acordeão — Alternância entre seções', () => {
    it('deve expandir a terceira seção ao clicar nela', () => {
      AcordeaoPage.cabecalhosAcordeao.then(($headers) => {
        if ($headers.length >= 3) {
          AcordeaoPage.clicarCabecalhoAcordeao(2)
          AcordeaoPage.verificarPainelAberto(2)
        } else {
          cy.log('Menos de 3 seções — pulando este cenário')
        }
      })
    })

    it('deve permitir navegar entre todas as seções do acordeão', () => {
      AcordeaoPage.cabecalhosAcordeao.then(($headers) => {
        const totalSecoes = $headers.length

        // Clica em cada cabeçalho e verifica que o painel correspondente abre
        for (let i = 0; i < totalSecoes; i++) {
          AcordeaoPage.clicarCabecalhoAcordeao(i)
          AcordeaoPage.verificarPainelAberto(i)
        }
      })
    })
  })

  // ---------------------------------------------------------------------------
  context('Abas — Navegação', () => {
    it('deve ter pelo menos 2 abas disponíveis', () => {
      AcordeaoPage.linksDeAba.should('have.length.at.least', 2)
    })

    it('deve trocar o conteúdo visível ao clicar na segunda aba', () => {
      // Captura o texto da aba ativa inicial
      AcordeaoPage.painelDeAbaAtivo.invoke('text').then((textoInicial) => {
        // Clica na segunda aba
        AcordeaoPage.clicarAba(1)
        // Verifica que o conteúdo mudou
        AcordeaoPage.painelDeAbaAtivo.invoke('text').should('not.equal', textoInicial)
      })
    })
  })
})
