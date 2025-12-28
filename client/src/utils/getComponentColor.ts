/**
 * Helper para obter cores de componentes usando FALLBACK_COLORS
 * Three.js requer hex, então convertemos de FALLBACK_COLORS
 */
import { FALLBACK_COLORS } from '../../../shared/consts/threeJsConstants';

/**
 * Mapeamento de categorias de componentes para cores do FALLBACK_COLORS
 */
const categoryColorMap: Record<string, keyof typeof FALLBACK_COLORS> = {
  sleeping: 'surface',
  kitchen: 'surface',
  storage: 'border',
  electrical: 'componentDefault',
  plumbing: 'componentDefault',
  furniture: 'surface',
};

/**
 * Obter cor padrão para componente baseado na categoria
 * Retorna hex string para compatibilidade com Three.js
 */
export function getComponentColor(category: string): string {
  const colorKey = categoryColorMap[category] || 'componentDefault';
  return FALLBACK_COLORS[colorKey];
}

/**
 * Obter cor padrão para material baseado na categoria
 * Retorna hex string para compatibilidade com Three.js
 */
export function getMaterialColor(category: string): string {
  const materialColorMap: Record<string, keyof typeof FALLBACK_COLORS> = {
    estrutura: 'componentDefault',
    'revestimento-externo': 'surface',
    isolamento: 'warning', // Amarelo para isolamento
    'revestimento-interno': 'surface',
  };
  
  const colorKey = materialColorMap[category] || 'componentDefault';
  return FALLBACK_COLORS[colorKey];
}

