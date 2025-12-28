import type { ElectricalResult } from '../../shared/types';

interface ElectricalComponent {
  type?: string;
  electricalPower?: number | null; // W
  electricalVoltage?: number | null; // V
  customProperties?: any;
}

/**
 * Calcula o sistema elétrico baseado nos componentes
 */
export function calculateElectrical(
  components: ElectricalComponent[]
): ElectricalResult {
  // Separar componentes por tipo (baseado em customProperties ou type)
  const batteries = components.filter(c => 
    (c.customProperties?.type === 'battery' || c.type === 'battery') && 
    c.electricalVoltage && 
    c.customProperties?.capacity_ah
  );

  const loads = components.filter(c => 
    (c.customProperties?.type === 'load' || c.type === 'load') && 
    c.electricalPower
  );

  const solarPanels = components.filter(c => 
    (c.customProperties?.type === 'solar' || c.type === 'solar') && 
    c.electricalPower
  );

  // Cálculo de carga total (W)
  const totalLoad = loads.reduce((sum, load) => {
    return sum + (load.electricalPower || 0);
  }, 0);

  // Cálculo de corrente (I = P / V)
  const voltage = batteries[0]?.electricalVoltage || 12;
  const totalCurrent = totalLoad > 0 && voltage > 0 ? totalLoad / voltage : 0;

  // Cálculo de autonomia
  const totalCapacity = batteries.reduce((sum, bat) => {
    const capacity = bat.customProperties?.capacity_ah || 0;
    return sum + capacity;
  }, 0);

  // Consumo diário (kWh)
  const dailyConsumption = loads.reduce((sum, load) => {
    const power = load.electricalPower || 0;
    const dailyUsage = load.customProperties?.daily_usage_h || 24;
    return sum + ((power * dailyUsage) / 1000); // kWh
  }, 0);

  // Autonomia em horas
  const totalEnergyWh = totalCapacity * voltage;
  const autonomyHours = totalLoad > 0 ? totalEnergyWh / totalLoad : 0;
  const autonomyDays = autonomyHours / 24;

  // Recomendações de cabo (NBR 5410)
  const cableSection = recommendCableSection(totalCurrent);

  // Queda de tensão (máx 3%)
  const voltageDrop = calculateVoltageDrop(totalCurrent, cableSection, voltage);

  const issues = generateElectricalIssues(voltageDrop, autonomyDays, totalLoad, totalCapacity);

  return {
    totalLoad: Math.round(totalLoad * 100) / 100,
    totalCurrent: Math.round(totalCurrent * 100) / 100,
    autonomyHours: Math.round(autonomyHours * 100) / 100,
    autonomyDays: Math.round(autonomyDays * 100) / 100,
    cableSection,
    voltageDrop: Math.round(voltageDrop * 100) / 100,
    voltageDripStatus: voltageDrop <= 3 ? 'ok' : 'warning',
    issues,
  };
}

/**
 * Recomenda seção de cabo baseado na corrente (NBR 5410 simplificada)
 */
function recommendCableSection(current: number): number {
  // Tabela simplificada de seção de cabo (mm²) por corrente (A)
  if (current <= 10) return 2.5;
  if (current <= 16) return 4;
  if (current <= 25) return 6;
  if (current <= 32) return 10;
  if (current <= 40) return 16;
  if (current <= 63) return 25;
  if (current <= 100) return 35;
  if (current <= 160) return 50;
  if (current <= 200) return 70;
  return 95; // Para correntes maiores
}

/**
 * Calcula queda de tensão (ΔV = (2 * ρ * L * I) / A)
 * @param current Corrente em A
 * @param cableSection Seção do cabo em mm²
 * @param voltage Tensão em V
 * @param cableLength Comprimento do cabo em metros (padrão 10m)
 */
function calculateVoltageDrop(
  current: number,
  cableSection: number,
  voltage: number,
  cableLength: number = 10
): number {
  if (current === 0 || cableSection === 0 || voltage === 0) {
    return 0;
  }

  // Resistividade do cobre: 0.0175 Ω*mm²/m
  const resistivity = 0.0175;
  
  // Resistência do cabo: R = (ρ * L) / A
  const resistance = (resistivity * cableLength) / cableSection;
  
  // Queda de tensão: ΔV = I * R
  const voltageDrop = current * resistance;
  
  // Retornar em porcentagem
  return (voltageDrop / voltage) * 100;
}

function generateElectricalIssues(
  voltageDrop: number,
  autonomyDays: number,
  totalLoad: number,
  totalCapacity: number
): string[] {
  const issues: string[] = [];

  if (voltageDrop > 3) {
    issues.push(`Queda de tensão (${voltageDrop.toFixed(2)}%) excede o máximo recomendado (3%). Considere aumentar a seção do cabo.`);
  }

  if (autonomyDays < 1 && totalLoad > 0) {
    issues.push(`Autonomia muito baixa (${autonomyDays.toFixed(2)} dias). Considere aumentar a capacidade das baterias ou reduzir o consumo.`);
  }

  if (totalLoad === 0) {
    issues.push('Nenhuma carga elétrica detectada. Verifique se os componentes têm potência definida.');
  }

  if (totalCapacity === 0 && totalLoad > 0) {
    issues.push('Nenhuma bateria detectada. O sistema precisa de baterias para funcionar.');
  }

  if (autonomyDays > 7) {
    issues.push(`Autonomia excelente (${autonomyDays.toFixed(2)} dias). Sistema bem dimensionado.`);
  }

  return issues;
}

