import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../_core/trpc';
import { db } from '../db';
import { projects, calculations, projectComponents } from '../../drizzle/schema';
import * as schema from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { generatePDF, type PDFExportData } from '../exporters/pdfExporter';
import { exportToJSON } from '../exporters/jsonExporter';
import { exportToPNG } from '../exporters/pngExporter';
import { exportToDXF } from '../exporters/dxfExporter';
import { uploadToS3, generateFileKey } from '../storage';

export const exportRouter = router({
  // Exportar para PDF
  toPDF: protectedProcedure
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

      // Buscar cálculos
      const calculationsResult = await db.select()
        .from(calculations)
        .where(eq(calculations.projectId, input.projectId));

      // Gerar PDF
      const pdfBuffer = await generatePDF({
        project,
        components: componentsResult,
        calculations: calculationsResult,
        user: {
          name: ctx.user.email, // TODO: Buscar nome do usuário do banco
          email: ctx.user.email,
        },
      });

      // Upload para S3
      const fileKey = generateFileKey('exports', `${input.projectId}.pdf`);
      const { url } = await uploadToS3(fileKey, pdfBuffer, 'application/pdf');

      // Salvar registro de exportação
      const exportId = randomUUID();
      await db.insert(schema.exports).values({
        id: exportId,
        projectId: input.projectId,
        userId: ctx.user.id,
        format: 'pdf',
        fileKey,
        fileUrl: url,
        fileSize: pdfBuffer.length,
      });

      return { url, fileKey, fileSize: pdfBuffer.length };
    }),

  // Exportar para JSON
  toJSON: protectedProcedure
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

      // Buscar cálculos
      const calculationsResult = await db.select()
        .from(calculations)
        .where(eq(calculations.projectId, input.projectId));

      // Gerar JSON
      const jsonString = exportToJSON({
        project,
        components: componentsResult,
        calculations: calculationsResult,
      });

      const jsonBuffer = Buffer.from(jsonString, 'utf-8');

      // Upload para S3
      const fileKey = generateFileKey('exports', `${input.projectId}.json`);
      const { url } = await uploadToS3(fileKey, jsonBuffer, 'application/json');

      // Salvar registro de exportação
      const exportId = randomUUID();
      await db.insert(schema.exports).values({
        id: exportId,
        projectId: input.projectId,
        userId: ctx.user.id,
        format: 'json',
        fileKey,
        fileUrl: url,
        fileSize: jsonBuffer.length,
      });

      return { url, fileKey, fileSize: jsonBuffer.length };
    }),

  // Exportar para DXF
  toDXF: protectedProcedure
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

      // Gerar DXF
      const dxfString = exportToDXF(project, componentsResult);
      const dxfBuffer = Buffer.from(dxfString, 'utf-8');

      // Upload para S3
      const fileKey = generateFileKey('exports', `${input.projectId}.dxf`);
      const { url } = await uploadToS3(fileKey, dxfBuffer, 'application/dxf');

      // Salvar registro de exportação
      const exportId = randomUUID();
      await db.insert(schema.exports).values({
        id: exportId,
        projectId: input.projectId,
        userId: ctx.user.id,
        format: 'dxf',
        fileKey,
        fileUrl: url,
        fileSize: dxfBuffer.length,
      });

      return { url, fileKey, fileSize: dxfBuffer.length };
    }),

  // Exportar para PNG
  toPNG: protectedProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
      width: z.number().default(1920),
      height: z.number().default(1080),
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

      // Buscar componentes
      const componentsResult = await db.select()
        .from(projectComponents)
        .where(eq(projectComponents.projectId, input.projectId));

      // Gerar PNG (placeholder por enquanto)
      const pngBuffer = await exportToPNG(project, componentsResult, {
        width: input.width,
        height: input.height,
      });

      // Upload para S3
      const fileKey = generateFileKey('exports', `${input.projectId}.png`);
      const { url } = await uploadToS3(fileKey, pngBuffer, 'image/png');

      // Salvar registro de exportação
      const exportId = randomUUID();
      await db.insert(schema.exports).values({
        id: exportId,
        projectId: input.projectId,
        userId: ctx.user.id,
        format: 'png',
        fileKey,
        fileUrl: url,
        fileSize: pngBuffer.length,
      });

      return { url, fileKey, fileSize: pngBuffer.length };
    }),
});

