import { getMaterialById, calculateMaterialWeight } from '../constants/materials';
import { Vehicle } from '../constants/vehicles';

// Re-export ShellParams from Shell3D
export type { ShellParams } from '../components/Canvas/Shell3D';

/**
 * Calcular peso da shell baseado nos materiais e dimensões
 */
export function calculateShellWeight(params: ShellParams, vehicle: Vehicle): number {
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
  const externalMaterial = params.externalMaterialId 
    ? getMaterialById(params.externalMaterialId)
    : null;
  if (externalMaterial) {
    totalWeight += calculateMaterialWeight(externalMaterial, mainBodyArea / 1000000); // m²
    totalWeight += calculateMaterialWeight(externalMaterial, roofArea / 1000000);
  }

  // Material interno (laterais + teto)
  const internalMaterial = params.internalMaterialId
    ? getMaterialById(params.internalMaterialId)
    : null;
  if (internalMaterial) {
    totalWeight += calculateMaterialWeight(internalMaterial, mainBodyArea / 1000000);
    totalWeight += calculateMaterialWeight(internalMaterial, roofArea / 1000000);
  }

  // Isolamento (volume)
  const insulationMaterial = params.insulationMaterialId
    ? getMaterialById(params.insulationMaterialId)
    : null;
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

  // Frame metalon (se habilitado)
  if (params.showFrame) {
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
    if (externalMaterial) {
      totalWeight += calculateMaterialWeight(externalMaterial, alcoveArea / 1000000);
    }
  }

  return totalWeight;
}

