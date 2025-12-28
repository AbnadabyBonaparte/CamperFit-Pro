// Constantes compartilhadas

// Canvas dimensions (can be overridden by user preferences)
export const CANVAS_DEFAULT_WIDTH = 1200;
export const CANVAS_DEFAULT_HEIGHT = 800;

export const VEHICLE_TYPE_OPTIONS = [
  { value: 'sprinter', label: 'Sprinter' },
  { value: 'kombi', label: 'Kombi' },
  { value: 'furgao', label: 'Furgão' },
  { value: 'trailer', label: 'Trailer' },
  { value: 'custom', label: 'Custom' },
] as const;

export const PROJECT_STATUS_OPTIONS = [
  { value: 'draft', label: 'Rascunho' },
  { value: 'in_progress', label: 'Em Progresso' },
  { value: 'completed', label: 'Completo' },
  { value: 'archived', label: 'Arquivado' },
] as const;

export const COMPONENT_CATEGORIES = [
  { value: 'furniture', label: 'Móveis' },
  { value: 'utility', label: 'Utilitários' },
  { value: 'structural', label: 'Estrutural' },
  { value: 'electrical', label: 'Elétrica' },
  { value: 'gas', label: 'Gás' },
] as const;

// Dimensões padrão por tipo de veículo (mm)
export const DEFAULT_VEHICLE_DIMENSIONS: Record<string, {
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  maxGVWR: number;
}> = {
  sprinter: {
    length: 5700,
    width: 2550,
    height: 2800,
    wheelbase: 3665,
    maxGVWR: 3500,
  },
  kombi: {
    length: 4800,
    width: 2100,
    height: 2500,
    wheelbase: 2800,
    maxGVWR: 2500,
  },
  furgao: {
    length: 5500,
    width: 2300,
    height: 2700,
    wheelbase: 3400,
    maxGVWR: 3000,
  },
  trailer: {
    length: 6000,
    width: 2400,
    height: 2900,
    wheelbase: 4000,
    maxGVWR: 3500,
  },
  custom: {
    length: 5000,
    width: 2200,
    height: 2600,
    wheelbase: 3000,
    maxGVWR: 2800,
  },
};

// Grid padrão (mm)
export const DEFAULT_GRID_SIZE = 50;

// Constantes de tempo (ms)
export const REFETCH_INTERVAL_MS = 5000;

// Constantes de dimensões
export const TIRE_WIDTH_MM = 250;
export const STEEL_DENSITY_KG_M3 = 7850;
export const MM_TO_M = 1000;
export const MM2_TO_M2 = 1000000;

// Dimensões padrão para fallback (mm)
export const DEFAULT_FALLBACK_DIMENSIONS = {
  width: 1500,
  length: 2000,
  height: 1800,
};

// Cores padrão (hex) - DEPRECATED: Use FALLBACK_COLORS de threeJsConstants.ts
export const DEFAULT_COLORS = {
  furniture: '#8B7355',
  utility: '#4A90E2',
  structural: '#95A5A6',
  electrical: '#F39C12',
  gas: '#E74C3C',
} as const;

