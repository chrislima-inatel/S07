# language: pt

Funcionalidade: Caixa de Diálogo Modal
  Como um estudante de QA
  Quero interagir com um diálogo modal jQuery UI
  Para aprender a testar componentes HTML de modal (diferente de alertas nativos)

  # O diálogo abre AUTOMATICAMENTE ao carregar a página (autoOpen: true).
  # Não é necessário clicar em botão para abrir — o Contexto já garante que
  # o diálogo está aberto ao entrar em cada cenário.

  Contexto:
    Dado que acesso a página de Caixa de Diálogo

  Cenário: O diálogo abre automaticamente ao carregar a página
    Então o diálogo deve estar visível

  Cenário: O overlay de fundo é exibido com o diálogo aberto
    Então o overlay de fundo deve estar presente

  Cenário: Fechar o diálogo pelo botão X o oculta
    Quando fecho o diálogo pelo botão X
    Então o diálogo não deve estar visível

  Cenário: Fechar o diálogo pelo botão OK o oculta
    Quando fecho o diálogo pelo botão OK
    Então o diálogo não deve estar visível
