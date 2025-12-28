# CamperFit Pro — Product Requirements Document (1000/1000)

**Versão:** 1.0 | **Data:** 28 de Dezembro de 2025 | **Status:** Especificação Completa

---

## 1. VISÃO EXECUTIVA

**CamperFit Pro** é a primeira plataforma de engenharia integrada para design, validação e homologação de motorhomes e campers. Combina visualização 3D intuitiva com cálculos técnicos rigorosos, conformidade regulatória brasileira e otimização de materiais — transformando sonhos em projetos viáveis.

### Problema
Construtores DIY e profissionais enfrentam:
- Erros críticos de distribuição de peso (causa #1 de acidentes)
- Dimensionamento incorreto de sistemas elétricos e de gás
- Desperdício de 15-30% em materiais por cortes ineficientes
- Incerteza sobre conformidade com CONTRAN/INMETRO
- Falta de ferramentas integradas (precisam usar 5+ softwares diferentes)

### Solução
Uma plataforma SaaS web-first que:
- Calcula automaticamente centro de gravidade, peso e deflexão
- Gera diagramas elétricos (unifilar) e esquemas de gás
- Exporta DXF otimizado para CNC ou corte manual
- Valida conformidade com normas brasileiras em tempo real
- Simula autonomia de bateria, gás e água
- Integra marketplace de componentes com preços reais

### Mercado-Alvo
- **DIY Builders:** 50k+ no Brasil (crescimento 25% a.a.)
- **Profissionais:** 2k+ fabricantes de motorhomes
- **Empresas:** Fabricantes de componentes, seguradoras

### Métrica de Sucesso
- **Ano 1:** 5k usuários ativos, R$ 500k MRR
- **Ano 2:** 20k usuários, R$ 2M MRR
- **Ano 3:** 50k usuários, R$ 5M MRR

---

## 2. FUNCIONALIDADES PRINCIPAIS (MVP + Roadmap)

### 2.1 MVP (Fase 1 — 3 meses)

#### **2.1.1 Gerenciador de Projetos**
- Criar, duplicar, arquivar projetos
- Histórico de versões (últimas 10)
- Compartilhamento com link (read-only ou edit)
- Exportação: PDF, PNG, JSON

#### **2.1.2 Editor de Layout 2D/3D**
- Canvas infinito com grid ajustável
- Biblioteca de 200+ componentes pré-construídos:
  - Móveis: cama, sofá, mesa, armário, geladeira, fogão
  - Utilitários: tanque de água, cilindro de gás, bateria, painel solar
  - Estruturais: janelas, portas, rodas, eixos
- Drag-and-drop com snap-to-grid
- Resize com constraints (proporções)
- Rotação (0°, 90°, 180°, 270°)
- Camadas (layers) com visibilidade toggle
- Undo/Redo (50 níveis)
- Visualização 3D em tempo real (Three.js)
- Modo first-person (câmera dentro do veículo)

#### **2.1.3 Calculadora de Centro de Gravidade (CG)**
- Input automático de peso para cada componente
- Cálculo em tempo real de:
  - Peso total (PBT)
  - Centro de gravidade (X, Y, Z)
  - Distribuição por eixo (dianteiro/traseiro)
  - Altura do CG (risco de tombamento)
- Visualização gráfica com overlay no layout
- Alertas se:
  - PBT > capacidade do veículo
  - CG fora da zona segura (20-40% do wheelbase)
  - Distribuição desbalanceada (>60/40)
  - Altura do CG muito alta (risco de tombamento)
- Exportação de relatório técnico (PDF)

#### **2.1.4 Calculadora de Peso e Deflexão**
- Cálculo de deflexão de piso (máx 5mm para segurança)
- Análise de pontos de carga críticos
- Recomendações de reforço estrutural
- Estimativa de consumo de combustível (com base em peso)

#### **2.1.5 Gerador de Diagrama Unifilar Elétrico**
- Input de componentes elétricos:
  - Baterias (12V DC, 24V DC, 110V AC)
  - Painéis solares (potência, tensão)
  - Inversor (potência, eficiência)
  - Carregador (amperagem)
  - Disjuntores, fusíveis, relés
  - Cargas: luzes LED, geladeira, ar-condicionado, chuveiro, etc.
- Cálculo automático de:
  - Corrente total (A)
  - Seção de cabos (NBR 5410)
  - Queda de tensão (máx 3%)
  - Disjuntor adequado
  - Tempo de autonomia (horas)
- Geração de diagrama unifilar em SVG/PDF
- Exportação de lista de materiais (BOM)

#### **2.1.6 Esquema de Gás (GLP)**
- Input de cilindros (P-13, P-20, etc.)
- Componentes: regulador, válvulas, tubulações, fogão, aquecedor
- Cálculo de:
  - Autonomia em dias (baseado em consumo)
  - Ventilação necessária (m³/h)
  - Conformidade com NBR 15264
- Diagrama de tubulação
- Checklist de segurança

#### **2.1.7 Checklist de Homologação**
- Validação contra:
  - CONTRAN Resolução 993/23 e 1020/25
  - INMETRO (se aplicável)
  - NBR 5410 (elétrica)
  - NBR 15264 (gás)
- Status visual: ✓ Conforme, ⚠ Atenção, ✗ Não conforme
- Recomendações de correção
- Exportação de relatório de conformidade

#### **2.1.8 Simulador de Autonomia**
- Inputs:
  - Consumo de água (litros/dia)
  - Consumo de gás (kg/dia)
  - Consumo de energia (kWh/dia)
  - Perfil de uso (urbano, rodovia, camping)
- Outputs:
  - Autonomia total em dias
  - Gráfico de consumo ao longo do tempo
  - Recomendações de ampliação de tanques/baterias

#### **2.1.9 Autenticação e Gestão de Usuários**
- Login com email/senha ou OAuth (Google, GitHub)
- Perfis: DIY, Profissional, Empresa
- Workspace compartilhado (equipes)
- Histórico de atividades

#### **2.1.10 Exportação e Integração**
- Formatos: PDF (relatório), PNG (imagem), JSON (dados), DXF (CAD)
- Integração com Google Drive para backup automático
- API REST para integrações futuras

---

### 2.2 Fase 2 (Meses 4-6)

#### **2.2.1 Otimizador de Corte (Nesting)**
- Upload de chapas (compensado naval, MDF, alumínio)
- Dimensões disponíveis
- Importação de peças (DXF ou manual)
- Algoritmo de otimização (bin packing 2D)
- Visualização de layout de corte
- Exportação para CNC ou guia de corte manual
- Estimativa de desperdício (%)
- Economia de material (R$)

#### **2.2.2 Marketplace de Componentes**
- Catálogo de 1000+ componentes
- Preços em tempo real (integração com fornecedores)
- Filtros: tipo, tamanho, preço, avaliação
- Carrinho de compras
- Integração com Shopify/WooCommerce

#### **2.2.3 Modo de Colaboração em Tempo Real**
- Múltiplos usuários editando simultaneamente
- Comentários e anotações
- Histórico de mudanças com diff visual
- Notificações de mudanças

#### **2.2.4 Biblioteca de Templates**
- 50+ templates de motorhomes populares
- Templates por tipo: Sprinter, Kombi, Furgão, Trailer
- Customização a partir de templates
- Comunidade contribui templates

---

### 2.3 Fase 3 (Meses 7-12)

#### **2.3.1 Análise Estrutural Avançada**
- Cálculo de tensões (FEA simplificado)
- Análise de vibrações
- Simulação de impacto
- Recomendações de reforço

#### **2.3.2 Integração com Fornecedores**
- API para fabricantes de componentes
- Sincronização de catálogo e preços
- Pedidos diretos via plataforma

#### **2.3.3 App Mobile (iOS/Android)**
- Visualização de projetos
- Câmera AR para visualizar motorhome no espaço real
- Acesso offline a projetos

#### **2.3.4 Comunidade e Fórum**
- Fórum de discussão
- Galeria de projetos
- Avaliações e reviews
- Webinars e tutoriais

---

## 3. ESPECIFICAÇÃO TÉCNICA

### 3.1 Arquitetura

```
Frontend (React 19 + Tailwind 4)
├── Pages
│   ├── Dashboard (lista de projetos)
│   ├── Editor (layout + calculadoras)
│   ├── Relatórios (CG, elétrica, gás)
│   └── Marketplace
├── Components
│   ├── Canvas (Three.js para 3D)
│   ├── PropertyPanel (inputs)
│   ├── Calculators (CG, elétrica, gás)
│   └── ExportDialog
└── State (TanStack Query + Zustand)

Backend (Express + tRPC)
├── /api/trpc
│   ├── projects (CRUD)
│   ├── components (library)
│   ├── calculations (CG, elétrica, gás)
│   ├── export (PDF, DXF, PNG)
│   └── marketplace
├── /api/auth (OAuth)
└── /api/webhooks (fornecedores)

Database (MySQL/TiDB)
├── users
├── projects
├── components
├── calculations
├── exports
└── marketplace_items

Storage (S3)
├── /projects/{id}/
├── /exports/{id}/
└── /marketplace/images/
```

### 3.2 Schemas JSON

#### **Project Schema**
```json
{
  "id": "uuid",
  "userId": "int",
  "name": "string",
  "description": "string",
  "vehicleType": "enum(sprinter, kombi, furgao, trailer, custom)",
  "dimensions": {
    "length": "float (mm)",
    "width": "float (mm)",
    "height": "float (mm)",
    "wheelbase": "float (mm)",
    "maxGVWR": "float (kg)"
  },
  "components": [
    {
      "id": "uuid",
      "type": "enum(furniture, utility, structural)",
      "name": "string",
      "position": { "x": "float", "y": "float", "z": "float" },
      "rotation": "float (degrees)",
      "dimensions": { "length": "float", "width": "float", "height": "float" },
      "weight": "float (kg)",
      "material": "string",
      "customProperties": {}
    }
  ],
  "calculations": {
    "centerOfGravity": { "x": "float", "y": "float", "z": "float" },
    "totalWeight": "float (kg)",
    "weightDistribution": { "front": "float (%)", "rear": "float (%)" },
    "cgHeight": "float (mm)",
    "deflection": "float (mm)",
    "fuelConsumption": "float (km/l)"
  },
  "electrical": {
    "batteries": [{ "voltage": "int (V)", "capacity": "float (Ah)", "quantity": "int" }],
    "solarPanels": [{ "power": "float (W)", "voltage": "int (V)", "quantity": "int" }],
    "inverter": { "power": "float (W)", "efficiency": "float (%)" },
    "loads": [{ "name": "string", "power": "float (W)", "dailyUsage": "float (h)" }],
    "cables": [{ "from": "string", "to": "string", "section": "float (mm²)", "length": "float (m)" }],
    "autonomy": "float (h)"
  },
  "gas": {
    "cylinders": [{ "type": "enum(P13, P20, P30)", "quantity": "int", "weight": "float (kg)" }],
    "regulator": { "type": "string", "pressure": "float (bar)" },
    "appliances": [{ "name": "string", "consumption": "float (kg/day)" }],
    "autonomy": "float (days)"
  },
  "compliance": {
    "contran": { "status": "enum(compliant, warning, non_compliant)", "issues": ["string"] },
    "inmetro": { "status": "enum(compliant, warning, non_compliant)", "issues": ["string"] },
    "nbr5410": { "status": "enum(compliant, warning, non_compliant)", "issues": ["string"] },
    "nbr15264": { "status": "enum(compliant, warning, non_compliant)", "issues": ["string"] }
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "version": "int"
}
```

#### **Component Library Schema**
```json
{
  "id": "uuid",
  "category": "enum(furniture, utility, structural, electrical, gas)",
  "name": "string",
  "description": "string",
  "dimensions": { "length": "float", "width": "float", "height": "float" },
  "weight": "float (kg)",
  "material": "string",
  "price": "float (R$)",
  "supplier": "string",
  "image": "url",
  "properties": {
    "electrical": { "voltage": "int (V)", "power": "float (W)" },
    "gas": { "consumption": "float (kg/day)" },
    "water": { "capacity": "float (liters)" }
  },
  "createdAt": "timestamp"
}
```

#### **Calculation Result Schema**
```json
{
  "projectId": "uuid",
  "type": "enum(centerOfGravity, electrical, gas, deflection)",
  "result": {
    "centerOfGravity": {
      "x": "float (mm)",
      "y": "float (mm)",
      "z": "float (mm)",
      "safeZone": { "min": "float", "max": "float" },
      "status": "enum(safe, warning, critical)"
    },
    "electrical": {
      "totalLoad": "float (W)",
      "totalCurrent": "float (A)",
      "autonomy": "float (h)",
      "cables": [{ "section": "float (mm²)", "length": "float (m)" }],
      "breakers": [{ "amperage": "float (A)", "quantity": "int" }]
    },
    "gas": {
      "totalConsumption": "float (kg/day)",
      "autonomy": "float (days)",
      "safetyIssues": ["string"]
    }
  },
  "timestamp": "timestamp"
}
```

---

## 4. FLUXO DE USUÁRIO (UX)

### 4.1 Onboarding
1. **Sign-up:** Email ou OAuth
2. **Perfil:** Selecionar tipo (DIY, Profissional, Empresa)
3. **Tutorial:** 3 minutos (vídeo + interativo)
4. **Primeiro Projeto:** Template ou começar do zero

### 4.2 Fluxo Principal
1. **Dashboard:** Lista de projetos, criar novo
2. **Editor:** Canvas + PropertyPanel + Calculadoras
3. **Validação:** Checklist de conformidade em tempo real
4. **Exportação:** PDF, PNG, DXF, JSON
5. **Compartilhamento:** Link ou convite

### 4.3 Fluxo de Cálculos
1. **Adicionar Componente:** Drag-and-drop ou busca na biblioteca
2. **Atualizar Propriedades:** Peso, dimensões, posição
3. **Recalcular:** Automático em tempo real
4. **Visualizar Resultado:** Gráfico de CG, alertas
5. **Exportar Relatório:** PDF com análise completa

---

## 5. REGRAS DE NEGÓCIO

### 5.1 Validações de Engenharia
- **Centro de Gravidade:** Deve estar entre 20-40% do wheelbase (segurança)
- **Altura do CG:** Máximo 60% da altura do veículo (risco de tombamento)
- **Distribuição de Peso:** Máximo 60/40 entre eixos
- **Deflexão de Piso:** Máximo 5mm em qualquer ponto
- **Corrente Elétrica:** Máximo 80% da capacidade do cabo (NBR 5410)
- **Ventilação de Gás:** Mínimo 2 aberturas (superior e inferior)

### 5.2 Conformidade Regulatória
- **CONTRAN 993/23:** Identificação VIN, segurança, circulação
- **INMETRO:** Certificação de equipamentos críticos
- **NBR 5410:** Instalações elétricas de baixa tensão
- **NBR 15264:** Sistemas de gás em veículos recreativos

### 5.3 Limites de Plano
| Recurso | Starter | Pro | Enterprise |
|---------|---------|-----|------------|
| Projetos | 5 | Ilimitado | Ilimitado |
| Componentes | 100 | 500+ | Customizado |
| Exportações/mês | 10 | 100 | Ilimitado |
| Colaboradores | 1 | 5 | Ilimitado |
| API | Não | Não | Sim |

---

## 6. MÉTRICAS E KPIs

### 6.1 Métricas de Produto
- **DAU (Daily Active Users):** Meta 30% de MAU
- **Tempo Médio de Sessão:** Meta 45 minutos
- **Taxa de Conclusão de Projeto:** Meta 70%
- **Taxa de Exportação:** Meta 60% dos projetos
- **Retenção (D7, D30):** Meta 50%, 30%

### 6.2 Métricas de Negócio
- **CAC (Customer Acquisition Cost):** Meta R$ 50
- **LTV (Lifetime Value):** Meta R$ 2.000
- **Churn Rate:** Meta <5% ao mês
- **NPS (Net Promoter Score):** Meta >50

### 6.3 Métricas Técnicas
- **Uptime:** 99.9%
- **Latência P95:** <500ms
- **Taxa de Erro:** <0.1%
- **Tempo de Cálculo de CG:** <100ms

---

## 7. ROADMAP (12 MESES)

| Fase | Mês | Funcionalidades | Objetivo |
|------|-----|-----------------|----------|
| MVP | 1-3 | Layout, CG, elétrica, gás, conformidade | 1k usuários |
| Expansão | 4-6 | Nesting, marketplace, colaboração | 5k usuários |
| Escala | 7-9 | App mobile, FEA, integrações | 15k usuários |
| Consolidação | 10-12 | Comunidade, webinars, API | 50k usuários |

---

## 8. PRICING E MODELO DE NEGÓCIO

### 8.1 Planos de Preço
- **Starter:** R$ 49/mês (DIY iniciante)
- **Pro:** R$ 149/mês (DIY avançado + profissionais)
- **Enterprise:** Customizado (fabricantes, integradores)

### 8.2 Monetização Adicional
- **Marketplace:** Comissão 15% em vendas de componentes
- **Consultoria:** R$ 500-2.000 por projeto (validação técnica)
- **Treinamento:** R$ 1.000-5.000 por workshop
- **API:** R$ 500-5.000/mês por integração

### 8.3 Projeção Financeira (Ano 1)
- **Receita MRR:** R$ 50k (mês 3) → R$ 500k (mês 12)
- **Custo de Infraestrutura:** R$ 5k/mês
- **Custo de Pessoal:** R$ 30k/mês (3 pessoas)
- **Margem:** 60% (mês 12)

---

## 9. RISCOS E MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|--------|-----------|
| Baixa adoção | Média | Alto | Comunidade, marketing, freemium |
| Erros de cálculo | Baixa | Crítico | Validação rigorosa, testes, revisão técnica |
| Conformidade regulatória | Média | Alto | Consultoria jurídica, atualização contínua |
| Concorrência | Alta | Médio | Diferenciação técnica, comunidade |
| Churn de usuários | Média | Médio | Onboarding, suporte, features contínuas |

---

## 10. SUCESSO E MÉTRICAS DE SAÍDA

### 10.1 MVP Bem-Sucedido (Mês 3)
- ✓ 1.000 usuários ativos
- ✓ NPS > 40
- ✓ Taxa de retenção D30 > 40%
- ✓ Sem bugs críticos em produção

### 10.2 Produto Escalável (Mês 6)
- ✓ 5.000 usuários ativos
- ✓ MRR > R$ 100k
- ✓ NPS > 50
- ✓ Marketplace com 100+ fornecedores

### 10.3 Liderança de Mercado (Mês 12)
- ✓ 50.000 usuários ativos
- ✓ MRR > R$ 500k
- ✓ NPS > 60
- ✓ Integração com 10+ fabricantes

---

## 11. APÊNDICE: NORMAS E REGULAMENTAÇÕES

### 11.1 CONTRAN Resolução 993/23
- Identificação VIN em componentes críticos
- Requisitos de segurança (freios, direção, suspensão)
- Inspeção periódica obrigatória

### 11.2 ABNT NBR 5410 (Instalações Elétricas)
- Dimensionamento de cabos por corrente
- Queda de tensão máxima 3%
- Proteção contra sobrecorrente
- Aterramento obrigatório

### 11.3 ABNT NBR 15264 (Sistemas de Gás)
- Cilindros em compartimento isolado
- Ventilação permanente (2 aberturas)
- Tubulação de cobre sem costura ou mangueira certificada
- Válvulas de segurança obrigatórias
- Testes de vazamento periódicos

---

**Documento Finalizado:** 28 de Dezembro de 2025
**Próximo Passo:** Validação com stakeholders e início do desenvolvimento
