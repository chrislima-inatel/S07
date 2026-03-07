# language: pt

Funcionalidade: Navegação por Abas
  Como um estudante de QA
  Quero interagir com o componente de abas da página
  Para aprender a testar componentes jQuery UI Tabs

  Contexto:
    Dado que acesso a página de Abas

  Cenário: Primeira aba está ativa ao carregar a página
    Então a primeira aba deve estar ativa

  Cenário: Clicar na segunda aba a torna ativa
    Quando clico na aba de índice 1
    Então a aba de índice 1 deve estar ativa

  Cenário: Clicar na terceira aba a torna ativa
    Quando clico na aba de índice 2
    Então a aba de índice 2 deve estar ativa

  Cenário: Trocar de aba oculta o conteúdo da aba anterior
    Quando clico na aba de índice 1
    Então o painel de índice 0 deve estar oculto

  Esquema do Cenário: Navegar por cada aba exibe o conteúdo correspondente
    Quando clico na aba de índice <indice>
    Então a aba de índice <indice> deve estar ativa

    Exemplos:
      | indice |
      | 0      |
      | 1      |
      | 2      |
