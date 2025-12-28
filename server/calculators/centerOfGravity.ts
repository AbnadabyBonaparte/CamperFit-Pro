import type { CGResult } from '../../shared/types';
import type { ProjectComponent } from '../../drizzle/schema';
import type { Project } from '../../drizzle/schema';

interface Component {
  id: string;
  posX: number;
  posY: number;
  posZ: number;
  weight: number; // kg
}

interface ProjectDimensions {
  wheelbase: number; // mm
  length: number; // mm
  width: number; // mm
  height: number; // mm
  maxGVWR: number; // kg
}

/**
 * Calcula o centro de gravidade de um projeto baseado nos componentes
 */
export function calculateCenterOfGravity(
  components: Component[],
  project: ProjectDimensions
): CGResult {
  // Se não houver componentes, retorna valores zerados
  if (components.length === 0) {
    return {
      cgX: 0,
      cgY: 0,
      cgZ: 0,
      totalWeight: 0,
      status: 'safe',
      weightDistributionFront: 50,
      weightDistributionRear: 50,
      tippingRisk: 'low',
      issues: [],
    };
  }

  // Cálculo de CG usando momentos
  let totalWeight = 0;
  let momentX = 0;
  let momentY = 0;
  let momentZ = 0;

  for (const component of components) {
    const weight = component.weight || 0;
    totalWeight += weight;
    momentX += weight * (component.posX || 0);
    momentY += weight * (component.posY || 0);
    momentZ += weight * (component.posZ || 0);
  }

  // Evitar divisão por zero
  if (totalWeight === 0) {
    return {
      cgX: 0,
      cgY: 0,
      cgZ: 0,
      totalWeight: 0,
      status: 'safe',
      weightDistributionFront: 50,
      weightDistributionRear: 50,
      tippingRisk: 'low',
      issues: ['Nenhum componente com peso definido'],
    };
  }

  const cgX = momentX / totalWeight;
  const cgY = momentY / totalWeight;
  const cgZ = momentZ / totalWeight;

  // Verificar se está na zona segura (20-40% do wheelbase)
  const safeZoneMin = project.wheelbase * 0.2;
  const safeZoneMax = project.wheelbase * 0.4;
  const cgLongitudinal = cgX; // Posição longitudinal relativa ao wheelbase

  let status: 'safe' | 'warning' | 'critical' = 'safe';
  if (cgLongitudinal < safeZoneMin) {
    status = 'critical';
  } else if (cgLongitudinal > safeZoneMax) {
    status = 'critical';
  } else if (cgLongitudinal < safeZoneMin * 1.2 || cgLongitudinal > safeZoneMax * 0.8) {
    status = 'warning';
  }

  // Distribuição de peso por eixo (estimado)
  // Front = (wheelbase - cgX) / wheelbase * 100
  const weightDistributionFront = ((project.wheelbase - cgLongitudinal) / project.wheelbase) * 100;
  const weightDistributionRear = (cgLongitudinal / project.wheelbase) * 100;

  // Risco de tombamento (altura do CG)
  // Altura máxima segura: width / 2 (simplificado)
  const maxCGHeight = project.width / 2;
  const tippingRisk: 'low' | 'normal' | 'high' = 
    cgZ > maxCGHeight * 1.2 ? 'high' :
    cgZ > maxCGHeight ? 'normal' : 'low';

  // Converter status para formato esperado
  const finalStatus: 'safe' | 'warning' | 'critical' = 
    status === 'critical' ? 'critical' :
    status === 'warning' ? 'warning' : 'safe';

  const issues = generateCGIssues(finalStatus, tippingRisk, totalWeight, project);

  return {
    cgX,
    cgY,
    cgZ,
    totalWeight,
    status: finalStatus,
    weightDistributionFront: Math.round(weightDistributionFront * 100) / 100,
    weightDistributionRear: Math.round(weightDistributionRear * 100) / 100,
    tippingRisk,
    issues,
  };
}

function generateCGIssues(
  status: 'safe' | 'warning' | 'critical',
  tippingRisk: 'low' | 'normal' | 'high',
  totalWeight: number,
  project: ProjectDimensions
): string[] {
  const issues: string[] = [];

  if (status === 'critical') {
    const safeZoneMin = project.wheelbase * 0.2;
    const safeZoneMax = project.wheelbase * 0.4;
    // Vamos adicionar uma mensagem genérica aqui, o cálculo específico será feito no router
    issues.push('Centro de gravidade fora da zona segura recomendada (20-40% do wheelbase).');
  } else if (status === 'warning') {
    issues.push('Centro de gravidade próximo aos limites da zona segura.');
  }

  if (tippingRisk === 'high') {
    issues.push('Altura do CG muito alta. Risco aumentado de tombamento em curvas.');
  }

  if (totalWeight > project.maxGVWR) {
    issues.push(`Peso total (${totalWeight.toFixed(2)}kg) excede capacidade máxima do veículo (${project.maxGVWR}kg).`);
  }

  // Verificar distribuição de peso (máximo 60/40)
  const safeZoneMin = project.wheelbase * 0.2;
  const safeZoneMax = project.wheelbase * 0.4;
  const estimatedFrontPercent = ((project.wheelbase - (project.length * 0.3)) / project.wheelbase) * 100;
  const estimatedRearPercent = 100 - estimatedFrontPercent;

  if (estimatedFrontPercent > 60 || estimatedRearPercent > 60) {
    issues.push('Distribuição de peso desbalanceada. Recomenda-se balancear entre 40-60% por eixo.');
  }

  return issues;
}

