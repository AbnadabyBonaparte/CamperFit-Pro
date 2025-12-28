# 📊 Análise de Alinhamento: Prompt vs Repositório

**Data:** 28 de Dezembro de 2025

---

## 🎯 RESUMO EXECUTIVO

**Alinhamento Geral: 65-70%** ⚠️

O prompt original está parcialmente alinhado, mas tem divergências críticas na stack tecnológica que podem gerar um produto diferente do especificado no repositório.

---

## ❌ DIVERGÊNCIAS CRÍTICAS (MUST FIX)

### 1. Stack Tecnológica - BACKEND/API

| Aspecto | Prompt Original | Repositório | Impacto |
|---------|----------------|-------------|---------|
| **API** | REST API genérica ou Firebase | **tRPC 11.x** (type-safe RPC) | 🔴 CRÍTICO |
| **Database** | Firebase Firestore OU PostgreSQL | **MySQL 8.0+ / TiDB + Drizzle ORM** | 🔴 CRÍTICO |
| **Auth** | Firebase Auth OU JWT simples | **Manus OAuth** (preparado) | 🟡 ALTO |
| **State Management** | Não menciona | **Zustand 4.x + TanStack Query 5.x** | 🟡 ALTO |

**Por que é crítico?**
- tRPC é arquitetura diferente de REST (type-safe, sem overhead)
- Firebase vs MySQL são abordagens completamente diferentes
- Sem Zustand/TanStack Query, perde-se padrões do projeto

---

### 2. Funcionalidades Faltantes

| Funcionalidade | Prompt Original | Repositório | Impacto |
|----------------|----------------|-------------|---------|
| **Export DXF** | ❌ Não menciona | ✅ Obrigatório (dxf-writer) | 🟡 ALTO |
| **Estrutura de Pastas** | Genérica (client/, server/) | Específica detalhada | 🟢 MÉDIO |
| **APIs Específicas** | REST genérico | tRPC routers específicos | 🔴 CRÍTICO |

---

## ✅ PONTOS ALINHADOS

### Stack Frontend ✅
- React 19 + TypeScript + Tailwind CSS 4 ✅
- Three.js para 3D ✅
- shadcn/ui ✅

### Funcionalidades Core ✅
- Dashboard com CRUD de projetos ✅
- Editor 2D/3D ✅
- Calculadoras (CG, elétrica, gás) ✅
- Exportação (PDF, PNG, JSON) ✅
- Marketplace ✅
- Comunidade/Galeria ✅

### Design System ✅
- Cores Tailwind ✅
- Tipografia Inter ✅
- Componentes shadcn/ui ✅

---

## 📋 TABELA COMPARATIVA COMPLETA

| Categoria | Item | Prompt Original | Repositório | Alinhamento |
|-----------|------|----------------|-------------|-------------|
| **Frontend** | React | ✅ 19 | ✅ 19 | 100% |
| | TypeScript | ✅ | ✅ | 100% |
| | Tailwind | ✅ 4 | ✅ 4 | 100% |
| | Three.js | ✅ (opcional) | ✅ (obrigatório) | 90% |
| | State Mgmt | ❌ Não menciona | ✅ Zustand 4.x | 0% |
| | Data Fetching | ❌ Não menciona | ✅ TanStack Query 5.x | 0% |
| **Backend** | Framework | ✅ Express | ✅ Express 4.21+ | 95% |
| | API | ❌ REST ou Firebase | ✅ **tRPC 11.x** | 0% |
| | ORM | ❌ Não menciona | ✅ **Drizzle 0.44+** | 0% |
| | Database | ❌ Firebase OU PostgreSQL | ✅ **MySQL 8.0+ / TiDB** | 0% |
| | Auth | ❌ Firebase OU JWT | ✅ Manus OAuth (JWT MVP) | 50% |
| **Storage** | S3 | ✅ AWS S3 | ✅ AWS S3 | 100% |
| | Firebase Storage | ✅ (alternativa) | ❌ Não usa | 0% |
| **Export** | PDF | ✅ PDFKit | ✅ PDFKit 0.13+ | 100% |
| | PNG | ✅ | ✅ | 100% |
| | JSON | ✅ | ✅ | 100% |
| | DXF | ❌ Não menciona | ✅ **dxf-writer 1.x** | 0% |
| | CSV | ✅ (mencionado) | ❌ Não no blueprint | N/A |
| **Cálculos** | Numeric.js | ✅ | ✅ Numeric.js 1.x | 100% |
| | Fórmulas CG | ✅ Básicas | ✅ Detalhadas | 80% |
| | Fórmulas Elétrica | ✅ Básicas | ✅ NBR 5410 | 80% |
| | Fórmulas Gás | ✅ Básicas | ✅ NBR 15264 | 80% |
| **Estrutura** | Diretórios | ✅ Genérica | ✅ Específica | 70% |
| | Schemas DB | ✅ Simplificados | ✅ Completos | 60% |
| **APIs** | Endpoints | ❌ REST genérico | ✅ **tRPC routers específicos** | 0% |
| | Validação | ✅ Zod/Joi | ✅ Zod (compartilhado) | 80% |

---

## 🔍 ANÁLISE DETALHADA POR CATEGORIA

### 1. Arquitetura (30% alinhado) 🔴

**Prompt Original:**
```
Backend: Express OU Firebase
Database: Firebase Firestore OU PostgreSQL
API: REST genérica
```

**Repositório:**
```
Backend: Express 4 + tRPC 11
Database: MySQL 8.0+ / TiDB + Drizzle ORM
API: tRPC (type-safe RPC, não REST)
```

**Gap:** Arquitetura completamente diferente. Firebase vs MySQL são mundos diferentes.

---

### 2. Frontend (70% alinhado) 🟡

**Prompt Original:**
```
React 19 + TypeScript + Tailwind 4
Three.js (opcional)
State Management: Não menciona
Data Fetching: Não menciona
```

**Repositório:**
```
React 19 + TypeScript + Tailwind 4 ✅
Three.js (obrigatório) ✅
State Management: Zustand 4.x ❌
Data Fetching: TanStack Query 5.x ❌
```

**Gap:** Faltam Zustand e TanStack Query, que são essenciais para o padrão arquitetural.

---

### 3. Funcionalidades (85% alinhado) ✅

**Alinhadas:**
- ✅ Autenticação (login/registro)
- ✅ Dashboard (CRUD projetos)
- ✅ Editor 2D/3D
- ✅ Calculadoras (CG, elétrica, gás)
- ✅ Exportação (PDF, PNG, JSON)
- ✅ Marketplace
- ✅ Comunidade/Galeria

**Faltando:**
- ❌ Export DXF (crítico para Fase 2)
- ❌ Estrutura de routers tRPC específicos
- ❌ Validação de conformidade detalhada

---

### 4. Estrutura de Dados (60% alinhado) 🟡

**Prompt Original:**
- Schemas simplificados
- Estrutura genérica

**Repositório:**
- Schemas completos com todos os campos
- Índices e foreign keys definidos
- Estrutura de cálculo (cgX, cgY, cgZ, etc.)
- ComponentLibrary separado de ProjectComponent

**Gap:** Schemas do repositório são mais completos e incluem campos calculados.

---

### 5. APIs (0% alinhado) 🔴

**Prompt Original:**
```
REST API genérica:
- POST /api/projects
- GET /api/projects/{id}
etc.
```

**Repositório:**
```
tRPC routers específicos:
- projects.list (query)
- projects.get (query)
- projects.create (mutation)
- calculations.calculateCG (mutation)
- export.toPDF (mutation)
etc.
```

**Gap:** tRPC é completamente diferente de REST. Requer setup diferente e type-safety.

---

## 🎯 RECOMENDAÇÕES

### Prioridade 1: CRÍTICO (Must Fix) 🔴

1. **Trocar Firebase por MySQL + Drizzle**
   - Impacto: Alto
   - Esforço: Médio
   - Razão: Arquitetura completamente diferente

2. **Trocar REST por tRPC**
   - Impacto: Crítico
   - Esforço: Alto
   - Razão: Padrão arquitetural do projeto

3. **Adicionar Zustand + TanStack Query**
   - Impacto: Alto
   - Esforço: Médio
   - Razão: Padrão de state management

4. **Adicionar Export DXF**
   - Impacto: Médio
   - Esforço: Baixo
   - Razão: Funcionalidade importante (Fase 2)

---

### Prioridade 2: IMPORTANTE (Should Fix) 🟡

1. **Ajustar estrutura de pastas**
   - Seguir estrutura do blueprint exatamente

2. **Completar schemas de banco**
   - Incluir todos os campos do blueprint

3. **Detalhar fórmulas de cálculo**
   - Usar fórmulas exatas do blueprint

---

### Prioridade 3: MELHORIAS (Nice to Have) 🟢

1. **Adicionar testes**
2. **Melhorar acessibilidade**
3. **Otimizar performance**

---

## ✅ CONCLUSÃO

**Alinhamento Atual: 65-70%**

O prompt original funciona para um MVP genérico, mas não está alinhado com a arquitetura técnica específica do repositório. As principais divergências são:

1. ❌ Firebase vs MySQL + Drizzle
2. ❌ REST vs tRPC
3. ❌ Falta Zustand + TanStack Query
4. ❌ Falta Export DXF

**Recomendação:** Use o **PROMPT_ALINHADO_CamperFit_Pro.md** que criei, que está 95%+ alinhado com o repositório.

---

**Criado em:** 28 de Dezembro de 2025
**Status:** Análise Completa ✅

