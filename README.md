# S07 — Qualidade de Software

Material prático da disciplina **S07 - Qualidade de Software**, com dois projetos de automação de testes para os alunos explorarem e aprenderem na prática.

---

## Projetos

### 1. Testes E2E com Cypress

**Diretório:** [`cypress-project/`](./cypress-project/)

Projeto de automação de testes End-to-End utilizando o site de demonstração [GlobalSQA](https://www.globalsqa.com). Cobre dois estilos de escrita de testes:

- **Sem BDD** — Page Object Model (POM)
- **Com BDD** — Gherkin + Cucumber

**Tecnologias:** Cypress 13, Node.js 20, Cucumber Preprocessor

```bash
cd cypress-project
npm install
npm test               # roda todos os testes
npm run test:sem-bdd   # apenas testes POM
npm run test:bdd       # apenas testes BDD
```

→ [Ver README completo do projeto Cypress](./cypress-project/README.md)

---

### 2. Testes de API com Postman + Newman

**Diretório:** [`api-testing/`](./api-testing/)

Projeto de testes de API utilizando a [PokéAPI](https://pokeapi.co) — API pública e gratuita sobre Pokémon. Os testes são escritos em formato de collection Postman e executados via Newman (CLI do Postman).

**Tecnologias:** Postman, Newman, newman-reporter-htmlextra

```bash
cd api-testing
npm install
npm test               # roda os testes no terminal
npm run test:relatorio # gera relatório HTML
```

→ [Ver README completo do projeto de API](./api-testing/README.md)

---

## CI/CD

Ambos os projetos são executados automaticamente via **GitHub Actions** a cada push ou pull request para a branch `main`.

| Job | Descrição |
|---|---|
| `testes-sem-bdd` | Cypress — Page Object Model |
| `testes-bdd` | Cypress — Gherkin/Cucumber |
| `testes-api` | Newman — PokéAPI |

→ [Ver configuração do pipeline](./.github/workflows/ci.yml)

---

## Conteúdo da Disciplina

| Tema | Tópicos |
|---|---|
| **Testes Automatizados** | Pirâmide de testes, unitários, integração, E2E, TDD |
| **Ferramentas de Teste** | Jest, Vitest, Cypress, Playwright, Selenium, Postman/Newman |
| **DevOps** | Git Flow, CI/CD, GitHub Actions, Docker |
| **Qualidade de Código** | SonarQube, ESLint, cobertura de código |
