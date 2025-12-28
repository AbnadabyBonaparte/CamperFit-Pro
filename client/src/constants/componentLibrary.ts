/**
 * Biblioteca de Componentes Internos para Campers
 * 20 componentes essenciais (base para futura expansão de 200+)
 */

export type ComponentCategory = 
  | 'sleeping' 
  | 'kitchen' 
  | 'storage' 
  | 'electrical' 
  | 'plumbing' 
  | 'furniture';

export interface ComponentLibraryItem {
  id: string;
  name: string;
  category: ComponentCategory;
  description?: string;
  
  // Dimensões em mm
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  
  // Peso em kg
  weight: number;
  
  // Geometria 3D
  geometryType: 'box' | 'cylinder' | 'custom';
  
  // Visual
  defaultColor: string; // hex color
  
  // Propriedades específicas
  properties?: {
    capacity?: number; // L para tanques, Ah para baterias, W para painéis
    voltage?: number; // V para elétricos
    power?: number; // W para elétricos
    material?: string;
    [key: string]: any;
  };
}

export const componentLibrary: ComponentLibraryItem[] = [
  // ===== SLEEPING =====
  {
    id: 'bed-double',
    name: 'Cama Casal',
    category: 'sleeping',
    description: 'Cama casal 140x190cm',
    dimensions: { length: 1900, width: 1400, height: 400 },
    weight: 45,
    geometryType: 'box',
    defaultColor: '#8b7355',
    properties: { material: 'MDF 18mm' },
  },
  {
    id: 'bed-single',
    name: 'Cama Solteiro',
    category: 'sleeping',
    description: 'Cama solteiro 90x190cm',
    dimensions: { length: 1900, width: 900, height: 400 },
    weight: 25,
    geometryType: 'box',
    defaultColor: '#8b7355',
    properties: { material: 'MDF 18mm' },
  },
  {
    id: 'sofa-bed',
    name: 'Sofá-Cama',
    category: 'sleeping',
    description: 'Sofá que vira cama casal',
    dimensions: { length: 2000, width: 1400, height: 800 },
    weight: 60,
    geometryType: 'box',
    defaultColor: '#654321',
    properties: { material: 'Espuma + tecido' },
  },
  
  // ===== KITCHEN =====
  {
    id: 'kitchen-compact',
    name: 'Cozinha Compacta',
    category: 'kitchen',
    description: 'Cozinha completa com pia, fogão e armários',
    dimensions: { length: 1200, width: 600, height: 900 },
    weight: 85,
    geometryType: 'box',
    defaultColor: '#d3d3d3',
    properties: { material: 'Compensado naval' },
  },
  {
    id: 'fridge-12v',
    name: 'Geladeira 12V',
    category: 'kitchen',
    description: 'Geladeira compacta 12V 40L',
    dimensions: { length: 500, width: 500, height: 650 },
    weight: 18,
    geometryType: 'box',
    defaultColor: '#ffffff',
    properties: { capacity: 40, voltage: 12, power: 45 },
  },
  {
    id: 'stove-2burners',
    name: 'Fogão 2 Bocas',
    category: 'kitchen',
    description: 'Fogão a gás 2 bocas com forno',
    dimensions: { length: 450, width: 550, height: 350 },
    weight: 12,
    geometryType: 'box',
    defaultColor: '#c0c0c0',
    properties: { material: 'Aço inox' },
  },
  
  // ===== STORAGE =====
  {
    id: 'cabinet-overhead',
    name: 'Armário Aéreo',
    category: 'storage',
    description: 'Armário aéreo 120cm',
    dimensions: { length: 1200, width: 350, height: 400 },
    weight: 20,
    geometryType: 'box',
    defaultColor: '#deb887',
    properties: { material: 'Compensado naval' },
  },
  {
    id: 'cabinet-floor',
    name: 'Armário de Piso',
    category: 'storage',
    description: 'Armário baixo 100cm',
    dimensions: { length: 1000, width: 500, height: 700 },
    weight: 35,
    geometryType: 'box',
    defaultColor: '#deb887',
    properties: { material: 'Compensado naval' },
  },
  {
    id: 'drawer-unit',
    name: 'Gaveteiro',
    category: 'storage',
    description: 'Conjunto de 3 gavetas',
    dimensions: { length: 800, width: 450, height: 600 },
    weight: 28,
    geometryType: 'box',
    defaultColor: '#d4a574',
    properties: { material: 'MDF' },
  },
  
  // ===== ELECTRICAL =====
  {
    id: 'battery-200ah',
    name: 'Bateria 200Ah',
    category: 'electrical',
    description: 'Bateria AGM 12V 200Ah',
    dimensions: { length: 520, width: 240, height: 220 },
    weight: 62,
    geometryType: 'box',
    defaultColor: '#4a5568',
    properties: { capacity: 200, voltage: 12 },
  },
  {
    id: 'solar-panel-300w',
    name: 'Painel Solar 300W',
    category: 'electrical',
    description: 'Painel solar monocristalino 300W',
    dimensions: { length: 1956, width: 992, height: 40 },
    weight: 22,
    geometryType: 'box',
    defaultColor: '#1a202c',
    properties: { power: 300, voltage: 12 },
  },
  {
    id: 'inverter-1000w',
    name: 'Inversor 1000W',
    category: 'electrical',
    description: 'Inversor senoidal pura 1000W',
    dimensions: { length: 300, width: 200, height: 150 },
    weight: 8,
    geometryType: 'box',
    defaultColor: '#2d3748',
    properties: { power: 1000, voltage: 12 },
  },
  {
    id: 'charge-controller-30a',
    name: 'Controlador de Carga 30A',
    category: 'electrical',
    description: 'Controlador MPPT 30A',
    dimensions: { length: 200, width: 150, height: 80 },
    weight: 1.5,
    geometryType: 'box',
    defaultColor: '#4a5568',
    properties: { voltage: 12, current: 30 },
  },
  
  // ===== PLUMBING =====
  {
    id: 'water-tank-100l',
    name: 'Tanque de Água 100L',
    category: 'plumbing',
    description: 'Tanque de água 100 litros',
    dimensions: { length: 600, width: 400, height: 500 },
    weight: 5, // vazio
    geometryType: 'cylinder',
    defaultColor: '#87ceeb',
    properties: { capacity: 100 },
  },
  {
    id: 'water-tank-50l',
    name: 'Tanque de Água 50L',
    category: 'plumbing',
    description: 'Tanque de água 50 litros',
    dimensions: { length: 500, width: 350, height: 400 },
    weight: 3,
    geometryType: 'cylinder',
    defaultColor: '#87ceeb',
    properties: { capacity: 50 },
  },
  {
    id: 'gas-tank-13kg',
    name: 'Botijão Gás 13kg',
    category: 'plumbing',
    description: 'Botijão de gás GLP 13kg',
    dimensions: { length: 350, width: 350, height: 650 },
    weight: 14, // vazio
    geometryType: 'cylinder',
    defaultColor: '#c0c0c0',
    properties: { capacity: 13 },
  },
  
  // ===== FURNITURE =====
  {
    id: 'table-foldable',
    name: 'Mesa Dobrável',
    category: 'furniture',
    description: 'Mesa dobrável para 4 pessoas',
    dimensions: { length: 1200, width: 700, height: 750 },
    weight: 15,
    geometryType: 'box',
    defaultColor: '#d4a574',
    properties: { material: 'Compensado naval' },
  },
  {
    id: 'chair-foldable',
    name: 'Cadeira Dobrável',
    category: 'furniture',
    description: 'Cadeira dobrável',
    dimensions: { length: 400, width: 400, height: 850 },
    weight: 3,
    geometryType: 'box',
    defaultColor: '#8b4513',
    properties: { material: 'Alumínio + tecido' },
  },
  {
    id: 'bathroom-box',
    name: 'Banheiro com Box',
    category: 'furniture',
    description: 'Banheiro completo com box',
    dimensions: { length: 900, width: 900, height: 2000 },
    weight: 120,
    geometryType: 'box',
    defaultColor: '#ffffff',
    properties: { material: 'Acrílico' },
  },
  {
    id: 'shower-box',
    name: 'Box de Banho',
    category: 'furniture',
    description: 'Box de banho 80x80cm',
    dimensions: { length: 800, width: 800, height: 1950 },
    weight: 45,
    geometryType: 'box',
    defaultColor: '#e0e0e0',
    properties: { material: 'Acrílico' },
  },
];

/**
 * Buscar componente por ID
 */
export function getComponentById(id: string): ComponentLibraryItem | undefined {
  return componentLibrary.find((c) => c.id === id);
}

/**
 * Buscar componentes por categoria
 */
export function getComponentsByCategory(category: ComponentCategory): ComponentLibraryItem[] {
  return componentLibrary.filter((c) => c.category === category);
}

/**
 * Buscar componentes por texto (busca simples)
 */
export function searchComponents(query: string): ComponentLibraryItem[] {
  const lowerQuery = query.toLowerCase();
  return componentLibrary.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.description?.toLowerCase().includes(lowerQuery) ||
      c.category.toLowerCase().includes(lowerQuery)
  );
}

