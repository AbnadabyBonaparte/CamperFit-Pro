import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq, desc, and } from 'drizzle-orm';
import { env } from './_core/env';
import * as schema from '../drizzle/schema';

const connection = mysql.createConnection(env.DATABASE_URL);

export const db = drizzle(connection, { schema, mode: 'default' });

// Helper functions
export async function getProjectsByUserId(userId: number, skip: number = 0, take: number = 10) {
  const { projects } = schema;
  return await db.select().from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.createdAt))
    .limit(take)
    .offset(skip);
}

export async function getProjectById(id: string) {
  const { projects } = schema;
  const result = await db.select().from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  return result[0] || null;
}

export async function getProjectComponents(projectId: string) {
  const { projectComponents } = schema;
  return await db.select().from(projectComponents)
    .where(eq(projectComponents.projectId, projectId));
}

export async function getComponentLibrary(category?: string, skip: number = 0, take: number = 50) {
  const { componentLibrary } = schema;
  
  if (category) {
    return await db.select().from(componentLibrary)
      .where(and(
        eq(componentLibrary.category, category),
        eq(componentLibrary.isActive, true)
      ))
      .limit(take)
      .offset(skip);
  }
  return await db.select().from(componentLibrary)
    .where(eq(componentLibrary.isActive, true))
    .limit(take)
    .offset(skip);
}

