# 🎯 Análise do Próximo Passo - CamperFit Pro

**Data:** 28 de Dezembro de 2025  
**Status Atual:** Base Estrutural Completa (40%)  
**Fase:** MVP (Fase 1)

---

## 📊 REVISÃO DO STATUS ATUAL

### ✅ COMPLETO (40%)
1. ✅ Estrutura de diretórios
2. ✅ Schemas do banco de dados (Drizzle ORM)
3. ✅ Setup tRPC completo (servidor Express)
4. ✅ Routers básicos (projects, components)
5. ✅ Frontend base (React 19 + Vite)
6. ✅ Autenticação JWT (estrutura, falta router)

### ⏳ PENDENTE CRÍTICO (60%)
1. ❌ **Calculadoras** (CG, elétrica, gás, deflexão) - **CRÍTICO**
2. ❌ **Router de calculations** - **CRÍTICO**
3. ❌ **Exportadores** (PDF, DXF, PNG, JSON) - **CRÍTICO**
4. ❌ **Router de export** - **CRÍTICO**
5. ❌ **Componentes React principais** (Canvas, PropertyPanel) - **ALTO**
6. ❌ **Autenticação completa** (router + páginas) - **MÉDIO**
7. ❌ **Tailwind CSS configurado** - **MÉDIO**
8. ❌ **Stores Zustand** - **MÉDIO**

---

## 🎯 PRÓXIMO PASSO RECOMENDADO

### **PRIORIDADE 1: IMPLEMENTAR CALCULADORAS (CG, Elétrica, Gás)**

**Por quê?**
- As calculadoras são o **coração** da aplicação CamperFit Pro
- Diferenciador competitivo principal
- Sem elas, não há funcionalidade core
- Necessárias para validar o produto

**O que implementar:**

#### 1. Calculadora de Centro de Gravidade (CG) ⭐ PRIMEIRO
- **Arquivo:** `server/calculators/centerOfGravity.ts`
- **Fórmula:** CG = (Σ(m*x)/Σm, Σ(m*y)/Σm, Σ(m*z)/Σm)
- **Validações:**
  - Zona segura: 20-40% do wheelbase
  - Distribuição por eixo (front/rear %)
  - Altura do CG (risco de tombamento)
  - PBT vs maxGVWR
- **Retorno:** CGResult (conforme shared/types.ts)

#### 2. Calculadora Elétrica
- **Arquivo:** `server/calculators/electrical.ts`
- **Cálculos:**
  - Corrente: I = P / V
  - Queda de tensão: ΔV = (2 * ρ * L * I) / A
  - Autonomia: horas = (Capacidade_Ah * V) / (Carga_total_W / V)
  - Seção de cabo (tabela NBR 5410)
- **Retorno:** ElectricalResult

#### 3. Calculadora de Gás
- **Arquivo:** `server/calculators/gas.ts`
- **Cálculos:**
  - Consumo total: Σ(consumo_appliance * horas_uso)
  - Autonomia: dias = capacidade_kg / consumo_total_kg_dia
  - Ventilação necessária
- **Retorno:** GasResult

#### 4. Calculadora de Deflexão
- **Arquivo:** `server/calculators/deflection.ts`
- **Cálculos:** Estimativa simplificada de deflexão
- **Validação:** Máx 5mm para segurança

#### 5. Validação de Conformidade
- **Arquivo:** `server/calculators/compliance.ts`
- **Validações:**
  - CONTRAN 993/23
  - NBR 5410 (elétrica)
  - NBR 15264 (gás)
- **Retorno:** ComplianceResult

#### 6. Router de Calculations
- **Arquivo:** `server/routers/calculations.ts`
- **Endpoints tRPC:**
  - `calculations.calculateCG`
  - `calculations.calculateElectrical`
  - `calculations.calculateGas`
  - `calculations.calculateDeflection`
  - `calculations.validateCompliance`

---

## 📋 PLANO DE EXECUÇÃO

### Etapa 1: Calculadora de CG (2-3 horas)
1. Criar `server/calculators/centerOfGravity.ts`
2. Implementar fórmula do centroide
3. Implementar validações (zona segura, distribuição, altura)
4. Testar com dados de exemplo
5. Criar router `calculations.calculateCG`
6. Integrar no `_app.ts`

### Etapa 2: Calculadora Elétrica (2-3 horas)
1. Criar `server/calculators/electrical.ts`
2. Implementar cálculos (corrente, queda de tensão, autonomia)
3. Implementar tabela NBR 5410 (seção de cabo)
4. Criar router `calculations.calculateElectrical`
5. Integrar no `_app.ts`

### Etapa 3: Calculadora de Gás (1-2 horas)
1. Criar `server/calculators/gas.ts`
2. Implementar cálculos (consumo, autonomia, ventilação)
3. Criar router `calculations.calculateGas`
4. Integrar no `_app.ts`

### Etapa 4: Deflexão e Conformidade (1-2 horas)
1. Criar `server/calculators/deflection.ts`
2. Criar `server/calculators/compliance.ts`
3. Criar routers restantes
4. Integrar tudo no `_app.ts`

### Etapa 5: Testes e Validação (1 hora)
1. Testar todas as calculadoras com dados reais
2. Validar fórmulas
3. Ajustar se necessário

---

## 🎯 APÓS AS CALCULADORAS (Próxima Prioridade)

### **PRIORIDADE 2: Exportadores (PDF primeiro)**
- Implementar `server/exporters/pdfExporter.ts`
- Criar router `export.toPDF`
- Testar geração de PDF

### **PRIORIDADE 3: Componentes React Principais**
- Canvas 2D básico (primeiro)
- PropertyPanel
- CGCalculator component (para exibir resultados)

### **PRIORIDADE 4: Autenticação Completa**
- Router de auth (login/registro)
- Páginas de login/registro
- Integração frontend

---

## 📊 CRITÉRIOS DE SUCESSO

✅ Calculadoras implementadas quando:
- [ ] Todas as 5 calculadoras criadas e funcionando
- [ ] Router de calculations completo
- [ ] Fórmulas validadas com dados de teste
- [ ] Tipos TypeScript corretos
- [ ] Integrado no tRPC app router

---

## 🚀 RECOMENDAÇÃO FINAL

**PRÓXIMO PASSO: Implementar Calculadora de Centro de Gravidade (CG)**

**Por quê?**
1. É a funcionalidade mais importante do MVP
2. Diferencia o produto dos concorrentes
3. Base para outras funcionalidades
4. Permite validação rápida do produto
5. Pode ser testada isoladamente

**Ordem de Implementação Sugerida:**
1. ✅ CG (primeiro - mais importante)
2. ✅ Elétrica (segundo - muito solicitado)
3. ✅ Gás (terceiro - importante para segurança)
4. ✅ Deflexão (quarto - complementar)
5. ✅ Conformidade (quinto - agrega valor)

---

## 📝 NOTAS IMPORTANTES

- Todas as fórmulas estão documentadas no blueprint técnico
- Use os types já definidos em `shared/types.ts`
- Valide com dados de exemplo do `EXEMPLOS_JSON_CamperFit_Pro.md`
- Mantenha TypeScript estrito
- Teste cada calculadora isoladamente antes de integrar

---

**Preparado por:** Análise de Documentos  
**Próxima Revisão:** Após implementação das calculadoras

