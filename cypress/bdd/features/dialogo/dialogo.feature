# language: pt

Funcionalidade: Caixa de Diálogo Modal
  Como um estudante de QA
  Quero interagir com um diálogo modal jQuery UI
  Para aprender a testar componentes HTML de modal (diferente de alertas nativos)

  Contexto:
    Dado que acesso a página de Caixa de Diálogo

  Cenário: A página carrega sem o diálogo aberto
    Então o diálogo não deve estar visível

  Cenário: Abrir o diálogo exibe o modal na tela
    Quando abro o diálogo
    Então o diálogo deve estar visível
    E o overlay de fundo deve estar visível

  Cenário: Fechar o diálogo pelo botão X o oculta
    Quando abro o diálogo
    E fecho o diálogo pelo botão X
    Então o diálogo não deve estar visível

  Cenário: Fechar o diálogo pelo botão OK o oculta
    Quando abro o diálogo
    E fecho o diálogo pelo botão OK
    Então o diálogo não deve estar visível

  Cenário: O diálogo pode ser aberto e fechado múltiplas vezes
    Quando abro o diálogo
    E fecho o diálogo pelo botão X
    E abro o diálogo
    Então o diálogo deve estar visível
