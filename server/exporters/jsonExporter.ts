import type { Project } from '../../drizzle/schema';
import type { ProjectComponent } from '../../drizzle/schema';
import type { Calculation } from '../../drizzle/schema';

export interface ExportData {
  project: Project;
  components: ProjectComponent[];
  calculations: Calculation[];
}

/**
 * Exporta projeto para JSON
 */
export function exportToJSON(data: ExportData): string {
  const exportObject = {
    project: {
      id: data.project.id,
      name: data.project.name,
      description: data.project.description,
      vehicleType: data.project.vehicleType,
      dimensions: {
        length: data.project.length,
        width: data.project.width,
        height: data.project.height,
        wheelbase: data.project.wheelbase,
        maxGVWR: data.project.maxGVWR,
      },
      calculatedData: {
        totalWeight: data.project.totalWeight,
        cgX: data.project.cgX,
        cgY: data.project.cgY,
        cgZ: data.project.cgZ,
        cgHeight: data.project.cgHeight,
        weightDistributionFront: data.project.weightDistributionFront,
        weightDistributionRear: data.project.weightDistributionRear,
        deflection: data.project.deflection,
        fuelConsumption: data.project.fuelConsumption,
      },
      status: data.project.status,
      version: data.project.version,
      createdAt: data.project.createdAt,
      updatedAt: data.project.updatedAt,
    },
    components: data.components.map(c => ({
      id: c.id,
      componentLibraryId: c.componentLibraryId,
      position: {
        x: c.posX,
        y: c.posY,
        z: c.posZ,
      },
      rotation: {
        x: c.rotationX,
        y: c.rotationY,
        z: c.rotationZ,
      },
      dimensions: {
        length: c.length,
        width: c.width,
        height: c.height,
      },
      weight: c.weight,
      material: c.material,
      color: c.color,
      electricalPower: c.electricalPower,
      electricalVoltage: c.electricalVoltage,
      gasConsumption: c.gasConsumption,
      waterCapacity: c.waterCapacity,
      customProperties: c.customProperties,
      notes: c.notes,
    })),
    calculations: data.calculations.map(calc => ({
      type: calc.type,
      result: calc.result,
      status: calc.status,
      issues: calc.issues,
      createdAt: calc.createdAt,
    })),
    exportedAt: new Date().toISOString(),
    version: '1.0',
  };

  return JSON.stringify(exportObject, null, 2);
}

