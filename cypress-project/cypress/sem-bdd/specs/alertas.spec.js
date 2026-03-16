/**
 * Testes sem BDD — Caixas de Alerta JavaScript
 * URL: https://www.globalsqa.com/demo-site/alertbox/
 *
 * A página usa o widget .newtabs (easyResponsiveTabs) para separar os três tipos:
 *  - "Simple Alert Box"   → myFunctionTab1() → alert()
 *  - "Confirmation Box"   → myFunctionTab2() → confirm()
 *  - "Prompt Box"         → myFunctionTab3() → prompt()
 *
 * As funções são globais (window.myFunctionTabN) e chamadas diretamente.
 * Os elementos #demo e #demo1 foram removidos da página; são injetados
 * no DOM antes de cada teste que precisa verificar o resultado.
 *
 * NOTA: O handler Cypress.on('uncaught:exception', () => false) em e2e.js
 * evita falhas causadas por erros JS do site que não impactam o teste.
 */
describe('Caixas de Alerta JavaScript', () => {
  beforeEach(() => {
    cy.visit('/demo-site/alertbox/')
    // Aguarda o plugin de abas inicializar
    cy.get('.resp-tab-item').should('exist')
  })

  // ---------------------------------------------------------------------------
  context('Estrutura da Página', () => {
    it('deve exibir 3 abas de tipo de alerta', () => {
      cy.get('.resp-tabs-list li').should('have.length', 3)
    })

    it('deve ter a primeira aba ativa por padrão', () => {
      cy.get('.resp-tabs-list li').first().should('have.class', 'resp-tab-active')
    })
  })

  // ---------------------------------------------------------------------------
  context('Alerta Simples (Alert)', () => {
    it('deve exibir uma caixa de alerta com a mensagem correta', () => {
      cy.on('window:alert', (mensagem) => {
        expect(mensagem).to.include('Welcome to GlobalSQA')
      })

      cy.window().invoke('myFunctionTab1')
    })
  })

  // ---------------------------------------------------------------------------
  context('Caixa de Confirmação (Confirm)', () => {
    it('deve exibir "You pressed OK!" ao aceitar a confirmação', () => {
      // Injeta o elemento de resultado que o site removeu do HTML
      cy.document().then((doc) => {
        const el = doc.createElement('p')
        el.id = 'demo'
        doc.body.appendChild(el)
      })

      cy.on('window:confirm', () => true)
      cy.window().invoke('myFunctionTab2')

      cy.get('#demo').should('contain.text', 'You pressed OK!')
    })

    it('deve exibir "You pressed Cancel!" ao cancelar a confirmação', () => {
      cy.document().then((doc) => {
        const el = doc.createElement('p')
        el.id = 'demo'
        doc.body.appendChild(el)
      })

      cy.on('window:confirm', () => false)
      cy.window().invoke('myFunctionTab2')

      cy.get('#demo').should('contain.text', 'You pressed Cancel!')
    })
  })

  // ---------------------------------------------------------------------------
  context('Caixa de Prompt (Prompt)', () => {
    it('deve saudar o usuário com o nome informado no prompt', () => {
      const nome = 'João'

      // Injeta o elemento de resultado que o site removeu do HTML
      cy.document().then((doc) => {
        const el = doc.createElement('p')
        el.id = 'demo1'
        doc.body.appendChild(el)
      })

      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns(nome)
        win.myFunctionTab3()
      })

      cy.get('#demo1').should('contain.text', `Hello ${nome}`)
    })

    it('deve saudar com o valor padrão do prompt', () => {
      cy.document().then((doc) => {
        const el = doc.createElement('p')
        el.id = 'demo1'
        doc.body.appendChild(el)
      })

      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns('Harry Potter')
        win.myFunctionTab3()
      })

      cy.get('#demo1').should('contain.text', 'Hello Harry Potter')
    })
  })
})
