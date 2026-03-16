# language: pt

Funcionalidade: Seletor de Data (DatePicker)
  Como um estudante de QA
  Quero interagir com os calendários da página
  Para aprender a testar componentes jQuery UI DatePicker

  Contexto:
    Dado que acesso a página de Seletor de Data

  Cenário: Clicar no primeiro input abre o calendário
    Quando clico no campo do primeiro DatePicker
    Então o calendário deve estar visível

  Cenário: O calendário fecha após selecionar uma data
    Quando clico no campo do primeiro DatePicker
    E seleciono o primeiro dia disponível no calendário
    Então o calendário deve estar oculto

  Cenário: Navegar para o próximo mês muda o cabeçalho do calendário
    Quando clico no campo do primeiro DatePicker
    E anoto o mês atual do calendário
    E clico no botão de próximo mês
    Então o cabeçalho do calendário deve ter mudado

  # Os cenários de calendário inline (#datepicker3) foram removidos.
  # A página de prática /demoSite/practice/datepicker/default.html
  # disponibiliza apenas o DatePicker 1 (#datepicker).
