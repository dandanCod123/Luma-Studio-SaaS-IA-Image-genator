# ✨ Luma Studio — SaaS de Geração de Imagens com IA

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Replicate_AI-black?style=for-the-badge&logo=replicate&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" />
  <img src="https://img.shields.io/badge/Neon-Serverless_DB-00E699?style=for-the-badge&logo=neon&logoColor=black" />
  <img src="https://img.shields.io/badge/ImageKit-CDN-FF6C37?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Sentry-Monitoring-362D59?style=for-the-badge&logo=sentry&logoColor=white" />
</p>

<p align="center">
  Plataforma SaaS de geração de imagens com Inteligência Artificial — crie imagens incríveis a partir de prompts de texto usando modelos de ponta como Stable Diffusion e FLUX via Replicate.
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológica](#-stack-tecnológica)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🚀 Sobre o Projeto

O **Luma Studio** é uma aplicação SaaS fullstack que permite a qualquer usuário gerar imagens de alta qualidade a partir de descrições em texto, utilizando modelos de IA generativa disponibilizados via **Replicate** e o **AI SDK da Vercel**.

A plataforma conta com autenticação robusta via **Clerk**, armazenamento e entrega otimizada de imagens pelo **ImageKit**, banco de dados serverless com **Neon (PostgreSQL)** e monitoramento de erros em produção com **Sentry** — uma stack moderna, escalável e pronta para produção.

---

## ✨ Funcionalidades

- 🖼️ **Geração de imagens com IA** — criação de imagens a partir de prompts via Replicate (Stable Diffusion, FLUX e outros)
- 🤖 **Integração com AI SDK** — suporte a modelos OpenAI para processamento de prompts e sugestões
- 🔐 **Autenticação completa** — login, registro e gerenciamento de sessão com Clerk
- 🎨 **Temas personalizados** — suporte a dark/light mode com Clerk Themes + next-themes
- 📁 **Armazenamento e CDN** — upload e entrega otimizada de imagens via ImageKit
- 🗄️ **Banco serverless** — persistência de dados com Neon Database + Drizzle ORM
- 🐛 **Monitoramento** — rastreamento de erros em produção com Sentry (client, server e edge)
- 🎞️ **Animações fluidas** — transições e animações com Motion (Framer Motion)
- 🧩 **UI moderna** — componentes com shadcn/ui + Radix UI + Tailwind CSS 4

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS 4 + shadcn/ui |
| Geração de IA | Replicate API |
| AI SDK | Vercel AI SDK + OpenAI |
| Autenticação | Clerk |
| ORM | Drizzle ORM |
| Banco de Dados | Neon (PostgreSQL Serverless) |
| Storage / CDN | ImageKit |
| Monitoramento | Sentry |
| Animações | Motion (Framer Motion) |

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- Conta no [Clerk](https://clerk.com/) — autenticação
- Conta no [Replicate](https://replicate.com/) — geração de imagens com IA
- Conta no [Neon](https://neon.tech/) — banco de dados serverless
- Conta no [ImageKit](https://imagekit.io/) — storage e CDN de imagens
- Conta no [Sentry](https://sentry.io/) — monitoramento (opcional para dev)
- Conta na [OpenAI](https://platform.openai.com/) — modelos de linguagem (opcional)

---

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/dandanCod123/Luma-Studio-SaaS-IA-Image-genator.git
cd Luma-Studio-SaaS-IA-Image-genator
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o `.env.local` com suas chaves (veja a seção abaixo).

### 4. Execute as migrations do banco

```bash
npm run db:push
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Clerk — Autenticação
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Neon — Banco de dados serverless
DATABASE_URL=postgresql://usuario:senha@host.neon.tech/neondb?sslmode=require

# Replicate — Geração de imagens com IA
REPLICATE_API_TOKEN=r8_...

# OpenAI — AI SDK
OPENAI_API_KEY=sk-...

# ImageKit — Storage e CDN
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/seu_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_...
IMAGEKIT_PRIVATE_KEY=private_...

# Sentry — Monitoramento
SENTRY_DSN=https://...@sentry.io/...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=sntrys_...
```

> ⚠️ **Nunca** commite arquivos `.env` ou `.env.local` no repositório. Eles já estão listados no `.gitignore`.

---

## 📜 Scripts Disponíveis

```bash
npm run dev       # Inicia o servidor de desenvolvimento
npm run build     # Gera o build de produção
npm run start     # Inicia o servidor em modo produção
npm run lint      # Executa o ESLint
npm run db:push   # Aplica o schema do Drizzle ORM no banco (Neon)
```

---

## 📁 Estrutura do Projeto

```
Luma-Studio-SaaS-IA-Image-genator/
├── app/                        # Rotas e páginas (Next.js App Router)
│   ├── (auth)/                 # Rotas de autenticação (Clerk)
│   ├── (dashboard)/            # Área autenticada
│   └── api/                    # API Routes (geração de imagem, upload, etc.)
├── components/                 # Componentes reutilizáveis de UI
├── context/                    # React Context providers
├── db/                         # Schema e configuração do Drizzle ORM + Neon
├── lib/                        # Utilitários, helpers e configurações
├── public/                     # Assets estáticos
├── drizzle.config.ts           # Configuração do Drizzle ORM
├── instrumentation.ts          # Instrumentação do Sentry (server)
├── instrumentation-client.ts   # Instrumentação do Sentry (client)
├── sentry.server.config.ts     # Config Sentry servidor
├── sentry.edge.config.ts       # Config Sentry edge runtime
├── next.config.ts              # Configuração do Next.js
└── package.json
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature: `git checkout -b feat/minha-feature`
3. Commit suas alterações: `git commit -m 'feat: adiciona minha feature'`
4. Push para a branch: `git push origin feat/minha-feature`
5. Abra um Pull Request

Por favor, siga o padrão de commits [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">Feito com ❤️ e ✨ IA por <a href="https://github.com/dandanCod123">dandanCod123</a></p>
