# Prova LDM-CI - Willian Garcia

## 🚀 Pipeline CI + CRUD em Node.js / TypeScript

Projeto desenvolvido para a Prova 2 de Laboratório de Desenvolvimento Multiplataforma, com foco em Integração Contínua (CI) utilizando GitHub Actions e implementação de um CRUD simples, porém completo, com TypeScript, Express e Jest.

## 📘 Sobre o Projeto

Este projeto consiste em uma API REST para gerenciamento de Itens, utilizando Express com TypeScript.
Todos os endpoints possuem validações utilizando Zod, e os testes incluem tanto testes unitários quanto testes E2E com Supertest.

O objetivo principal é demonstrar:
- Uso correto de TypeScript em um backend Node.js
- Criação de testes unitários e de integração
- Configuração de um pipeline CI moderno usando GitHub Actions
- Boas práticas de organização de camadas (controllers, routes, repositories)

## 🛠 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Zod
- Jest
- Supertest
- GitHub Actions
- npm

## 📁 Estrutura do Projeto

```
prova-ci-willian-garcia/
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── controllers/
│   │   └── items.controller.ts
│   ├── repositories/
│   │   └── inMemoryItemRepo.ts
│   ├── routes/
│   │   └── items.ts
│   └── utils/
│       └── validate.ts
├── tests/
│   ├── items.e2e.test.ts
│   ├── unit/
│   │   ├── controllers/items.controller.unit.test.ts
│   │   ├── repositories/inMemoryItemRepo.unit.test.ts
│   │   └── utils/validate.unit.test.ts
├── tsconfig.json
├── jest.config.cjs
└── package.json
```

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- npm

### Instalação

```
git clone https://github.com/seu-usuario/prova-ci-willian-garcia.git
cd prova-ci-willian-garcia
npm install
```

### Rodar Build

```
npm run build
```

### Rodar Testes

```
npm test
```

### Rodar a API

```
npm start
```

A API estará em: http://localhost:3000

## 📌 Endpoints

| Método | Rota | Descrição |
|--------|------|------------|
| GET | /health | Status |
| GET | /api/items | Lista |
| GET | /api/items/:id | Obtém item |
| POST | /api/items | Cria item |
| PUT | /api/items/:id | Atualiza item |
| DELETE | /api/items/:id | Remove item |

## 🔄 CI/CD com GitHub Actions

Pipeline localizado em `.github/workflows/ci.yml`.

Executa automaticamente em:
- Push para qualquer branch
- Pull Requests para main

Etapas:
1. Checkout do repositório  
2. Configuração do Node.js  
3. Instalação limpa (`npm ci`)  
4. Testes (`npm test`)  
5. Build (`npm run build`)  

## 🧪 Testes

Incluí:
- Testes unitários (utils, repo, controller)
- Testes E2E (CRUD completo)
- Cobertura completa via Jest

## 👤 Autor

**Willian Garcia**

Projeto desenvolvido para fins acadêmicos.
