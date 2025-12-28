/**
 * Calcula a deflexão estimada da suspensão/piso do veículo
 */

interface Component {
  weight: number; // kg
  posX: number; // mm
  posY: number; // mm
  length?: number; // mm
  width?: number; // mm
}

interface ProjectDimensions {
  length: number; // mm
  width: number; // mm
  wheelbase: number; // mm
  maxGVWR: number; // kg
}

export interface DeflectionResult {
  deflection: number; // mm
  maxDeflectionPoint: number; // mm (posição X)
  status: 'safe' | 'warning' | 'critical';
  issues: string[];
  recommendations: string[];
}

/**
 * Calcula deflexão estimada do piso/suspensão
 * Simplificado: assume distribuição uniforme e calcula deflexão máxima estimada
 */
export function calculateDeflection(
  components: Component[],
  project: ProjectDimensions
): DeflectionResult {
  // Peso total
  const totalWeight = components.reduce((sum, c) => sum + (c.weight || 0), 0);

  // Se não houver peso, retorna zero
  if (totalWeight === 0) {
    return {
      deflection: 0,
      maxDeflectionPoint: project.length / 2,
      status: 'safe',
      issues: [],
      recommendations: [],
    };
  }

  // Cálculo simplificado de deflexão
  // Fórmula simplificada: δ ≈ (5 * W * L^3) / (384 * E * I)
  // Para simplificar, usamos uma estimativa baseada em peso e comprimento

  // Estimativa de deflexão máxima (mm)
  // Baseado em: deflexão proporcional ao peso e ao comprimento ao quadrado
  // Valores típicos: 1-5mm para estruturas leves, até 10mm para estruturas pesadas
  const baseDeflectionPerKg = 0.01; // mm por kg (estimativa)
  const lengthFactor = (project.length / 1000) ** 2; // Fator de comprimento
  
  const estimatedDeflection = (totalWeight * baseDeflectionPerKg * lengthFactor);

  // Limitar a deflexão estimada (valores razoáveis)
  const deflection = Math.min(estimatedDeflection, 20); // Máximo 20mm

  // Ponto de máxima deflexão (geralmente no centro)
  const maxDeflectionPoint = project.length / 2;

  // Status baseado no limite de 5mm (recomendação de segurança)
  let status: 'safe' | 'warning' | 'critical' = 'safe';
  if (deflection > 5) {
    status = 'critical';
  } else if (deflection > 3) {
    status = 'warning';
  }

  // Verificar sobrecarga
  const weightRatio = totalWeight / project.maxGVWR;
  if (weightRatio > 0.9) {
    status = 'critical';
  } else if (weightRatio > 0.8) {
    status = status === 'critical' ? 'critical' : 'warning';
  }

  const issues: string[] = [];
  const recommendations: string[] = [];

  if (deflection > 5) {
    issues.push(`Deflexão estimada (${deflection.toFixed(2)}mm) excede o limite recomendado de segurança (5mm).`);
    recommendations.push('Considere reforçar a estrutura do piso com vigas adicionais.');
    recommendations.push('Redistribua o peso para reduzir concentrações de carga.');
  } else if (deflection > 3) {
    issues.push(`Deflexão estimada (${deflection.toFixed(2)}mm) está próxima do limite recomendado.`);
    recommendations.push('Monitore a deflexão durante o uso e considere reforços preventivos.');
  }

  if (weightRatio > 0.9) {
    issues.push(`Peso total (${totalWeight.toFixed(2)}kg) está muito próximo da capacidade máxima (${project.maxGVWR}kg).`);
    recommendations.push('Considere reduzir o peso do projeto ou aumentar a capacidade do veículo.');
  }

  if (deflection <= 3) {
    recommendations.push('Deflexão dentro dos parâmetros seguros. Estrutura adequada para o uso.');
  }

  return {
    deflection: Math.round(deflection * 100) / 100,
    maxDeflectionPoint: Math.round(maxDeflectionPoint),
    status,
    issues,
    recommendations,
  };
}

