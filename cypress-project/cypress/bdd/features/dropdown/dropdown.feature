# language: pt

Funcionalidade: Menu Suspenso de Países
  Como um estudante de QA
  Quero interagir com o dropdown de países da página
  Para aprender a testar elementos <select> HTML nativos com Cypress

  Contexto:
    Dado que acesso a página de Menu Suspenso

  Cenário: O dropdown está visível na página
    Então o dropdown de países deve estar visível

  # A lista foi reduzida de ~250 para ~125 países. Portugal e Germany foram removidos.
  Cenário: O dropdown contém mais de 100 opções
    Então o dropdown deve ter mais de 100 opções

  Cenário: Selecionar o Brasil como país
    Quando seleciono o país "Brazil"
    Então o país selecionado deve ser "Brazil"

  Cenário: Selecionar a Argentina como país
    Quando seleciono o país "Argentina"
    Então o país selecionado deve ser "Argentina"

  Cenário: Selecionar a França como país
    Quando seleciono o país "France"
    Então o país selecionado deve ser "France"

  Cenário: Trocar de país atualiza a seleção
    Quando seleciono o país "Brazil"
    E seleciono o país "Argentina"
    Então o país selecionado deve ser "Argentina"

  Esquema do Cenário: Vários países podem ser selecionados individualmente
    Quando seleciono o país "<pais>"
    Então o país selecionado deve ser "<pais>"

    Exemplos:
      | pais      |
      | Brazil    |
      | Argentina |
      | France    |
