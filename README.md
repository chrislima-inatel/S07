# S07 — Qualidade e Gerência de Configuração e Evolução de Software

Repositório da disciplina Qualidade e Gerência de Configuração e Evolução de Software - S07.
Instituto Nacional de Telecomunicações - Inatel.
Prof. Christopher Lima

---

## Índice

- [Projetos de Teste](#projetos-de-teste)
- [Comandos Básicos do Docker](#comandos-básicos-do-docker)
- [Pipeline com Jenkins e Docker](#pipeline-com-jenkins-e-docker)
  - [Arquitetura](#arquitetura)
  - [Estrutura de Arquivos](#estrutura-de-arquivos)
  - [Como Usar](#como-usar)
- [Explicação dos Arquivos](#explicação-dos-arquivos)
  - [Dockerfile.jenkins](#dockerfilejenkins)
  - [Dockerfile.cypress](#dockerfilecypress)
  - [Dockerfile.newman](#dockerfilenewman)
  - [docker-compose.yml](#docker-composeyml)
  - [Jenkinsfile](#jenkinsfile)
  - [enviar-email.sh](#enviar-emailsh)
  - [msmtprc.template](#msmtprctemplate)

---

## Projetos de Teste

| Projeto | Tecnologia | Alvo |
|---|---|---|
| `cypress-project/` | Cypress 13 — POM e BDD (Gherkin) | GlobalSQA Demo Site |
| `api-testing/` | Newman / Postman | PokéAPI |

---

## Comandos Básicos do Docker

### Imagens

```bash
# Construir uma imagem a partir de um Dockerfile
docker build -t nome-da-imagem .

# Construir especificando o Dockerfile
docker build -t nome-da-imagem -f caminho/Dockerfile .

# Listar imagens locais
docker images

# Remover uma imagem
docker rmi nome-da-imagem

# Ver histórico de camadas de uma imagem
docker history nome-da-imagem

# Baixar uma imagem do Docker Hub sem rodar
docker pull nginx:alpine
```

### Containers

```bash
# Criar e iniciar um container
docker run nome-da-imagem

# Rodar em segundo plano (detached)
docker run -d nome-da-imagem

# Nomear o container
docker run -d --name meu-container nome-da-imagem

# Mapear portas (host:container)
docker run -d -p 8080:80 nginx

# Mapear volume (host:container)
docker run -d -v /meu/dir:/app nome-da-imagem

# Definir variável de ambiente
docker run -d -e MINHA_VAR=valor nome-da-imagem

# Rodar e entrar no terminal interativo
docker run -it nome-da-imagem bash

# Listar containers em execução
docker ps

# Listar todos os containers (incluindo parados)
docker ps -a

# Parar um container
docker stop meu-container

# Iniciar um container parado
docker start meu-container

# Remover um container
docker rm meu-container

# Parar e remover de uma vez
docker rm -f meu-container
```

### Inspecionar e Depurar

```bash
# Ver logs de um container
docker logs meu-container

# Acompanhar logs em tempo real
docker logs -f meu-container

# Executar um comando em um container já em execução
docker exec meu-container ls /app

# Abrir terminal interativo em container em execução
docker exec -it meu-container bash

# Inspecionar detalhes completos de um container (JSON)
docker inspect meu-container

# Ver uso de recursos em tempo real
docker stats
```

### Volumes

```bash
# Listar volumes
docker volume ls

# Criar volume nomeado
docker volume create meu-volume

# Inspecionar volume
docker volume inspect meu-volume

# Remover volume
docker volume rm meu-volume

# Remover volumes não utilizados
docker volume prune
```

### Redes

```bash
# Listar redes
docker network ls

# Criar rede bridge
docker network create minha-rede

# Inspecionar rede
docker network inspect minha-rede

# Conectar container a uma rede
docker network connect minha-rede meu-container

# Remover rede
docker network rm minha-rede
```

### Docker Compose

```bash
# Construir as imagens definidas no compose
docker-compose build

# Construir sem usar cache
docker-compose build --no-cache

# Subir todos os containers em segundo plano
docker-compose up -d

# Subir e reconstruir imagens antes
docker-compose up -d --build

# Ver containers do compose
docker-compose ps

# Ver logs de todos os containers
docker-compose logs

# Acompanhar logs em tempo real
docker-compose logs -f

# Executar comando em um serviço
docker-compose exec jenkins bash

# Parar todos os containers
docker-compose stop

# Parar e remover containers, redes e volumes
docker-compose down

# Parar e remover incluindo volumes nomeados
docker-compose down -v

# Remover tudo incluindo imagens construídas
docker-compose down --rmi all -v
```

### Limpeza Geral

```bash
# Remover todos containers parados, redes, imagens e cache
docker system prune

# Incluir volumes na limpeza
docker system prune --volumes

# Ver espaço em disco usado pelo Docker
docker system df
```

---

## Pipeline com Jenkins e Docker

### Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    pipeline-net (bridge)                     │
│                                                             │
│  ┌───────────┐   docker.sock   ┌───────────────────────┐   │
│  │  jenkins  │ ──────────────► │   Docker Daemon (host) │   │
│  │ :8080     │                 └───────────────────────┘   │
│  └─────┬─────┘                                             │
│        │ docker exec                                        │
│        ├──────────────────────────────────────────┐        │
│        ▼                                          ▼        │
│  ┌─────────────┐                        ┌──────────────┐   │
│  │   cypress   │                        │    newman    │   │
│  │  (runner)   │                        │   (runner)   │   │
│  └──────┬──────┘                        └──────┬───────┘   │
│         │ escreve relatórios                   │           │
│         └──────────────┬───────────────────────┘           │
│                        ▼  (volume compartilhado)           │
│                ┌──────────────┐                            │
│                │  relatorios  │                            │
│                │  nginx :8081 │                            │
│                └──────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

| Container | Imagem Base | Porta | Papel |
|---|---|---|---|
| `jenkins` | `Dockerfile.jenkins` | 8080, 50000 | Orquestrador CI/CD |
| `cypress-runner` | `Dockerfile.cypress` | — | Executa testes E2E |
| `newman-runner` | `Dockerfile.newman` | — | Executa testes de API |
| `relatorio-server` | `nginx:alpine` | 8081 | Serve relatórios HTML |

### Estrutura de Arquivos

```
S07/
├── Jenkinsfile
└── pipeline_docker/
    ├── Dockerfile.jenkins
    ├── Dockerfile.cypress
    ├── Dockerfile.newman
    ├── docker-compose.yml
    ├── .env.example
    ├── jenkins/
    │   └── plugins.txt
    ├── nginx/
    │   └── default.conf
    └── scripts/
        ├── cypress-entrypoint.sh
        └── notificacao/
            ├── enviar-email.sh
            ├── msmtprc.template
            └── docker-entrypoint.sh
```

### Como Usar

**1. Configure as credenciais**

```bash
cd pipeline_docker
cp .env.example .env
```

Edite o `.env` com seu Gmail e App Password. Para criar uma Senha de App do Google:
1. Ative a verificação em 2 etapas em `myaccount.google.com/security`
2. Acesse `myaccount.google.com/apppasswords`
3. Crie uma senha para "Outro" → ex: "Jenkins Pipeline"
4. Use essa senha de 16 caracteres no campo `GMAIL_PASS`

**2. Suba a infraestrutura**

```bash
docker-compose build
docker-compose up -d
```

**3. Configure o Jenkins**

Acesse `http://localhost:8080` e:
1. Vá em **Manage Jenkins → Credentials → System → Global**
2. Crie três credenciais do tipo **Secret text**:
   - ID: `gmail-user` → seu e-mail
   - ID: `gmail-pass` → sua Senha de App
   - ID: `destinatario-email` → e-mail de destino
3. Crie um novo job do tipo **Pipeline** apontando para o `Jenkinsfile` do repositório

**4. Execute e acompanhe**

- Jenkins: `http://localhost:8080`
- Relatórios: `http://localhost:8081`

---

## Explicação dos Arquivos

### Dockerfile.jenkins

Customiza a imagem oficial do Jenkins para incluir as ferramentas necessárias ao pipeline.

**Por que não usar a imagem oficial direto?**
A imagem `jenkins/jenkins:lts-jdk17` não inclui Node.js nem Docker CLI. Precisamos dessas ferramentas para que o pipeline consiga rodar `npm` e `docker exec` nos outros containers.

**O que é instalado:**
- **Node.js 20 LTS** via NodeSource — repositório oficial usado para garantir a versão correta, já que o apt do Debian pode ter versões antigas
- **Docker CLI** — permite ao Jenkins chamar `docker exec` nos containers `cypress-runner` e `newman-runner`; o socket do host é montado no container (técnica chamada Docker-outside-Docker ou DooD)
- **msmtp** — cliente SMTP leve para envio de e-mails via Gmail

**Por que `USER root` e depois `USER jenkins`?**
Instalar pacotes do sistema exige privilégios de root. Depois da instalação, voltamos para o usuário `jenkins` seguindo a boa prática de não rodar o processo principal como root.

**Plugins pré-instalados via `plugins.txt`**
Em vez de instalar plugins manualmente pela interface web (o que seria perdido se o container fosse destruído), declaramos tudo em código. Isso é Infrastructure as Code.

---

### Dockerfile.cypress

Container dedicado à execução dos testes E2E com Cypress. Baseado em Debian Bullseye.

**Por que Debian e não Alpine?**
O Cypress precisa de bibliotecas gráficas (GTK, NSS, X11) para rodar o Chromium em modo headless. Essas bibliotecas não existem no Alpine Linux. O Debian tem tudo disponível via apt.

**O que é Xvfb?**
X Virtual Framebuffer — cria um "monitor virtual" em memória. Sem ele, o Chromium não consegue abrir porque precisa de uma tela onde renderizar. O entrypoint inicia o Xvfb antes dos testes.

**Cache de camadas do Docker**
O `COPY package*.json` é feito antes do `COPY` do código-fonte. Isso aproveita o cache do Docker: se o código mudar mas as dependências não, o `npm ci` não é reexecutado, reduzindo o tempo de build.

**Por que `tail -f /dev/null`?**
O container precisa ficar ativo para que o Jenkins use `docker exec` para rodar os testes. `tail -f /dev/null` é um processo que nunca termina e consome quase zero CPU.

---

### Dockerfile.newman

Container dedicado à execução dos testes de API com Newman (CLI do Postman). Baseado em Alpine Linux.

**Por que Alpine aqui e Debian no Cypress?**
Alpine usa musl libc em vez de glibc e o gerenciador `apk` em vez do `apt`, resultando em imagens ~5× menores. Newman é puro Node.js e não precisa de libs gráficas, então Alpine é suficiente.

**Separação de responsabilidades**
Cada container tem uma única função. Newman não precisa saber nada sobre Cypress, e vice-versa. Isso facilita manutenção, reduz o tamanho das imagens e isola falhas.

---

### docker-compose.yml

Define toda a infraestrutura do pipeline em um único arquivo.

**Redes**
Criamos uma rede bridge privada `pipeline-net`. Todos os containers nessa rede podem se comunicar pelo nome do serviço (ex: `jenkins`, `newman-runner`). O Docker resolve os nomes via DNS interno automaticamente.

**Volumes**
- `jenkins-data` — persiste o estado do Jenkins (jobs, configurações, credenciais) entre reinicializações do container
- `relatorios-data` — volume **compartilhado** entre `cypress-runner`, `newman-runner` e `relatorio-server`; os runners escrevem relatórios aqui e o nginx serve para o navegador

**Docker-outside-Docker (DooD)**
O socket `/var/run/docker.sock` do host é montado dentro do container Jenkins. Assim o Jenkins consegue chamar `docker exec` nos containers irmãos sem precisar de Docker-in-Docker, que é mais complexo e exige modo privilegiado.

**`depends_on` com `condition: service_healthy`**
Garante que `cypress-runner` e `newman-runner` só iniciam depois que o Jenkins estiver respondendo no endpoint `/login`. Evita erros de timing na inicialização.

**Variáveis de ambiente via `.env`**
O docker-compose lê automaticamente o arquivo `.env` da mesma pasta. As credenciais ficam fora do código-fonte e fora do controle de versão.

**Por que `nginx:alpine` sem Dockerfile customizado?**
A imagem oficial do nginx já faz o que precisamos: servir arquivos estáticos. Não é necessário um Dockerfile quando a imagem oficial atende sem modificações.

---

### Jenkinsfile

Define o pipeline de CI/CD em código (Pipeline as Code). O Jenkins lê este arquivo do repositório Git e executa cada stage automaticamente, garantindo que o pipeline seja versionado junto com o código.

**Pipeline Declarativo vs Scripted**
Existem dois estilos de Jenkinsfile:
- **Declarativo** (este arquivo): estrutura clara e legível com `pipeline { ... }`. Recomendado para a maioria dos casos.
- **Scripted**: mais flexível, usa Groovy puro. Indicado para cenários avançados.

**`agent any`**
Indica que o pipeline pode rodar em qualquer agente disponível. No nosso caso, roda no próprio container Jenkins.

**`options`**
- `timeout` — cancela o pipeline se passar de 30 minutos (evita builds travados)
- `buildDiscarder` — mantém apenas os últimos 5 builds para economizar disco
- `timestamps()` — adiciona data/hora em cada linha do log
- `ansiColor` — habilita cores nos logs
- `disableConcurrentBuilds` — evita que dois builds rodem ao mesmo tempo

**`credentials()`**
Busca segredos cadastrados no Jenkins Credentials Manager pelo ID. Nunca expõe o valor real nos logs — o Jenkins substitui por `****` automaticamente.

**Stages em `parallel`**
O bloco `parallel` executa múltiplos stages ao mesmo tempo. A instalação do Cypress e do Newman ocorre simultaneamente; os três tipos de teste também rodam em paralelo. O Jenkins aguarda todos terminarem antes de avançar.

**`docker exec`**
Roda um comando dentro de um container já em execução. O Jenkins acessa `cypress-runner` e `newman-runner` via socket do Docker montado, sem precisar de SSH.

**`post { success / failure / unstable / always }`**
Ações condicionais executadas após todos os stages. Permitem enviar notificações e coletar artefatos independentemente do resultado.

**`archiveArtifacts`**
Step nativo do Jenkins (sem plugin extra) — salva arquivos do workspace como artefatos do build, acessíveis diretamente na interface do Jenkins. Os relatórios são copiados do volume Docker para o workspace antes do arquivamento.

---

### enviar-email.sh

Script shell chamado pelo Jenkinsfile ao final de cada execução do pipeline.

**`set -euo pipefail`**
Flags de segurança do bash:
- `-e` — encerra se qualquer comando falhar
- `-u` — encerra se usar variável não definida
- `-o pipefail` — propaga o erro de qualquer ponto de um pipe

**Argumentos posicionais**
`$1`, `$2`, `$3` são os argumentos passados na linha de comando. `$0` é o nome do próprio script.

```bash
./enviar-email.sh "sucesso" "http://localhost:8080/job/s07/1/" "aluno@email.com"
```

**Here-doc (`<<EOF`)**
Permite escrever texto multilinha diretamente no script. Usado para compor o corpo do e-mail sem precisar de um arquivo externo.

**Por que `exit 0` mesmo em falha de e-mail?**
A notificação é auxiliar. Um e-mail não entregue não deve mascarar o resultado real dos testes no Jenkins. O pipeline continua normalmente.

**msmtp**
Cliente SMTP leve instalado no `Dockerfile.jenkins`. Lê o e-mail do `stdin` e entrega via SMTP. O pipe `|` passa o corpo do e-mail diretamente para o `msmtp`.

---

### msmtprc.template

Arquivo de configuração do msmtp para Gmail SMTP. Contém placeholders (`GMAIL_USER_PLACEHOLDER`, `GMAIL_PASS_PLACEHOLDER`) substituídos pelas variáveis de ambiente reais no entrypoint do container Jenkins, antes de o Jenkins iniciar.

**Por que usar um template em vez de colocar as credenciais direto?**
Tudo que está no Dockerfile fica registrado no histórico da imagem e pode ser visto com `docker history`. Nunca coloque senhas no Dockerfile. A prática correta é injetar via variáveis de ambiente em runtime.

**Fluxo de injeção de credenciais:**
1. docker-compose injeta `GMAIL_USER` e `GMAIL_PASS` no container Jenkins via `.env`
2. `docker-entrypoint.sh` usa `sed` para substituir os placeholders pelos valores reais
3. O resultado é salvo em `/etc/msmtprc` com permissão `600` (somente o dono pode ler)
4. O msmtp lê `/etc/msmtprc` ao enviar e-mails

**`tls_starttls on` na porta 587**
O Gmail exige conexão criptografada. A porta 587 usa STARTTLS (inicia em texto plano e faz upgrade para TLS). A porta 465 usaria TLS direto (SMTPS).
