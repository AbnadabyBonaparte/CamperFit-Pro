import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../_core/trpc';
import { db } from '../db';
import { componentLibrary, projectComponents, projects } from '../../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { addComponentToProjectSchema, updateComponentInProjectSchema } from '../../shared/validators';

export const componentsRouter = router({
  // Listar biblioteca de componentes
  list: publicProcedure
    .input(z.object({
      category: z.enum(['furniture', 'utility', 'structural', 'electrical', 'gas']).optional(),
      skip: z.number().default(0),
      take: z.number().default(50),
    }))
    .query(async ({ input }) => {
      if (input.category) {
        return await db.select()
          .from(componentLibrary)
          .where(and(
            eq(componentLibrary.category, input.category),
            eq(componentLibrary.isActive, true)
          ))
          .limit(input.take)
          .offset(input.skip);
      }
      
      return await db.select()
        .from(componentLibrary)
        .where(eq(componentLibrary.isActive, true))
        .limit(input.take)
        .offset(input.skip);
    }),

  // Obter componente específico
  get: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const result = await db.select()
        .from(componentLibrary)
        .where(eq(componentLibrary.id, input.id))
        .limit(1);
      
      return result[0] || null;
    }),

  // Adicionar componente ao projeto
  addToProject: protectedProcedure
    .input(addComponentToProjectSchema)
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
      
      // Buscar componente da biblioteca
      const componentResult = await db.select()
        .from(componentLibrary)
        .where(eq(componentLibrary.id, input.componentLibraryId))
        .limit(1);
      
      const libraryComponent = componentResult[0];
      
      if (!libraryComponent) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Component not found' });
      }
      
      const componentId = randomUUID();
      
      await db.insert(projectComponents).values({
        id: componentId,
        projectId: input.projectId,
        componentLibraryId: input.componentLibraryId,
        posX: input.position.x,
        posY: input.position.y,
        posZ: input.position.z,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        length: libraryComponent.length || 0,
        width: libraryComponent.width || 0,
        height: libraryComponent.height || 0,
        weight: libraryComponent.weight || 0,
        material: libraryComponent.material || '',
        color: '#8B7355',
        electricalPower: libraryComponent.electricalPower || null,
        electricalVoltage: libraryComponent.electricalVoltage || null,
        gasConsumption: libraryComponent.gasConsumption || null,
        waterCapacity: libraryComponent.waterCapacity || null,
      });
      
      return { id: componentId };
    }),

  // Atualizar componente no projeto
  updateInProject: protectedProcedure
    .input(updateComponentInProjectSchema)
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
      
      const updateData: any = {};
      
      if (input.data.position) {
        updateData.posX = input.data.position.x;
        updateData.posY = input.data.position.y;
        updateData.posZ = input.data.position.z;
      }
      
      if (input.data.rotation) {
        updateData.rotationX = input.data.rotation.x;
        updateData.rotationY = input.data.rotation.y;
        updateData.rotationZ = input.data.rotation.z;
      }
      
      if (input.data.weight !== undefined) {
        updateData.weight = input.data.weight;
      }
      
      if (input.data.color) {
        updateData.color = input.data.color;
      }
      
      await db.update(projectComponents)
        .set(updateData)
        .where(eq(projectComponents.id, input.componentId));
      
      return { success: true };
    }),

  // Remover componente do projeto
  removeFromProject: protectedProcedure
    .input(z.object({
      projectId: z.string().uuid(),
      componentId: z.string().uuid(),
    }))
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
      
      await db.delete(projectComponents)
        .where(eq(projectComponents.id, input.componentId));
      
      return { success: true };
    }),

  // Listar componentes do projeto
  listByProject: protectedProcedure
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
      
      return await db.select()
        .from(projectComponents)
        .where(eq(projectComponents.projectId, input.projectId));
    }),
});

