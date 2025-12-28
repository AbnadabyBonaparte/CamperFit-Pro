import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../_core/trpc';
import { db } from '../db';
import { projects, calculations, projectComponents } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { calculateCenterOfGravity } from '../calculators/centerOfGravity';
import { calculateElectrical } from '../calculators/electrical';
import { calculateGas } from '../calculators/gas';
import { calculateDeflection } from '../calculators/deflection';
import { validateCompliance } from '../calculators/compliance';
import { calculateWeight } from '../calculators/weight';
import type { CGResult, ElectricalResult, GasResult, ComplianceResult } from '../../shared/types';

export const calculationsRouter = router({
  // Calcular peso total (componentes + shell)
  calculateWeight: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      shellParams: z.object({
        floorLength: z.number(),
        outerWidth: z.number(),
        interiorHeight: z.number(),
        alcoveDepth: z.number(),
        alcoveHeight: z.number(),
        externalMaterialId: z.string().optional(),
        internalMaterialId: z.string().optional(),
        insulationMaterialId: z.string().optional(),
        showFrame: z.boolean().optional(),
        frameSize: z.enum(['50x50', '40x40', '30x30']).optional(),
      }).nullable(),
      materials: z.array(z.object({
        id: z.string(),
        density: z.number(),
        thickness: z.number().optional(),
      })),
    }))
    .query(async ({ ctx, input }) => {
      // Verificar se o projeto pertence ao usuário
      const projectResult = await db.select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);
      
      const project = projectResult[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }

      // Buscar componentes do projeto
      const componentsResult = await db.select()
        .from(projectComponents)
        .where(eq(projectComponents.projectId, input.projectId));

      // Calcular peso
      const payloadMax = project.maxGVWR || 0;
      const result = calculateWeight(
        componentsResult,
        input.shellParams,
        payloadMax,
        input.materials
      );

      return result;
    }),

  // Calcular centro de gravidade
  calculateCG: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      // Verificar se o projeto pertence ao usuário
      const projectResult = await db.select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);
      
      const project = projectResult[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }

      // Buscar componentes do projeto
      const componentsResult = await db.select()
        .from(projectComponents)
        .where(eq(projectComponents.projectId, input.projectId));

      // Converter para formato esperado pela calculadora
      const components = componentsResult.map(c => ({
        id: c.id,
        posX: c.posX || 0,
        posY: c.posY || 0,
        posZ: c.posZ || 0,
        weight: c.weight || 0,
      }));

      // Calcular CG
      const result = calculateCenterOfGravity(components, {
        wheelbase: project.wheelbase || 0,
        length: project.length || 0,
        width: project.width || 0,
        height: project.height || 0,
        maxGVWR: project.maxGVWR || 0,
      });

      // Determinar status geral
      const status = result.status === 'critical' ? 'critical' : result.status === 'warning' ? 'warning' : 'valid';

      // Salvar cálculo no banco
      const calculationId = randomUUID();
      await db.insert(calculations).values({
        id: calculationId,
        projectId: input.projectId,
        type: 'centerOfGravity',
        result: result as any,
        status,
        issues: result.issues as any,
      });

      // Atualizar projeto com valores calculados
      await db.update(projects)
        .set({
          totalWeight: result.totalWeight,
          cgX: result.cgX,
          cgY: result.cgY,
          cgZ: result.cgZ,
          cgHeight: result.cgZ,
          weightDistributionFront: result.weightDistributionFront,
          weightDistributionRear: result.weightDistributionRear,
        })
        .where(eq(projects.id, input.projectId));

      return result;
    }),

  // Calcular sistema elétrico
  calculateElectrical: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Verificar se o projeto pertence ao usuário
      const projectResult = await db.select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);
      
      const project = projectResult[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }

      // Buscar componentes do projeto
      const componentsResult = await db.select()
        .from(projectComponents)
        .where(eq(projectComponents.projectId, input.projectId));

      // Calcular sistema elétrico
      const result = calculateElectrical(componentsResult as any);

      // Determinar status
      const status = result.voltageDripStatus === 'warning' || result.issues.length > 0 ? 'warning' : 'valid';

      // Salvar cálculo
      const calculationId = randomUUID();
      await db.insert(calculations).values({
        id: calculationId,
        projectId: input.projectId,
        type: 'electrical',
        result: result as any,
        status,
        issues: result.issues as any,
      });

      return result;
    }),

  // Calcular sistema de gás
  calculateGas: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Verificar se o projeto pertence ao usuário
      const projectResult = await db.select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);
      
      const project = projectResult[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }

      // Buscar componentes do projeto
      const componentsResult = await db.select()
        .from(projectComponents)
        .where(eq(projectComponents.projectId, input.projectId));

      // Calcular sistema de gás
      const result = calculateGas(componentsResult as any);

      // Determinar status
      const status = result.safetyIssues.length > 2 ? 'critical' : result.safetyIssues.length > 0 ? 'warning' : 'valid';

      // Salvar cálculo
      const calculationId = randomUUID();
      await db.insert(calculations).values({
        id: calculationId,
        projectId: input.projectId,
        type: 'gas',
        result: result as any,
        status,
        issues: result.safetyIssues as any,
      });

      return result;
    }),

  // Calcular deflexão
  calculateDeflection: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Verificar se o projeto pertence ao usuário
      const projectResult = await db.select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);
      
      const project = projectResult[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }

      // Buscar componentes do projeto
      const componentsResult = await db.select()
        .from(projectComponents)
        .where(eq(projectComponents.projectId, input.projectId));

      // Converter para formato esperado
      const components = componentsResult.map(c => ({
        weight: c.weight || 0,
        posX: c.posX || 0,
        posY: c.posY || 0,
        length: c.length || 0,
        width: c.width || 0,
      }));

      // Calcular deflexão
      const result = calculateDeflection(components, {
        length: project.length || 0,
        width: project.width || 0,
        wheelbase: project.wheelbase || 0,
        maxGVWR: project.maxGVWR || 0,
      });

      // Atualizar projeto
      await db.update(projects)
        .set({ deflection: result.deflection })
        .where(eq(projects.id, input.projectId));

      // Salvar cálculo
      const calculationId = randomUUID();
      await db.insert(calculations).values({
        id: calculationId,
        projectId: input.projectId,
        type: 'deflection',
        result: result as any,
        status: result.status,
        issues: result.issues as any,
      });

      return result;
    }),

  // Validar conformidade
  validateCompliance: protectedProcedure
    .input(z.object({ projectId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Verificar se o projeto pertence ao usuário
      const projectResult = await db.select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);
      
      const project = projectResult[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }

      // Buscar componentes
      const componentsResult = await db.select()
        .from(projectComponents)
        .where(eq(projectComponents.projectId, input.projectId));

      // Buscar cálculos anteriores
      const previousCalculations = await db.select()
        .from(calculations)
        .where(eq(calculations.projectId, input.projectId));

      // Extrair resultados dos cálculos anteriores
      const cgResult = previousCalculations.find(c => c.type === 'centerOfGravity')?.result as CGResult | undefined;
      const electricalResult = previousCalculations.find(c => c.type === 'electrical')?.result as ElectricalResult | undefined;
      const gasResult = previousCalculations.find(c => c.type === 'gas')?.result as GasResult | undefined;

      // Validar conformidade
      const result = validateCompliance(project, componentsResult, {
        cg: cgResult,
        electrical: electricalResult,
        gas: gasResult,
      });

      // Determinar status geral
      const hasNonCompliant = 
        result.contran.status === 'non_compliant' ||
        result.nbr5410.status === 'non_compliant' ||
        result.nbr15264.status === 'non_compliant';
      
      const hasWarnings = 
        result.contran.status === 'warning' ||
        result.nbr5410.status === 'warning' ||
        result.nbr15264.status === 'warning';

      const status = hasNonCompliant ? 'critical' : hasWarnings ? 'warning' : 'valid';

      // Salvar cálculo
      const calculationId = randomUUID();
      const allIssues = [
        ...result.contran.issues,
        ...result.nbr5410.issues,
        ...result.nbr15264.issues,
      ];

      await db.insert(calculations).values({
        id: calculationId,
        projectId: input.projectId,
        type: 'compliance',
        result: result as any,
        status,
        issues: allIssues as any,
      });

      return result;
    }),
});

