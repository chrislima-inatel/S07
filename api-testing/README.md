# Testes de API com Postman + Newman — PokéAPI

Projeto didático de testes de API para a disciplina **S07 - Qualidade de Software**.

Utiliza a [PokéAPI](https://pokeapi.co) — uma API REST pública e gratuita sobre Pokémon — como alvo dos testes, e o [Newman](https://github.com/postmanlabs/newman) (CLI do Postman) para executá-los via terminal e CI/CD.

---

## O que é testado?

| Request | Descrição |
|---|---|
| `GET /pokemon/pikachu` | Valida status 200, nome, ID e tipos |
| `GET /pokemon/bulbasaur` | Valida altura, peso e número de tipos |
| `GET /pokemon/charmander` | Valida habilidades e tipo fogo |
| `GET /pokemon/9999` | Valida erro 404 para Pokémon inexistente |
| `GET /pokemon?limit=10` | Valida listagem paginada com 10 resultados |

---

## Tecnologias

- **[Postman](https://www.postman.com/)** — criação e manutenção das collections de teste
- **[Newman](https://github.com/postmanlabs/newman)** — executor CLI do Postman
- **[newman-reporter-htmlextra](https://github.com/DannyDainton/newman-reporter-htmlextra)** — relatório HTML detalhado

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- npm (incluso no Node.js)

---

## Instalação

```bash
# Entre na pasta do projeto
cd api-testing

# Instale as dependências
npm install
```

---

## Execução dos Testes

### Rodar no terminal (saída simples)

```bash
npm test
```

### Rodar com relatório HTML

```bash
npm run test:relatorio
```

Após rodar, abra o arquivo `relatorio.html` gerado na raiz do projeto.

---

## Estrutura do Projeto

```
api-testing/
├── collections/
│   └── pokeapi.collection.json    ← collection com todos os requests e testes
├── environments/
│   └── pokeapi.environment.json   ← variáveis de ambiente (ex: baseUrl)
├── package.json
└── README.md
```

---

## Importar no Postman (interface visual)

1. Abra o Postman
2. Clique em **Import**
3. Importe o arquivo `collections/pokeapi.collection.json`
4. Importe também o ambiente `environments/pokeapi.environment.json`
5. Selecione o ambiente **"PokéAPI — Ambiente de Testes"** no canto superior direito
6. Execute os requests individualmente ou clique em **Run collection**

---

## Conceitos abordados

- **Request e Response**: estrutura de uma requisição HTTP (método, URL, headers, body)
- **Status codes**: 200 OK, 404 Not Found
- **Assertions**: verificações automáticas sobre a resposta (status, campos, tipos de dados)
- **Variáveis de ambiente**: uso de `{{baseUrl}}` para parametrizar URLs
- **Paginação de API**: parâmetros de query string (`limit`, `offset`)
- **CI/CD**: execução automatizada via GitHub Actions com Newman
