# 🚐 CamperFit Pro

**Plataforma SaaS de Engenharia para Design, Validação e Homologação de Motorhomes e Campers**

[![Status](https://img.shields.io/badge/status-MVP%20Complete-success)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

---

## 📋 Visão Geral

CamperFit Pro é a primeira plataforma integrada no Brasil que combina:
- ✨ Visualização 3D intuitiva
- 🔬 Cálculos técnicos rigorosos (CG, elétrica, gás)
- ✅ Conformidade regulatória automática (CONTRAN, NBR 5410, NBR 15264)
- 📊 Otimização de materiais
- 🛒 Marketplace de componentes

**Status:** MVP Completo - Pronto para Beta 🎯

---

## 🚀 Stack Tecnológica

### Frontend
- **React 19** + TypeScript
- **Tailwind CSS 4** + Temas customizáveis
- **Three.js** (visualização 3D)
- **Zustand** (state management)
- **TanStack Query** (data fetching)
- **tRPC** (type-safe APIs)
- **Supabase** (autenticação)

### Backend
- **Node.js 22** + Express 4
- **tRPC 11** (type-safe RPC)
- **Drizzle ORM** + MySQL 8.0+
- **AWS S3** (storage)
- **PDFKit** (PDF generation)
- **dxf-writer** (DXF export)

---

## 🏗️ Estrutura do Projeto

```
camperfit-pro/
├── client/          # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Canvas/      # Canvas 2D/3D
│   │   │   ├── Editor/      # Componentes do editor
│   │   │   └── Theme/       # Temas visuais
│   │   ├── constants/       # Bibliotecas (veículos, materiais, componentes)
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Páginas
│   │   └── stores/          # Zustand stores
│   └── package.json
├── server/          # Backend Express + tRPC
│   ├── routers/     # Routers tRPC
│   ├── calculators/ # Calculadoras (CG, elétrica, gás)
│   └── exporters/   # Exportadores (PDF, JSON, DXF, PNG)
├── shared/          # Código compartilhado
├── drizzle/         # Database schema & migrations
└── README.md
```

---

## 🛠️ Instalação e Setup

### Pré-requisitos

- Node.js 22+
- MySQL 8.0+ ou TiDB
- Supabase account (para autenticação)
- AWS S3 (ou compatível, opcional para MVP)

### 1. Instalar Dependências

```bash
# Instalar dependências do monorepo
npm install

# Instalar dependências do client
cd client && npm install

# Instalar dependências do server
cd ../server && npm install
```

### 2. Configurar Variáveis de Ambiente

**client/.env:**
```env
VITE_API_URL="http://localhost:3001"
VITE_TRPC_URL="http://localhost:3001/api/trpc"
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

**server/.env:**
```env
DATABASE_URL="mysql://user:password@localhost:3306/camperfit"
JWT_SECRET="your-secret-key"
S3_BUCKET="camperfit-pro"
S3_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
PORT=3001
CORS_ORIGIN="http://localhost:5173"
```

### 3. Setup Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Copie a URL e Anon Key para `client/.env`
3. Configure Authentication providers (Email, Google OAuth)

### 4. Setup Database

```bash
# Executar migrations
cd server
npm run db:push  # ou db:migrate conforme configuração Drizzle
```

### 5. Executar

```bash
# Desenvolvimento (client + server)
npm run dev

# Apenas client
cd client && npm run dev

# Apenas server
cd server && npm run dev
```

---

## 🎨 Funcionalidades Principais

### ✅ MVP Completo

- **Editor 3D Completo**
  - Visualização 3D com Three.js
  - Drag-and-drop de componentes
  - Undo/Redo (50 níveis)
  - Seleção e edição de propriedades

- **Biblioteca de Componentes**
  - 20 componentes essenciais
  - Dormitório, Cozinha, Armazenamento, Elétrica, Hidráulica, Mobiliário
  - Filtros e busca

- **Veículos e Materiais**
  - 8 veículos brasileiros (Mahindra, Toyota, Ford, etc.)
  - 16 materiais catalogados
  - Shell paramétrica 3D

- **Cálculos em Tempo Real**
  - Peso total (componentes + shell)
  - Centro de Gravidade (X, Y, Z)
  - Payload usado/disponível
  - Validações automáticas

- **Autenticação**
  - Login/Registro com email/senha
  - Login com Google OAuth
  - Proteção de rotas
  - Sessão persistente

- **Temas Visuais**
  - Daylight (claro)
  - Expedition (dark)
  - Blueprint (técnico azul)
  - Raiz (verde/madeira)

---

## 📊 Roadmap Fase 2

### Marketplace (3 meses)
- 1000+ componentes catalogados
- Filtros avançados
- Preços e fornecedores reais
- Integração com catálogos

### Export Completo (2 meses)
- DXF otimizado para CNC
- PDF técnico completo
- PNG em alta resolução
- JSON estruturado

### Conformidade Regulatória (3 meses)
- Validação CONTRAN automatizada
- NBR 5410 (elétrica)
- NBR 15264 (gás)
- Relatórios de conformidade

### Templates e Comunidade (2 meses)
- 50+ templates de projetos
- Galeria pública
- Compartilhamento de projetos
- Comunidade de builders

---

## 📸 Screenshots

_Adicionar screenshots do MVP aqui_

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue antes de fazer grandes mudanças.

---

## 📄 Licença

MIT License - veja LICENSE para detalhes

---

## 🙏 Agradecimentos

Desenvolvido com ❤️ para a comunidade de builders de campers no Brasil 🇧🇷

---

**Status:** ✅ MVP Completo - Pronto para Beta
