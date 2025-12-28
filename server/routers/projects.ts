import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../_core/trpc';
import { db } from '../db';
import { projects } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { createProjectSchema, updateProjectSchema } from '../../shared/validators';

export const projectsRouter = router({
  // Listar projetos do usuário
  list: protectedProcedure
    .input(z.object({ 
      skip: z.number().default(0), 
      take: z.number().default(10) 
    }))
    .query(async ({ ctx, input }) => {
      return await db.select()
        .from(projects)
        .where(eq(projects.userId, ctx.user.id))
        .limit(input.take)
        .offset(input.skip);
    }),

  // Obter projeto específico
  get: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const result = await db.select()
        .from(projects)
        .where(eq(projects.id, input.id))
        .limit(1);
      
      const project = result[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }
      
      return project;
    }),

  // Criar novo projeto
  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const projectId = randomUUID();
      
      await db.insert(projects).values({
        id: projectId,
        userId: ctx.user.id,
        name: input.name,
        description: input.description,
        vehicleType: input.vehicleType,
        length: input.dimensions.length,
        width: input.dimensions.width,
        height: input.dimensions.height,
        wheelbase: input.dimensions.wheelbase,
        maxGVWR: input.dimensions.maxGVWR,
        status: 'draft',
        version: 1,
      });
      
      return { id: projectId };
    }),

  // Atualizar projeto
  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      data: updateProjectSchema,
    }))
    .mutation(async ({ ctx, input }) => {
      const result = await db.select()
        .from(projects)
        .where(eq(projects.id, input.id))
        .limit(1);
      
      const project = result[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }
      
      await db.update(projects)
        .set(input.data)
        .where(eq(projects.id, input.id));
      
      return { success: true };
    }),

  // Deletar projeto
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const result = await db.select()
        .from(projects)
        .where(eq(projects.id, input.id))
        .limit(1);
      
      const project = result[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }
      
      await db.delete(projects)
        .where(eq(projects.id, input.id));
      
      return { success: true };
    }),

  // Duplicar projeto
  duplicate: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const result = await db.select()
        .from(projects)
        .where(eq(projects.id, input.id))
        .limit(1);
      
      const project = result[0];
      
      if (!project || project.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Project not found or access denied' });
      }
      
      const newProjectId = randomUUID();
      
      await db.insert(projects).values({
        ...project,
        id: newProjectId,
        userId: ctx.user.id,
        name: `${project.name} (Copy)`,
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return { id: newProjectId };
    }),
});

