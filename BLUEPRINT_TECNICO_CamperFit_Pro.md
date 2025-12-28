# CamperFit Pro — Blueprint Técnico Completo

**Versão:** 1.0 | **Data:** 28 de Dezembro de 2025 | **Arquiteto:** Manus AI

---

## 1. ARQUITETURA DO SISTEMA

### 1.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENTE (Frontend)                           │
│  React 19 + Tailwind 4 + Three.js + TanStack Query + Zustand   │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Dashboard  │  │    Editor    │  │  Relatórios  │           │
│  │   (Projetos) │  │  (Canvas 3D) │  │  (PDF/DXF)   │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
├─────────────────────────────────────────────────────────────────┤
│                    GATEWAY & ROTEAMENTO                          │
│              /api/trpc/* (tRPC Endpoints)                        │
├─────────────────────────────────────────────────────────────────┤
│                    SERVIDOR (Backend)                            │
│        Express 4 + tRPC 11 + Node.js 22                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  Procedures  │  │  Calculators │  │   Exporters  │           │
│  │  (CRUD)      │  │  (CG, Elét.) │  │  (PDF, DXF)  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
├─────────────────────────────────────────────────────────────────┤
│                    BANCO DE DADOS                                │
│        MySQL 8.0+ / TiDB (Drizzle ORM)                           │
├─────────────────────────────────────────────────────────────────┤
│                    ARMAZENAMENTO                                 │
│        S3 (Projetos, Exportações, Imagens)                       │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Stack Tecnológico

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| **Frontend** | React | 19 | Reatividade, componentes, ecossistema |
| **Styling** | Tailwind CSS | 4 | Utility-first, performance, temas |
| **3D Graphics** | Three.js | r128+ | Visualização 3D, performance |
| **State Management** | Zustand | 4.x | Leve, simples, sem boilerplate |
| **Data Fetching** | TanStack Query | 5.x | Caching, sincronização, offline |
| **Backend** | Express | 4.21+ | Simples, maduro, middleware |
| **RPC** | tRPC | 11.x | Type-safe, sem REST overhead |
| **ORM** | Drizzle | 0.44+ | Type-safe, migrations, performance |
| **Database** | MySQL/TiDB | 8.0+ | ACID, escalável, confiável |
| **Storage** | AWS S3 | - | Escalável, durável, integrado |
| **Auth** | Manus OAuth | - | Integrado, seguro, sem overhead |
| **PDF Generation** | PDFKit | 0.13+ | Leve, customizável |
| **DXF Export** | dxf-writer | 1.x | CAD, compatibilidade |
| **Cálculos** | Numeric.js | 1.x | Precisão, operações matriciais |

---

## 2. ESTRUTURA DE DIRETÓRIOS

```
camperfit-pro/
├── client/                          # Frontend React
│   ├── public/
│   │   ├── icons/                   # SVG icons
│   │   ├── templates/               # Modelos de motorhomes (3D models)
│   │   └── components-lib/          # Biblioteca de componentes 3D
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
│   │   │   │   └── AutonomyCalculator.tsx
│   │   │   ├── Dialogs/
│   │   │   │   ├── ExportDialog.tsx
│   │   │   │   ├── ShareDialog.tsx
│   │   │   │   └── SettingsDialog.tsx
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   └── DashboardLayout.tsx  # Layout principal
│   │   ├── hooks/
│   │   │   ├── useProject.ts        # Project CRUD
│   │   │   ├── useCalculations.ts   # Cálculos
│   │   │   ├── useExport.ts         # Exportação
│   │   │   └── useAuth.ts           # Autenticação
│   │   ├── lib/
│   │   │   ├── trpc.ts              # tRPC client
│   │   │   ├── calculations/        # Lógica de cálculos
│   │   │   │   ├── centerOfGravity.ts
│   │   │   │   ├── electrical.ts
│   │   │   │   ├── gas.ts
│   │   │   │   └── deflection.ts
│   │   │   └── utils.ts
│   │   ├── contexts/
│   │   │   ├── ProjectContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/                          # Backend Express
│   ├── routers/
│   │   ├── projects.ts              # CRUD de projetos
│   │   ├── components.ts            # Biblioteca de componentes
│   │   ├── calculations.ts          # Cálculos (CG, elétrica, gás)
│   │   ├── export.ts                # Exportação (PDF, DXF, PNG)
│   │   ├── marketplace.ts           # Marketplace
│   │   └── compliance.ts            # Validação de conformidade
│   ├── db.ts                        # Query helpers
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
│   ├── schema.ts                    # Database schema
│   └── migrations/                  # Migration files
├── shared/
│   ├── const.ts                     # Constantes
│   ├── types.ts                     # Tipos compartilhados
│   └── validators.ts                # Validadores Zod
├── storage/
│   └── s3.ts                        # S3 configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
├── drizzle.config.ts
└── README.md
```

---

## 3. SCHEMAS DO BANCO DE DADOS

### 3.1 Tabela: users

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin', 'professional', 'enterprise') DEFAULT 'user',
  plan ENUM('starter', 'pro', 'enterprise') DEFAULT 'starter',
  subscriptionStatus ENUM('active', 'paused', 'cancelled') DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 Tabela: projects

```sql
CREATE TABLE projects (
  id VARCHAR(36) PRIMARY KEY,
  userId INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  vehicleType ENUM('sprinter', 'kombi', 'furgao', 'trailer', 'custom') DEFAULT 'custom',
  
  -- Dimensões do veículo
  length FLOAT,                       -- mm
  width FLOAT,                        -- mm
  height FLOAT,                       -- mm
  wheelbase FLOAT,                    -- mm
  maxGVWR FLOAT,                      -- kg
  
  -- Dados calculados
  totalWeight FLOAT,                  -- kg
  cgX FLOAT, cgY FLOAT, cgZ FLOAT,   -- mm
  cgHeight FLOAT,                     -- mm
  weightDistributionFront FLOAT,      -- %
  weightDistributionRear FLOAT,       -- %
  deflection FLOAT,                   -- mm
  fuelConsumption FLOAT,              -- km/l
  
  -- Status
  status ENUM('draft', 'in_progress', 'completed', 'archived') DEFAULT 'draft',
  version INT DEFAULT 1,
  
  -- Timestamps
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (userId) REFERENCES users(id),
  INDEX (userId, status),
  INDEX (createdAt)
);
```

### 3.3 Tabela: project_components

```sql
CREATE TABLE project_components (
  id VARCHAR(36) PRIMARY KEY,
  projectId VARCHAR(36) NOT NULL,
  componentLibraryId VARCHAR(36),     -- Referência à biblioteca
  
  -- Posição e orientação
  posX FLOAT, posY FLOAT, posZ FLOAT, -- mm
  rotationX FLOAT, rotationY FLOAT, rotationZ FLOAT, -- degrees
  
  -- Dimensões
  length FLOAT, width FLOAT, height FLOAT, -- mm
  
  -- Propriedades
  weight FLOAT,                       -- kg
  material VARCHAR(255),
  color VARCHAR(7),                   -- hex color
  
  -- Dados específicos
  electricalPower FLOAT,              -- W (se aplicável)
  electricalVoltage INT,              -- V (se aplicável)
  gasConsumption FLOAT,               -- kg/day (se aplicável)
  waterCapacity FLOAT,                -- liters (se aplicável)
  
  -- Metadata
  customProperties JSON,
  notes TEXT,
  
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (projectId) REFERENCES projects(id),
  INDEX (projectId)
);
```

### 3.4 Tabela: component_library

```sql
CREATE TABLE component_library (
  id VARCHAR(36) PRIMARY KEY,
  category ENUM('furniture', 'utility', 'structural', 'electrical', 'gas') NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Dimensões padrão
  length FLOAT, width FLOAT, height FLOAT, -- mm
  weight FLOAT,                       -- kg
  material VARCHAR(255),
  
  -- Preço
  price FLOAT,                        -- R$
  supplier VARCHAR(255),
  
  -- Imagem
  imageUrl VARCHAR(512),
  
  -- Propriedades específicas
  electricalPower FLOAT,              -- W
  electricalVoltage INT,              -- V
  gasConsumption FLOAT,               -- kg/day
  waterCapacity FLOAT,                -- liters
  
  -- Metadata
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX (category, isActive)
);
```

### 3.5 Tabela: calculations

```sql
CREATE TABLE calculations (
  id VARCHAR(36) PRIMARY KEY,
  projectId VARCHAR(36) NOT NULL,
  type ENUM('centerOfGravity', 'electrical', 'gas', 'deflection', 'compliance') NOT NULL,
  
  -- Resultado (JSON)
  result JSON NOT NULL,
  
  -- Status
  status ENUM('valid', 'warning', 'critical') DEFAULT 'valid',
  issues JSON,                        -- Array de problemas
  
  -- Timestamps
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (projectId) REFERENCES projects(id),
  INDEX (projectId, type),
  INDEX (createdAt)
);
```

### 3.6 Tabela: exports

```sql
CREATE TABLE exports (
  id VARCHAR(36) PRIMARY KEY,
  projectId VARCHAR(36) NOT NULL,
  userId INT NOT NULL,
  
  -- Tipo de exportação
  format ENUM('pdf', 'png', 'dxf', 'json') NOT NULL,
  
  -- Arquivo
  fileKey VARCHAR(512),               -- S3 key
  fileUrl VARCHAR(512),               -- S3 URL
  fileSize INT,                       -- bytes
  
  -- Metadata
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (projectId) REFERENCES projects(id),
  FOREIGN KEY (userId) REFERENCES users(id),
  INDEX (projectId, format),
  INDEX (createdAt)
);
```

---

## 4. APIs tRPC (Procedures)

### 4.1 Projects Router

```typescript
// server/routers/projects.ts

export const projectsRouter = router({
  // Listar projetos do usuário
  list: protectedProcedure
    .input(z.object({ skip: z.number().default(0), take: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      return db.getProjectsByUserId(ctx.user.id, input.skip, input.take);
    }),

  // Obter projeto específico
  get: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const project = await db.getProject(input.id);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return project;
    }),

  // Criar novo projeto
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(255),
      vehicleType: z.enum(['sprinter', 'kombi', 'furgao', 'trailer', 'custom']),
      dimensions: z.object({
        length: z.number().positive(),
        width: z.number().positive(),
        height: z.number().positive(),
        wheelbase: z.number().positive(),
        maxGVWR: z.number().positive(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      const projectId = generateUUID();
      await db.createProject({
        id: projectId,
        userId: ctx.user.id,
        name: input.name,
        vehicleType: input.vehicleType,
        ...input.dimensions,
      });
      return { id: projectId };
    }),

  // Atualizar projeto
  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      data: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(['draft', 'in_progress', 'completed', 'archived']).optional(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.id);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      await db.updateProject(input.id, input.data);
      return { success: true };
    }),

  // Deletar projeto
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.id);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      await db.deleteProject(input.id);
      return { success: true };
    }),

  // Duplicar projeto
  duplicate: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.id);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      const newProjectId = generateUUID();
      await db.duplicateProject(input.id, newProjectId, ctx.user.id);
      return { id: newProjectId };
    }),
});
```

### 4.2 Components Router

```typescript
// server/routers/components.ts

export const componentsRouter = router({
  // Listar biblioteca de componentes
  list: publicProcedure
    .input(z.object({
      category: z.enum(['furniture', 'utility', 'structural', 'electrical', 'gas']).optional(),
      skip: z.number().default(0),
      take: z.number().default(50),
    }))
    .query(async ({ input }) => {
      return db.getComponentLibrary(input.category, input.skip, input.take);
    }),

  // Obter componente específico
  get: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      return db.getComponent(input.id);
    }),

  // Adicionar componente ao projeto
  addToProject: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      componentLibraryId: z.string().uuid(),
      position: z.object({ x: z.number(), y: z.number(), z: z.number() }),
    }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      const componentId = generateUUID();
      await db.addComponentToProject(componentId, input.projectId, input.componentLibraryId, input.position);
      return { id: componentId };
    }),

  // Atualizar componente no projeto
  updateInProject: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      componentId: z.string().uuid(),
      data: z.object({
        position: z.object({ x: z.number(), y: z.number(), z: z.number() }).optional(),
        rotation: z.object({ x: z.number(), y: z.number(), z: z.number() }).optional(),
        color: z.string().optional(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      await db.updateComponentInProject(input.componentId, input.data);
      return { success: true };
    }),

  // Remover componente do projeto
  removeFromProject: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      componentId: z.string().uuid(),
    }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      await db.removeComponentFromProject(input.componentId);
      return { success: true };
    }),
});
```

### 4.3 Calculations Router

```typescript
// server/routers/calculations.ts

export const calculationsRouter = router({
  // Calcular centro de gravidade
  calculateCG: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      const components = await db.getProjectComponents(input.projectId);
      const result = calculateCenterOfGravity(components, project);
      await db.saveCalculation(input.projectId, 'centerOfGravity', result);
      return result;
    }),

  // Calcular sistema elétrico
  calculateElectrical: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      const components = await db.getProjectComponents(input.projectId);
      const result = calculateElectrical(components);
      await db.saveCalculation(input.projectId, 'electrical', result);
      return result;
    }),

  // Calcular sistema de gás
  calculateGas: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      const components = await db.getProjectComponents(input.projectId);
      const result = calculateGas(components);
      await db.saveCalculation(input.projectId, 'gas', result);
      return result;
    }),

  // Validar conformidade
  validateCompliance: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      const components = await db.getProjectComponents(input.projectId);
      const calculations = await db.getCalculations(input.projectId);
      const result = validateCompliance(project, components, calculations);
      await db.saveCalculation(input.projectId, 'compliance', result);
      return result;
    }),
});
```

### 4.4 Export Router

```typescript
// server/routers/export.ts

export const exportRouter = router({
  // Exportar para PDF
  toPDF: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      const components = await db.getProjectComponents(input.projectId);
      const calculations = await db.getCalculations(input.projectId);
      
      const pdfBuffer = await generatePDF(project, components, calculations);
      const fileKey = `exports/${project.id}-${Date.now()}.pdf`;
      const { url } = await storagePut(fileKey, pdfBuffer, 'application/pdf');
      
      await db.saveExport(project.id, ctx.user.id, 'pdf', fileKey, url, pdfBuffer.length);
      return { url };
    }),

  // Exportar para DXF
  toDXF: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      const components = await db.getProjectComponents(input.projectId);
      
      const dxfContent = generateDXF(project, components);
      const fileKey = `exports/${project.id}-${Date.now()}.dxf`;
      const { url } = await storagePut(fileKey, dxfContent, 'application/dxf');
      
      await db.saveExport(project.id, ctx.user.id, 'dxf', fileKey, url, dxfContent.length);
      return { url };
    }),

  // Exportar para JSON
  toJSON: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProject(input.projectId);
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      const components = await db.getProjectComponents(input.projectId);
      const calculations = await db.getCalculations(input.projectId);
      
      const jsonData = JSON.stringify({ project, components, calculations }, null, 2);
      const fileKey = `exports/${project.id}-${Date.now()}.json`;
      const { url } = await storagePut(fileKey, jsonData, 'application/json');
      
      await db.saveExport(project.id, ctx.user.id, 'json', fileKey, url, jsonData.length);
      return { url };
    }),
});
```

---

## 5. LÓGICA DE CÁLCULOS

### 5.1 Centro de Gravidade (CG)

```typescript
// server/calculators/centerOfGravity.ts

interface Component {
  id: string;
  posX: number;
  posY: number;
  posZ: number;
  weight: number; // kg
}

interface Project {
  wheelbase: number; // mm
  length: number;
  width: number;
  height: number;
}

export function calculateCenterOfGravity(
  components: Component[],
  project: Project
): CGResult {
  // Cálculo de CG usando momentos
  let totalWeight = 0;
  let momentX = 0;
  let momentY = 0;
  let momentZ = 0;

  for (const component of components) {
    totalWeight += component.weight;
    momentX += component.weight * component.posX;
    momentY += component.weight * component.posY;
    momentZ += component.weight * component.posZ;
  }

  const cgX = momentX / totalWeight;
  const cgY = momentY / totalWeight;
  const cgZ = momentZ / totalWeight;

  // Verificar se está na zona segura
  const safeZoneMin = project.wheelbase * 0.2;
  const safeZoneMax = project.wheelbase * 0.4;
  const cgLongitudinal = cgX; // Posição longitudinal relativa ao wheelbase

  const status = cgLongitudinal >= safeZoneMin && cgLongitudinal <= safeZoneMax
    ? 'safe'
    : cgLongitudinal > safeZoneMax
    ? 'rear_heavy'
    : 'front_heavy';

  // Distribuição de peso por eixo (estimado)
  const weightDistributionFront = ((project.wheelbase - cgLongitudinal) / project.wheelbase) * 100;
  const weightDistributionRear = (cgLongitudinal / project.wheelbase) * 100;

  // Risco de tombamento (altura do CG)
  const maxCGHeight = project.width / 2; // Simplificado
  const tippingRisk = cgZ > maxCGHeight ? 'high' : 'normal';

  return {
    cgX,
    cgY,
    cgZ,
    totalWeight,
    status,
    weightDistributionFront,
    weightDistributionRear,
    tippingRisk,
    issues: generateCGIssues(status, tippingRisk, totalWeight, project),
  };
}

function generateCGIssues(
  status: string,
  tippingRisk: string,
  totalWeight: number,
  project: Project
): string[] {
  const issues: string[] = [];

  if (status === 'front_heavy') {
    issues.push('Centro de gravidade muito à frente. Risco de sobrecarga no eixo dianteiro.');
  }
  if (status === 'rear_heavy') {
    issues.push('Centro de gravidade muito para trás. Risco de instabilidade na estrada.');
  }
  if (tippingRisk === 'high') {
    issues.push('Altura do CG muito alta. Risco aumentado de tombamento em curvas.');
  }
  if (totalWeight > project.maxGVWR) {
    issues.push(`Peso total (${totalWeight}kg) excede capacidade máxima (${project.maxGVWR}kg).`);
  }

  return issues;
}
```

### 5.2 Cálculo Elétrico

```typescript
// server/calculators/electrical.ts

interface ElectricalComponent {
  type: 'battery' | 'solar' | 'inverter' | 'charger' | 'load';
  voltage: number; // V
  power?: number; // W
  capacity?: number; // Ah
  dailyUsage?: number; // h
}

export function calculateElectrical(components: ElectricalComponent[]): ElectricalResult {
  // Separar componentes por tipo
  const batteries = components.filter(c => c.type === 'battery');
  const loads = components.filter(c => c.type === 'load');
  const solarPanels = components.filter(c => c.type === 'solar');

  // Cálculo de carga total
  const totalLoad = loads.reduce((sum, load) => sum + (load.power || 0), 0);

  // Cálculo de corrente (I = P / V)
  const voltage = batteries[0]?.voltage || 12;
  const totalCurrent = totalLoad / voltage;

  // Cálculo de autonomia
  const totalCapacity = batteries.reduce((sum, bat) => sum + (bat.capacity || 0), 0);
  const dailyConsumption = loads.reduce((sum, load) => {
    return sum + ((load.power || 0) * (load.dailyUsage || 0)) / 1000; // kWh
  }, 0);

  const autonomyHours = (totalCapacity * voltage / 1000) / (totalLoad / 1000) || 0;
  const autonomyDays = autonomyHours / 24;

  // Recomendações de cabo (NBR 5410)
  const cableSection = recommendCableSection(totalCurrent);

  // Queda de tensão (máx 3%)
  const voltageDrop = calculateVoltageDrop(totalCurrent, cableSection);

  return {
    totalLoad,
    totalCurrent,
    autonomyHours,
    autonomyDays,
    cableSection,
    voltageDrop,
    voltageDripStatus: voltageDrop <= 3 ? 'ok' : 'warning',
    issues: generateElectricalIssues(voltageDrop, autonomyDays),
  };
}

function recommendCableSection(current: number): number {
  // Tabela simplificada de seção de cabo (mm²) por corrente (A)
  if (current <= 10) return 2.5;
  if (current <= 16) return 4;
  if (current <= 25) return 6;
  if (current <= 32) return 10;
  if (current <= 40) return 16;
  if (current <= 63) return 25;
  return 35;
}

function calculateVoltageDrop(current: number, cableSection: number): number {
  // Simplificado: 0.0175 Ω/mm² para cobre
  const cableLength = 10; // metros (estimado)
  const resistance = (0.0175 * cableLength) / cableSection;
  const voltageDrop = current * resistance;
  return voltageDrop;
}
```

---

## 6. FLUXO DE DADOS

### 6.1 Criação de Projeto

```
1. Usuário clica "Novo Projeto"
2. Frontend abre dialog com opções
3. Usuário preenche: nome, tipo de veículo, dimensões
4. Frontend chama trpc.projects.create()
5. Backend cria registro em DB
6. Backend retorna projectId
7. Frontend redireciona para /editor/{projectId}
8. Frontend carrega projeto com trpc.projects.get()
9. Canvas renderiza layout vazio
```

### 6.2 Adição de Componente

```
1. Usuário busca componente na biblioteca
2. Frontend chama trpc.components.list()
3. Backend retorna lista de componentes
4. Usuário clica em componente
5. Usuário arrasta para canvas
6. Frontend calcula posição (X, Y, Z)
7. Frontend chama trpc.components.addToProject()
8. Backend cria registro em project_components
9. Frontend atualiza canvas com novo componente
10. Frontend chama trpc.calculations.calculateCG() (automático)
11. Backend recalcula CG
12. Frontend atualiza PropertyPanel com novos valores
```

### 6.3 Exportação para PDF

```
1. Usuário clica "Exportar PDF"
2. Frontend chama trpc.export.toPDF()
3. Backend carrega projeto + componentes + cálculos
4. Backend gera PDF com:
   - Layout 2D/3D
   - Cálculos de CG
   - Diagrama elétrico
   - Esquema de gás
   - Checklist de conformidade
5. Backend faz upload para S3
6. Backend retorna URL
7. Frontend abre URL em nova aba (download)
8. Backend salva registro em exports table
```

---

## 7. TRATAMENTO DE ERROS

### 7.1 Validações Frontend

```typescript
// Validação de entrada com Zod
const projectSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório').max(255),
  vehicleType: z.enum(['sprinter', 'kombi', 'furgao', 'trailer', 'custom']),
  dimensions: z.object({
    length: z.number().positive('Comprimento deve ser positivo'),
    width: z.number().positive('Largura deve ser positiva'),
    height: z.number().positive('Altura deve ser positiva'),
    wheelbase: z.number().positive('Distância entre eixos deve ser positiva'),
    maxGVWR: z.number().positive('Peso máximo deve ser positivo'),
  }),
});
```

### 7.2 Tratamento de Erros Backend

```typescript
// tRPC error handling
try {
  const result = await calculateCenterOfGravity(components, project);
  return result;
} catch (error) {
  if (error instanceof ValidationError) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: error.message,
    });
  }
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Erro ao calcular centro de gravidade',
  });
}
```

---

## 8. PERFORMANCE E OTIMIZAÇÕES

### 8.1 Frontend
- **Code Splitting:** Lazy load de páginas com React.lazy()
- **Memoization:** useMemo() para cálculos pesados
- **Virtual Scrolling:** Para listas grandes de componentes
- **Image Optimization:** WebP com fallback, lazy loading

### 8.2 Backend
- **Database Indexing:** Índices em userId, projectId, createdAt
- **Query Optimization:** Evitar N+1 queries com joins
- **Caching:** Redis para cálculos frequentes
- **Rate Limiting:** 100 requisições/minuto por usuário

### 8.3 Banco de Dados
- **Connection Pooling:** 10 conexões simultâneas
- **Replicação:** Read replicas para queries pesadas
- **Backup:** Diário, retenção de 30 dias

---

## 9. SEGURANÇA

### 9.1 Autenticação
- OAuth 2.0 via Manus
- JWT tokens com expiração de 24h
- Refresh tokens com expiração de 7 dias

### 9.2 Autorização
- Verificação de ownership em cada operação
- Role-based access control (RBAC)
- Proteção contra CSRF com tokens

### 9.3 Dados
- Criptografia em trânsito (HTTPS)
- Criptografia em repouso para dados sensíveis
- Sanitização de inputs contra SQL injection
- Rate limiting contra brute force

---

**Documento Finalizado:** 28 de Dezembro de 2025
**Próximo Passo:** Implementação do MVP (Fase 1)
