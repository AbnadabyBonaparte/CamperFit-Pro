import type { ComplianceResult } from '../../shared/types';
import type { Project } from '../../drizzle/schema';
import type { ProjectComponent } from '../../drizzle/schema';
import type { CGResult } from '../../shared/types';
import type { ElectricalResult } from '../../shared/types';
import type { GasResult } from '../../shared/types';

/**
 * Valida conformidade do projeto com normas brasileiras
 */
export function validateCompliance(
  project: Project,
  components: ProjectComponent[],
  calculations: {
    cg?: CGResult;
    electrical?: ElectricalResult;
    gas?: GasResult;
  }
): ComplianceResult {
  const contranIssues: string[] = [];
  const nbr5410Issues: string[] = [];
  const nbr15264Issues: string[] = [];

  // Validação CONTRAN 993/23
  contranIssues.push(...validateContran(project, components, calculations.cg));

  // Validação NBR 5410 (Elétrica)
  nbr5410Issues.push(...validateNBR5410(calculations.electrical));

  // Validação NBR 15264 (Gás)
  nbr15264Issues.push(...validateNBR15264(calculations.gas, components));

  // Determinar status geral para cada norma
  const contranStatus = contranIssues.length === 0 
    ? 'compliant' 
    : contranIssues.length <= 2 
    ? 'warning' 
    : 'non_compliant';

  const nbr5410Status = nbr5410Issues.length === 0
    ? 'compliant'
    : nbr5410Issues.length <= 1
    ? 'warning'
    : 'non_compliant';

  const nbr15264Status = nbr15264Issues.length === 0
    ? 'compliant'
    : nbr15264Issues.length <= 1
    ? 'warning'
    : 'non_compliant';

  return {
    contran: {
      status: contranStatus,
      issues: contranIssues,
    },
    nbr5410: {
      status: nbr5410Status,
      issues: nbr5410Issues,
    },
    nbr15264: {
      status: nbr15264Status,
      issues: nbr15264Issues,
    },
  };
}

/**
 * Valida CONTRAN Resolução 993/23
 */
function validateContran(
  project: Project,
  components: ProjectComponent[],
  cg?: CGResult
): string[] {
  const issues: string[] = [];

  // Verificar peso total vs capacidade
  if (cg && cg.totalWeight > (project.maxGVWR || 0)) {
    issues.push(`Peso total (${cg.totalWeight.toFixed(2)}kg) excede a capacidade máxima do veículo (${project.maxGVWR}kg) conforme CONTRAN.`);
  }

  // Verificar centro de gravidade
  if (cg && cg.status === 'critical') {
    issues.push('Centro de gravidade fora dos parâmetros seguros. Pode afetar estabilidade e segurança conforme CONTRAN.');
  }

  // Verificar distribuição de peso (máximo 60/40)
  if (cg && (cg.weightDistributionFront > 60 || cg.weightDistributionRear > 60)) {
    issues.push(`Distribuição de peso desbalanceada (${cg.weightDistributionFront.toFixed(1)}%/${cg.weightDistributionRear.toFixed(1)}%). Recomenda-se balancear para máximo 60/40%.`);
  }

  // Verificar se projeto tem dimensões válidas
  if (!project.length || !project.width || !project.height || !project.wheelbase) {
    issues.push('Dimensões do veículo não foram completamente definidas. Necessário para homologação CONTRAN.');
  }

  // Verificar identificação VIN (simplificado - apenas verificar se projeto tem nome/ID)
  if (!project.name || project.name.trim() === '') {
    issues.push('Projeto deve ter identificação adequada para homologação CONTRAN.');
  }

  return issues;
}

/**
 * Valida NBR 5410 (Instalações Elétricas de Baixa Tensão)
 */
function validateNBR5410(electrical?: ElectricalResult): string[] {
  const issues: string[] = [];

  if (!electrical) {
    issues.push('Cálculos elétricos não foram realizados. Necessário para conformidade NBR 5410.');
    return issues;
  }

  // Verificar queda de tensão (máximo 3%)
  if (electrical.voltageDrop > 3) {
    issues.push(`Queda de tensão (${electrical.voltageDrop.toFixed(2)}%) excede o máximo permitido pela NBR 5410 (3%).`);
  }

  // Verificar seção de cabo adequada
  if (electrical.totalCurrent > 0 && electrical.cableSection < 2.5) {
    issues.push('Seção de cabo muito pequena. NBR 5410 recomenda mínimo 2.5mm² para instalações residenciais.');
  }

  // Verificar se há proteção (disjuntores)
  if (electrical.totalCurrent > 0) {
    issues.push('Certifique-se de que há proteção adequada (disjuntores) conforme NBR 5410.');
  }

  // Verificar aterramento
  issues.push('Certifique-se de que há aterramento adequado conforme NBR 5410.');

  return issues;
}

/**
 * Valida NBR 15264 (Sistemas de Gás em Veículos Recreativos)
 */
function validateNBR15264(gas?: GasResult, components?: ProjectComponent[]): string[] {
  const issues: string[] = [];

  if (!gas) {
    issues.push('Cálculos de gás não foram realizados. Necessário para conformidade NBR 15264.');
    return issues;
  }

  // Verificar se há cilindros
  const hasCylinders = components?.some(c => 
    c.customProperties?.type === 'gas_cylinder' ||
    c.customProperties?.capacity_kg
  ) || false;

  if (!hasCylinders) {
    issues.push('Sistema de gás deve ter pelo menos um cilindro conforme NBR 15264.');
  }

  // Verificar ventilação (NBR 15264 requer 2 aberturas: superior e inferior)
  issues.push('Certifique-se de que o compartimento de gás tem 2 aberturas de ventilação (superior e inferior) conforme NBR 15264.');

  // Verificar isolamento
  issues.push('Certifique-se de que o compartimento de gás é isolado e resistente ao fogo conforme NBR 15264.');

  // Verificar tubulação (cobre sem costura ou mangueira certificada)
  issues.push('Certifique-se de que a tubulação de gás é de cobre sem costura ou mangueira certificada conforme NBR 15264.');

  // Verificar válvulas de segurança
  issues.push('Certifique-se de que há válvula de segurança no regulador de pressão conforme NBR 15264.');

  // Verificar regulador
  issues.push('Certifique-se de que há regulador de pressão adequado (pressão de saída 2.8 bar) conforme NBR 15264.');

  return issues;
}

