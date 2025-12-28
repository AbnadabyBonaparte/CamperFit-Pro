/**
 * Biblioteca de Materiais para Campers
 * Densidades em kg/m³ ou kg/m² conforme aplicável
 */

export type MaterialCategory = 
  | 'estrutura' 
  | 'revestimento-externo' 
  | 'isolamento' 
  | 'revestimento-interno';

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  
  // Propriedades físicas
  density: number; // kg/m³ para volumétricos, kg/m² para chapa/lâmina
  thickness?: number; // mm - espessura padrão (para materiais em chapa)
  
  // Propriedades térmicas
  thermalR?: number; // m²·K/W - resistência térmica (quanto maior, melhor isolante)
  thermalConductivity?: number; // W/(m·K) - condutividade térmica
  
  // Propriedades mecânicas (opcional)
  tensileStrength?: number; // MPa
  compressiveStrength?: number; // MPa
  
  // Custos (estimados em R$/m²)
  costPerM2?: number; // R$/m² - custo estimado por metro quadrado
  
  // Visual
  visualColor: string; // Cor hex para visualização 3D
  texture?: string; // Nome da textura (futuro: path para textura)
}

export const materials: Material[] = [
  // ===== ESTRUTURA =====
  {
    id: 'metalon-50x50x3',
    name: 'Metalon 50x50x3mm',
    category: 'estrutura',
    density: 7850, // kg/m³ (aço)
    thickness: 3,
    costPerM2: 85, // R$/m² (estimado, baseado em metro linear)
    visualColor: '#8b8b8b', // Cinza metálico
  },
  {
    id: 'metalon-40x40x3',
    name: 'Metalon 40x40x3mm',
    category: 'estrutura',
    density: 7850,
    thickness: 3,
    costPerM2: 70,
    visualColor: '#8b8b8b',
  },
  {
    id: 'metalon-30x30x2',
    name: 'Metalon 30x30x2mm',
    category: 'estrutura',
    density: 7850,
    thickness: 2,
    costPerM2: 50,
    visualColor: '#8b8b8b',
  },
  
  // ===== REVESTIMENTO EXTERNO =====
  {
    id: 'acm-3mm',
    name: 'ACM 3mm (Aluminum Composite Material)',
    category: 'revestimento-externo',
    density: 4.8, // kg/m²
    thickness: 3,
    thermalR: 0.05,
    costPerM2: 180,
    visualColor: '#c0c0c0', // Prateado
  },
  {
    id: 'fibra-vidro-3mm',
    name: 'Fibra de Vidro 3mm',
    category: 'revestimento-externo',
    density: 6.5, // kg/m²
    thickness: 3,
    thermalR: 0.02,
    costPerM2: 120,
    visualColor: '#ffffff', // Branco
  },
  {
    id: 'chapa-aluminio-2mm',
    name: 'Chapa de Alumínio 2mm',
    category: 'revestimento-externo',
    density: 5.4, // kg/m²
    thickness: 2,
    thermalR: 0.001,
    costPerM2: 95,
    visualColor: '#e0e0e0', // Prateado claro
  },
  
  // ===== ISOLAMENTO =====
  {
    id: 'pu-expandido-50mm',
    name: 'PU Expandido 50mm',
    category: 'isolamento',
    density: 40, // kg/m³
    thickness: 50,
    thermalR: 2.0, // Excelente isolante
    costPerM2: 85,
    visualColor: '#ffeaa7', // Amarelo claro
  },
  {
    id: 'divinycell-h80-50mm',
    name: 'Divinycell H80 50mm',
    category: 'isolamento',
    density: 80, // kg/m³
    thickness: 50,
    thermalR: 1.8,
    costPerM2: 180,
    visualColor: '#ffeaa7',
  },
  {
    id: '3tc-50mm',
    name: '3TC 50mm',
    category: 'isolamento',
    density: 35, // kg/m³
    thickness: 50,
    thermalR: 1.5,
    costPerM2: 65,
    visualColor: '#fff9e6',
  },
  {
    id: 'lã-rocg-50mm',
    name: 'Lã de Rocha 50mm',
    category: 'isolamento',
    density: 50, // kg/m³
    thickness: 50,
    thermalR: 1.2,
    costPerM2: 45,
    visualColor: '#ffe0b2',
  },
  
  // ===== REVESTIMENTO INTERNO =====
  {
    id: 'compensado-naval-15mm',
    name: 'Compensado Naval 15mm',
    category: 'revestimento-interno',
    density: 9.0, // kg/m²
    thickness: 15,
    thermalR: 0.15,
    costPerM2: 95,
    visualColor: '#d4a574', // Marrom claro (madeira)
  },
  {
    id: 'maderite-6mm',
    name: 'Maderite 6mm',
    category: 'revestimento-interno',
    density: 3.6, // kg/m²
    thickness: 6,
    thermalR: 0.06,
    costPerM2: 45,
    visualColor: '#e8c5a0', // Bege claro
  },
  {
    id: 'mdf-12mm',
    name: 'MDF 12mm',
    category: 'revestimento-interno',
    density: 7.2, // kg/m²
    thickness: 12,
    thermalR: 0.12,
    costPerM2: 55,
    visualColor: '#deb887', // Burlywood
  },
  {
    id: 'pvc-espumado-5mm',
    name: 'PVC Espumado 5mm',
    category: 'revestimento-interno',
    density: 3.0, // kg/m²
    thickness: 5,
    thermalR: 0.08,
    costPerM2: 65,
    visualColor: '#f5f5dc', // Bege
  },
];

/**
 * Buscar material por ID
 */
export function getMaterialById(id: string): Material | undefined {
  return materials.find((m) => m.id === id);
}

/**
 * Buscar materiais por categoria
 */
export function getMaterialsByCategory(category: MaterialCategory): Material[] {
  return materials.filter((m) => m.category === category);
}

/**
 * Calcular peso do material por área
 */
export function calculateMaterialWeight(material: Material, areaM2: number): number {
  // Se density é kg/m² (materiais em chapa)
  if (material.thickness && material.density < 100) {
    return material.density * areaM2;
  }
  
  // Se density é kg/m³ (materiais volumétricos)
  const thicknessM = (material.thickness || 0.05) / 1000; // mm para m
  const volumeM3 = areaM2 * thicknessM;
  return material.density * volumeM3;
}

/**
 * Material padrão para estrutura
 */
export const defaultStructureMaterial = materials.find((m) => m.id === 'metalon-50x50x3')!;

/**
 * Material padrão para revestimento externo
 */
export const defaultExternalMaterial = materials.find((m) => m.id === 'acm-3mm')!;

/**
 * Material padrão para isolamento
 */
export const defaultInsulationMaterial = materials.find((m) => m.id === 'pu-expandido-50mm')!;

/**
 * Material padrão para revestimento interno
 */
export const defaultInternalMaterial = materials.find((m) => m.id === 'compensado-naval-15mm')!;

