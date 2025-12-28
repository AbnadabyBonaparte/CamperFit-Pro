// @ts-ignore - pdfkit doesn't have perfect TypeScript support
import PDFDocument from 'pdfkit';
import type { Project } from '../../drizzle/schema';
import type { ProjectComponent } from '../../drizzle/schema';
import type { Calculation } from '../../drizzle/schema';

export interface PDFExportData {
  project: Project;
  components: ProjectComponent[];
  calculations: Calculation[];
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

/**
 * Gera PDF do projeto com layout, cálculos e relatórios
 */
export function generatePDF(data: PDFExportData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
      });

      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });

      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on('error', (error) => {
        reject(error);
      });

      // Capa
      doc.fontSize(24).text('CamperFit Pro', { align: 'center' });
      doc.moveDown();
      doc.fontSize(18).text('Relatório Técnico Completo', { align: 'center' });
      doc.moveDown(2);

      // Informações do Projeto
      doc.fontSize(16).text('1. Informações do Projeto', { underline: true });
      doc.moveDown();
      doc.fontSize(12);
      doc.text(`Nome: ${data.project.name}`);
      doc.text(`Tipo de Veículo: ${data.project.vehicleType || 'N/A'}`);
      doc.text(`Status: ${data.project.status || 'N/A'}`);
      if (data.project.description) {
        doc.text(`Descrição: ${data.project.description}`);
      }
      doc.moveDown();

      // Dimensões
      doc.fontSize(14).text('Dimensões do Veículo:', { underline: true });
      doc.fontSize(12);
      doc.text(`Comprimento: ${data.project.length || 0} mm`);
      doc.text(`Largura: ${data.project.width || 0} mm`);
      doc.text(`Altura: ${data.project.height || 0} mm`);
      doc.text(`Distância entre Eixos (Wheelbase): ${data.project.wheelbase || 0} mm`);
      doc.text(`Capacidade Máxima (GVWR): ${data.project.maxGVWR || 0} kg`);
      doc.moveDown();

      // Componentes
      doc.fontSize(16).text('2. Componentes do Projeto', { underline: true });
      doc.moveDown();
      doc.fontSize(12);
      
      if (data.components.length === 0) {
        doc.text('Nenhum componente adicionado ao projeto.');
      } else {
        data.components.forEach((component, index) => {
          doc.text(`${index + 1}. ${component.id}`);
          doc.text(`   Posição: X=${component.posX || 0}mm, Y=${component.posY || 0}mm, Z=${component.posZ || 0}mm`);
          doc.text(`   Peso: ${component.weight || 0} kg`);
          if (component.material) {
            doc.text(`   Material: ${component.material}`);
          }
          doc.moveDown(0.5);
        });
      }
      doc.moveDown();

      // Cálculos
      doc.fontSize(16).text('3. Resultados dos Cálculos', { underline: true });
      doc.moveDown();

      // Centro de Gravidade
      const cgCalc = data.calculations.find(c => c.type === 'centerOfGravity');
      if (cgCalc && cgCalc.result) {
        const cgResult = cgCalc.result as any;
        doc.fontSize(14).text('3.1 Centro de Gravidade (CG)', { underline: true });
        doc.fontSize(12);
        doc.text(`CG X: ${cgResult.cgX?.toFixed(2) || 0} mm`);
        doc.text(`CG Y: ${cgResult.cgY?.toFixed(2) || 0} mm`);
        doc.text(`CG Z: ${cgResult.cgZ?.toFixed(2) || 0} mm`);
        doc.text(`Peso Total: ${cgResult.totalWeight?.toFixed(2) || 0} kg`);
        doc.text(`Distribuição Dianteira: ${cgResult.weightDistributionFront?.toFixed(1) || 0}%`);
        doc.text(`Distribuição Traseira: ${cgResult.weightDistributionRear?.toFixed(1) || 0}%`);
        doc.text(`Status: ${cgResult.status || 'N/A'}`);
        doc.text(`Risco de Tombamento: ${cgResult.tippingRisk || 'N/A'}`);
        
        if (cgResult.issues && cgResult.issues.length > 0) {
          doc.moveDown();
          doc.fontSize(11).text('Avisos:', { underline: true });
          cgResult.issues.forEach((issue: string) => {
            doc.text(`  • ${issue}`);
          });
        }
        doc.moveDown();
      }

      // Sistema Elétrico
      const electricalCalc = data.calculations.find(c => c.type === 'electrical');
      if (electricalCalc && electricalCalc.result) {
        const elResult = electricalCalc.result as any;
        doc.fontSize(14).text('3.2 Sistema Elétrico', { underline: true });
        doc.fontSize(12);
        doc.text(`Carga Total: ${elResult.totalLoad?.toFixed(2) || 0} W`);
        doc.text(`Corrente Total: ${elResult.totalCurrent?.toFixed(2) || 0} A`);
        doc.text(`Autonomia: ${elResult.autonomyHours?.toFixed(2) || 0} horas (${elResult.autonomyDays?.toFixed(2) || 0} dias)`);
        doc.text(`Seção de Cabo Recomendada: ${elResult.cableSection || 0} mm²`);
        doc.text(`Queda de Tensão: ${elResult.voltageDrop?.toFixed(2) || 0}%`);
        doc.text(`Status de Queda de Tensão: ${elResult.voltageDripStatus || 'N/A'}`);
        
        if (elResult.issues && elResult.issues.length > 0) {
          doc.moveDown();
          doc.fontSize(11).text('Avisos:', { underline: true });
          elResult.issues.forEach((issue: string) => {
            doc.text(`  • ${issue}`);
          });
        }
        doc.moveDown();
      }

      // Sistema de Gás
      const gasCalc = data.calculations.find(c => c.type === 'gas');
      if (gasCalc && gasCalc.result) {
        const gasResult = gasCalc.result as any;
        doc.fontSize(14).text('3.3 Sistema de Gás', { underline: true });
        doc.fontSize(12);
        doc.text(`Consumo Total: ${gasResult.totalConsumption?.toFixed(2) || 0} kg/dia`);
        doc.text(`Autonomia: ${gasResult.autonomy?.toFixed(2) || 0} dias`);
        
        if (gasResult.safetyIssues && gasResult.safetyIssues.length > 0) {
          doc.moveDown();
          doc.fontSize(11).text('Questões de Segurança:', { underline: true });
          gasResult.safetyIssues.forEach((issue: string) => {
            doc.text(`  • ${issue}`);
          });
        }
        doc.moveDown();
      }

      // Conformidade
      const complianceCalc = data.calculations.find(c => c.type === 'compliance');
      if (complianceCalc && complianceCalc.result) {
        const compResult = complianceCalc.result as any;
        doc.fontSize(14).text('3.4 Validação de Conformidade', { underline: true });
        doc.fontSize(12);
        
        if (compResult.contran) {
          doc.text(`CONTRAN 993/23: ${compResult.contran.status || 'N/A'}`);
          if (compResult.contran.issues && compResult.contran.issues.length > 0) {
            compResult.contran.issues.forEach((issue: string) => {
              doc.text(`  • ${issue}`, { indent: 20 });
            });
          }
        }
        
        if (compResult.nbr5410) {
          doc.text(`NBR 5410 (Elétrica): ${compResult.nbr5410.status || 'N/A'}`);
          if (compResult.nbr5410.issues && compResult.nbr5410.issues.length > 0) {
            compResult.nbr5410.issues.forEach((issue: string) => {
              doc.text(`  • ${issue}`, { indent: 20 });
            });
          }
        }
        
        if (compResult.nbr15264) {
          doc.text(`NBR 15264 (Gás): ${compResult.nbr15264.status || 'N/A'}`);
          if (compResult.nbr15264.issues && compResult.nbr15264.issues.length > 0) {
            compResult.nbr15264.issues.forEach((issue: string) => {
              doc.text(`  • ${issue}`, { indent: 20 });
            });
          }
        }
        doc.moveDown();
      }

      // Rodapé
      doc.moveDown(2);
      doc.fontSize(10).text(
        `Gerado em ${new Date().toLocaleString('pt-BR')} | CamperFit Pro`,
        { align: 'center' }
      );

      // Finalizar documento
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

