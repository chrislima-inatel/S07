# language: pt

Funcionalidade: Acordeão
  Como um estudante de QA
  Quero interagir com o acordeão da página
  Para aprender a testar componentes expansíveis jQuery UI

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

  # O teste de abas foi removido — a página de prática do acordeão
  # não tem o componente de abas. Os testes de abas estão em abas.feature.

  Esquema do Cenário: Cada seção do acordeão pode ser expandida individualmente
    Quando clico no cabeçalho de acordeão de índice <indice>
    Então a seção de acordeão de índice <indice> deve estar aberta

    Exemplos:
      | indice |
      | 0      |
      | 1      |
