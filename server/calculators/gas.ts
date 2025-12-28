import type { GasResult } from '../../shared/types';

interface GasComponent {
  gasConsumption?: number | null; // kg/day
  customProperties?: any;
}

/**
 * Calcula o sistema de gás baseado nos componentes
 */
export function calculateGas(
  components: GasComponent[]
): GasResult {
  // Filtrar componentes relacionados a gás
  const gasComponents = components.filter(c => 
    c.gasConsumption || 
    c.customProperties?.type === 'gas_cylinder' ||
    c.customProperties?.type === 'stove' ||
    c.customProperties?.type === 'heater' ||
    c.customProperties?.consumption_kg_per_day
  );

  // Separar cilindros e aparelhos
  const cylinders = gasComponents.filter(c => 
    c.customProperties?.type === 'gas_cylinder' || 
    c.customProperties?.capacity_kg
  );

  const appliances = gasComponents.filter(c => 
    c.gasConsumption ||
    c.customProperties?.consumption_kg_per_day ||
    (c.customProperties?.type !== 'gas_cylinder' && c.customProperties?.capacity_kg === undefined)
  );

  // Capacidade total dos cilindros (kg)
  const totalCapacity = cylinders.reduce((sum, cyl) => {
    const capacity = cyl.customProperties?.capacity_kg || 0;
    return sum + capacity;
  }, 0);

  // Consumo total diário (kg/dia)
  const totalConsumption = appliances.reduce((sum, app) => {
    const consumption = 
      app.gasConsumption || 
      app.customProperties?.consumption_kg_per_day || 
      0;
    return sum + consumption;
  }, 0);

  // Autonomia em dias
  const autonomy = totalConsumption > 0 ? totalCapacity / totalConsumption : 0;

  // Validações de segurança (NBR 15264)
  const safetyIssues = validateGasSafety(cylinders, appliances, totalCapacity, totalConsumption);

  return {
    totalConsumption: Math.round(totalConsumption * 100) / 100,
    autonomy: Math.round(autonomy * 100) / 100,
    safetyIssues,
  };
}

/**
 * Valida segurança do sistema de gás conforme NBR 15264
 */
function validateGasSafety(
  cylinders: GasComponent[],
  appliances: GasComponent[],
  totalCapacity: number,
  totalConsumption: number
): string[] {
  const issues: string[] = [];

  // Verificar se há cilindros
  if (cylinders.length === 0) {
    issues.push('Nenhum cilindro de gás detectado. O sistema precisa de pelo menos um cilindro.');
  }

  // Verificar se há aparelhos
  if (appliances.length === 0) {
    issues.push('Nenhum aparelho a gás detectado. Verifique se os componentes têm consumo de gás definido.');
  }

  // Verificar capacidade mínima recomendada
  if (totalCapacity < 13 && totalConsumption > 0) {
    issues.push('Capacidade de gás muito baixa. Recomenda-se pelo menos um cilindro P-13 (13kg) para uso básico.');
  }

  // Verificar autonomia mínima recomendada (mínimo 3 dias)
  const autonomy = totalConsumption > 0 ? totalCapacity / totalConsumption : 0;
  if (autonomy < 3 && autonomy > 0) {
    issues.push(`Autonomia baixa (${autonomy.toFixed(2)} dias). Recomenda-se aumentar a capacidade dos cilindros ou reduzir o consumo.`);
  }

  // Verificar se consumo é razoável
  if (totalConsumption > 5) {
    issues.push(`Consumo diário muito alto (${totalConsumption.toFixed(2)}kg/dia). Verifique se os valores de consumo estão corretos.`);
  }

  // Verificar ventilação (NBR 15264 requer 2 aberturas - superior e inferior)
  // Nota: Esta validação é simplificada. Uma validação completa precisaria de informações do projeto
  issues.push('Certifique-se de que o compartimento de gás tem ventilação adequada (2 aberturas: superior e inferior) conforme NBR 15264.');

  // Verificar isolamento
  issues.push('Certifique-se de que o cilindro está em compartimento isolado e resistente ao fogo conforme NBR 15264.');

  return issues;
}

