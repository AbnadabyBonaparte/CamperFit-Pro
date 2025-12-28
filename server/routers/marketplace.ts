import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure, publicProcedure } from '../_core/trpc';
import { db } from '../db';
import { componentLibrary, projectComponents } from '../../drizzle/schema';
import { eq, and, or, like, desc, asc } from 'drizzle-orm';

export const marketplaceRouter = router({
  // Listar componentes da biblioteca (público)
  listComponents: publicProcedure
    .input(z.object({
      category: z.enum(['furniture', 'utility', 'structural', 'electrical', 'gas']).optional(),
      search: z.string().optional(),
      skip: z.number().default(0),
      take: z.number().default(50),
      sortBy: z.enum(['name', 'price', 'rating', 'createdAt']).default('name'),
      sortOrder: z.enum(['asc', 'desc']).default('asc'),
    }))
    .query(async ({ input }) => {
      const conditions = [];
      
      if (input.category) {
        conditions.push(eq(componentLibrary.category, input.category));
      }
      
      if (input.search) {
        conditions.push(
          or(
            like(componentLibrary.name, `%${input.search}%`),
            like(componentLibrary.description, `%${input.search}%`)
          )
        );
      }
      
      conditions.push(eq(componentLibrary.isActive, true));
      
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
      
      // Sort
      let orderBy;
      const sortColumn = componentLibrary[input.sortBy as keyof typeof componentLibrary];
      if (sortColumn) {
        orderBy = input.sortOrder === 'desc' ? desc(sortColumn) : asc(sortColumn);
      } else {
        orderBy = asc(componentLibrary.name);
      }
      
      const results = await db.select()
        .from(componentLibrary)
        .where(whereClause)
        .orderBy(orderBy)
        .limit(input.take)
        .offset(input.skip);
      
      return results;
    }),

  // Obter detalhes de um componente
  getComponent: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const result = await db.select()
        .from(componentLibrary)
        .where(eq(componentLibrary.id, input.id))
        .limit(1);
      
      const component = result[0];
      
      if (!component || !component.isActive) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Component not found' });
      }
      
      return component;
    }),

  // Adicionar componente ao projeto (do marketplace)
  addToProject: protectedProcedure
    .input(z.object({
      componentId: z.string().uuid(),
      projectId: z.string().uuid(),
      position: z.object({
        x: z.number(),
        y: z.number(),
        z: z.number(),
      }).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verificar se o projeto pertence ao usuário
      const { projects } = await import('../../drizzle/schema');
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
        .where(eq(componentLibrary.id, input.componentId))
        .limit(1);
      
      const libraryComponent = componentResult[0];
      
      if (!libraryComponent || !libraryComponent.isActive) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Component not found in library' });
      }

      // Criar componente no projeto
      const { randomUUID } = await import('crypto');
      const projectComponentId = randomUUID();
      
      await db.insert(projectComponents).values({
        id: projectComponentId,
        projectId: input.projectId,
        componentLibraryId: input.componentId,
        posX: input.position?.x || 0,
        posY: input.position?.y || 0,
        posZ: input.position?.z || 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        length: libraryComponent.length || 0,
        width: libraryComponent.width || 0,
        height: libraryComponent.height || 0,
        weight: libraryComponent.weight || 0,
        material: libraryComponent.material || null,
        color: null,
        electricalPower: libraryComponent.electricalPower,
        electricalVoltage: libraryComponent.electricalVoltage,
        gasConsumption: libraryComponent.gasConsumption,
        waterCapacity: libraryComponent.waterCapacity,
        customProperties: libraryComponent.customProperties,
      });

      // Buscar componente criado
      const createdResult = await db.select()
        .from(projectComponents)
        .where(eq(projectComponents.id, projectComponentId))
        .limit(1);
      
      return createdResult[0];
    }),

  // Buscar componentes por categoria
  getByCategory: publicProcedure
    .input(z.object({
      category: z.enum(['furniture', 'utility', 'structural', 'electrical', 'gas']),
      limit: z.number().default(20),
    }))
    .query(async ({ input }) => {
      const results = await db.select()
        .from(componentLibrary)
        .where(
          and(
            eq(componentLibrary.category, input.category),
            eq(componentLibrary.isActive, true)
          )
        )
        .limit(input.limit);
      
      return results;
    }),

  // Buscar componentes populares
  getPopular: publicProcedure
    .input(z.object({
      limit: z.number().default(20),
    }))
    .query(async ({ input }) => {
      // Por enquanto, retornar os mais recentes (futuro: usar métricas de popularidade)
      const results = await db.select()
        .from(componentLibrary)
        .where(eq(componentLibrary.isActive, true))
        .orderBy(desc(componentLibrary.createdAt))
        .limit(input.limit);
      
      return results;
    }),
});

