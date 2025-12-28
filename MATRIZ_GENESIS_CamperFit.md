# 🎯 CamperFit Pro — Matriz Gênesis

**Versão:** 1.0  
**Data:** 28 de Dezembro de 2025  
**Status:** ⚡ **ATIVO E INVARIÁVEL**

---

## 🌟 VISÃO GERAL

O **CamperFit Pro** não é apenas uma plataforma SaaS. É um **sistema de engenharia completo** que transforma o mercado de campers DIY no Brasil. Para manter essa excelência, estabelecemos **7 Leis Sagradas Invioláveis** que garantem qualidade, escalabilidade e liberdade total para o usuário.

**Regra fundamental:** Não existe "depois eu arrumo". Existe **CERTO** ou **ERRADO**. A Matriz Gênesis é o guia definitivo para ambos.

---

## ⚡ AS 7 LEIS SAGRADAS INVARIÁVEIS

### Lei #1: Zero Cores ou Valores Hardcoded

**REGRAS:**
- ❌ **NUNCA** use cores hex diretas (ex: `#3b82f6`, `bg-blue-500`)
- ❌ **NUNCA** use valores mágicos (ex: `width: 1200`, `height: 800`)
- ✅ **SEMPRE** use Tailwind classes ou CSS variables
- ✅ **SEMPRE** use constantes compartilhadas (`shared/const.ts`)

**Onde aplicar:**
- Componentes React
- Estilos inline
- Configurações de Three.js (cores de materiais)
- Dimensões de canvas

**Consequência de violação:** Refatoração obrigatória + revisão de código.

---

### Lei #2: Componentes Obrigatoriamente shadcn/ui ou Canvas3D Custom

**REGRAS:**
- ✅ **SEMPRE** use componentes shadcn/ui quando disponível
- ✅ **SEMPRE** use componentes Canvas3D custom para visualização 3D
- ❌ **NUNCA** crie componentes UI básicos (button, input) do zero
- ❌ **NUNCA** misture bibliotecas UI (só shadcn/ui)

**Exceções:**
- Canvas3D, Shell3D, Vehicle3D (custom Three.js)
- Componentes específicos do domínio (ProjectCard, StatsPanel)

**Consequência de violação:** Substituição obrigatória por shadcn/ui equivalente.

---

### Lei #3: Dados 100% do Backend tRPC (Zero Mocks no Frontend)

**REGRAS:**
- ❌ **NUNCA** use dados mockados em produção
- ❌ **NUNCA** use `useState` para dados que vêm do backend
- ✅ **SEMPRE** use TanStack Query + tRPC para dados
- ✅ **SEMPRE** implemente estados completos (loading, error, empty, success)

**Onde aplicar:**
- Lista de projetos (Dashboard)
- Dados do projeto atual (Editor)
- Componentes do projeto
- Cálculos e resultados

**Consequência de violação:** Remoção de mocks + implementação tRPC obrigatória.

---

### Lei #4: Estados UI Completos (Loading, Error, Empty, Success)

**REGRAS:**
- ✅ **SEMPRE** implemente todos os estados: `loading`, `error`, `empty`, `success`
- ✅ **SEMPRE** mostre feedback visual apropriado
- ❌ **NUNCA** deixe tela em branco sem feedback
- ❌ **NUNCA** ignore erros silenciosamente

**Padrão obrigatório:**
```typescript
{isLoading && <LoadingSkeleton />}
{error && <ErrorMessage error={error} />}
{!isLoading && !error && data?.length === 0 && <EmptyState />}
{!isLoading && !error && data && <SuccessContent data={data} />}
```

**Consequência de violação:** Implementação obrigatória de estados faltantes.

---

### Lei #5: Cálculos Críticos Sempre no Backend

**REGRAS:**
- ❌ **NUNCA** calcule CG, peso, payload no frontend
- ❌ **NUNCA** confie em cálculos client-side para validações
- ✅ **SEMPRE** chame calculadoras backend via tRPC
- ✅ **SEMPRE** valide no backend antes de salvar

**Exceções:**
- Cálculos temporários para preview visual (ok)
- Validações de formato (input validation no frontend - ok)

**Onde aplicar:**
- Centro de Gravidade
- Peso total e payload
- Cálculos elétricos e de gás
- Validações de conformidade

**Consequência de violação:** Movimentação obrigatória para backend + testes de regressão.

---

### Lei #6: Estrutura Canônica Invariável

**REGRAS:**
- ✅ **SEMPRE** mantenha a estrutura: `client/`, `server/`, `shared/`, `drizzle/`
- ❌ **NUNCA** crie pastas fora desta estrutura
- ❌ **NUNCA** misture responsabilidades entre camadas
- ✅ **SEMPRE** coloque código compartilhado em `shared/`

**Estrutura canônica:**
```
camperfit-pro/
├── client/          # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── lib/
│   └── package.json
├── server/          # Backend Express + tRPC
│   ├── routers/
│   ├── calculators/
│   ├── exporters/
│   └── _core/
├── shared/          # Código compartilhado
│   ├── types.ts
│   ├── const.ts
│   └── validators.ts
├── drizzle/         # Database schema
│   └── schema.ts
└── package.json     # Monorepo root
```

**Consequência de violação:** Reorganização obrigatória para estrutura canônica.

---

### Lei #7: Todo Material/Veículo Deve Ser Selecionável — Liberdade Acima de Tudo

**REGRAS:**
- ✅ **SEMPRE** permita seleção de qualquer veículo da biblioteca
- ✅ **SEMPRE** permita seleção de qualquer material da biblioteca
- ❌ **NUNCA** force valores default sem opção de mudança
- ❌ **NUNCA** bloqueie a liberdade de escolha do usuário

**Onde aplicar:**
- VehicleSelector (8 veículos + custom)
- MaterialSelector (16 materiais + expansível)
- ComponentLibrary (20 componentes + expansível)
- Parâmetros da shell (todos editáveis)

**Filosofia:** O CamperFit Pro é sobre **liberdade total**. O usuário deve poder escolher qualquer combinação, mesmo que não seja "recomendada".

**Consequência de violação:** Adição obrigatória de opção de seleção + documentação.

---

## 📊 RESUMO EXECUTIVO

| Lei | Nome | Prioridade | Status | Violações Conhecidas |
|-----|------|------------|--------|---------------------|
| #1 | Zero Hardcoded | 🔴 CRÍTICA | ✅ Ativo | 0 |
| #2 | shadcn/ui ou Canvas3D | 🟡 ALTA | ✅ Ativo | 0 |
| #3 | Dados 100% tRPC | 🔴 CRÍTICA | ✅ Ativo | 0 |
| #4 | Estados UI Completos | 🟡 ALTA | ✅ Ativo | 0 |
| #5 | Cálculos no Backend | 🔴 CRÍTICA | ✅ Ativo | 0 |
| #6 | Estrutura Canônica | 🔴 CRÍTICA | ✅ Ativo | 0 |
| #7 | Liberdade Total | 🔴 CRÍTICA | ✅ Ativo | 0 |

**Legenda:**
- 🔴 CRÍTICA: Violação bloqueia merge/release
- 🟡 ALTA: Violação requer correção imediata
- 🟢 MÉDIA: Violação requer correção no próximo ciclo

---

## ⚠️ CONSEQUÊNCIAS DE VIOLAÇÃO

### Processo de Violação

1. **Detecção:** Linter, Code Review, ou QA
2. **Análise:** Classificar gravidade (🔴/🟡/🟢)
3. **Ação:** Correção obrigatória antes de merge
4. **Documentação:** Registrar violação e correção

### Penalidades por Gravidade

- **🔴 CRÍTICA:** Bloqueio de merge até correção
- **🟡 ALTA:** Correção no mesmo PR
- **🟢 MÉDIA:** Correção no próximo ciclo

---

## ✅ CHECKLIST DE CONFORMIDADE

Antes de cada commit, verifique:

- [ ] Nenhuma cor hex hardcoded
- [ ] Nenhum valor mágico (dimensões, etc)
- [ ] Componentes usando shadcn/ui quando possível
- [ ] Dados vindo de tRPC (não mocks)
- [ ] Todos os estados UI implementados
- [ ] Cálculos críticos no backend
- [ ] Estrutura de pastas canônica
- [ ] Usuário pode selecionar qualquer veículo/material

---

## 🎯 FILOSOFIA FINAL

> **"Não existe 'depois eu arrumo'. Existe CERTO ou ERRADO."**

A Matriz Gênesis existe para garantir que o CamperFit Pro seja:
- ✅ **Escalável:** Código organizado e consistente
- ✅ **Manutenível:** Fácil de entender e modificar
- ✅ **Livre:** Usuário tem controle total
- ✅ **Confiável:** Cálculos corretos e validações adequadas
- ✅ **Profissional:** UI polida e estados completos

**Violar a Matriz Gênesis é violar a essência do CamperFit Pro.**

---

## 📚 DOCUMENTAÇÃO RELACIONADA

- `docs/THEME_HIERARCHY.md` - Hierarquia de temas canônicos
- `.cursorrules` - Regras para Cursor AI
- `GROK.md` - Instruções para desenvolvimento
- `BLUEPRINT_TECNICO_CamperFit_Pro.md` - Arquitetura técnica completa

---

**Última Atualização:** 28 de Dezembro de 2025  
**Mantido por:** Equipe CamperFit Pro  
**Status:** ⚡ **ATIVO E INVARIÁVEL**

---

**🔥 O CamperFit Pro não é apenas código. É uma filosofia de excelência. 🔥**

