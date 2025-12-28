# 🎨 CamperFit Pro — Hierarquia de Temas Canônicos

**Versão:** 1.0  
**Data:** 28 de Dezembro de 2025  
**Status:** ✅ **ATIVO**

---

## 📋 VISÃO GERAL

O CamperFit Pro suporta **5 temas canônicos** que podem ser selecionados pelo usuário. Todos os temas seguem uma hierarquia consistente de cores usando CSS variables.

**Regra fundamental:** NUNCA use cores hardcoded. SEMPRE use temas.

---

## 🎯 TEMAS CANÔNICOS

### 1. Daylight ☀️ (Padrão)

**Descrição:** Tema claro e moderno, ideal para uso diurno e ambientes bem iluminados.

**Cores:**
- Primary: `#3b82f6` (Blue-500)
- Secondary: `#8b5cf6` (Purple-500)
- Background: `#ffffff` (Branco)
- Surface: `#f9fafb` (Gray-50)
- Text: `#111827` (Gray-900)
- Text Secondary: `#6b7280` (Gray-500)
- Border: `#e5e7eb` (Gray-200)

**Uso recomendado:** Uso geral, apresentações, trabalho diurno.

---

### 2. Expedition 🌙

**Descrição:** Tema dark profissional, ideal para expedições e uso noturno.

**Cores:**
- Primary: `#6366f1` (Indigo-500)
- Secondary: `#8b5cf6` (Purple-500)
- Background: `#1f2937` (Gray-800)
- Surface: `#374151` (Gray-700)
- Text: `#f9fafb` (Gray-50)
- Text Secondary: `#d1d5db` (Gray-300)
- Border: `#4b5563` (Gray-600)

**Uso recomendado:** Uso noturno, foco reduzido, expedições.

---

### 3. Blueprint 📐

**Descrição:** Tema técnico azul, inspirado em plantas e desenhos técnicos.

**Cores:**
- Primary: `#1e40af` (Blue-800)
- Secondary: `#7c3aed` (Purple-600)
- Background: `#eff6ff` (Blue-50)
- Surface: `#dbeafe` (Blue-100)
- Text: `#1e3a8a` (Blue-900)
- Text Secondary: `#3b82f6` (Blue-500)
- Border: `#93c5fd` (Blue-300)

**Uso recomendado:** Trabalho técnico, engenharia, desenhos.

---

### 4. Raiz 🌳

**Descrição:** Tema brasileiro verde/madeira, celebração da natureza e do "raiz".

**Cores:**
- Primary: `#16a34a` (Green-600)
- Secondary: `#ca8a04` (Yellow-600)
- Background: `#fefdf8` (Warm white)
- Surface: `#fef3c7` (Amber-50)
- Text: `#365314` (Green-900)
- Text Secondary: `#65a30d` (Lime-600)
- Border: `#d9f99d` (Lime-200)

**Uso recomendado:** Usuários que valorizam natureza, estilo brasileiro autêntico.

---

### 5. Forest 🌲

**Descrição:** Tema verde natureza profundo, conexão com ambiente natural.

**Cores:**
- Primary: `#059669` (Emerald-600)
- Secondary: `#0891b2` (Cyan-600)
- Background: `#f0fdf4` (Green-50)
- Surface: `#dcfce7` (Green-100)
- Text: `#064e3b` (Emerald-900)
- Text Secondary: `#10b981` (Emerald-500)
- Border: `#86efac` (Green-300)

**Uso recomendado:** Amantes da natureza, sustentabilidade, ambiente natural.

---

## 🔧 IMPLEMENTAÇÃO

### Estrutura de Cores

Todos os temas seguem esta estrutura:

```typescript
interface Theme {
  name: ThemeName;
  displayName: string;
  colors: {
    primary: string;        // Cor principal (botões, links)
    secondary: string;      // Cor secundária (destaques)
    background: string;     // Fundo principal
    surface: string;        // Superfícies (cards, painéis)
    text: string;           // Texto principal
    textSecondary: string;  // Texto secundário
    border: string;         // Bordas
    accent: string;         // Destaques especiais
    success: string;        // Sucesso
    warning: string;        // Avisos
    error: string;          // Erros
  };
}
```

### Uso em Componentes

**✅ CORRETO:**
```tsx
<div className="bg-[var(--color-background)] text-[var(--color-text)]">
  <button className="bg-[var(--color-primary)] text-white">
    Salvar
  </button>
</div>
```

**❌ ERRADO:**
```tsx
<div className="bg-white text-gray-900">
  <button className="bg-blue-500 text-white">
    Salvar
  </button>
</div>
```

### CSS Variables

O `ThemeProvider` aplica automaticamente CSS variables:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-background: #ffffff;
  /* ... etc */
}
```

### Seleção de Tema

O usuário pode selecionar tema via:
- `ThemeSelector` no Editor
- `useUIStore().setTheme()`
- Tema persiste em localStorage (futuro)

---

## 📊 HIERARQUIA DE CORES

### Prioridade de Uso

1. **Primary** → Ações principais (botões, links)
2. **Secondary** → Ações secundárias (destaques)
3. **Background** → Fundo da aplicação
4. **Surface** → Cards, painéis, modais
5. **Text** → Texto principal
6. **Text Secondary** → Texto secundário, labels
7. **Border** → Bordas, divisores
8. **Accent** → Destaques especiais
9. **Success/Warning/Error** → Feedback de ações

---

## 🎨 APLICAÇÃO EM COMPONENTES

### Botões

```tsx
// Primary button
<button className="bg-[var(--color-primary)] text-white">
  Salvar
</button>

// Secondary button
<button className="bg-[var(--color-secondary)] text-white">
  Cancelar
</button>
```

### Cards/Painéis

```tsx
<div className="bg-[var(--color-surface)] border border-[var(--color-border)]">
  <h3 className="text-[var(--color-text)]">Título</h3>
  <p className="text-[var(--color-text-secondary)]">Descrição</p>
</div>
```

### Texto

```tsx
<h1 className="text-[var(--color-text)]">Título Principal</h1>
<p className="text-[var(--color-text-secondary)]">Texto secundário</p>
```

---

## ⚠️ REGRAS OBRIGATÓRIAS

### ✅ FAZER

- ✅ Usar CSS variables (`var(--color-primary)`)
- ✅ Usar Tailwind com variáveis (`bg-[var(--color-background)]`)
- ✅ Consultar `themes.ts` para valores
- ✅ Testar com todos os temas

### ❌ NÃO FAZER

- ❌ Usar cores hex diretas (`#3b82f6`)
- ❌ Usar classes Tailwind hardcoded (`bg-blue-500`)
- ❌ Assumir que tema é sempre claro ou escuro
- ❌ Esquecer de testar com múltiplos temas

---

## 🧪 TESTES DE TEMA

Antes de commitar, teste:

- [ ] Daylight (padrão)
- [ ] Expedition (dark)
- [ ] Blueprint (técnico)
- [ ] Raiz (verde/madeira)
- [ ] Forest (natureza)

**Todos os temas devem funcionar perfeitamente.**

---

## 📚 REFERÊNCIAS

- `client/src/constants/themes.ts` - Definição dos temas
- `client/src/components/Theme/ThemeProvider.tsx` - Provider de temas
- `client/src/components/Theme/ThemeSelector.tsx` - Seletor de temas
- `MATRIZ_GENESIS_CamperFit.md` - Lei #1 (Zero Hardcoded)

---

**Última Atualização:** 28 de Dezembro de 2025  
**Mantido por:** Equipe CamperFit Pro  
**Status:** ✅ **ATIVO**

---

**🎨 O tema não é apenas cor. É identidade visual. Respeite a hierarquia. 🎨**

