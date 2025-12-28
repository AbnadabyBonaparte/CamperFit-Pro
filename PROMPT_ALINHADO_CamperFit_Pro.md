# 🚀 Prompt Alinhado para AI Studio — CamperFit Pro

**Versão:** 2.0 | **Data:** 28 de Dezembro de 2025 | **Alinhado com:** Blueprint Técnico do Repositório

---

## INSTRUÇÕES DE USO

1. Copie o **PROMPT PRINCIPAL** abaixo (seção 1)
2. Cole no **AI Studio** (ou qualquer LLM com capacidade de build)
3. Aguarde o build ser gerado
4. Teste o app funcional resultante
5. Se precisar de ajustes, use os **PROMPTS SECUNDÁRIOS** (seção 2)

---

## 1. PROMPT PRINCIPAL (COPIE E COLE NO AI STUDIO)

```
===========================================
PROJETO: CamperFit Pro — Engenharia de Motorhomes
===========================================

CONTEXTO:
Você é um especialista em desenvolvimento full-stack. Sua tarefa é gerar um app web funcional chamado "CamperFit Pro" — uma plataforma SaaS para design, engenharia e homologação de motorhomes no Brasil.

OBJETIVO:
Criar um app MVP (Minimum Viable Product) com as funcionalidades essenciais, seguindo a arquitetura técnica especificada, pronto para testar em produção.

---

ESPECIFICAÇÃO FUNCIONAL:

1. AUTENTICAÇÃO
   - Login com email/senha (MVP simples, preparado para Manus OAuth futuro)
   - Registro de novo usuário
   - Sessão persistente com cookies
   - Perfil do usuário (nome, email, plano: Starter/Pro/Enterprise, role: user/admin/professional/enterprise)

2. DASHBOARD
   - Listagem de projetos do usuário (com paginação)
   - Botão "Novo Projeto"
   - Botão "Importar Projeto (JSON)"
   - Cards com status: "Completo", "Em Progresso", "Rascunho", "Arquivado"
   - Ações: Abrir, Duplicar, Compartilhar (link read-only ou edit), Deletar
   - Filtros por status e tipo de veículo
   - Busca por nome

3. EDITOR PRINCIPAL
   - Canvas 2D com grid ajustável (50mm padrão)
   - Canvas 3D com Three.js (modo alternativo)
   - Drag-and-drop de componentes
   - Biblioteca de 200+ componentes pré-construídos (móveis, utilitários, elétricos, gás, estruturais)
   - Sidebar com lista de componentes do projeto (árvore)
   - Property Panel à direita (editar posição X/Y/Z, rotação X/Y/Z, peso, cor, material, propriedades customizadas)
   - Camadas (layers) com visibilidade toggle
   - Undo/Redo (50 níveis)
   - Zoom, pan, fit-to-screen
   - Modo first-person (visualização dentro do veículo)

4. CALCULADORAS (TEMPO REAL)
   - CG (Centro de Gravidade): X, Y, Z, altura do CG, distribuição por eixo (front/rear %), status (safe/warning/critical), risco de tombamento
   - Elétrica: Carga total (W), corrente total (A), autonomia (horas/dias), seção de cabos (mm²), queda de tensão (%), disjuntores recomendados
   - Gás: Autonomia (dias), consumo total (kg/dia), ventilação necessária (m³/h), checklist NBR 15264
   - Deflexão: Estimativa de deflexão da suspensão (mm), análise de pontos críticos
   - Conformidade: Validação CONTRAN 993/23, NBR 5410, NBR 15264, INMETRO

5. RELATÓRIOS
   - CG Report: Layout + cálculos detalhados + visualização gráfica + recomendações
   - Electrical Report: Diagrama unifilar automático (SVG) + lista de materiais (BOM) + especificações de cabos
   - Gas Report: Esquema de tubulação + checklist de segurança + autonomia
   - Compliance Report: Checklist completo CONTRAN + NBR 5410 + NBR 15264 + status geral + próximos passos

6. EXPORTAÇÃO
   - PDF: Relatório completo com layout, cálculos, diagramas, checklist de conformidade
   - PNG: Imagem do layout (resolução configurável)
   - DXF: Arquivo CAD para CNC ou corte manual (obrigatório para Fase 2)
   - JSON: Dados completos do projeto (importável)
   - CSV: Lista de componentes e materiais (BOM)

7. MARKETPLACE (MVP)
   - Listagem de componentes disponíveis (futuro: 1000+)
   - Filtro por categoria (Móveis, Elétrica, Gás, Estrutural, Utilitários)
   - Busca por nome
   - Botão "Adicionar ao Projeto"
   - Preço indicativo (R$)
   - Fornecedor (nome)

8. COMUNIDADE (MVP BÁSICO)
   - Galeria de projetos públicos (últimos 10)
   - Botão "Compartilhar Projeto" (toggle público/privado)
   - Visualização read-only de projetos públicos

---

ESPECIFICAÇÃO TÉCNICA (SEGUIR EXATAMENTE):

STACK OBRIGATÓRIA:
- Frontend: React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui
- State Management: Zustand 4.x
- Data Fetching: TanStack Query 5.x
- 3D Graphics: Three.js r128+
- Backend: Node.js 22 + Express 4.21+
- RPC: tRPC 11.x (NÃO REST API - usar tRPC obrigatoriamente)
- ORM: Drizzle 0.44+
- Database: MySQL 8.0+ ou TiDB (via Drizzle)
- Storage: AWS S3 (ou compatível)
- Auth: JWT simples (MVP), preparado para Manus OAuth
- Cálculos: Numeric.js 1.x (operações matriciais)
- PDF: PDFKit 0.13+
- DXF: dxf-writer 1.x
- Build: Vite
- Type Safety: TypeScript estrito

ESTRUTURA DE DIRETÓRIOS OBRIGATÓRIA:

```
camperfit-pro/
├── client/                          # Frontend React
│   ├── public/
│   │   ├── icons/                   # SVG icons
│   │   └── templates/               # Modelos 3D (futuro)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx        # Lista de projetos
│   │   │   ├── Editor.tsx           # Editor principal
│   │   │   ├── Reports.tsx          # Relatórios (CG, elétrica, gás)
│   │   │   ├── Marketplace.tsx      # Marketplace de componentes
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── Canvas/
│   │   │   │   ├── Canvas3D.tsx     # Renderização Three.js
│   │   │   │   ├── Grid.tsx         # Grid visual
│   │   │   │   └── Controls.tsx     # Controles de câmera
│   │   │   ├── PropertyPanel/
│   │   │   │   ├── PropertyPanel.tsx
│   │   │   │   ├── ComponentForm.tsx
│   │   │   │   └── PropertyInputs.tsx
│   │   │   ├── Calculators/
│   │   │   │   ├── CGCalculator.tsx
│   │   │   │   ├── ElectricalCalculator.tsx
│   │   │   │   ├── GasCalculator.tsx
│   │   │   │   └── ComplianceCalculator.tsx
│   │   │   ├── Dialogs/
│   │   │   │   ├── ExportDialog.tsx
│   │   │   │   ├── ShareDialog.tsx
│   │   │   │   └── SettingsDialog.tsx
│   │   │   └── ui/                  # shadcn/ui components
│   │   ├── hooks/
│   │   │   ├── useProject.ts        # Project CRUD (TanStack Query)
│   │   │   ├── useCalculations.ts   # Cálculos
│   │   │   ├── useExport.ts         # Exportação
│   │   │   └── useAuth.ts           # Autenticação
│   │   ├── lib/
│   │   │   ├── trpc.ts              # tRPC client setup
│   │   │   ├── calculations/        # Lógica de cálculos
│   │   │   │   ├── centerOfGravity.ts
│   │   │   │   ├── electrical.ts
│   │   │   │   ├── gas.ts
│   │   │   │   └── deflection.ts
│   │   │   └── utils.ts
│   │   ├── contexts/
│   │   │   └── ProjectContext.tsx   # Context para projeto atual
│   │   ├── stores/                  # Zustand stores
│   │   │   ├── projectStore.ts
│   │   │   └── uiStore.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/                          # Backend Express
│   ├── routers/                     # tRPC routers
│   │   ├── projects.ts              # CRUD de projetos
│   │   ├── components.ts            # Biblioteca de componentes
│   │   ├── calculations.ts          # Cálculos (CG, elétrica, gás)
│   │   ├── export.ts                # Exportação (PDF, DXF, PNG)
│   │   └── marketplace.ts           # Marketplace
│   ├── db.ts                        # Drizzle helpers
│   ├── storage.ts                   # S3 helpers
│   ├── calculators/                 # Lógica de cálculos
│   │   ├── centerOfGravity.ts
│   │   ├── electrical.ts
│   │   ├── gas.ts
│   │   ├── deflection.ts
│   │   └── compliance.ts
│   ├── exporters/                   # Exportadores
│   │   ├── pdfExporter.ts
│   │   ├── dxfExporter.ts
│   │   ├── pngExporter.ts
│   │   └── jsonExporter.ts
│   └── _core/
│       ├── index.ts                 # Entry point
│       ├── context.ts               # tRPC context
│       ├── trpc.ts                  # tRPC setup
│       ├── env.ts                   # Environment variables
│       ├── cookies.ts               # Cookie management
│       └── auth.ts                  # Auth helpers
├── drizzle/
│   ├── schema.ts                    # Database schema (Drizzle)
│   └── migrations/                  # Migration files
├── shared/
│   ├── const.ts                     # Constantes
│   ├── types.ts                     # Tipos compartilhados
│   └── validators.ts                # Validadores Zod
├── package.json
├── tsconfig.json
├── vite.config.ts
├── drizzle.config.ts
└── README.md
```

ESTRUTURA DE DADOS (SEGUIR EXATAMENTE):

User {
  id: INT (AUTO_INCREMENT PRIMARY KEY)
  openId: VARCHAR(64) UNIQUE
  name: TEXT
  email: VARCHAR(320)
  loginMethod: VARCHAR(64)
  role: ENUM('user', 'admin', 'professional', 'enterprise') DEFAULT 'user'
  plan: ENUM('starter', 'pro', 'enterprise') DEFAULT 'starter'
  subscriptionStatus: ENUM('active', 'paused', 'cancelled') DEFAULT 'active'
  createdAt: TIMESTAMP
  updatedAt: TIMESTAMP
  lastSignedIn: TIMESTAMP
}

Project {
  id: VARCHAR(36) PRIMARY KEY (UUID)
  userId: INT (FOREIGN KEY -> users.id)
  name: VARCHAR(255)
  description: TEXT
  vehicleType: ENUM('sprinter', 'kombi', 'furgao', 'trailer', 'custom') DEFAULT 'custom'
  length: FLOAT (mm)
  width: FLOAT (mm)
  height: FLOAT (mm)
  wheelbase: FLOAT (mm)
  maxGVWR: FLOAT (kg)
  totalWeight: FLOAT (kg) [calculado]
  cgX: FLOAT (mm) [calculado]
  cgY: FLOAT (mm) [calculado]
  cgZ: FLOAT (mm) [calculado]
  cgHeight: FLOAT (mm) [calculado]
  weightDistributionFront: FLOAT (%) [calculado]
  weightDistributionRear: FLOAT (%) [calculado]
  deflection: FLOAT (mm) [calculado]
  fuelConsumption: FLOAT (km/l) [calculado]
  status: ENUM('draft', 'in_progress', 'completed', 'archived') DEFAULT 'draft'
  version: INT DEFAULT 1
  createdAt: TIMESTAMP
  updatedAt: TIMESTAMP
}

ProjectComponent {
  id: VARCHAR(36) PRIMARY KEY (UUID)
  projectId: VARCHAR(36) (FOREIGN KEY -> projects.id)
  componentLibraryId: VARCHAR(36) (FOREIGN KEY -> component_library.id)
  posX: FLOAT (mm)
  posY: FLOAT (mm)
  posZ: FLOAT (mm)
  rotationX: FLOAT (degrees)
  rotationY: FLOAT (degrees)
  rotationZ: FLOAT (degrees)
  length: FLOAT (mm)
  width: FLOAT (mm)
  height: FLOAT (mm)
  weight: FLOAT (kg)
  material: VARCHAR(255)
  color: VARCHAR(7) (hex)
  electricalPower: FLOAT (W) [opcional]
  electricalVoltage: INT (V) [opcional]
  gasConsumption: FLOAT (kg/day) [opcional]
  waterCapacity: FLOAT (liters) [opcional]
  customProperties: JSON
  notes: TEXT
  createdAt: TIMESTAMP
  updatedAt: TIMESTAMP
}

ComponentLibrary {
  id: VARCHAR(36) PRIMARY KEY (UUID)
  category: ENUM('furniture', 'utility', 'structural', 'electrical', 'gas') NOT NULL
  name: VARCHAR(255) NOT NULL
  description: TEXT
  length: FLOAT (mm)
  width: FLOAT (mm)
  height: FLOAT (mm)
  weight: FLOAT (kg)
  material: VARCHAR(255)
  price: FLOAT (R$)
  supplier: VARCHAR(255)
  imageUrl: VARCHAR(512)
  electricalPower: FLOAT (W) [opcional]
  electricalVoltage: INT (V) [opcional]
  gasConsumption: FLOAT (kg/day) [opcional]
  waterCapacity: FLOAT (liters) [opcional]
  isActive: BOOLEAN DEFAULT TRUE
  createdAt: TIMESTAMP
  updatedAt: TIMESTAMP
}

Calculation {
  id: VARCHAR(36) PRIMARY KEY (UUID)
  projectId: VARCHAR(36) (FOREIGN KEY -> projects.id)
  type: ENUM('centerOfGravity', 'electrical', 'gas', 'deflection', 'compliance') NOT NULL
  result: JSON NOT NULL
  status: ENUM('valid', 'warning', 'critical') DEFAULT 'valid'
  issues: JSON (array de problemas)
  createdAt: TIMESTAMP
}

Export {
  id: VARCHAR(36) PRIMARY KEY (UUID)
  projectId: VARCHAR(36) (FOREIGN KEY -> projects.id)
  userId: INT (FOREIGN KEY -> users.id)
  format: ENUM('pdf', 'png', 'dxf', 'json') NOT NULL
  fileKey: VARCHAR(512) (S3 key)
  fileUrl: VARCHAR(512) (S3 URL)
  fileSize: INT (bytes)
  createdAt: TIMESTAMP
}

---

APIS tRPC (IMPLEMENTAR EXATAMENTE):

server/routers/projects.ts:
- projects.list (query) - Listar projetos do usuário (com paginação)
- projects.get (query) - Obter projeto específico
- projects.create (mutation) - Criar novo projeto
- projects.update (mutation) - Atualizar projeto
- projects.delete (mutation) - Deletar projeto
- projects.duplicate (mutation) - Duplicar projeto

server/routers/components.ts:
- components.list (query) - Listar biblioteca de componentes (com filtro)
- components.get (query) - Obter componente específico
- components.addToProject (mutation) - Adicionar componente ao projeto
- components.updateInProject (mutation) - Atualizar componente no projeto
- components.removeFromProject (mutation) - Remover componente do projeto

server/routers/calculations.ts:
- calculations.calculateCG (mutation) - Calcular centro de gravidade
- calculations.calculateElectrical (mutation) - Calcular sistema elétrico
- calculations.calculateGas (mutation) - Calcular sistema de gás
- calculations.validateCompliance (mutation) - Validar conformidade

server/routers/export.ts:
- export.toPDF (mutation) - Exportar para PDF
- export.toDXF (mutation) - Exportar para DXF
- export.toPNG (mutation) - Exportar para PNG
- export.toJSON (mutation) - Exportar para JSON

server/routers/marketplace.ts:
- marketplace.list (query) - Listar componentes do marketplace (com filtros)
- marketplace.get (query) - Obter componente específico

---

LÓGICA DE CÁLCULOS (IMPLEMENTAR):

CG (Centro de Gravidade):
- Fórmula: CG = (Σ(m*x)/Σm, Σ(m*y)/Σm, Σ(m*z)/Σm)
- Zona segura: 20-40% do wheelbase
- Distribuição por eixo: front = ((wheelbase - cgX) / wheelbase) * 100
- Risco de tombamento: altura do CG > (width / 2) = alto risco
- Status: safe (dentro da zona), warning (próximo), critical (fora da zona)

Elétrica:
- Corrente: I = P / V
- Queda de tensão: ΔV = (2 * ρ * L * I) / A (onde ρ = 0.0175 Ω/mm² para cobre)
- Autonomia: horas = (Capacidade_bateria_Ah * V) / (Carga_total_W / V)
- Seção de cabo: usar tabela NBR 5410 (simplificada para MVP)

Gás:
- Consumo total: Σ(consumo_appliance * horas_uso)
- Autonomia: dias = capacidade_cilindro_kg / consumo_total_kg_dia
- Ventilação: mínimo 2 aberturas (superior e inferior)
- Conformidade NBR 15264: validar isolamento, tubulação, válvulas

---

DESIGN SYSTEM:

Cores (Tailwind 4 OKLCH):
- Primary: oklch(65% 0.15 250) (blue-600)
- Success: oklch(72% 0.15 142) (green-600)
- Warning: oklch(80% 0.15 86) (yellow-600)
- Error: oklch(65% 0.20 25) (red-600)
- Neutral: oklch(55% 0.02 0) (gray-600)

Tipografia:
- Font: Inter (Google Fonts)
- H1: 32px, weight 700, line-height 1.2
- H2: 24px, weight 600, line-height 1.3
- Body: 16px, weight 400, line-height 1.5

Componentes (shadcn/ui):
- Buttons: rounded-lg, px-4 py-2
- Cards: rounded-xl, border-1 border-gray-200, shadow-sm
- Inputs: rounded-lg, border-1 border-gray-300

---

FLUXO DE USUÁRIO:

1. Usuário acessa app → Landing page com CTA "Começar Gratuitamente"
2. Clica → Redireciona para /register
3. Registra email/senha → Cria conta (JWT token)
4. Login automático → Redireciona para /dashboard
5. Dashboard mostra lista de projetos (vazia inicialmente) + botão "Novo Projeto"
6. Clica "Novo Projeto" → Dialog com:
   - Tipo de veículo (Sprinter, Kombi, Furgão, Trailer, Custom)
   - Dimensões (com valores padrão baseados no tipo)
   - Nome do projeto
7. Clica "Criar" → Backend cria projeto via tRPC projects.create
8. Frontend redireciona para /editor/{projectId}
9. Editor carrega com canvas vazio (2D grid)
10. Sidebar mostra biblioteca de componentes
11. Usuário arrasta componente para canvas
12. Frontend chama tRPC components.addToProject
13. Frontend chama tRPC calculations.calculateCG (automaticamente)
14. Calculadoras atualizam em tempo real (Zustand store)
15. Usuário edita propriedades no PropertyPanel
16. Cálculos recalculam automaticamente
17. Usuário clica "Exportar" → Dialog com opções (PDF, PNG, DXF, JSON)
18. Seleciona "PDF" → Backend gera PDF via PDFKit, faz upload para S3
19. Frontend recebe URL e faz download

---

REQUISITOS DE QUALIDADE:

✅ Responsivo (mobile, tablet, desktop)
✅ Performance: <1s para carregar editor, <100ms para calcular CG
✅ Acessibilidade: WCAG 2.1 AA (contraste, keyboard, screen reader)
✅ Segurança: Validação de entrada (Zod), CORS, rate limiting
✅ UX: Feedback visual (loading, toast, confirmação)
✅ Type Safety: TypeScript estrito, tipos compartilhados entre frontend/backend
✅ Testes: Testes unitários para calculadoras (Jest/Vitest) - opcional no MVP

---

COMPONENTES PRÉ-CONSTRUÍDOS (BIBLIOTECA MÍNIMA - 50+):

Móveis:
- Cama (solteiro, casal, queen)
- Sofá
- Mesa (retrátil, fixa)
- Armário
- Geladeira
- Fogão (1, 2, 3 queimadores)

Utilitários:
- Tanque de água (50L, 100L, 150L)
- Cilindro GLP (P-13, P-20, P-30)
- Bateria (chumbo-ácido, LiFePO4 - várias capacidades)
- Painel solar (100W, 200W, 400W)

Elétrica:
- Inversor (500W, 1000W, 2000W)
- Carregador
- Disjuntor
- Relé
- Cabo (várias seções)

Gás:
- Regulador
- Tubulação
- Válvula
- Fogão a gás
- Aquecedor

Estrutural:
- Janela
- Porta
- Eixo (simplificado)
- Suspensão (simplificado)

---

ENTREGA ESPERADA:

1. App web funcional em React 19 + TypeScript + Tailwind 4
2. Backend em Express 4 + tRPC 11 + Node.js 22
3. Banco de dados MySQL com Drizzle ORM
4. Autenticação JWT (login/registro)
5. Dashboard com CRUD de projetos (via tRPC)
6. Editor 2D/3D com drag-and-drop (Three.js)
7. 4 calculadoras (CG, elétrica, gás, conformidade)
8. Exportação (PDF, PNG, DXF, JSON) via S3
9. Marketplace MVP (50+ componentes)
10. Galeria de projetos públicos
11. Responsivo e acessível
12. Pronto para deploy (Docker, Vercel + Railway)

---

PRIORIDADE DE IMPLEMENTAÇÃO:

FASE 1 (MVP MÍNIMO):
1. Setup: Estrutura de pastas, tRPC, Drizzle, MySQL
2. Autenticação: Login/registro JWT
3. Dashboard: CRUD de projetos (tRPC)
4. Editor 2D: Canvas com drag-and-drop básico
5. Biblioteca: 20 componentes essenciais
6. Calculadora CG: Cálculo básico
7. Exportação JSON

FASE 2 (EXPANSÃO):
1. Editor 3D: Three.js integrado
2. Calculadoras completas: Elétrica, Gás, Conformidade
3. Exportação PDF: Relatório completo
4. Marketplace: 50+ componentes
5. Exportação PNG/DXF

FASE 3 (POLISH):
1. Performance: Otimização, lazy loading
2. Testes: Unitários para calculadoras
3. Acessibilidade: WCAG 2.1 AA
4. Deploy: Produção

---

NOTAS IMPORTANTES:

- OBRIGATÓRIO usar tRPC (não REST API)
- OBRIGATÓRIO usar Drizzle ORM (não Prisma/TypeORM)
- OBRIGATÓRIO usar TanStack Query no frontend
- OBRIGATÓRIO usar Zustand para state management
- Preparar para Manus OAuth (mas usar JWT simples no MVP)
- Cálculos devem seguir fórmulas exatas do blueprint
- Exportação DXF é obrigatória (usar dxf-writer)
- Deploy: Vercel (frontend) + Railway/Render (backend) + AWS S3 (storage) + MySQL (PlanetScale/Railway)

---

COMECE AGORA:

1. Criar estrutura de pastas completa (client/, server/, shared/, drizzle/)
2. Setup tRPC (server/_core/trpc.ts, client/lib/trpc.ts)
3. Setup Drizzle (drizzle/schema.ts, drizzle.config.ts)
4. Setup MySQL (local ou cloud)
5. Setup autenticação JWT (server/_core/auth.ts)
6. Criar routers tRPC (projects, components, calculations, export)
7. Implementar calculadoras (server/calculators/)
8. Implementar frontend (React + Tailwind + shadcn/ui)
9. Integrar Three.js para 3D
10. Implementar exportadores (PDF, DXF, PNG)
11. Testar tudo
12. Deploy

Boa sorte! 🚀

===========================================
```

---

## COMPARAÇÃO: Prompt Original vs Alinhado

| Aspecto | Prompt Original | Prompt Alinhado | Alinhamento |
|---------|----------------|-----------------|-------------|
| **Stack Backend** | Express OU Firebase | Express + tRPC (obrigatório) | ✅ 100% |
| **Database** | Firebase OU PostgreSQL | MySQL/TiDB + Drizzle | ✅ 100% |
| **State Management** | Não menciona | Zustand + TanStack Query | ✅ 100% |
| **Export DXF** | Não menciona | Obrigatório (dxf-writer) | ✅ 100% |
| **Estrutura** | Genérica | Específica do blueprint | ✅ 100% |
| **APIs** | REST genérico | tRPC routers específicos | ✅ 100% |
| **Schemas** | Simplificados | Completos do blueprint | ✅ 100% |
| **Cálculos** | Básicos | Fórmulas detalhadas | ✅ 95% |
| **Componentes** | 50+ | 200+ (escalável) | ✅ 90% |
| **Auth** | Firebase OU JWT | JWT (preparado OAuth) | ✅ 90% |

**Alinhamento Geral: 95%+** ✅

---

## PRÓXIMOS PASSOS

1. Use o **PROMPT ALINHADO** acima no AI Studio
2. Valide que tRPC está sendo usado (não REST)
3. Valide que Drizzle está sendo usado (não Prisma)
4. Valide que estrutura de pastas está correta
5. Teste as APIs tRPC conforme blueprint
6. Valide exportação DXF funciona
7. Compare com blueprint técnico periodicamente

---

**Versão:** 2.0 | **Alinhado com:** Blueprint Técnico Completo

