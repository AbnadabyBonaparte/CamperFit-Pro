# 🚐 CamperFit Pro

**Plataforma SaaS de Engenharia para Design, Validação e Homologação de Motorhomes e Campers**

## 📋 Visão Geral

CamperFit Pro é a primeira plataforma integrada no Brasil que combina:
- ✨ Visualização 3D intuitiva
- 🔬 Cálculos técnicos rigorosos (CG, elétrica, gás)
- ✅ Conformidade regulatória automática (CONTRAN, NBR 5410, NBR 15264)
- 📊 Otimização de materiais
- 🛒 Marketplace de componentes

## 🚀 Stack Tecnológica

### Frontend
- **React 19** + TypeScript
- **Tailwind CSS 4** + shadcn/ui
- **Three.js** (visualização 3D)
- **Zustand** (state management)
- **TanStack Query** (data fetching)
- **tRPC** (type-safe APIs)

### Backend
- **Node.js 22** + Express 4
- **tRPC 11** (type-safe RPC)
- **Drizzle ORM** + MySQL 8.0+
- **AWS S3** (storage)
- **PDFKit** (PDF generation)
- **dxf-writer** (DXF export)

## 🏗️ Estrutura do Projeto

```
camperfit-pro/
├── client/          # Frontend React
├── server/          # Backend Express + tRPC
├── shared/          # Código compartilhado
├── drizzle/         # Database schema & migrations
└── storage/         # S3 configuration
```

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 22+
- MySQL 8.0+ ou TiDB
- AWS S3 (ou compatível)

### Instalação

```bash
# Instalar dependências
npm install

# Instalar dependências do client e server
cd client && npm install
cd ../server && npm install
```

### Variáveis de Ambiente

Crie arquivos `.env` no `client/` e `server/`:

**server/.env:**
```env
DATABASE_URL="mysql://user:password@localhost:3306/camperfit"
JWT_SECRET="your-secret-key"
S3_BUCKET="camperfit-pro"
S3_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
PORT=3001
```

**client/.env:**
```env
VITE_API_URL="http://localhost:3001"
VITE_TRPC_URL="http://localhost:3001/api/trpc"
```

### Executar

```bash
# Desenvolvimento (client + server)
npm run dev

# Apenas client
npm run dev:client

# Apenas server
npm run dev:server
```

### Banco de Dados

```bash
# Gerar migrações
npm run db:generate

# Aplicar migrações
npm run db:migrate

# Abrir Drizzle Studio
npm run db:studio
```

## 📚 Documentação

Consulte os documentos no repositório:
- `BLUEPRINT_TECNICO_CamperFit_Pro.md` - Arquitetura técnica completa
- `CamperFit Pro — Product Requirements Document (1000_1000).md` - PRD completo
- `EXEMPLOS_JSON_CamperFit_Pro.md` - Exemplos de dados
- `WIREFRAMES_UX_FLOWS.md` - Design e UX

## 📝 Licença

MIT

---

**Desenvolvido com ❤️ para a comunidade de motorhomes brasileira**

