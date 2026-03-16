# 🧪 Automação de Testes com Cypress — GlobalSQA Demo Site

[![Cypress](https://img.shields.io/badge/Cypress-13.x-04C38E?logo=cypress)](https://www.cypress.io/)
[![Node](https://img.shields.io/badge/Node.js-14.14+-339933?logo=node.js)](https://nodejs.org/)
[![BDD](https://img.shields.io/badge/BDD-Gherkin%20%2F%20Cucumber-23D96C?logo=cucumber)](https://cucumber.io/)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue)](LICENSE)

> Projeto de estudo de automação de testes web com **Cypress**, demonstrando duas abordagens: **sem BDD (Page Object Model)** e **com BDD (Gherkin/Cucumber)**. Desenvolvido em **Português Brasileiro** para estudantes de QA.

---

## 📋 Sobre o Projeto

Repositório da disciplina Qualidade e Gerência de Configuração e Evolução de Software - S07.
- Instituto Nacional de Telecomunicações - Inatel.
- Prof. Christopher Lima

Este repositório é um projeto educacional completo de automação de testes, criado para ajudar estudantes e profissionais de QA a aprenderem:

- Como estruturar um projeto Cypress do zero
- O padrão **Page Object Model (POM)** para organização dos testes
- A abordagem **BDD (Behavior-Driven Development)** com Gherkin e Cucumber
- Boas práticas de escrita de testes automatizados
- Integração com **GitHub Actions** para execução contínua (CI/CD)

O site testado é o **GlobalSQA Demo Site**, uma plataforma gratuita criada especificamente para prática de automação de testes.

---

## 🌐 Site Testado

**URL:** [https://www.globalsqa.com/demo-site/](https://www.globalsqa.com/demo-site/)

| Módulo | URL | O que é testado |
|---|---|---|
| Abas | `/demo-site/accordion-and-tabs/` | Navegação entre abas (easyResponsiveTabs) |
| Caixas de Alerta | `/demo-site/alertbox/` | Alert, Confirm e Prompt JavaScript |
| Caixa de Diálogo | `/demoSite/practice/dialog/modal-message.html` | Modal jQuery UI (abre automaticamente) |
| Seletor de Data | `/demoSite/practice/datepicker/default.html` | DatePicker jQuery UI |
| Menu Suspenso | `/demo-site/select-dropdown-menu/` | Select HTML com >100 países |
| iFrame | `/demo-site/frames-and-windows/` | Acesso e interação com iframes |
| Acordeão | `/demoSite/practice/accordion/collapsible.html` | Acordeão jQuery UI |

> **Nota:** Algumas URLs do site GlobalSQA foram alteradas ou removidas ao longo do tempo. Os testes utilizam as páginas de prática direta (`/demoSite/practice/...`) para módulos que passaram a usar iframes nas páginas de demonstração principal.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | 13.x | Framework principal de testes E2E |
| [Node.js](https://nodejs.org/) | 14.14+ | Ambiente de execução |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | 13.x | Plugin BDD (Gherkin/Cucumber) |
| [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor) | 2.x | Bundler para os step definitions |
| [esbuild](https://esbuild.github.io/) | 0.20.x | Compilador/bundler JavaScript |
| [GitHub Actions](https://github.com/features/actions) | — | Pipeline de CI/CD |

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) versão **14.14 ou superior** (recomendado: 18+)
- [Git](https://git-scm.com/)
- Um editor de código (recomendado: [WebStorm](https://www.jetbrains.com/webstorm))

Para verificar se o Node.js está instalado:
```bash
node --version
npm --version
```

---

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone git clone https://github.com/chrislima-inatel/S07.git
cd cypress-project/
```

2. **Instale as dependências:**
```bash
npm install
```

Isso irá instalar o Cypress e todas as dependências necessárias.

---

## ▶️ Como Executar os Testes

### Interface Gráfica (Modo Interativo)

Ideal para desenvolvimento e depuração de testes.

```bash
# Abre a interface do Cypress com todos os testes
npm run cypress:abrir

# Abre apenas os testes sem BDD
npm run abrir:sem-bdd

# Abre apenas os testes BDD (Gherkin)
npm run abrir:bdd
```

### Linha de Comando (Modo Headless)

Ideal para execução em pipelines de CI/CD.

```bash
# Executa todos os testes (sem BDD)
npm test

# Executa apenas os testes sem BDD
npm run test:sem-bdd

# Executa apenas os testes BDD (Gherkin)
npm run test:bdd
```

---

## 📚 Abordagens de Teste

Este projeto demonstra **duas formas** de escrever os mesmos testes. Ambas testam as mesmas funcionalidades, mas com estilos diferentes.

---

### 📝 Abordagem 1 — Sem BDD (Page Object Model)

Os testes são escritos diretamente em JavaScript usando a sintaxe nativa do Cypress (`describe`, `it`, `beforeEach`).

**Onde estão os arquivos:**
```
cypress/
├── pages/          ← Page Objects (seletores e ações encapsulados)
└── sem-bdd/
    └── specs/      ← Arquivos de teste (.spec.js)
```

**O que é o Page Object Model (POM)?**

O POM é um padrão de projeto que separa os **seletores de elementos** da **lógica dos testes**. Cada página do site tem uma classe correspondente que centraliza os seletores e as ações daquela página.

**Vantagens:**
- Fácil manutenção: se um seletor mudar, você altera em um único lugar
- Código de teste mais limpo e legível
- Reutilização de código entre testes

**Exemplo de Page Object (`cypress/pages/AlertasPage.js`):**
```javascript
class AlertasPage {
  // Seletores
  get linksDeAba() {
    return cy.get('.resp-tabs-list li')
  }

  get elementoResultadoConfirmacao() {
    return cy.get('#demo')
  }

  // Ações
  acessar() {
    cy.acessarPagina('/demo-site/alertbox/')
  }

  clicarTentar() {
    // Injeta #demo/#demo1 (removidos do HTML) e invoca a função da aba ativa
    cy.document().then((doc) => {
      if (!doc.getElementById('demo')) {
        const el = doc.createElement('p')
        el.id = 'demo'
        doc.body.appendChild(el)
      }
    })
    cy.get('.resp-tabs-list li.resp-tab-active').then(($tab) => {
      cy.window().invoke(`myFunctionTab${$tab.index() + 1}`)
    })
  }

  // Verificações
  verificarResultadoConfirmacao(mensagem) {
    this.elementoResultadoConfirmacao.should('contain.text', mensagem)
  }
}

export default new AlertasPage()
```

**Exemplo de Spec (`cypress/sem-bdd/specs/alertas.spec.js`):**
```javascript
import AlertasPage from '../../pages/AlertasPage'

describe('Caixas de Alerta JavaScript', () => {
  beforeEach(() => {
    AlertasPage.acessar()
  })

  context('Caixa de Confirmação', () => {
    it('deve exibir "You pressed OK!" ao aceitar', () => {
      AlertasPage.clicarAba(1)
      AlertasPage.clicarTentarEAceitar()
      AlertasPage.verificarResultadoConfirmacao('You pressed OK!')
    })
  })
})
```

---

### 🥒 Abordagem 2 — Com BDD (Gherkin/Cucumber)

Os testes são escritos em **linguagem Gherkin** (legível por humanos), em arquivos `.feature`, e depois implementados em arquivos de **step definitions** em JavaScript.

**Onde estão os arquivos:**
```
cypress/
├── pages/              ← Page Objects (compartilhados com sem-BDD)
└── bdd/
    ├── features/       ← Arquivos .feature (Gherkin em português)
    └── step_definitions/ ← Implementação dos passos em JavaScript
```

**O que é BDD?**

BDD (Behavior-Driven Development) é uma metodologia que aproxima desenvolvedores, testadores e pessoas de negócio através de uma linguagem comum. Os cenários de teste são escritos de forma que qualquer pessoa possa entender.

**Estrutura Gherkin (Given / When / Then):**
| Palavra-chave | Em português | Significado |
|---|---|---|
| `Feature` / `Funcionalidade` | Funcionalidade | Descreve a funcionalidade sendo testada |
| `Scenario` / `Cenário` | Cenário | Um caso de teste específico |
| `Given` / `Dado` | Dado | Pré-condição (estado inicial) |
| `When` / `Quando` | Quando | Ação do usuário |
| `Then` / `Então` | Então | Resultado esperado |
| `And` / `E` | E | Continua o passo anterior |
| `Background` / `Contexto` | Contexto | Pré-condição compartilhada entre cenários |
| `Scenario Outline` / `Esquema do Cenário` | Esquema do Cenário | Cenário parametrizado com múltiplos exemplos |

**Exemplo de Feature (`cypress/bdd/features/alertas/alertas.feature`):**
```gherkin
# language: pt

Funcionalidade: Caixas de Alerta JavaScript
  Como um estudante de QA
  Quero interagir com os diferentes tipos de alertas JavaScript
  Para aprender a lidar com diálogos nativos do navegador

  Contexto:
    Dado que acesso a página de Caixas de Alerta

  Cenário: Aceitar a caixa de confirmação exibe mensagem de OK
    Quando clico na aba de alerta de índice 1
    E aceito a caixa de confirmação
    E clico no botão Tentar
    Então o resultado da confirmação deve conter "You pressed OK!"
```

**Exemplo de Step Definition (`cypress/bdd/step_definitions/alertas.steps.js`):**
```javascript
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import AlertasPage from '../../pages/AlertasPage'

When('aceito a caixa de confirmação', () => {
  cy.on('window:confirm', () => true)
})

Then('o resultado da confirmação deve conter {string}', (mensagem) => {
  AlertasPage.verificarResultadoConfirmacao(mensagem)
})
```

---

## 📁 Estrutura de Pastas

```
cypress-globalsqa-automacao/
│
├── .github/
│   └── workflows/
│       └── ci.yml                    # Pipeline GitHub Actions (CI/CD)
│
├── cypress/
│   │
│   ├── bdd/                          # Abordagem BDD (Gherkin/Cucumber)
│   │   ├── features/                 # Cenários em linguagem Gherkin
│   │   │   ├── abas/
│   │   │   │   └── abas.feature
│   │   │   ├── alertas/
│   │   │   │   └── alertas.feature
│   │   │   ├── dialogo/
│   │   │   │   └── dialogo.feature
│   │   │   ├── datepicker/
│   │   │   │   └── datepicker.feature
│   │   │   ├── dropdown/
│   │   │   │   └── dropdown.feature
│   │   │   ├── iframe/
│   │   │   │   └── iframe.feature
│   │   │   └── acordeao/
│   │   │       └── acordeao.feature
│   │   └── step_definitions/         # Implementação dos passos Gherkin
│   │       ├── compartilhado.steps.js  # Steps Given (navegação) reutilizáveis
│   │       ├── abas.steps.js
│   │       ├── alertas.steps.js
│   │       ├── dialogo.steps.js
│   │       ├── datepicker.steps.js
│   │       ├── dropdown.steps.js
│   │       ├── iframe.steps.js
│   │       └── acordeao.steps.js
│   │
│   ├── sem-bdd/                      # Abordagem sem BDD (POM)
│   │   └── specs/                    # Arquivos de teste Cypress
│   │       ├── abas.spec.js
│   │       ├── alertas.spec.js
│   │       ├── dialogo.spec.js
│   │       ├── datepicker.spec.js
│   │       ├── dropdown.spec.js
│   │       ├── iframe.spec.js
│   │       └── acordeao.spec.js
│   │
│   ├── pages/                        # Page Objects (compartilhados)
│   │   ├── AbasPage.js
│   │   ├── AlertasPage.js
│   │   ├── DialogoPage.js
│   │   ├── DatePickerPage.js
│   │   ├── DropdownPage.js
│   │   ├── IframePage.js
│   │   └── AcordeaoPage.js
│   │
│   ├── fixtures/
│   │   └── dados.json                # Dados de teste centralizados
│   │
│   └── support/
│       ├── e2e.js                    # Configurações globais dos testes
│       └── commands.js               # Comandos customizados do Cypress
│
├── cypress.config.js                 # Config Cypress — Abordagem sem BDD
├── cypress.bdd.config.js             # Config Cypress — Abordagem BDD
├── package.json                      # Dependências e scripts NPM
├── .gitignore                        # Arquivos ignorados pelo Git
└── README.md                         # Este arquivo
```

---

## ⌨️ Comandos Customizados

Este projeto adiciona comandos customizados ao Cypress para facilitar operações comuns:

| Comando | Descrição | Exemplo |
|---|---|---|
| `cy.acessarPagina(caminho)` | Visita uma URL relativa ao baseUrl | `cy.acessarPagina('/demo-site/alertbox/')` |
| `cy.acessarIframe(seletor)` | Retorna o body de um iframe para interação | `cy.acessarIframe('iframe[name="globalSqa"]').find('p')` |
| `cy.selecionarData(mes, ano, dia)` | Navega e seleciona data no DatePicker | `cy.selecionarData('March', '2025', '15')` |
| `cy.aceitarConfirmacao()` | Aceita a próxima janela confirm() | `cy.aceitarConfirmacao()` |
| `cy.cancelarConfirmacao()` | Cancela a próxima janela confirm() | `cy.cancelarConfirmacao()` |
| `cy.responderPrompt(texto)` | Responde à próxima janela prompt() | `cy.responderPrompt('João')` |

---

## 🔄 CI/CD — GitHub Actions

O projeto inclui um pipeline de integração contínua que executa os testes automaticamente a cada push ou pull request na branch `main`.

**Como funciona:**

1. A cada `push` ou `pull request` para `main`, o pipeline é disparado
2. Dois jobs são executados em paralelo:
   - **Testes sem BDD**: executa `npm run test:sem-bdd`
   - **Testes BDD**: executa `npm run test:bdd`
3. Se algum teste falhar, as capturas de tela são salvas como artefato

**Para ver o status dos testes:**
- Acesse a aba **Actions** no repositório do GitHub

---

## ⚠️ Mudanças de Estrutura do Site GlobalSQA

O site GlobalSQA passou por reestruturações que afetaram URLs e o comportamento de vários componentes. A tabela abaixo resume as adaptações feitas nos testes:

| Módulo | Problema encontrado | Solução aplicada |
|---|---|---|
| **Abas** | URL `/demo-site/tabs/` removida | Migrado para `/demo-site/accordion-and-tabs/` |
| **Caixa de Diálogo** | URL `/demo-site/dialog-box/` removida | Migrado para `/demoSite/practice/dialog/modal-message.html` |
| **Seletor de Data** | `/demo-site/datepicker/` passou a usar iframe | Migrado para `/demoSite/practice/datepicker/default.html` |
| **iFrame** | URL `/demo-site/iframe/` renomeada | Migrado para `/demo-site/frames-and-windows/`; iframe usa `data-src` (lazy loading) |
| **Acordeão** | `/demo-site/accordion-and-tabs/` passou a usar iframe para o acordeão | Migrado para `/demoSite/practice/accordion/collapsible.html` |
| **Alertas** | `#demo` e `#demo1` removidos do HTML; botões não chamam funções JS diretamente | Elementos injetados via `cy.document()`; funções invocadas via `cy.window().invoke()` |
| **Menu Suspenso** | `id="country"` removido do `<select>` | Seletor atualizado para `cy.get('select')` |
| **Caixa de Diálogo** | Diálogo agora abre **automaticamente** ao carregar a página (`autoOpen: true`) | Removido o passo "abrir diálogo"; feature adaptada para cenários de fechar |

### easyResponsiveTabs — Novo sistema de abas

O site substituiu o **jQuery UI Tabs** e o **Bootstrap Tabs** pelo plugin **easyResponsiveTabs**. Os seletores foram atualizados:

| Antes | Agora |
|---|---|
| `.nav-tabs .nav-link` / `#tabs .ui-tabs-nav li` | `.resp-tabs-list li` |
| `.tab-pane.active` / `#tabs .ui-tabs-panel:visible` | `.resp-tab-content.resp-tab-content-active` |
| `.active` (aba ativa) | `.resp-tab-active` (aba ativa) |

---

## 📖 Conceitos Importantes para Estudantes

### Por que os testes de iFrame são diferentes?

O Cypress não acessa iframes nativamente porque eles possuem um documento separado. Usamos o comando `cy.acessarIframe()` para obter o `contentDocument.body` do iframe e interagir com seus elementos.

### Como o Cypress lida com alertas JavaScript?

- **`alert()`**: O Cypress descarta automaticamente. Use `cy.on('window:alert', callback)` para capturar a mensagem.
- **`confirm()`**: Use `cy.on('window:confirm', () => true/false)` para aceitar/rejeitar.
- **`prompt()`**: Use `cy.stub(win, 'prompt').returns(valor)` para fornecer uma resposta.

### Qual abordagem devo usar — BDD ou sem BDD?

| Situação | Recomendação |
|---|---|
| Equipe técnica, foco em velocidade | Sem BDD (POM) |
| Stakeholders não-técnicos precisam entender os testes | BDD (Gherkin) |
| Cenários complexos com muitos parâmetros | BDD com `Esquema do Cenário` |
| Projeto pequeno ou protótipo | Sem BDD |

---

## 🤝 Contribuindo

Este é um projeto de estudos! Contribuições são bem-vindas.

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b feat/novo-modulo`
3. Adicione seus testes seguindo o padrão do projeto
4. Certifique-se de que os testes passam: `npm run test:sem-bdd` e `npm run test:bdd`
5. Faça o commit: `git commit -m "feat: adiciona testes para módulo X"`
6. Envie para o GitHub: `git push origin feat/novo-modulo`
7. Abra um Pull Request

### Convenções de Código

- Nomes de arquivos: `kebab-case` (ex: `meu-arquivo.spec.js`)
- Nomes de classes (Page Objects): `PascalCase` (ex: `MinhaPage`)
- Nomes de variáveis e métodos: `camelCase` (ex: `clicarBotao`)
- Comentários e descrições: em **Português Brasileiro**
- Commits: seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/)

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT** — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">

Feito com ❤️ para a comunidade de QA brasileira

</div>
