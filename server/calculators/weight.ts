import type { ProjectComponent } from '../../drizzle/schema';

export interface WeightResult {
  componentsWeight: number; // kg
  shellWeight: number; // kg
  totalWeight: number; // kg
  payloadUsed: number; // kg
  payloadAvailable: number; // kg
  payloadPercentage: number; // %
  payloadMax: number; // kg
}

interface ShellParams {
  floorLength: number; // mm
  outerWidth: number; // mm
  interiorHeight: number; // mm
  alcoveDepth: number; // mm
  alcoveHeight: number; // mm
  externalMaterialId?: string;
  internalMaterialId?: string;
  insulationMaterialId?: string;
  showFrame?: boolean;
  frameSize?: '50x50' | '40x40' | '30x30';
}

interface Material {
  id: string;
  density: number; // kg/m² ou kg/m³
  thickness?: number; // mm
}

/**
 * Calcula o peso total do projeto (componentes + shell)
 */
export function calculateWeight(
  components: ProjectComponent[],
  shellParams: ShellParams | null,
  payloadMax: number,
  materials: Material[]
): WeightResult {
  // Peso dos componentes
  const componentsWeight = components.reduce((sum, comp) => sum + (comp.weight || 0), 0);

  // Peso da shell (se tiver params)
  let shellWeight = 0;
  if (shellParams) {
    shellWeight = calculateShellWeight(shellParams, materials);
  }

  const totalWeight = componentsWeight + shellWeight;
  const payloadUsed = totalWeight;
  const payloadAvailable = Math.max(0, payloadMax - payloadUsed);
  const payloadPercentage = payloadMax > 0 ? (payloadUsed / payloadMax) * 100 : 0;

  return {
    componentsWeight,
    shellWeight,
    totalWeight,
    payloadUsed,
    payloadAvailable,
    payloadPercentage,
    payloadMax,
  };
}

/**
 * Calcula o peso da shell baseado nos materiais e dimensões
 */
function calculateShellWeight(params: ShellParams, materials: Material[]): number {
  let totalWeight = 0;

  // Área do corpo principal (sem teto, sem piso - apenas laterais)
  const mainBodyArea = 
    (params.floorLength * params.interiorHeight * 2) + // Laterais
    (params.outerWidth * params.interiorHeight * 2); // Frente/trás

  // Área do teto
  const roofArea = params.floorLength * params.outerWidth;

  // Área do piso
  const floorArea = params.floorLength * params.outerWidth;

  // Material externo (laterais + teto)
  if (params.externalMaterialId) {
    const externalMaterial = materials.find(m => m.id === params.externalMaterialId);
    if (externalMaterial) {
      totalWeight += calculateMaterialWeight(externalMaterial, mainBodyArea / 1000000); // m²
      totalWeight += calculateMaterialWeight(externalMaterial, roofArea / 1000000);
    }
  }

  // Material interno (laterais + teto)
  if (params.internalMaterialId) {
    const internalMaterial = materials.find(m => m.id === params.internalMaterialId);
    if (internalMaterial) {
      totalWeight += calculateMaterialWeight(internalMaterial, mainBodyArea / 1000000);
      totalWeight += calculateMaterialWeight(internalMaterial, roofArea / 1000000);
    }
  }

  // Isolamento (volume)
  if (params.insulationMaterialId) {
    const insulationMaterial = materials.find(m => m.id === params.insulationMaterialId);
    if (insulationMaterial) {
      const insulationArea = mainBodyArea + roofArea; // Área total isolada
      const thicknessM = (insulationMaterial.thickness || 50) / 1000; // mm para m
      const insulationVolume = (insulationArea / 1000000) * thicknessM; // m³
      
      if (insulationMaterial.density < 100) {
        // kg/m²
        totalWeight += insulationMaterial.density * (insulationArea / 1000000);
      } else {
        // kg/m³
        totalWeight += insulationMaterial.density * insulationVolume;
      }
    }
  }

  // Frame metalon (se habilitado)
  if (params.showFrame && params.frameSize) {
    const frameSizeMap = {
      '50x50': 50,
      '40x40': 40,
      '30x30': 30,
    };
    const frameSize = frameSizeMap[params.frameSize];
    const frameLength = (params.floorLength + params.outerWidth) * 2 * 4; // Perímetro x 4 cantos
    const frameVolume = (frameLength / 1000) * (frameSize / 1000) * (frameSize / 1000); // m³
    const frameDensity = 7850; // kg/m³ (aço)
    totalWeight += frameDensity * frameVolume;
  }

  // Alcova
  if (params.alcoveDepth > 0) {
    const alcoveArea = params.alcoveDepth * params.alcoveHeight * 2 + params.outerWidth * params.alcoveHeight;
    if (params.externalMaterialId) {
      const externalMaterial = materials.find(m => m.id === params.externalMaterialId);
      if (externalMaterial) {
        totalWeight += calculateMaterialWeight(externalMaterial, alcoveArea / 1000000);
      }
    }
  }

  return totalWeight;
}

/**
 * Calcular peso do material por área
 */
function calculateMaterialWeight(material: Material, areaM2: number): number {
  // Se density é kg/m² (materiais em chapa)
  if (material.thickness && material.density < 100) {
    return material.density * areaM2;
  }
  
  // Se density é kg/m³ (materiais volumétricos)
  const thicknessM = (material.thickness || 0.05) / 1000; // mm para m
  const volumeM3 = areaM2 * thicknessM;
  return material.density * volumeM3;
}

