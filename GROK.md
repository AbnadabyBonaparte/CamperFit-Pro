# 🤖 GROK - Instruções para Desenvolvimento CamperFit Pro

Olá, Grok! Este documento contém instruções específicas para você seguir ao trabalhar no CamperFit Pro.

---

## ⚡ REGRAS DE OURO

1. **SEMPRE** consulte `MATRIZ_GENESIS_CamperFit.md` antes de fazer qualquer mudança
2. **SEMPRE** siga as 7 Leis Sagradas Invariáveis
3. **NUNCA** viole a estrutura canônica
4. **NUNCA** use cores ou valores hardcoded

---

## 🎯 WORKFLOW DE DESENVOLVIMENTO

### 1. Antes de Começar

✅ Ler `MATRIZ_GENESIS_CamperFit.md`  
✅ Verificar estrutura atual do projeto  
✅ Identificar componentes/arquivos relacionados  
✅ Verificar se já existe solução similar

### 2. Durante o Desenvolvimento

✅ Usar temas de `client/src/constants/themes.ts`  
✅ Usar componentes shadcn/ui quando possível  
✅ Implementar dados via tRPC (não mocks)  
✅ Implementar todos os estados UI  
✅ Colocar cálculos críticos no backend  
✅ Manter estrutura canônica  

### 3. Antes de Commitar

✅ Verificar checklist de conformidade  
✅ Testar todos os estados (loading, error, empty, success)  
✅ Verificar se não há hardcoded  
✅ Verificar estrutura de pastas  

---

## 📋 CHECKLIST DE CONFORMIDADE (Use em Todo PR)

### Lei #1: Zero Hardcoded
- [ ] Nenhuma cor hex (`#3b82f6`)
- [ ] Nenhum valor mágico (`1200`, `800`)
- [ ] Usando Tailwind/CSS variables
- [ ] Usando constantes compartilhadas

### Lei #2: shadcn/ui ou Canvas3D
- [ ] Componentes UI usando shadcn/ui
- [ ] Visualização 3D usando Canvas3D custom
- [ ] Não criou componentes básicos do zero

### Lei #3: Dados 100% tRPC
- [ ] Dados vindo de tRPC
- [ ] Sem mocks em produção
- [ ] TanStack Query implementado

### Lei #4: Estados UI Completos
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] Success state

### Lei #5: Cálculos no Backend
- [ ] CG calculado no backend
- [ ] Peso calculado no backend
- [ ] Validações no backend

### Lei #6: Estrutura Canônica
- [ ] Pastas dentro de `client/`, `server/`, `shared/`
- [ ] Código compartilhado em `shared/`
- [ ] Não criou pastas fora da estrutura

### Lei #7: Liberdade Total
- [ ] Usuário pode selecionar qualquer veículo
- [ ] Usuário pode selecionar qualquer material
- [ ] Nenhum valor forçado sem opção

---

## 🎨 GUIAS ESPECÍFICOS

### Criar Novo Componente

1. Verificar se existe em shadcn/ui primeiro
2. Se não, criar em `client/src/components/`
3. Usar temas (não cores hardcoded)
4. Implementar todos os estados UI
5. Documentar props e uso

### Criar Nova Página

1. Criar em `client/src/pages/`
2. Proteger com `<ProtectedRoute>` se necessário
3. Usar hooks tRPC para dados
4. Implementar estados completos
5. Usar temas canônicos

### Criar Novo Router tRPC

1. Criar em `server/routers/`
2. Usar `protectedProcedure` se autenticado
3. Validar com Zod (usar `shared/validators.ts`)
4. Adicionar ao `_app.ts`
5. Exportar types se necessário

### Adicionar Novo Veículo/Material

1. Adicionar em `client/src/constants/vehicles.ts` ou `materials.ts`
2. Seguir estrutura existente
3. Usar dados reais/precisos
4. Adicionar à documentação se relevante

---

## 🚫 ERROS COMUNS A EVITAR

❌ **Usar cores hardcoded** → Usar temas  
❌ **Criar componente UI do zero** → Usar shadcn/ui  
❌ **Dados mockados** → Usar tRPC  
❌ **Falta estados UI** → Implementar todos  
❌ **Calcular no frontend** → Mover para backend  
❌ **Quebrar estrutura** → Seguir canônica  
❌ **Forçar valores** → Permitir seleção  

---

## 📚 DOCUMENTAÇÃO ESSENCIAL

Leia na ordem:

1. `MATRIZ_GENESIS_CamperFit.md` - As 7 Leis Sagradas ⚡
2. `BLUEPRINT_TECNICO_CamperFit_Pro.md` - Arquitetura técnica
3. `docs/THEME_HIERARCHY.md` - Temas canônicos
4. `.cursorrules` - Regras para IA
5. `README.md` - Visão geral do projeto

---

## 💡 DICAS PRO

- **Sempre** use TypeScript estrito
- **Sempre** valide inputs com Zod
- **Sempre** trate erros adequadamente
- **Sempre** documente decisões complexas
- **Nunca** assuma que "depois eu arrumo"
- **Nunca** comprometa a liberdade do usuário

---

## 🎯 FILOSOFIA

> **"Não existe 'depois eu arrumo'. Existe CERTO ou ERRADO."**

O CamperFit Pro é sobre:
- ✅ **Excelência:** Código de qualidade
- ✅ **Liberdade:** Usuário tem controle total
- ✅ **Confiabilidade:** Cálculos corretos
- ✅ **Escalabilidade:** Estrutura sólida

**Siga a Matriz Gênesis. Sempre.**

---

**Última Atualização:** 28 de Dezembro de 2025  
**Para:** Grok (e qualquer desenvolvedor/IA)  
**Status:** ⚡ **ATIVO**

