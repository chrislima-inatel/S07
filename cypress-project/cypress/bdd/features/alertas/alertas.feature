# language: pt

Funcionalidade: Caixas de Alerta JavaScript
  Como um estudante de QA
  Quero interagir com os diferentes tipos de alertas JavaScript
  Para aprender a lidar com diálogos nativos do navegador usando Cypress

  Contexto:
    Dado que acesso a página de Caixas de Alerta

  Cenário: Alerta simples é exibido ao clicar em "Tentar"
    Quando clico na aba de alerta de índice 0
    E clico no botão Tentar
    Então a mensagem do alerta deve ser exibida

  Cenário: Aceitar a caixa de confirmação exibe mensagem de OK
    Quando clico na aba de alerta de índice 1
    E aceito a caixa de confirmação
    E clico no botão Tentar
    Então o resultado da confirmação deve conter "You pressed OK!"

  Cenário: Cancelar a caixa de confirmação exibe mensagem de Cancelar
    Quando clico na aba de alerta de índice 1
    E cancelo a caixa de confirmação
    E clico no botão Tentar
    Então o resultado da confirmação deve conter "You pressed Cancel!"

  Cenário: Inserir nome no prompt exibe a saudação personalizada
    Quando clico na aba de alerta de índice 2
    E respondo ao prompt com o texto "João"
    E clico no botão Tentar
    Então o resultado do prompt deve conter "Hello João"
