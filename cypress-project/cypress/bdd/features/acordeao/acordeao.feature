# language: pt

Funcionalidade: Acordeão e Abas
  Como um estudante de QA
  Quero interagir com o acordeão e as abas da página
  Para aprender a testar componentes expansíveis e de navegação por abas

  Contexto:
    Dado que acesso a página de Acordeão e Abas

  Cenário: A página tem pelo menos 2 seções de acordeão
    Então o acordeão deve ter pelo menos 2 seções

  Cenário: A primeira seção do acordeão está expandida por padrão
    Então a seção de acordeão de índice 0 deve estar aberta

  Cenário: Clicar na segunda seção a expande
    Quando clico no cabeçalho de acordeão de índice 1
    Então a seção de acordeão de índice 1 deve estar aberta

  Cenário: Expandir uma seção recolhe a seção anteriormente aberta
    Quando clico no cabeçalho de acordeão de índice 1
    Então a seção de acordeão de índice 0 deve estar fechada

  Cenário: O painel expandido exibe conteúdo
    Quando clico no cabeçalho de acordeão de índice 1
    Então a seção aberta do acordeão deve ter conteúdo

  Cenário: A segunda aba exibe conteúdo diferente da primeira
    Quando clico na aba de índice 1 do componente de abas
    Então o conteúdo da aba ativa deve ter mudado

  Esquema do Cenário: Cada seção do acordeão pode ser expandida individualmente
    Quando clico no cabeçalho de acordeão de índice <indice>
    Então a seção de acordeão de índice <indice> deve estar aberta

    Exemplos:
      | indice |
      | 0      |
      | 1      |
