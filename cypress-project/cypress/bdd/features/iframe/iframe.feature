# language: pt

Funcionalidade: Interação com iFrame
  Como um estudante de QA
  Quero verificar e interagir com o conteúdo dentro de um iFrame
  Para aprender a lidar com iframes — um desafio clássico em automação de testes

  Contexto:
    Dado que acesso a página de iFrame

  Cenário: O iframe está presente e visível na página
    Então o iframe deve estar visível na página

  Cenário: O iframe possui um atributo src válido
    Então o iframe deve ter o atributo "src" definido

  Cenário: O conteúdo dentro do iframe está carregado
    Então o conteúdo do iframe não deve estar vazio

  Cenário: É possível acessar elementos dentro do iframe
    Então deve ser possível encontrar elementos HTML dentro do iframe

  Cenário: O texto dentro do iframe pode ser lido
    Então o texto dentro do iframe não deve estar vazio
