/**
 * Biblioteca de Veículos Base para Campers
 * Dimensões em mm, pesos em kg
 */

export interface Vehicle {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  year?: string;
  
  // Dimensões da caçamba
  bedLength: number; // mm - comprimento interno da caçamba
  bedWidthInt: number; // mm - largura interna da caçamba
  bedDepth: number; // mm - profundidade da caçamba
  bedWidthExt: number; // mm - largura externa da caçamba
  
  // Dimensões do veículo
  wheelbase: number; // mm - distância entre eixos
  totalLength: number; // mm - comprimento total do veículo
  totalWidth: number; // mm - largura total
  cabHeight: number; // mm - altura da cabine
  groundClearance: number; // mm - altura livre do solo
  
  // Capacidade
  payloadMax: number; // kg - capacidade máxima de carga
  
  // Para renderização 3D (simplificada)
  cabLength: number; // mm - comprimento da cabine
  cabWidth: number; // mm - largura da cabine
  tireDiameter: number; // mm - diâmetro da roda
  wheelTrack: number; // mm - bitola (distância entre rodas)
}

export const vehicles: Vehicle[] = [
  {
    id: 'mahindra-pikup-2013',
    name: 'Mahindra Pik-Up',
    manufacturer: 'Mahindra',
    model: 'Pik-Up',
    year: '2013',
    bedLength: 1480,
    bedWidthInt: 1440,
    bedDepth: 400,
    bedWidthExt: 1500,
    wheelbase: 3200,
    totalLength: 4980,
    totalWidth: 1820,
    cabHeight: 1880,
    groundClearance: 210,
    payloadMax: 1000,
    cabLength: 2800,
    cabWidth: 1820,
    tireDiameter: 750,
    wheelTrack: 1500,
  },
  {
    id: 'toyota-hilux-cabine-dupla',
    name: 'Toyota Hilux Cabine Dupla',
    manufacturer: 'Toyota',
    model: 'Hilux',
    year: '2020+',
    bedLength: 1525,
    bedWidthInt: 1600,
    bedDepth: 480,
    bedWidthExt: 1650,
    wheelbase: 3085,
    totalLength: 5325,
    totalWidth: 1855,
    cabHeight: 1795,
    groundClearance: 225,
    payloadMax: 1100,
    cabLength: 3000,
    cabWidth: 1855,
    tireDiameter: 780,
    wheelTrack: 1570,
  },
  {
    id: 'ford-ranger-cabine-dupla',
    name: 'Ford Ranger Cabine Dupla',
    manufacturer: 'Ford',
    model: 'Ranger',
    year: '2020+',
    bedLength: 1549,
    bedWidthInt: 1580,
    bedDepth: 511,
    bedWidthExt: 1630,
    wheelbase: 3270,
    totalLength: 5374,
    totalWidth: 1860,
    cabHeight: 1867,
    groundClearance: 237,
    payloadMax: 1100,
    cabLength: 3100,
    cabWidth: 1860,
    tireDiameter: 800,
    wheelTrack: 1580,
  },
  {
    id: 'chevrolet-s10-cabine-dupla',
    name: 'Chevrolet S10 Cabine Dupla',
    manufacturer: 'Chevrolet',
    model: 'S10',
    year: '2020+',
    bedLength: 1524,
    bedWidthInt: 1587,
    bedDepth: 467,
    bedWidthExt: 1637,
    wheelbase: 3096,
    totalLength: 5359,
    totalWidth: 1871,
    cabHeight: 1796,
    groundClearance: 216,
    payloadMax: 1050,
    cabLength: 3000,
    cabWidth: 1871,
    tireDiameter: 780,
    wheelTrack: 1587,
  },
  {
    id: 'mitsubishi-l200-triton',
    name: 'Mitsubishi L200 Triton',
    manufacturer: 'Mitsubishi',
    model: 'L200 Triton',
    year: '2020+',
    bedLength: 1520,
    bedWidthInt: 1470,
    bedDepth: 475,
    bedWidthExt: 1520,
    wheelbase: 3000,
    totalLength: 5305,
    totalWidth: 1815,
    cabHeight: 1810,
    groundClearance: 220,
    payloadMax: 1000,
    cabLength: 3000,
    cabWidth: 1815,
    tireDiameter: 770,
    wheelTrack: 1510,
  },
  {
    id: 'vw-amarok',
    name: 'VW Amarok',
    manufacturer: 'Volkswagen',
    model: 'Amarok',
    year: '2020+',
    bedLength: 1555,
    bedWidthInt: 1620,
    bedDepth: 508,
    bedWidthExt: 1670,
    wheelbase: 3095,
    totalLength: 5254,
    totalWidth: 1954,
    cabHeight: 1834,
    groundClearance: 237,
    payloadMax: 1150,
    cabLength: 2900,
    cabWidth: 1954,
    tireDiameter: 800,
    wheelTrack: 1640,
  },
  {
    id: 'nissan-frontier',
    name: 'Nissan Frontier',
    manufacturer: 'Nissan',
    model: 'Frontier',
    year: '2020+',
    bedLength: 1524,
    bedWidthInt: 1539,
    bedDepth: 463,
    bedWidthExt: 1589,
    wheelbase: 3200,
    totalLength: 5325,
    totalWidth: 1850,
    cabHeight: 1858,
    groundClearance: 218,
    payloadMax: 1050,
    cabLength: 3000,
    cabWidth: 1850,
    tireDiameter: 780,
    wheelTrack: 1550,
  },
  {
    id: 'toyota-hilux-cabine-simples',
    name: 'Toyota Hilux Cabine Simples',
    manufacturer: 'Toyota',
    model: 'Hilux',
    year: '2020+',
    bedLength: 2300, // Caçamba longa
    bedWidthInt: 1600,
    bedDepth: 480,
    bedWidthExt: 1650,
    wheelbase: 3095,
    totalLength: 5335,
    totalWidth: 1855,
    cabHeight: 1795,
    groundClearance: 225,
    payloadMax: 1200, // Mais payload por ser cabine simples
    cabLength: 2500,
    cabWidth: 1855,
    tireDiameter: 780,
    wheelTrack: 1570,
  },
];

/**
 * Buscar veículo por ID
 */
export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}

/**
 * Veículo padrão (Mahindra Pik-Up 2013)
 */
export const defaultVehicle = vehicles[0];

